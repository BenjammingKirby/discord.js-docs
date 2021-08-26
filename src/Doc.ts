import sourcesJSON from "./sources.json";
import Fuse from "fuse.js";
import fetch from "node-fetch";
import { DocAllTypes, DocBase } from "./DocBase";
import { DocElementJSON, EmbedOptions } from "./DocElement";
import { DocClass } from "./DocClass";
import { DocTypedef } from "./DocTypedef";
import { DocInterface } from "./DocInterface";
import { MessageEmbed } from "./MessageEmbed";
import { DataJSON } from "./InterfacesForDocElements";
interface DocJSON {
    classes: DocElementJSON[];
    typedefs: DocElementJSON[];
    interfaces: DocElementJSON[];
}
interface FuceFormatElement {
    id: string;
    name: string;
}
const sources: { [key: string]: string } = sourcesJSON;
const docCache: Map<string, Doc> = new Map();

const DJS = "discordjs";
const AKAIRO = "discord-akairo";

function dissectURL(url: string): [string, string, string] {
    const parts = url.slice(34).split("/");
    return [parts[0], parts[1], parts[3].slice(0, -5)];
}

export class Doc extends DocBase {
    public project: string;
    public repo: string;
    public branch: string;
    public fuse: Fuse<FuceFormatElement, Fuse.FuseOptions<FuceFormatElement>>;
    constructor(public url: string, docs: DataJSON) {
        super(docs);
        // this.url = url;
        [this.project, this.repo, this.branch] = dissectURL(url);

        this.adoptAll(docs.classes, DocClass);
        this.adoptAll(docs.typedefs, DocTypedef);
        this.adoptAll(docs.interfaces, DocInterface);

        this.fuse = new Fuse(this.toFuseFormat(), {
            shouldSort: true,
            threshold: 0.5,
            location: 0,
            distance: 80,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["name", "id"],
            id: "id",
        });
    }

    get repoURL(): string {
        return `https://github.com/${this.project}/${this.repo}/blob/${this.branch}`;
    }

    get baseURL(): string | null {
        switch (this.project) {
        case DJS:
            return "https://discord.js.org";
        case AKAIRO:
            return "https://discord-akairo.github.io";
        default:
            return null;
        }
    }

    get baseDocsURL(): string | null {
        if (!this.baseURL) return null;
        const repo = ["discord.js", AKAIRO].includes(this.repo) ? "main" : this.repo;
        return `${this.baseURL}/#/docs/${repo}/${this.branch}`;
    }

    get icon(): string | null {
        if (!this.baseURL) return null;
        return `${this.baseURL}/favicon.ico`;
    }

    get color(): number | null {
        switch (this.project) {
        case DJS:
            return 0x2296f3;
        case AKAIRO:
            return 0x87202f;
        default:
            return null;
        }
    }
    get(...terms: string[]): DocAllTypes | null {
        const lowerCasedTerms = terms.filter((term) => term).map((term) => term.toLowerCase());
        const parentTerm = lowerCasedTerms.shift();
        if (!parentTerm) return null;
        let elem = this.findChild(parentTerm);
        if (!elem || !lowerCasedTerms.length) return elem || null;
        while (terms.length) {
            const term = terms.shift();
            if (!term || !elem) return null;
            const child = elem.findChild(term);

            if (!child) return null;
            elem = terms.length && child.typeElement ? child.typeElement : child;
        }

        return elem;
    }
    private _getWithExclude(...terms: [Array<DocAllTypes>, ...string[]]): DocAllTypes | null {
        const exclude = (Array.isArray(terms[0]) ? terms.shift() : []) as DocAllTypes[];
        const remainingTerms = terms as string[];
        const lowerCasedTerms = remainingTerms.filter((term) => term).map((term) => term.toLowerCase());
        const parentTerm = lowerCasedTerms.shift();
        if (!parentTerm) return null;
        let elem = this.findChild(parentTerm);
        if (!elem || !lowerCasedTerms.length) return elem || null;
        while (remainingTerms.length) {
            const term = remainingTerms.shift();
            if (!term || !elem) return null;
            const child = elem.findChild(term, exclude);

            if (!child) return null;
            elem = remainingTerms.length && child.typeElement ? child.typeElement : child;
        }

        return elem;
    }

