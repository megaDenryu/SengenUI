import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, SpanEventType } from "../SengenBase/EventTypes";

interface SpanOptions {
    text?: string;
    class?: string[] | string;
    id?: string;
}

export class SpanC extends LV1HtmlComponentBase {
    constructor(options?: SpanOptions) {
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
        const span = document.createElement('span');
        return new HtmlElementProxy(span);
    }    
    
    public setTextContent(text: string): this {
        this.dom.element.textContent = text;
        return this;
    }

    public getTextContent(): string {
        return this.dom.element.textContent ?? "";
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
     * 型安全なSpan用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addSpanEventListener<T extends SpanEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }    // Type-safe event handlers for Span-specific events
    public onSpanClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }
}