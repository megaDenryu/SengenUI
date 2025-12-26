import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, LabelEventType } from "../SengenBase/EventTypes";

interface LabelOptions {
    text?: string;
    for?: string;
    class?: string[] | string;
    id?: string;
}

export class LabelC extends LV1HtmlComponentBase {
    constructor(options?: LabelOptions) {
        super(); 

        if (options?.text) {
            this.setTextContent(options.text);
        }
        if (options?.for) {
            this.setFor(options.for);
        }
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const label = document.createElement('label');
        return new HtmlElementProxy(label);
    }

    public setTextContent(text: string): this {
        this.dom.element.textContent = text;
        return this;
    }

    public setHtmlContent(html: string): this {
        this.dom.element.innerHTML = html;
        return this;
    }

    public setFor(forValue: string): this {
        (this.dom.element as HTMLLabelElement).htmlFor = forValue;
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
     * 型安全なLabel用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addLabelEventListener<T extends LabelEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    // Type-safe event handlers for Label-specific events
    public onLabelClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }
}