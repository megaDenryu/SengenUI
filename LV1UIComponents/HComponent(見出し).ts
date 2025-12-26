import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, HeadingEventType } from "../SengenBase/EventTypes";

interface HOptions {
    text?: string;
    class?: string[] | string;
    id?: string;
}


export abstract class HC extends LV1HtmlComponentBase {
    constructor(options?: HOptions) {
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
    protected abstract createDomProxy(): HtmlElementProxy;

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
     * 型安全な見出し用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addHeadingEventListener<T extends HeadingEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    // Type-safe event handlers for Heading-specific events
    public onHeadingClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }
}

export class H1C extends HC {
    constructor(options?: HOptions) {
        super(options);
    }
    protected createDomProxy(): HtmlElementProxy {
        const h1 = document.createElement('h1');
        return new HtmlElementProxy(h1);
    }
}

export class H2C extends HC {
    constructor(options?: HOptions) {
        super(options);
    }
    protected createDomProxy(): HtmlElementProxy {
        const h2 = document.createElement('h2');
        return new HtmlElementProxy(h2);
    }
}

export class H3C extends HC {
    constructor(options?: HOptions) {
        super(options);
    }
    protected createDomProxy(): HtmlElementProxy {
        const h3 = document.createElement('h3');
        return new HtmlElementProxy(h3);
    }
}

export class H4C extends HC {
    constructor(options?: HOptions) {
        super(options);
    }
    protected createDomProxy(): HtmlElementProxy {
        const h4 = document.createElement('h4');
        return new HtmlElementProxy(h4);
    }
}

export class H5C extends HC {
    constructor(options?: HOptions) {
        super(options);
    }
    protected createDomProxy(): HtmlElementProxy {
        const h5 = document.createElement('h5');
        return new HtmlElementProxy(h5);
    }
}

export class H6C extends HC {
    constructor(options?: HOptions) {
        super(options);
    }
    protected createDomProxy(): HtmlElementProxy {
        const h6 = document.createElement('h6');
        return new HtmlElementProxy(h6);
    }
}

