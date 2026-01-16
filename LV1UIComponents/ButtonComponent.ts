import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";

export interface ButtonOptions {
    text?: string;
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
}

export class ButtonC extends LV1HtmlComponentBase {
    constructor(options?: ButtonOptions) {
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
        if (options?.disabled) {
            this.setDisabled(options.disabled);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const button = document.createElement('button');
        return new HtmlElementProxy(button);
    }

    public setTextContent(text: string): this {
        this.dom.element.textContent = text;
        return this;
    }

    public getTextContent(): string {
        return this.dom.element.textContent ?? "";
    }

    /**
     * ボタンのテキストの先頭にテキストを追加
     * 主に絵文字やアイコンの挿入に使用
     */
    public prependText(text: string): this {
        const currentText = this.dom.element.textContent ?? "";
        this.dom.element.textContent = text + currentText;
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

    public setDisabled(disabled: boolean): this {
        (this.dom.element as HTMLButtonElement).disabled = disabled;
        return this;
    }

    public setOptions(options: ButtonOptions): this {
        if (options.text !== undefined) {
            this.setTextContent(options.text);
        }
        if (options.class !== undefined) {
            this.addClass(options.class);
        }
        if (options.id !== undefined) {
            this.dom.element.id = options.id;
        }
        if (options.disabled !== undefined) {
            this.setDisabled(options.disabled);
        }
        return this;
    }

}