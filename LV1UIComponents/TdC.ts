import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { TypedEventListener, TableCellEventType } from "../SengenBase/EventTypes";

interface TdOptions {
    content?: string;
    class?: string[] | string;
    id?: string;
    colSpan?: number;
    rowSpan?: number;
}

/**
 * td要素に対応するLV1UIComponent
 */
export class TdC extends LV1HtmlComponentBase {
    constructor(options?: TdOptions) {
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
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('td');
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
     * 型安全なTableセル用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addTableCellEventListener<T extends TableCellEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    /**
     * クリックイベントリスナーを追加します
     */
    public onClick(handler: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', handler);
        return this;
    }
}
