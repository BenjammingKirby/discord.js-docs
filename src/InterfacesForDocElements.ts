import type {
    JSDocAbstract,
    JSDocAccess,
    JSDocAsync,
    JSDocDefault,
    JSDocDeprecated,
    JSDocEmits,
    JSDocExamples,
    JSDocExtends,
    JSDocGenerator,
    JSDocImplements,
    JSDocReadonly,
    JSDocReturns,
    JSDocScope,
    JSDocSee,
    JSDocThrows,
    JSDocVirtual,
    SplitNameWithAnyType,
} from "./JsDocTypes";

export type RawDocumentedVarType =
    | SplitNameWithAnyType[]
    | { types: SplitNameWithAnyType[]; description?: string; nullable?: true };

export interface RawDocumentedItemMeta {
    line: number;
    file: string;
    path: string;
}
export interface RawDocumentedParam {
    name?: string;
    description?: string;
    optional?: boolean;
    default?: boolean | string | number | null;
    variable?: boolean;
    nullable?: boolean;
    type?: SplitNameWithAnyType[];
}
export interface RawDocumentedFunction {
    name?: string;
    description?: string;
    see?: JSDocSee;
    scope?: JSDocScope | undefined;
    access?: JSDocAccess;
    inherits?: string;
    inherited?: boolean;
    implements?: JSDocImplements;
    examples?: JSDocExamples;
    abstract?: JSDocAbstract;
    deprecated?: JSDocDeprecated;
    emits?: JSDocEmits;
    //* As of writing, this will always be undefined since discord.js' docgen uses throws instead of exception
    throws?: JSDocThrows | undefined;
    params?: RawDocumentedParam[] | undefined;
    async?: JSDocAsync;
    generator?: JSDocGenerator;
    returns?: JSDocReturns | undefined;
    returnsDescription?: string;
    meta: RawDocumentedItemMeta;
}

export interface RawDocumentedEvent {
    name?: string;
    description?: string;
    see?: JSDocSee;
    deprecated?: JSDocDeprecated;
    params?: RawDocumentedParam[] | undefined;
    meta: RawDocumentedItemMeta;
}
export interface RawDocumentedConstructor {
    name?: string;
    description?: string;
    see?: JSDocSee;
    access?: JSDocAccess;
    params?: RawDocumentedParam[] | undefined;
}

export interface RawDocumentedMember {
    name?: string;
    description?: string;
    see?: JSDocSee;
    scope?: JSDocScope | undefined;
    access?: JSDocAccess;
    readonly?: JSDocReadonly;
    nullable?: boolean;
    abstract?: JSDocVirtual;
    deprecated?: JSDocDeprecated;
    default?: JSDocDefault;
    type?: RawDocumentedVarType;
    props?: RawDocumentedParam[] | undefined;
    meta: RawDocumentedItemMeta;
}
export interface RawDocumentedClass {
    name?: string;
    description?: string;
    see?: JSDocSee;
    extends?: JSDocExtends;
    implements?: JSDocImplements;
    access?: JSDocAccess;
    abstract?: JSDocAbstract;
    deprecated?: JSDocDeprecated;
    construct: RawDocumentedConstructor;
    props?: RawDocumentedMember[] | undefined;
    methods?: RawDocumentedFunction[] | undefined;
    events?: RawDocumentedEvent[] | undefined;
    meta: RawDocumentedItemMeta;
}
export type RawDocumentedInterface = RawDocumentedClass;

export interface RawDocumentedTypedef {
    name?: string;
    description?: string;
    see?: JSDocSee;
    access?: JSDocAccess;
    deprecated?: JSDocDeprecated;
    type?: RawDocumentedVarType;
    props?: RawDocumentedParam[] | undefined;
    params?: RawDocumentedParam[] | undefined;
    returns?: RawDocumentedVarType | undefined;
    returnsDescription?: string;
    meta: RawDocumentedItemMeta;
}
export interface RawDocumentedExternal {
    name: string;
    see: string[];
    meta: RawDocumentedItemMeta;
}

export interface DataJSON {
    meta: MainMeta;
    classes: RawDocumentedClass[];
    interfaces: RawDocumentedInterface[];
    typedefs: RawDocumentedTypedef[];
    externals: RawDocumentedExternal[];
}
export interface MainMeta {
    generator: string;
    format: number;
    date: number;
}
