import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";

interface THeadOptions {
    class?: string[] | string;
    id?: string;
}

/**
 * thead（表の見出し行グループ）要素に対応するLV1UIComponent
 */
export class THeadC extends LV1HtmlComponentBase {
    constructor(options?: THeadOptions) {
        super();
        this._dom = this.createDomProxy();
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('thead');
        return new HtmlElementProxy(element);
    }
    
    /**
     * thead要素の行数を取得します
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
