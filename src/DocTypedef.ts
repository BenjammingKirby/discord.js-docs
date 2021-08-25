import type { Doc } from "./Doc";
import { DocElement } from "./DocElement";
import { RawDocumentedTypeDef } from "./InterfacesForDocElements";

export class DocTypedef extends DocElement {
    constructor(doc: Doc, data: RawDocumentedTypeDef) {
        super(doc, DocElement.types.TYPEDEF, data);
        this.type = (Array.isArray(data.type) ? data.type : data.type?.types)?.flat(5) || null;
    }
}
