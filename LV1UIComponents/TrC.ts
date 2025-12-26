import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { TypedEventListener, TableCellEventType } from "../SengenBase/EventTypes";

interface TrOptions {
    class?: string[] | string;
    id?: string;
}

/**
 * tr要素に対応するLV1UIComponent
 */
export class TrC extends LV1HtmlComponentBase {
    constructor(options?: TrOptions) {
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
        const element = document.createElement('tr');
        return new HtmlElementProxy(element);
    }

    /**
     * 行のセル数を取得します
     */
    public getCellCount(): number {
        return (this._dom.element as HTMLTableRowElement).cells.length;
    }
    
    /**
     * 行のインデックスを取得します
     */
    public getRowIndex(): number {
        return (this._dom.element as HTMLTableRowElement).rowIndex;
    }
      /**
     * 型安全なTable行用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addTableRowEventListener<T extends TableCellEventType>(
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
