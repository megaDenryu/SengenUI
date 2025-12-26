import { HtmlElementProxy, ElementCreater } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, ListEventType } from "../SengenBase/EventTypes";

interface UlOptions {
    text?: string;
    class?: string[] | string;
    id?: string;
}

export class UlC extends LV1HtmlComponentBase {
    constructor(options?: UlOptions) {
        super(); 

        this._dom = this.createDomProxy(); 

        if (options?.text) {
            this.setTextContent(options.text);
        }
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }    protected createDomProxy(): HtmlElementProxy {
        const ul = document.createElement('ul');
        return new HtmlElementProxy(ul);
    }

    public setTextContent(text: string): void {
        this.dom.element.textContent = text;
    }

    public setHtmlContent(html: string): void {
        this.dom.element.innerHTML = html;
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

    // Type-safe event handlers for Ul-specific events
    public onListClick(callback: TypedEventListener<'click'>): void {
        this.addTypedEventListener('click', callback);
    }
}