    search(query: string, { excludePrivateElements }: EmbedOptions = {}): DocAllTypes[] | null {
        const result = this.fuse.search<string>(query);
        if (!result.length) return null;

        const filtered: DocAllTypes[] = [];

        while (result.length > 0 && filtered.length < 10) {
            const firstResult = result.shift();
            if (!firstResult) continue;
            firstResult;
            //@ts-ignore
            const element = this._getWithExclude(filtered, ...firstResult.split("#"));
            if (excludePrivateElements && element?.access === "private") continue;
            if (element) filtered.push(element);
        }

        return filtered;
    }

    resolveEmbed(query: string, options: EmbedOptions = {}): MessageEmbed | null {
        const element = this.get(...query.split(/\.|#/));
        if (element) return element.embed(options);

        const searchResults = this.search(query, options);
        if (!searchResults) return null;

        const embed = this.baseEmbed();
        embed.title = "Search results:";
        embed.description = searchResults
            .map((el) => {
                const prefix = el.embedPrefix;
                return `${prefix ? `${prefix} ` : ""}**${el.link}**`;
            })
            .join("\n");
        return embed;
    }

    toFuseFormat(): FuceFormatElement[] {
        const parents = Array.from(this.children.values());

        const children = parents.map((parent) => Array.from(parent.children.values())).reduce((a, b) => a.concat(b));

        const formattedParents = parents.map(({ name }) => ({ id: name!, name: name! }));
        const formattedChildren = children.map(({ name, parent }) => ({ id: `${parent?.name}#${name}`, name: name! }));

        return formattedParents.concat(formattedChildren);
    }

    toJSON(): DocJSON {
        const json: DocJSON = { classes: [], typedefs: [], interfaces: [] };

        for (const key of ["classes", "typedefs", "interfaces"] as const) {
            const thisKey = this[key];
            if (!thisKey) continue;
            json[key] = thisKey.map((item) => item.toJSON());
        }

        return json;
    }

    baseEmbed(): MessageEmbed {
        const title =
            {
                "discord.js": "Discord.js Docs",
                commando: "Commando Docs",
                rpc: "RPC Docs",
                "discord-akairo": "Akairo Docs",
                collection: "Collection",
            }[this.repo] || this.repo;

        return {
            color: this.color || undefined,
            author: {
                name: `${title} (${this.branch})`,
                url: this.baseDocsURL || undefined,
                icon_url: this.icon || undefined,
            },
        };
    }

    formatType(types: string[]): string {
        const typestring = types
            .map((text, index) => {
                if (/<|>|\*/.test(text)) {
                    return text
                        .split("")
                        .map((char) => `\\${char}`)
                        .join("");
                }

                const typeElem = this.findChild(text.toLowerCase());
                const prependOr = index !== 0 && /\w|>/.test(types[index - 1]) && /\w/.test(text);

                return (prependOr ? "|" : "") + (typeElem ? typeElem.link : text);
            })
            .join("");

        return `**${typestring}**`;
    }

    static getRepoURL(id: string): string {
        const [name, branch] = id.split("/");
        const project = {
            main: "discord.js",
            commando: "Commando",
            rpc: "RPC",
        }[name];

        return `https://github.com/discordjs/${project}/blob/${branch}/`;
    }

    static sources(): typeof sources {
        return sources;
    }

    static async fetch(sourceName: string, { force }: { force?: boolean } = {}): Promise<Doc> {
        const url = sources[sourceName] || sourceName;
        const cachedDoc = docCache.get(url);
        if (!force && cachedDoc) return cachedDoc;

        try {
            const data = await fetch(url).then((res) => res.json());
            const doc = new Doc(url, data);
            docCache.set(url, doc);
            return doc;
        } catch (err) {
            throw new Error("invalid source name or URL.");
        }
    }
}