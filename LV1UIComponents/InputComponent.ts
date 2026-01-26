import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

/**
 * ==================================================================================
 * 【重要】InputComponent 使用ガイド
 * ==================================================================================
 * 
 * このInputCは汎用的なinput要素のラッパーですが、型安全性と責務分離のため、
 * 以下の専用コンポーネントの使用を強く推奨します：
 * 
 * 📝 テキスト入力系:
 *    - TextInputC (TextInputComponent.ts)
 *      対応タイプ: text, password, email, url, tel, search
 *      用途: 一般的なテキスト入力、パスワード、メールアドレスなど
 * 
 * 🔢 数値入力系:
 *    - NumberInputC (NumberInputComponent.ts)
 *      対応タイプ: number, range
 *      用途: 数値入力、スライダー（min/max/step制御）
 * 
 * 📅 日付・時刻入力系:
 *    - DateTimeInputC (DateTimeInputComponent.ts)
 *      対応タイプ: date, time, datetime-local, month, week
 *      用途: カレンダー、スケジュール、日時選択（Date型変換サポート）
 * 
 * 🎨 カラー入力系:
 *    - ColorInputC (ColorInputComponent.ts)
 *      対応タイプ: color
 *      用途: カラーピッカー、テーマ設定（HEX/RGB/HSL形式サポート）
 * 
 * ☑️ 選択入力系:
 *    - CheckboxInputC (CheckboxInputComponent.ts)
 *      対応タイプ: checkbox
 *      用途: チェックボックス（単一/複数選択）
 * 
 *    - RadioInputC (RadioInputComponent.ts)
 *      対応タイプ: radio
 *      用途: ラジオボタン（グループ内単一選択）
 * 
 *    - FileInputC (FileInputComponent.ts)
 *      対応タイプ: file
 *      用途: ファイル選択（単一/複数、フィルター設定）
 * 
 * 🔒 特殊入力系:
 *    - HiddenInputC (HiddenInputComponent.ts)
 *      対応タイプ: hidden
 *      用途: フォームデータの非表示保持（JSON変換サポート）
 * 
 * ==================================================================================
 * 専用コンポーネントを使用する理由:
 * 1. 型安全性: 各入力タイプ専用のメソッドとプロパティ
 * 2. 可読性: 用途が明確で、コードの意図が伝わりやすい
 * 3. メンテナンス性: 変更の影響範囲が限定的
 * 4. AIサポート: IDEの補完機能が効果的に働く
 * ==================================================================================
 * 
 * ⚠️ このInputCを使用すべき場合:
 * - レガシーコードとの互換性が必要な場合
 * - 動的にtypeを変更する特殊なケース
 * - 上記の専用コンポーネントで対応していない特殊な用途
 * 
 * 💡 今後の拡張候補:
 * - ButtonInputC (button, submit, reset) - フォーム統合が必要な場合
 * ==================================================================================
 */

export type TextInputType = 'text' | 'password' | 'email' | 'url' | 'tel' | 'search';
export type NumberInputType = 'number' | 'range';
export type DateInputType = 'date' | 'time' | 'datetime-local' | 'month' | 'week';
export type SelectionInputType = 'checkbox' | 'radio' | 'file';
export type ButtonInputType = 'button' | 'submit' | 'reset';
export type OtherInputType = 'hidden' | 'color';

export type InputType = 
  | TextInputType 
  | NumberInputType 
  | DateInputType 
  | SelectionInputType 
  | ButtonInputType 
  | OtherInputType;

export interface InputOptions {
    type?: InputType;
    value?: string;
    placeholder?: string;
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
    inputMode?: HTMLInputElement['inputMode'];
}

export interface RangeParameters {
    min?: number;
    max?: number;
    step?: number;
}

export class InputC extends LV1HtmlComponentBase {
    constructor(options?: InputOptions) {
        super(); 
        if (options?.type) {
            this.setType(options.type);
        }
        if (options?.value) {
            this.setValue(options.value);
        }
        if (options?.placeholder) {
            this.setPlaceholder(options.placeholder);
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
        if (options?.inputMode) {
            this.setInputMode(options.inputMode);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        return new HtmlElementProxy(input);
    }

    public setType(type: string): this {
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

    private setMin(min: string): this {
        (this.dom.element as HTMLInputElement).min = min;
        return this;
    }

    private setMax(max: string): this {
        (this.dom.element as HTMLInputElement).max = max;
        return this;
    }

    private setStep(step: string): this {
        (this.dom.element as HTMLInputElement).step = step;
        return this;
    }

    public setRangeParam(parameters: RangeParameters): this {
        if (parameters.min) this.setMin(String(parameters.min));
        if (parameters.max) this.setMax(String(parameters.max));
        if (parameters.step) this.setStep(String(parameters.step));
        return this;
    }

    public getRangeParam(): RangeParameters {
        const inputElement = this.dom.element as HTMLInputElement;
        return {
            min: Number(inputElement.min),
            max: Number(inputElement.max),
            step: Number(inputElement.step)
        };
    }

    /**
     * pattern は HTMLInputElement インターフェイスのプロパティで、空ではない <input> の値が一致すべき正規表現を表します。これは、<input> 要素の pattern 属性を反映します。
     * pattern プロパティは、text、search、url、tel、email、passwordの型で有効です。これは、入力フィールドの value が制約検証を通過するために一致する必要がある正規表現を定義します。
     */
    public setPattern(pattern: string): this {
        (this.dom.element as HTMLInputElement).pattern = pattern;
        return this;
    }

    public setPlaceholder(placeholder: string): this {
        (this.dom.element as HTMLInputElement).placeholder = placeholder;
        return this;
    }

    public setMaxLength(length: number): this {
        (this.dom.element as HTMLInputElement).maxLength = length;
        return this;
    }

    public setInputMode(mode: HTMLInputElement['inputMode']): this {
        (this.dom.element as HTMLInputElement).inputMode = mode;
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
        (this.dom.element as HTMLInputElement).disabled = disabled;
        return this;
    }

    // === Input固有のイベントメソッド ===

    /**
     * 型安全なインプット用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addInputEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    /**
     * 入力値が変更された時のイベント（リアルタイム）
     */
    public onInput(callback: TypedEventListener<'input'>): this {
        this.addTypedEventListener('input', callback);
        return this;
    }

    /**
     * 入力値が確定された時のイベント（フォーカスが外れた時など）
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
     * 入力フィールドにフォーカスを当てる
     */
    public focus(): this {
        (this.dom.element as HTMLInputElement).focus();
        return this;
    }

    /**
     * 入力フィールドのテキストを全選択する
     */
    public selectAll(): this {
        (this.dom.element as HTMLInputElement).select();
        return this;
    }

    /**
     * エンターキーヒントを設定する
     */
    public setEnterKeyHint(hint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'): this {
        (this.dom.element as HTMLInputElement).enterKeyHint = hint;
        return this;
    }    
}