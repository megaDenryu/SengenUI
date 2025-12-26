import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, AnchorEventType } from "../SengenBase/EventTypes";

interface AOptions {
    text?: string;
    href?: string;
    target?: string;
    class?: string[] | string;
    id?: string;
}

export class AC extends LV1HtmlComponentBase {
    constructor(options?: AOptions) {
        super(); 

        if (options?.text) {
            this.setTextContent(options.text);
        }
        if (options?.href) {
            this.setHref(options.href);
        }
        if (options?.target) {
            this.setTarget(options.target);
        }
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const a = document.createElement('a');
        return new HtmlElementProxy(a);
    }

    public setTextContent(text: string): this {
        this.dom.element.textContent = text;
        return this;
    }

    public setHtmlContent(html: string): this {
        this.dom.element.innerHTML = html;
        return this;
    }

    public setHref(href: string): this {
        (this.dom.element as HTMLAnchorElement).href = href;
        return this;
    }

    public setTarget(target: string): this {
        (this.dom.element as HTMLAnchorElement).target = target;
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
     * 型安全なアンカー用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addAnchorEventListener<T extends AnchorEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    // Type-safe event handlers for Anchor-specific events
    public onAnchorClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }
}