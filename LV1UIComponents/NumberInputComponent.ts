import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export type NumberInputType = 'number' | 'range';

export interface NumberInputOptions {
    type?: NumberInputType;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
}

/**
 * 数値入力専用コンポーネント
 * number, range タイプに対応
 */
export class NumberInputC extends LV1HtmlComponentBase {
    constructor(options: NumberInputOptions = {}) {
        super();
        
        const inputType = options.type || 'number';
        this.setType(inputType);
        
        if (options.value !== undefined) {
            this.setValue(options.value);
        }
        if (options.min !== undefined) {
            this.setMin(options.min);
        }
        if (options.max !== undefined) {
            this.setMax(options.max);
        }
        if (options.step !== undefined) {
            this.setStep(options.step);
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
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        input.type = 'number';
        return new HtmlElementProxy(input);
    }

    public setType(type: NumberInputType): this {
        (this.dom.element as HTMLInputElement).type = type;
        return this;
    }

    public setValue(value: number): this {
        (this.dom.element as HTMLInputElement).value = String(value);
        return this;
    }

    public getValue(): number {
        return Number((this.dom.element as HTMLInputElement).value);
    }

    public getValueAsString(): string {
        return (this.dom.element as HTMLInputElement).value;
    }

    public setMin(min: number): this {
        (this.dom.element as HTMLInputElement).min = String(min);
        return this;
    }

    public setMax(max: number): this {
        (this.dom.element as HTMLInputElement).max = String(max);
        return this;
    }

    public setStep(step: number): this {
        (this.dom.element as HTMLInputElement).step = String(step);
        return this;
    }

    public getMin(): number {
        return Number((this.dom.element as HTMLInputElement).min);
    }

    public getMax(): number {
        return Number((this.dom.element as HTMLInputElement).max);
    }

    public getStep(): number {
        return Number((this.dom.element as HTMLInputElement).step);
    }

    public setPlaceholder(placeholder: string): this {
        (this.dom.element as HTMLInputElement).placeholder = placeholder;
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

    // === 数値入力固有のイベントメソッド ===

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
     * 数値変更時のコールバック（型安全版）
     */
    public onValueChange(callback: (value: number) => void): this {
        this.addTypedEventListener('input', () => {
            callback(this.getValue());
        });
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
     * 型安全な数値入力用イベントリスナーを追加
     */
    public addNumberInputEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}
