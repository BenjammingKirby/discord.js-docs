import Fuse from "fuse.js";
import { DocAllTypes, DocBase } from "./DocBase";
import { DocElementJSON, EmbedOptions } from "./DocElement";
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
declare const sources: {
    [key: string]: string;
};
export declare class Doc extends DocBase {
    url: string;
    project: string;
    repo: string;
    branch: string;
    fuse: Fuse<FuceFormatElement, Fuse.FuseOptions<FuceFormatElement>>;
    constructor(url: string, docs: DataJSON);
    get repoURL(): string;
    get baseURL(): string | null;
    get baseDocsURL(): string | null;
    get icon(): string | null;
    get color(): number | null;
    get(...terms: string[]): DocAllTypes | null;
    search(query: string, { excludePrivateElements }?: EmbedOptions): DocAllTypes[] | null;
    resolveEmbed(query: string, options?: EmbedOptions): MessageEmbed | null;
    toFuseFormat(): FuceFormatElement[];
    toJSON(): DocJSON;
    baseEmbed(): MessageEmbed;
    formatType(types: string[]): string;
    static getRepoURL(id: string): string;
    static sources(): typeof sources;
    static fetch(sourceName: string, { force }?: {
        force?: boolean;
    }): Promise<Doc>;
}