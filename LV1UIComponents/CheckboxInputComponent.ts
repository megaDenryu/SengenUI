import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export interface CheckboxInputOptions {
    value?: string;             // チェックボックスの値
    name?: string;              // グループ名（複数選択の場合）
    id?: string;
    class?: string[] | string;
    checked?: boolean;          // 初期選択状態
    disabled?: boolean;
}

/**
 * チェックボックス専用コンポーネント
 * 型安全性と責務分離を重視した設計
 */
export class CheckboxInputC extends LV1HtmlComponentBase {
    private _value?: string;
    private _name?: string;

    constructor(options?: CheckboxInputOptions) {
        super();
        this._value = options?.value;
        this._name = options?.name;
        
        // 基本プロパティを設定
        if (options) {
            this.setInputAttributes(options);
        }
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        if (options?.checked) {
            this.setChecked(options.checked);
        }
        if (options?.disabled) {
            this.setDisabled(options.disabled);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        input.type = 'checkbox';
        return new HtmlElementProxy(input);
    }

    private setInputAttributes(options: CheckboxInputOptions): void {
        const inputElement = this.dom.element as HTMLInputElement;
        if (options.value) {
            inputElement.value = options.value;
        }
        if (options.name) {
            inputElement.name = options.name;
        }
    }

    /**
     * チェックボックスの選択状態を設定
     */
    public setChecked(checked: boolean): this {
        (this.dom.element as HTMLInputElement).checked = checked;
        return this;
    }

    /**
     * チェックボックスの選択状態を取得
     */
    public isChecked(): boolean {
        return (this.dom.element as HTMLInputElement).checked;
    }

    /**
     * チェックボックスの値を取得
     */
    public getValue(): string | undefined {
        return this._value;
    }

    /**
     * チェックボックスのグループ名を取得
     */
    public getName(): string | undefined {
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

    /**
     * チェック状態を切り替え
     */
    public toggle(): this {
        this.setChecked(!this.isChecked());
        return this;
    }

    // === チェックボックス固有のイベントメソッド ===

    /**
     * 選択状態が変更された時のイベント
     */
    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    /**
     * チェック状態変更時のコールバック（型安全版）
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
     * 型安全なチェックボックス用イベントリスナーを追加
     */
    public addCheckboxEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}