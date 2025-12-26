import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, ParagraphEventType } from "../SengenBase/EventTypes";

interface POptions {
    text?: string;
    class?: string[] | string;
    id?: string;
}

export class PC extends LV1HtmlComponentBase {
    constructor(options?: POptions) {
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
        const p = document.createElement('p');
        return new HtmlElementProxy(p);
    }

    public setTextContent(text: string): void {
        this.dom.element.textContent = text;
    }

    public setHtmlContent(html: string): void {
        this.dom.element.innerHTML = html;
    }

    /**
     * 型安全な段落用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addParagraphEventListener<T extends ParagraphEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    // Type-safe event handlers for Paragraph-specific events
    public onParagraphClick(callback: TypedEventListener<'click'>): void {
        this.addTypedEventListener('click', callback);
    }
}