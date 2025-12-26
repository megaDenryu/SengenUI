import { MathMLElementProxy, HaveMathMLElementProxy } from "../../SengenBase/MathMLDomProxy";
import { HtmlAndSvgInterface } from "../../SengenBase/IUIComponent";

/**
 * すべてのMathML要素の基底クラス
 * MathML要素に共通する機能を提供します
 * - 属性管理
 * - スタイル管理
 * - クラス管理
 * - MathML固有属性（mathcolor, mathsize等）
 */
export abstract class MathMLElementBase implements HaveMathMLElementProxy, HtmlAndSvgInterface {
    protected _mathmlDom: MathMLElementProxy;

    constructor() {
    }

    /**
     * MathMLElementProxyインスタンスを取得
     */
    public get dom(): MathMLElementProxy {
        return this._mathmlDom;
    }

    /**
     * サブクラスでMathMLElementProxyインスタンスを生成して返すための抽象メソッド
     */
    protected abstract createMathMLDomProxy(): MathMLElementProxy;

    // ==================== 属性管理 ====================

    /**
     * MathML属性を設定
     */
    public setMathMLAttribute(name: string, value: string | number): this {
        this._mathmlDom.setMathMLAttribute(name, value);
        return this;
    }

    /**
     * MathML属性を取得
     */
    public getMathMLAttribute(name: string): string | null {
        return this._mathmlDom.getMathMLAttribute(name);
    }

    /**
     * MathML属性を削除
     */
    public removeMathMLAttribute(name: string): this {
        this._mathmlDom.removeMathMLAttribute(name);
        return this;
    }

    // ==================== MathML固有属性 ====================

    /**
     * mathcolor属性を設定
     */
    public setMathColor(color: string): this {
        this._mathmlDom.setMathColor(color);
        return this;
    }

    /**
     * mathsize属性を設定
     */
    public setMathSize(size: string | number): this {
        this._mathmlDom.setMathSize(size);
        return this;
    }

    /**
     * mathvariant属性を設定
     */
    public setMathVariant(variant: "normal" | "bold" | "italic" | "bold-italic" | "script" | "bold-script" | "fraktur" | "bold-fraktur" | "double-struck" | "sans-serif" | "bold-sans-serif" | "sans-serif-italic" | "sans-serif-bold-italic" | "monospace"): this {
        this._mathmlDom.setMathVariant(variant);
        return this;
    }

    /**
     * displaystyle属性を設定
     */
    public setDisplayStyle(displaystyle: boolean): this {
        this._mathmlDom.setDisplayStyle(displaystyle);
        return this;
    }

    // ==================== クラス管理 ====================

    /**
     * CSSクラスを追加
     */
    public addClass(className: string | string[]): this {
        this._mathmlDom.addCSSClass(className);
        return this;
    }

    /**
     * CSSクラスを削除
     */
    public removeClass(className: string | string[]): this {
        this._mathmlDom.removeCSSClass(className);
        return this;
    }

    // ==================== スタイル管理 ====================

    /**
     * スタイルを設定（オブジェクト形式）
     */
    public setStyleCSS(style: Partial<CSSStyleDeclaration>): this {
        this._mathmlDom.setStyle(style);
        return this;
    }

    // ==================== 表示制御 ====================

    /**
     * MathML要素を表示
     */
    public show(): this {
        this._mathmlDom.show();
        return this;
    }

    /**
     * MathML要素を非表示
     */
    public hide(): this {
        this._mathmlDom.hide();
        return this;
    }

    /**
     * 表示/非表示を切り替え
     */
    public toggleShowHide(): this {
        if (this._mathmlDom.isShow) {
            this.hide();
        } else {
            this.show();
        }
        return this;
    }

    // ==================== その他 ====================

    /**
     * コンポーネントを削除
     */
    public delete(): void {
        this._mathmlDom.delete();
    }

    /**
     * 自己参照を受け取るクロージャーを実行
     * メソッドチェーン中に追加の処理を行う際に使用
     */
    public bind(callback: (self: this) => void): this {
        callback(this);
        return this;
    }
}

/**
 * MathMLコンポーネントの子要素として使用可能な型
 */
export type MathMLComponentChild = MathMLElementBase;
