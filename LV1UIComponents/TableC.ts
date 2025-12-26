import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { TypedEventListener, TableEventType } from "../SengenBase/EventTypes";

interface TableOptions {
    class?: string[] | string;
    id?: string;
    border?: string;
    cellPadding?: string;
    cellSpacing?: string;
    width?: string;
}

/**
 * table要素に対応するLV1UIComponent
 */
export class TableC extends LV1HtmlComponentBase {
    constructor(options?: TableOptions) {
        super();
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        
        if (options?.border) {
            this.setBorder(options.border);
        }
        
        if (options?.cellPadding) {
            this.setCellPadding(options.cellPadding);
        }
        
        if (options?.cellSpacing) {
            this.setCellSpacing(options.cellSpacing);
        }
        
        if (options?.width) {
            this.setWidth(options.width);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('table');
        return new HtmlElementProxy(element);
    }

    /**
     * テーブルの境界線を設定します
     */
    public setBorder(border: string): this {
        (this._dom.element as HTMLTableElement).border = border;
        return this;
    }

    /**
     * セル間の余白を設定します
     */
    public setCellPadding(padding: string): this {
        (this._dom.element as HTMLTableElement).cellPadding = padding;
        return this;
    }

    /**
     * セル間のスペースを設定します
     */
    public setCellSpacing(spacing: string): this {
        (this._dom.element as HTMLTableElement).cellSpacing = spacing;
        return this;
    }

    /**
     * テーブルの幅を設定します
     */
    public setWidth(width: string): this {
        (this._dom.element as HTMLTableElement).style.width = width;
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

    /**
     * 型安全なTable用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addTableEventListener<T extends TableEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    /**
     * テーブルがクリックされたときのイベントリスナーを追加します
     */
    public onTableClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }
}
