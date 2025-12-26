import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TextAreaEventType, TypedEventListener } from "../SengenBase/EventTypes";

interface TextAreaOptions {
    value?: string;
    placeholder?: string;
    rows?: number;
    cols?: number;
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
    readonly?: boolean;
}

export class TextAreaC extends LV1HtmlComponentBase {
    constructor(options?: TextAreaOptions) {
        super(); 

        if (options?.value) {
            this.setValue(options.value);
        }
        if (options?.placeholder) {
            this.setPlaceholder(options.placeholder);
        }
        if (options?.rows) {
            this.setRows(options.rows);
        }
        if (options?.cols) {
            this.setCols(options.cols);
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
        if (options?.readonly) {
            this.setReadonly(options.readonly);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const textarea = document.createElement('textarea');
        return new HtmlElementProxy(textarea);
    }

    public setValue(value: string): this {
        (this.dom.element as HTMLTextAreaElement).value = value;
        return this;
    }

    public getValue(): string {
        return (this.dom.element as HTMLTextAreaElement).value;
    }

    public setPlaceholder(placeholder: string): this {
        (this.dom.element as HTMLTextAreaElement).placeholder = placeholder;
        return this;
    }

    public setRows(rows: number): this {
        (this.dom.element as HTMLTextAreaElement).rows = rows;
        return this;
    }

    public setCols(cols: number): this {
        (this.dom.element as HTMLTextAreaElement).cols = cols;
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
        (this.dom.element as HTMLTextAreaElement).disabled = disabled;
        return this;
    }

    public setReadonly(readonly: boolean): this {
        (this.dom.element as HTMLTextAreaElement).readOnly = readonly;
        return this;
    }

    public focus(): this {
        (this.dom.element as HTMLTextAreaElement).focus();
        return this;
    }

    // === TextArea固有のイベントメソッド ===

    /**
     * 型安全なテキストエリア用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addTextAreaEventListener<T extends TextAreaEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}