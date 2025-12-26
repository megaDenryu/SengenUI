import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";

interface ThOptions {
    content?: string;
    class?: string[] | string;
    id?: string;
    colSpan?: number;
    rowSpan?: number;
    scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
}

/**
 * th（表の見出しセル）要素に対応するLV1UIComponent
 */
export class ThC extends LV1HtmlComponentBase {
    constructor(options?: ThOptions) {
        super();
        
        if (options?.content) {
            this.setTextContent(options.content);
        }
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        
        if (options?.colSpan) {
            this.setColSpan(options.colSpan);
        }
        
        if (options?.rowSpan) {
            this.setRowSpan(options.rowSpan);
        }
        
        if (options?.scope) {
            this.setScope(options.scope);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('th');
        return new HtmlElementProxy(element);
    }

    /**
     * セルの列スパンを設定します
     */
    public setColSpan(colspan: number): this {
        (this._dom.element as HTMLTableCellElement).colSpan = colspan;
        return this;
    }

    /**
     * セルの行スパンを設定します
     */
    public setRowSpan(rowspan: number): this {
        (this._dom.element as HTMLTableCellElement).rowSpan = rowspan;
        return this;
    }
    
    /**
     * セルのスコープを設定します
     * @param scope 'col'（列の見出し）, 'row'（行の見出し）, 'colgroup'（列グループの見出し）, 'rowgroup'（行グループの見出し）
     */
    public setScope(scope: 'col' | 'row' | 'colgroup' | 'rowgroup'): this {
        (this._dom.element as HTMLTableHeaderCellElement).scope = scope;
        return this;
    }
    
    /**
     * セルのテキストコンテンツを設定します
     */
    public setTextContent(text: string): this {
        this._dom.element.textContent = text;
        return this;
    }

    /**
     * セルのHTMLコンテンツを設定します
     */
    public setHtmlContent(html: string): this {
        this._dom.element.innerHTML = html;
        return this;
    }
    
    /**
     * クリックイベントリスナーを追加します
     */
    public onClick(handler: (event: MouseEvent) => void): this {
        this._dom.element.addEventListener('click', handler);
        return this;
    }
}
