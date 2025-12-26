import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";

interface BrOptions {
    class?: string[] | string;
    id?: string;
}

/**
 * br（改行）要素に対応するLV1UIComponent
 */
export class BrC extends LV1HtmlComponentBase {
    constructor(options?: BrOptions) {
        super();
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('br');
        return new HtmlElementProxy(element);
    }
}
