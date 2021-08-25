import { DocElement } from "./DocElement";
import { DocProp } from "./DocProp";
import { DocMethod } from "./DocMethod";
import { DocEvent } from "./DocEvent";
import type { Doc } from "./Doc";
import { RawDocumentedClass, RawDocumentedConstructor } from "./InterfacesForDocElements";
export class DocClass extends DocElement {
    public construct: RawDocumentedConstructor;
    constructor(doc: Doc, data: RawDocumentedClass) {
        super(doc, DocElement.types.CLASS, data);
        this.extends = data.extends || null;
        this.implements = data.implements || null;
        this.construct = data.construct;

        this.adoptAll(data.props, DocProp);
        this.adoptAll(data.methods, DocMethod);
        this.adoptAll(data.events, DocEvent);
    }
}
