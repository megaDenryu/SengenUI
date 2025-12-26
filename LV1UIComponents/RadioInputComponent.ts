import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export interface RadioInputOptions {
    value: string;              // ラジオボタンの値（必須）
    name: string;               // ラジオグループ名（必須）
    id?: string;
    class?: string[] | string;
    checked?: boolean;          // 初期選択状態
    disabled?: boolean;
}

/**
 * ラジオボタン専用コンポーネント
 * 型安全性と責務分離を重視した設計
 */
export class RadioInputC extends LV1HtmlComponentBase {
    private _value: string;
    private _name: string;

    constructor(options: RadioInputOptions) {
        super();
        this._value = options.value;
        this._name = options.name;
        
        // 基本プロパティを設定
        this.setInputAttributes(options);
        
        if (options.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options.id) {
            this.dom.element.id = options.id;
        }
        if (options.checked) {
            this.setChecked(options.checked);
        }
        if (options.disabled) {
            this.setDisabled(options.disabled);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        input.type = 'radio';
        return new HtmlElementProxy(input);
    }

    private setInputAttributes(options: RadioInputOptions): void {
        const inputElement = this.dom.element as HTMLInputElement;
        inputElement.value = options.value;
        inputElement.name = options.name;
    }

    /**
     * ラジオボタンの選択状態を設定
     */
    public setChecked(checked: boolean): this {
        (this.dom.element as HTMLInputElement).checked = checked;
        return this;
    }

    /**
     * ラジオボタンの選択状態を取得
     */
    public isChecked(): boolean {
        return (this.dom.element as HTMLInputElement).checked;
    }

    /**
     * ラジオボタンの値を取得
     */
    public getValue(): string {
        return this._value;
    }

    /**
     * ラジオボタンのグループ名を取得
     */
    public getName(): string {
        return this._name;
    }

    /**
     * 無効/有効状態を設定
     */
    public setDisabled(disabled: boolean): this {
        (this.dom.element as HTMLInputElement).disabled = disabled;
        return this;
    }

    /**
     * CSSクラスを追加
     */
    public addClass(className: string | string[]): this {
        this.dom.addCSSClass(className);
        return this;
    }

    /**
     * CSSクラスを削除
     */
    public removeClass(className: string | string[]): this {
        this.dom.removeCSSClass(className);
        return this;
    }

    // === ラジオボタン固有のイベントメソッド ===

    /**
     * 選択状態が変更された時のイベント
     */
    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    /**
     * 選択状態変更時のコールバック（型安全版）
     */
    public onCheckChange(callback: (checked: boolean) => void): this {
        this.addTypedEventListener('change', () => {
            callback(this.isChecked());
        });
        return this;
    }

    /**
     * クリックされた時のイベント
     */
    public onClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }

    /**
     * フォーカスを当てる
     */
    public focus(): this {
        (this.dom.element as HTMLInputElement).focus();
        return this;
    }

    /**
     * 型安全なラジオボタン用イベントリスナーを追加
     */
    public addRadioEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}