import { DocElement } from "./DocElement";
import { DocProp } from "./DocProp";
import { DocMethod } from "./DocMethod";
import type { Doc } from "./Doc";
import { RawDocumentedInterface } from "./InterfacesForDocElements";
export class DocInterface extends DocElement {
    constructor(doc: Doc, data: RawDocumentedInterface) {
        super(doc, DocElement.types.INTERFACE, data);
        this.adoptAll(data.props, DocProp);
        this.adoptAll(data.methods, DocMethod);
    }
}
