declare type SplitNameType = Array<Array<string[]>>;
export declare type SplitNameWithAnyType = Array<string[] | "*">;
export declare type JSDocAbstract = boolean;
export declare type JSDocVirtual = boolean;
export declare type JSDocAccess = "package" | "private" | "protected" | "public";
export declare type JSDocAsync = boolean;
export declare type JSDocAugments = SplitNameType;
export declare type JSDocExtends = Array<string> | Array<Array<string>>;
export declare type JSDocDefault = boolean | string | number | null;
export declare type JSDocDefaultvalue = boolean | string | number | null;
export declare type JSDocDeprecated = boolean | string;
export declare type JSDocDescription = string;
export declare type JSDocDesc = string;
export declare type JSDocExamples = string[];
export declare type JSDocFires = string[];
export declare type JSDocEmits = string[];
export declare type JSDocImplements = Array<string> | Array<Array<string>>;
export declare type JSDocGenerator = boolean;
export declare type JSDocName = string;
export declare type JSDocReadonly = boolean;
export declare type JSDocReturns = SplitNameWithAnyType[] | {
    types: SplitNameWithAnyType;
    description?: string;
    nullable?: true;
};
export declare type JSDocReturn = SplitNameWithAnyType[] | {
    types: SplitNameWithAnyType;
    description?: string;
    nullable?: true;
};
export declare type JSDocThrows = SplitNameWithAnyType[] | {
    types: SplitNameWithAnyType;
    description?: string;
    nullable?: true;
};
export declare type JSDocSee = Array<string>;
export declare type JSDocType = SplitNameWithAnyType[];
export declare type JSDocScope = "static";