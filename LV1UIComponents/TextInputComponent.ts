import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export type TextInputType = 'text' | 'password' | 'email' | 'url' | 'tel' | 'search';

export interface TextInputOptions {
    type?: TextInputType;
    value?: string;
    placeholder?: string;
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
    pattern?: string;           // 正規表現パターン
    maxLength?: number;         // 最大文字数
    inputMode?: HTMLInputElement['inputMode'];
}

/**
 * テキスト入力専用コンポーネント
 * text, password, email, url, tel, search タイプに対応
 */
export class TextInputC extends LV1HtmlComponentBase {
    constructor(options: TextInputOptions = {}) {
        super();
        
        if (options.type) {
            this.setType(options.type);
        }
        if (options.value) {
            this.setValue(options.value);
        }
        if (options.placeholder) {
            this.setPlaceholder(options.placeholder);
        }
        if (options.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options.id) {
            this.dom.element.id = options.id;
        }
        if (options.disabled) {
            this.setDisabled(options.disabled);
        }
        if (options.pattern) {
            this.setPattern(options.pattern);
        }
        if (options.maxLength !== undefined) {
            this.setMaxLength(options.maxLength);
        }
        if (options.inputMode) {
            this.setInputMode(options.inputMode);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        input.type = 'text';
        return new HtmlElementProxy(input);
    }

    public setType(type: TextInputType): this {
        (this.dom.element as HTMLInputElement).type = type;
        return this;
    }

    public setValue(value: string): this {
        (this.dom.element as HTMLInputElement).value = value;
        return this;
    }

    public getValue(): string {
        return (this.dom.element as HTMLInputElement).value;
    }

    public setPlaceholder(placeholder: string): this {
        (this.dom.element as HTMLInputElement).placeholder = placeholder;
        return this;
    }

    /**
     * 正規表現パターンを設定
     * text, search, url, tel, email, password タイプで有効
     */
    public setPattern(pattern: string): this {
        (this.dom.element as HTMLInputElement).pattern = pattern;
        return this;
    }

    /**
     * 最大文字数を設定
     */
    public setMaxLength(maxLength: number): this {
        (this.dom.element as HTMLInputElement).maxLength = maxLength;
        return this;
    }

    /**
     * 入力モードを設定（モバイルキーボード最適化）
     */
    public setInputMode(mode: HTMLInputElement['inputMode']): this {
        (this.dom.element as HTMLInputElement).inputMode = mode;
        return this;
    }

    public setDisabled(disabled: boolean): this {
        (this.dom.element as HTMLInputElement).disabled = disabled;
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

    public focus(): this {
        (this.dom.element as HTMLInputElement).focus();
        return this;
    }

    // === テキスト入力固有のイベントメソッド ===

    /**
     * 入力値が変更された時のイベント（リアルタイム）
     */
    public onInput(callback: TypedEventListener<'input'>): this {
        this.addTypedEventListener('input', callback);
        return this;
    }

    /**
     * 入力値が確定された時のイベント
     */
    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    /**
     * Enterキーが押された時の便利メソッド
     */
    public onEnterKey(callback: () => void): this {
        this.onKeyDown((event) => {
            if (event.key === 'Enter') {
                callback();
            }
        });
        return this;
    }

    /**
     * エンターキーヒントを設定
     */
    public setEnterKeyHint(hint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'): this {
        (this.dom.element as HTMLInputElement).enterKeyHint = hint;
        return this;
    }

    /**
     * 型安全なテキスト入力用イベントリスナーを追加
     */
    public addTextInputEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}
