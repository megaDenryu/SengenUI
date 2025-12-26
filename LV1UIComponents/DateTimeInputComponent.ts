import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export type DateTimeInputType = 'date' | 'time' | 'datetime-local' | 'month' | 'week';

export interface DateTimeInputOptions {
    type?: DateTimeInputType;
    value?: string | Date;     // 文字列またはDateオブジェクト
    min?: string | Date;       // 最小日時
    max?: string | Date;       // 最大日時
    step?: number;             // ステップ（秒単位）
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
}

/**
 * 日付・時刻入力専用コンポーネント
 * date, time, datetime-local, month, week タイプに対応
 */
export class DateTimeInputC extends LV1HtmlComponentBase {
    private _type: DateTimeInputType;

    constructor(options: DateTimeInputOptions = {}) {
        super();
        
        this._type = options.type || 'date';
        this.setType(this._type);
        
        if (options.value !== undefined) {
            if (options.value instanceof Date) {
                this.setValueAsDate(options.value);
            } else {
                this.setValue(options.value);
            }
        }
        if (options.min !== undefined) {
            if (options.min instanceof Date) {
                this.setMinAsDate(options.min);
            } else {
                this.setMin(options.min);
            }
        }
        if (options.max !== undefined) {
            if (options.max instanceof Date) {
                this.setMaxAsDate(options.max);
            } else {
                this.setMax(options.max);
            }
        }
        if (options.step !== undefined) {
            this.setStep(options.step);
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
        input.type = 'date';
        return new HtmlElementProxy(input);
    }

    public setType(type: DateTimeInputType): this {
        this._type = type;
        (this.dom.element as HTMLInputElement).type = type;
        return this;
    }

    public getType(): DateTimeInputType {
        return this._type;
    }

    /**
     * 値を文字列で設定（ISO 8601形式推奨）
     */
    public setValue(value: string): this {
        (this.dom.element as HTMLInputElement).value = value;
        return this;
    }

    /**
     * 値を文字列で取得
     */
    public getValue(): string {
        return (this.dom.element as HTMLInputElement).value;
    }

    /**
     * 値をDateオブジェクトで設定
     */
    public setValueAsDate(date: Date): this {
        const formatted = this.formatDateForInput(date);
        (this.dom.element as HTMLInputElement).value = formatted;
        return this;
    }

    /**
     * 値をDateオブジェクトで取得
     */
    public getValueAsDate(): Date | null {
        const value = (this.dom.element as HTMLInputElement).value;
        if (!value) return null;
        return new Date(value);
    }

    /**
     * 最小値を設定
     */
    public setMin(min: string): this {
        (this.dom.element as HTMLInputElement).min = min;
        return this;
    }

    /**
     * 最小値をDateオブジェクトで設定
     */
    public setMinAsDate(date: Date): this {
        const formatted = this.formatDateForInput(date);
        (this.dom.element as HTMLInputElement).min = formatted;
        return this;
    }

    /**
     * 最大値を設定
     */
    public setMax(max: string): this {
        (this.dom.element as HTMLInputElement).max = max;
        return this;
    }

    /**
     * 最大値をDateオブジェクトで設定
     */
    public setMaxAsDate(date: Date): this {
        const formatted = this.formatDateForInput(date);
        (this.dom.element as HTMLInputElement).max = formatted;
        return this;
    }

    /**
     * ステップを設定（秒単位）
     */
    public setStep(step: number): this {
        (this.dom.element as HTMLInputElement).step = String(step);
        return this;
    }

    /**
     * 最小値を取得
     */
    public getMin(): string {
        return (this.dom.element as HTMLInputElement).min;
    }

    /**
     * 最大値を取得
     */
    public getMax(): string {
        return (this.dom.element as HTMLInputElement).max;
    }

    /**
     * ステップを取得
     */
    public getStep(): number {
        return Number((this.dom.element as HTMLInputElement).step);
    }

    /**
     * DateオブジェクトをInput用の文字列にフォーマット
     */
    private formatDateForInput(date: Date): string {
        switch (this._type) {
            case 'date':
                return date.toISOString().split('T')[0]; // YYYY-MM-DD
            case 'time':
                return date.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
            case 'datetime-local':
                return date.toISOString().substring(0, 16); // YYYY-MM-DDTHH:MM
            case 'month':
                return date.toISOString().substring(0, 7); // YYYY-MM
            case 'week':
                return this.getWeekString(date); // YYYY-Www
            default:
                return date.toISOString();
        }
    }

    /**
     * DateオブジェクトからISO週番号文字列を生成
     */
    private getWeekString(date: Date): string {
        const year = date.getFullYear();
        const firstDayOfYear = new Date(year, 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        return `${year}-W${String(weekNumber).padStart(2, '0')}`;
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

    // === 日付・時刻入力固有のイベントメソッド ===

    /**
     * 値が変更された時のイベント
     */
    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
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
     * 日付変更時のコールバック（型安全版・文字列）
     */
    public onDateChange(callback: (value: string) => void): this {
        this.addTypedEventListener('change', () => {
            callback(this.getValue());
        });
        return this;
    }

    /**
     * 日付変更時のコールバック（型安全版・Dateオブジェクト）
     */
    public onDateChangeAsDate(callback: (date: Date | null) => void): this {
        this.addTypedEventListener('change', () => {
            callback(this.getValueAsDate());
        });
        return this;
    }

    /**
     * 型安全な日付・時刻入力用イベントリスナーを追加
     */
    public addDateTimeInputEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}
