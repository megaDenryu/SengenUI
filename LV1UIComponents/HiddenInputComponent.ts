import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";

export interface HiddenInputOptions {
    name?: string;             // フォーム送信時のキー名
    value?: string;            // 初期値
    id?: string;
}

/**
 * 非表示入力専用コンポーネント
 * hidden タイプに対応
 * フォームデータの非表示保持に使用
 */
export class HiddenInputC extends LV1HtmlComponentBase {
    private _name?: string;

    constructor(options: HiddenInputOptions = {}) {
        super();
        
        this._name = options.name;
        
        if (options.name) {
            this.setName(options.name);
        }
        if (options.value !== undefined) {
            this.setValue(options.value);
        }
        if (options.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        input.type = 'hidden';
        return new HtmlElementProxy(input);
    }

    /**
     * name属性を設定（フォーム送信時のキー名）
     */
    public setName(name: string): this {
        this._name = name;
        (this.dom.element as HTMLInputElement).name = name;
        return this;
    }

    /**
     * name属性を取得
     */
    public getName(): string | undefined {
        return this._name;
    }

    /**
     * 値を設定
     */
    public setValue(value: string): this {
        (this.dom.element as HTMLInputElement).value = value;
        return this;
    }

    /**
     * 値を取得
     */
    public getValue(): string {
        return (this.dom.element as HTMLInputElement).value;
    }

    /**
     * 数値として値を設定
     */
    public setValueAsNumber(value: number): this {
        this.setValue(String(value));
        return this;
    }

    /**
     * 数値として値を取得
     */
    public getValueAsNumber(): number {
        return Number(this.getValue());
    }

    /**
     * JSONオブジェクトとして値を設定
     */
    public setValueAsJSON(obj: any): this {
        this.setValue(JSON.stringify(obj));
        return this;
    }

    /**
     * JSONオブジェクトとして値を取得
     */
    public getValueAsJSON<T = any>(): T | null {
        try {
            return JSON.parse(this.getValue()) as T;
        } catch {
            return null;
        }
    }

    /**
     * 値をクリア
     */
    public clear(): this {
        this.setValue('');
        return this;
    }

    // 注: HiddenInputはUIに表示されないため、イベントメソッドは基本的に不要
    // ただし、プログラマティックに値を変更した際に通知したい場合は以下を使用可能

    /**
     * 値変更時の通知用（プログラマティックな変更を検知したい場合）
     */
    public notifyChange(): this {
        const event = new Event('change', { bubbles: true });
        this.dom.element.dispatchEvent(event);
        return this;
    }
}
