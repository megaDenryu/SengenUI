import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";

interface TFootOptions {
    class?: string[] | string;
    id?: string;
}

/**
 * tfoot（表のフッターグループ）要素に対応するLV1UIComponent
 */
export class TFootC extends LV1HtmlComponentBase {
    constructor(options?: TFootOptions) {
        super();
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('tfoot');
        return new HtmlElementProxy(element);
    }
    
    /**
     * tfoot要素の行数を取得します
     */
    public getRowCount(): number {
        return (this._dom.element as HTMLTableSectionElement).rows.length;
    }
    
    /**
     * テキストコンテンツを設定します
     */
    public setTextContent(text: string): this {
        this._dom.element.textContent = text;
        return this;
    }
    
    /**
     * HTMLコンテンツを設定します
     */
    public setHtmlContent(html: string): this {
        this._dom.element.innerHTML = html;
        return this;
    }
}
