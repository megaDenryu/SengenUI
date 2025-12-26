import { HtmlElementProxy, HaveHtmlElementProxy } from "../SengenBase/DomProxy";
import { HtmlComponentBase, HtmlComponentChild } from "../SengenBase/HtmlComponentBase";

/**
 * DocumentBodyCクラス
 * document.bodyをUIComponentとして扱えるようにするクラス
 * アプリケーションのルートコンテナとして使用
 * 他のUIComponentの子にはなれない特殊なクラス
 * 
 * 使用例:
 * const body = new DocumentBodyC();
 * const myComponent = new DivC({text: "Hello World"});
 * body.childs([myComponent]); // document.bodyに直接追加される
 */
export class DocumentBodyC {
    private _dom: HtmlElementProxy;
    
    constructor() {
        this._dom = new HtmlElementProxy(document.body as HTMLElement);
    }

    /**
     * 単一の子要素を追加
     * @param child 追加する子要素
     * @returns this（メソッドチェーン用）
     */
    public child(child: HtmlComponentChild): this {
        this._dom.addChild(child);
        return this;
    }

    /**
     * 子要素を追加
     * @param childrenList 追加する子要素のリスト
     * @returns this（メソッドチェーン用）
     */
    public childs(...childrenList: (HtmlComponentChild[] | Iterable<HtmlComponentChild>)[]): this {
        for (const children of childrenList) {
            for (const child of children) {
                this._dom.addChild(child);
            }
        }
        return this;
    }

    /**
     * 子要素を削除
     * @param child 削除する子要素
     * @returns this（メソッドチェーン用）
     */
    public removeChild(child: HtmlComponentChild): this {
        this._dom.deleteChild(child);
        return this;
    }

    /**
     * 子要素を指定位置に挿入
     * @param index 挿入位置
     * @param child 追加する子要素
     * @returns this（メソッドチェーン用）
     */
    public insertChildAt(index: number, child: HtmlComponentChild): this {
        this._dom.insertChildAt(index, child);
        return this;
    }

    /**
     * 全ての子要素をクリア
     * @returns this（メソッドチェーン用）
     */
    public clearChildren(): this {
        this._dom.clearChildren();
        return this;
    }

    /**
     * 子要素を指定位置に移動
     * @param child 移動する子要素
     * @param newIndex 新しい位置
     * @returns this（メソッドチェーン用）
     */
    public moveChildToIndex(child: HtmlComponentChild, newIndex: number): this {
        this._dom.moveChildToIndex(child, newIndex);
        return this;
    }

    /**
     * 子要素の数を取得
     */
    public getChildCount(): number {
        return this._dom.element.children.length;
    }

    /**
     * 指定インデックスの子要素のHTMLElementを取得
     */
    public getChildElementAt(index: number): HTMLElement | null {
        const child = this._dom.element.children[index];
        return child instanceof HTMLElement ? child : null;
    }

    /**
     * イベントリスナーを追加
     * @param eventName イベント名
     * @param listener イベントリスナー
     * @returns this（メソッドチェーン用）
     */
    public addEventListener<K extends keyof HTMLElementEventMap>(
        eventName: K, 
        listener: (event: HTMLElementEventMap[K]) => void
    ): this {
        this._dom.element.addEventListener(eventName, listener);
        return this;
    }

    /**
     * CSSスタイルを取得
     */
    public get style(): CSSStyleDeclaration {
        return this._dom.element.style;
    }

    /**
     * インラインスタイルを設定
     * @param styles スタイルオブジェクト
     * @returns this（メソッドチェーン用）
     */
    public setStyleCSS(styles: Partial<CSSStyleDeclaration>): this {
        this._dom.setStyle(styles);
        return this;
    }

    /**
     * CSSクラスを追加
     * @param className 追加するCSSクラス
     * @returns this（メソッドチェーン用）
     */
    public addClass(className: string | string[]): this {
        this._dom.addCSSClass(className);
        return this;
    }

    /**
     * CSSクラスを削除
     * @param className 削除するCSSクラス
     * @returns this（メソッドチェーン用）
     */
    public removeClass(className: string | string[]): this {
        this._dom.removeCSSClass(className);
        return this;
    }

    /**
     * 要素を表示
     * @returns this（メソッドチェーン用）
     */
    public show(): this {
        this._dom.show();
        return this;
    }

    /**
     * 要素を非表示
     * @returns this（メソッドチェーン用）
     */
    public hide(): this {
        this._dom.hide();
        return this;
    }

    /**
     * 表示/非表示を切り替え
     * @returns this（メソッドチェーン用）
     */
    public toggleShowHide(): this {
        if (this._dom.isShow) {
            this.hide();
        } else {
            this.show();
        }
        return this;
    }

    /**
     * 親コンポーネントとして設定
     * @returns this（メソッドチェーン用）
     */
    public setAsParentComponent(): this {
        this._dom.setAsParentComponent();
        return this;
    }

    /**
     * 子コンポーネントとして設定
     * @returns this（メソッドチェーン用）
     */
    public setAsChildComponent(): this {
        this._dom.setAsChildComponent();
        return this;
    }

    /**
     * カスタム処理をバインド
     * @param func バインドする関数
     * @returns this（メソッドチェーン用）
     */
    public bind(func: (component: this) => void): this {
        func(this);
        return this;
    }

    /**
     * HTMLエレメントを直接取得（非推奨：特別な場合のみ使用）
     */
    public get element(): HTMLBodyElement {
        return this._dom.element as HTMLBodyElement;
    }

    /**
     * 表示状態を取得
     */
    public get isShow(): boolean {
        return this._dom.isShow;
    }

    /**
     * コンポーネントを削除（IHasDomProxy実装）
     * document.bodyは削除できないため、子要素のみクリア
     */
    public delete(): void {
        this.clearChildren();
        // document.body自体は削除せず、子要素のみクリア
    }
}

export function DocumentBody(): DocumentBodyC {
    return new DocumentBodyC();
}