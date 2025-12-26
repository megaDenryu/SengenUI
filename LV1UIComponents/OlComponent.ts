import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { TypedEventListener, ListEventType } from "../SengenBase/EventTypes";

interface OlOptions {
    class?: string[] | string;
    id?: string;
    start?: number;
    reversed?: boolean;
    type?: 'a' | 'A' | 'i' | 'I' | '1';
}

/**
 * ol（順序付きリスト）要素に対応するLV1UIComponent
 */
export class OlC extends LV1HtmlComponentBase {
    constructor(options?: OlOptions) {
        super();
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        
        if (options?.start !== undefined) {
            this.setStart(options.start);
        }
        
        if (options?.reversed !== undefined) {
            this.setReversed(options.reversed);
        }
        
        if (options?.type) {
            this.setType(options.type);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('ol');
        return new HtmlElementProxy(element);
    }

    /**
     * リストの開始番号を設定します
     */
    public setStart(start: number): this {
        (this._dom.element as HTMLOListElement).start = start;
        return this;
    }

    /**
     * リストを逆順にするかどうかを設定します
     */
    public setReversed(reversed: boolean): this {
        (this._dom.element as HTMLOListElement).reversed = reversed;
        return this;
    }

    /**
     * リストのマーカーの種類を設定します
     * @param type 'a'（小文字アルファベット）, 'A'（大文字アルファベット）, 'i'（小文字ローマ数字）, 'I'（大文字ローマ数字）, '1'（数字）
     */
    public setType(type: 'a' | 'A' | 'i' | 'I' | '1'): this {
        (this._dom.element as HTMLOListElement).type = type;
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
     */    public setHtmlContent(html: string): this {
        this._dom.element.innerHTML = html;
        return this;
    }

    /**
     * 型安全なリスト用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addListEventListener<T extends ListEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    /**
     * リストがクリックされたときのイベントリスナーを追加します
     */
    public onListClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }
}
