import { LV2HtmlComponentBase } from "../SengenBase/LV2HtmlComponentBase";
import { div, span, textInput, type DivC, type TextInputC } from "../LV1UIComponents";

export interface 候補入力項目<T = unknown> {
    readonly 値: string;
    readonly 表示名?: string;
    readonly 補足?: string;
    readonly 元値?: T;
}

export interface 候補入力Options<T = unknown> {
    readonly value?: string;
    readonly placeholder?: string;
    readonly rootClass?: string[] | string;
    readonly inputClass?: string[] | string;
    readonly 候補を取得する: (検索語: string) => readonly 候補入力項目<T>[];
}

export class 候補入力C<T = unknown> extends LV2HtmlComponentBase {
    private readonly _入力欄: TextInputC;
    private readonly _候補一覧コンテナ: DivC;
    private _候補一覧: readonly 候補入力項目<T>[] = [];
    private _候補行群: readonly DivC[] = [];
    private _アクティブ候補番号 = -1;
    private _候補表示中 = false;

    constructor(private readonly _options: 候補入力Options<T>) {
        super();
        this._入力欄 = textInput({
            value: _options.value,
            placeholder: _options.placeholder,
            class: _options.inputClass,
        })
            .setStyleCSS({ width: "100%", boxSizing: "border-box" })
            .onInput(() => this._候補を更新して表示する())
            .onFocus(() => this._候補を更新して表示する())
            .onBlur(() => this._候補一覧を閉じる())
            .onKeyDown((event) => this._キー入力を処理する(event));
        this._候補一覧コンテナ = div()
            .setStyleCSS({
                position: "absolute",
                top: "calc(100% + 2px)",
                left: "0",
                right: "0",
                zIndex: "30",
                backgroundColor: "#ffffff",
                border: "1px solid #d9dde6",
                borderRadius: "4px",
                boxShadow: "0 6px 20px rgba(24, 39, 75, 0.12)",
                overflowX: "hidden",
                overflowY: "auto",
                display: "none",
                maxHeight: "180px",
            });
        this._componentRoot = this.createComponentRoot();
    }

    protected createComponentRoot(): DivC {
        return div({ class: this._options.rootClass })
            .setStyleCSS({ position: "relative", minWidth: "0" })
            .childs([
                this._入力欄,
                this._候補一覧コンテナ,
            ]);
    }

    public setValue(値: string): this {
        this._入力欄.setValue(値);
        this._候補一覧を閉じる();
        return this;
    }

    public getValue(): string {
        return this._入力欄.getValue();
    }

    public focus(options?: FocusOptions): this {
        this._入力欄.focus();
        return this;
    }

    public onInput(callback: (値: string) => void): this {
        this._入力欄.onInput(() => callback(this.getValue()));
        return this;
    }

    private _キー入力を処理する(event: KeyboardEvent): void {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!this._候補表示中) this._候補を更新して表示する();
            this._アクティブ候補番号 = Math.min(this._候補一覧.length - 1, this._アクティブ候補番号 + 1);
            this._候補一覧を再描画する();
            return;
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!this._候補表示中) this._候補を更新して表示する();
            this._アクティブ候補番号 = this._アクティブ候補番号 <= 0 ? 0 : this._アクティブ候補番号 - 1;
            this._候補一覧を再描画する();
            return;
        }
        if (event.key === "Enter" && this._候補表示中 && this._アクティブ候補番号 >= 0) {
            event.preventDefault();
            this._候補を確定する(this._アクティブ候補番号);
            return;
        }
        if (event.key === "Escape") {
            this._候補一覧を閉じる();
        }
    }

    private _候補を更新して表示する(): void {
        this._候補一覧 = this._options.候補を取得する(this.getValue());
        this._候補表示中 = this._候補一覧.length > 0;
        this._アクティブ候補番号 = -1;
        this._候補一覧を再描画する();
    }

    private _候補一覧を閉じる(): void {
        this._候補一覧 = [];
        this._候補表示中 = false;
        this._アクティブ候補番号 = -1;
        this._候補一覧を再描画する();
    }

    private _候補を確定する(番号: number): void {
        const 候補 = this._候補一覧[番号];
        if (!候補) return;
        this._入力欄.setValue(候補.値);
        this._候補一覧を閉じる();
        this._入力欄.focus();
    }

    private _候補一覧を再描画する(): void {
        this._候補一覧コンテナ.clearChildren();
        this._候補一覧コンテナ.setStyleCSS({ display: this._候補表示中 ? "block" : "none" });
        this._候補行群 = [];
        if (!this._候補表示中) return;

        const 候補行群 = this._候補一覧.map((候補, 番号) => {
                const 選択中 = 番号 === this._アクティブ候補番号;
                return div()
                    .setStyleCSS({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        padding: "4px 6px",
                        cursor: "pointer",
                        fontSize: "11px",
                        backgroundColor: 選択中 ? "#eef4ff" : "#ffffff",
                    })
                    .onMouseOver(() => {
                        this._アクティブ候補番号 = 番号;
                        this._候補一覧を再描画する();
                    })
                    .onMouseDown((event) => {
                        event.preventDefault();
                        this._候補を確定する(番号);
                    })
                    .childs([
                        span({ text: 候補.表示名 ?? 候補.値 })
                            .setStyleCSS({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }),
                        span({ text: 候補.補足 ?? "" })
                            .setStyleCSS({
                                color: "#7c8698",
                                fontSize: "10px",
                                whiteSpace: "nowrap",
                                display: 候補.補足 ? "inline" : "none",
                            }),
                    ]);
            });
        this._候補行群 = 候補行群;
        this._候補一覧コンテナ.childs(候補行群);
        this._アクティブ候補を表示範囲へ寄せる();
    }

    private _アクティブ候補を表示範囲へ寄せる(): void {
        if (this._アクティブ候補番号 < 0) return;
        const アクティブ候補 = this._候補行群[this._アクティブ候補番号];
        if (!アクティブ候補) return;
        const 要素 = アクティブ候補.dom.element as HTMLElement & {
            scrollIntoView?: (arg?: boolean | ScrollIntoViewOptions) => void;
        };
        要素.scrollIntoView?.({ block: "nearest" });
    }
}