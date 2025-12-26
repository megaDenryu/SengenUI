import { HtmlElementProxy, ElementCreater } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { DivEventType, TypedEventListener } from "../SengenBase/EventTypes";

export interface DivOptions {
    text?: string;
    class?: string[] | string;
    id?: string;
}

export class DivC extends LV1HtmlComponentBase {
    constructor(options?: DivOptions) {
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
        const div = ElementCreater.createDivElement(); // ElementCreaterに createDivElement があると仮定
        return new HtmlElementProxy(div);
    }    
    public setTextContent(text: string): this {
        this.dom.element.textContent = text;
        return this;
    }

    public setHtmlContent(html: string): this {
        this.dom.element.innerHTML = html;
        return this;
    }

    // === Div固有のイベントメソッド ===

    /**
     * 型安全なDiv用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addDivEventListener<T extends DivEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    /**
     * スクロールイベント（Div要素特有）
     */
    public onScroll(callback: TypedEventListener<'scroll'>): this {
        this.addTypedEventListener('scroll', callback);
        return this;
    }

    /**
     * クリックイベント（一度だけ実行される）
     * @param callback イベントハンドラー
     */
    public onceClick(callback: TypedEventListener<'click'>): this {
        const wrapper = (event: Event) => {
            callback(event as MouseEvent);
            this.dom.element.removeEventListener('click', wrapper);
        };
        this.dom.element.addEventListener('click', wrapper);
        return this;
    }
}