import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, ListEventType } from "../SengenBase/EventTypes";

interface LiOptions {
    text?: string;
    class?: string[] | string;
    id?: string;
}

export class LiC extends LV1HtmlComponentBase {
    constructor(options?: LiOptions) {
        super(); 

        if (options?.text) {
            this.setTextContent(options.text);
        }
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const li = document.createElement('li');
        return new HtmlElementProxy(li);
    }

    public setTextContent(text: string): this {
        this.dom.element.textContent = text;
        return this;
    }

    public setHtmlContent(html: string): this {
        this.dom.element.innerHTML = html;
        return this;
    }

    public addClass(className: string | string[]): this {
        this.dom.addCSSClass(className);
        return this;
    }
    
    public removeClass(className: string | string[]): this {
        this.dom.removeCSSClass(className);
        return this;
    }

    /**
     * 型安全なリストアイテム用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addListItemEventListener<T extends ListEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    // Type-safe event handlers for Li-specific events
    public onListItemClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }
}