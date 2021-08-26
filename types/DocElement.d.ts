import { DocAllTypes, DocBase, DocParentTypes, types } from "./DocBase";
import type { Doc } from "./Doc";
import { RawDocumentedItemMeta, RawDocumentedClass, RawDocumentedEvent, RawDocumentedInterface, RawDocumentedFunction, RawDocumentedParam, RawDocumentedMember, RawDocumentedTypedef } from "./InterfacesForDocElements";
import { JSDocDeprecated, JSDocExamples, JSDocAccess, JSDocExtends, JSDocImplements, JSDocScope, JSDocReturns } from "./JsDocTypes";
import { MessageEmbed } from "./MessageEmbed";
export declare type RawDocumentedElement = RawDocumentedClass | RawDocumentedEvent | RawDocumentedInterface | RawDocumentedFunction | RawDocumentedParam | RawDocumentedMember | RawDocumentedTypedef;
export interface EmbedOptions {
    excludePrivateElements?: boolean;
}
export interface DocElementJSON {
    name?: string | null;
    description?: string | null;
    internal_type?: types;
    props?: Array<string | null>;
    parent?: string;
    methods?: Array<string | null>;
    events?: Array<string | null>;
    params?: DocElementJSON[];
    type?: string;
    examples?: JSDocExamples;
}
export declare class DocElement extends DocBase {
    doc: Doc;
    docType: types;
    parent: DocParentTypes | null;
    name: string | null;
    description: string | null;
    meta: RawDocumentedItemMeta | null;
    returns: JSDocReturns | null;
    examples: JSDocExamples | null;
    type: string[] | null;
    nullable: boolean | null;
    deprecated: JSDocDeprecated;
    access: JSDocAccess | null;
    extends: JSDocExtends | null;
    implements: JSDocImplements | null;
    scope: JSDocScope | null;
    constructor(doc: Doc, docType: types, data: RawDocumentedElement, parent?: DocParentTypes | null);
    get embedPrefix(): string | null;
    get anchor(): string | null;
    get typeElement(): DocAllTypes | null;
    get url(): string | null;
    get sourceURL(): string | null;
    get formattedName(): string | null;
    get formattedDescription(): string;
    get formattedReturn(): string;
    get formattedType(): string;
    get formattedExtends(): string;
    get formattedImplements(): string;
    get link(): string;
    get static(): boolean;
    embed(options?: {}): MessageEmbed;
    formatEmbed(embed: MessageEmbed, options?: EmbedOptions): void;
    attachProps(embed: MessageEmbed, { excludePrivateElements }?: EmbedOptions): void;
    attachMethods(embed: MessageEmbed, { excludePrivateElements }?: EmbedOptions): void;
    attachEvents(embed: MessageEmbed): void;
    attachParams(embed: MessageEmbed): void;
    attachReturn(embed: MessageEmbed): void;
    attachType(embed: MessageEmbed): void;
    attachExamples(embed: MessageEmbed): void;
    toJSON(): DocElementJSON;
    formatInherits(inherits: JSDocImplements): string;
    formatText(text: string | null | undefined): string;
    static get types(): typeof types;
}
