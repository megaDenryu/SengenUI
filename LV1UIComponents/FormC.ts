import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { FormEventType, TypedEventListener } from "../SengenBase/EventTypes";

interface FormOptions {
    action?: string;
    method?: string;
    class?: string[] | string;
    id?: string;
}

/**
 * form要素に対応するLV1UIComponent
 */
export class FormC extends LV1HtmlComponentBase {
    constructor(options?: FormOptions) {
        super();
        
        if (options?.action) {
            this.setAction(options.action);
        }
        
        if (options?.method) {
            this.setMethod(options.method);
        }
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('form');
        return new HtmlElementProxy(element);
    }

    /**
     * フォームアクションURLを設定します
     */
    public setAction(action: string): this {
        (this._dom.element as HTMLFormElement).action = action;
        return this;
    }

    /**
     * フォームメソッドを設定します
     */
    public setMethod(method: string): this {
        (this._dom.element as HTMLFormElement).method = method;
        return this;
    }    /**
     * 型安全なフォーム用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addFormEventListener<T extends FormEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    /**
     * フォーム送信イベントにリスナーを追加します
     */
    public onSubmit(handler: TypedEventListener<'submit'>): this {
        this.addTypedEventListener('submit', handler);
        return this;
    }

    /**
     * フォーム送信前に確認を行うためのリスナーを追加します
     */
    public onReset(handler: TypedEventListener<'reset'>): this {
        this.addTypedEventListener('reset', handler);
        return this;
    }
    
    /**
     * フォームをリセットします
     */
    public reset(): this {
        (this._dom.element as HTMLFormElement).reset();
        return this;
    }
    
    /**
     * フォームを送信します
     */
    public submit(): this {
        (this._dom.element as HTMLFormElement).submit();
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
}
