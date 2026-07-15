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
    spellcheck?: boolean;
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
        if (options?.spellcheck !== undefined) {
            this.setSpellcheck(options.spellcheck);
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

    public setSpellcheck(spellcheck: boolean): this {
        (this.dom.element as HTMLTextAreaElement).spellcheck = spellcheck;
        return this;
    }

    /**
     * 選択範囲を設定する。同じ位置を指定するとキャレットがその位置に移動する。
     */
    public setSelectionRange(start: number, end: number): this {
        const ta = this.dom.element as HTMLTextAreaElement;
        ta.setSelectionRange(start, end);
        return this;
    }

    public getSelectionStart(): number {
        return (this.dom.element as HTMLTextAreaElement).selectionStart;
    }

    public getSelectionEnd(): number {
        return (this.dom.element as HTMLTextAreaElement).selectionEnd;
    }

    /**
     * 現在のコンテンツ量に合わせて高さを自動調整する。
     * `height: auto` でいったんブラウザに再計算させてから scrollHeight を読むことで、
     * 「縮む方向」のリサイズも正しく反映される。CSS で min-height / max-height を
     * 設定しておくと、最小1行〜最大Nラインの範囲にクリップされ、それを超えると
     * overflow-y: auto によりスクロールするようになる。
     *
     * 空のときの特殊処理:
     *   `scrollHeight` は実装依存でフォントロード等の影響で 1 行ジャストにならず、
     *   CSS min-height をやや超えた値を返すことがある (結果として 2 行分っぽくなる)。
     *   inline `style.height` を完全に外し、CSS の `min-height` だけに任せることで
     *   空時は確実に1行表示になる。
     */
    public autoFitToContent(): this {
        const el = this.dom.element as HTMLTextAreaElement;
        if (el.value.length === 0) {
            el.style.height = '';
            return this;
        }
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
        return this;
    }

    /**
     * 現在のレンダリング後の高さ(px)を取得する。autoFitToContent() 適用後に
     * 実際の高さを外部(親コンポーネントのレイアウト反映等)へ伝えるために使う。
     */
    public 高さPxを取得する(): number {
        return (this.dom.element as HTMLTextAreaElement).offsetHeight;
    }

    /**
     * 値と選択範囲を書き換えて input イベントを発火する。プログラム的な
     * テキスト編集(Tab補完・自動閉じ括弧の挿入/削除等)を、通常のキー入力と
     * 同じ反応経路(input リスナー)へ合流させるために使う。
     */
    public 値と選択範囲を書き換えて通知する(value: string, selectionStart: number, selectionEnd: number = selectionStart): this {
        const el = this.dom.element as HTMLTextAreaElement;
        el.value = value;
        el.setSelectionRange(selectionStart, selectionEnd);
        el.dispatchEvent(new Event("input", { bubbles: true }));
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