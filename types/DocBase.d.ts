import { DocClass } from "./DocClass";
import { RawDocumentedElement } from "./DocElement";
import { DocEvent } from "./DocEvent";
import { DocInterface } from "./DocInterface";
import { DocMethod } from "./DocMethod";
import { DocParam } from "./DocParam";
import { DocProp } from "./DocProp";
import { DocTypedef } from "./DocTypedef";
export declare enum types {
    CLASS = "class",
    EVENT = "event",
    INTERFACE = "interface",
    METHOD = "method",
    PARAM = "param",
    PROP = "prop",
    TYPEDEF = "typedef"
}
interface typesMapper {
    class: DocClass;
    event: DocEvent;
    interface: DocInterface;
    method: DocMethod;
    param: DocParam;
    prop: DocProp;
    typedef: DocTypedef;
}
export declare type Constr<T> = new (...args: any[]) => T;
export declare type DocParentTypes = DocClass | DocInterface | DocMethod | DocEvent;
export declare type DocAllTypes = DocClass | DocEvent | DocInterface | DocMethod | DocParam | DocProp | DocTypedef;
export declare class DocBase {
    originalJSON: any;
    children: Map<string, DocAllTypes>;
    constructor(json: any);
    addChild(child: DocAllTypes): void;
    adoptAll(enumerable: RawDocumentedElement[], Constructor: Constr<DocAllTypes>): void;
    childrenOfType<t extends keyof typesMapper>(type: t): Array<typesMapper[t]> | null;
    findChild(query: string, exclude?: DocAllTypes[]): DocAllTypes | undefined;
    get classes(): DocClass[] | null;
    get typedefs(): DocTypedef[] | null;
    get interfaces(): DocInterface[] | null;
    get props(): DocProp[] | null;
    get methods(): DocMethod[] | null;
    get events(): DocEvent[] | null;
    get params(): DocParam[] | null;
    static get types(): typeof types;
}