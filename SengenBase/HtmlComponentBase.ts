import { HtmlElementProxy, HaveHtmlElementProxy } from "./DomProxy"; // DomProxyのパスを適切に設定してください
import { HtmlAndSvgInterface } from "./IUIComponent";
import { IBehavior } from "../Behaviors";
import {
    ビューポート座標値,
    ドキュメント座標値,
    オフセット座標値
} from "./css長さ単位";
import { IFBehavior, IFBind, IFChild, IFClass, IFStyle, IHtmlComponentBase } from "./HtmlComponentBaseInterfaces";
import { SvgElementBase } from "../SvgUIComponents/BaseClasses/SvgElementBase";
import { SvgC } from "../SvgUIComponents/SvgC";
import { MathC } from "../MathMLComponents/BaseClasses/MathC";
import { ILV2MathMLComponent } from "../MathMLComponents/BaseClasses/ILV2MathMLComponent";
import { Px2DVector } from "./位置関係";


export interface HTMLComponentInterface extends HtmlAndSvgInterface {

}



export interface IFViewportPosition {
    If: boolean,
    True: { position: ビューポート座標値, options?: { preservePositionProperty?: boolean } },
    False?: { position: ビューポート座標値, options?: { preservePositionProperty?: boolean } }
}

export interface IFDocumentPosition {
    If: boolean,
    True: { position: ドキュメント座標値, options?: { preservePositionProperty?: boolean } },
    False?: { position: ドキュメント座標値, options?: { preservePositionProperty?: boolean } }
}

export interface IFOffsetPosition {
    If: boolean,
    True: { position: オフセット座標値, options?: { preservePositionProperty?: boolean } },
    False?: { position: オフセット座標値, options?: { preservePositionProperty?: boolean } }
}

export interface IFChildOperation {
    If: boolean,
    True: { child: HtmlComponentChild, index?: number },
    False?: { child: HtmlComponentChild, index?: number }
}

export abstract class HtmlComponentBase implements HaveHtmlElementProxy, HTMLComponentInterface, IHtmlComponentBase {
    public abstract get dom(): HtmlElementProxy;//フレームワークを実装するために仕方なくpublicになってるだけなので基底クラス以外がdomを直接参照することは禁止。重大な犯罪行為。重大なバグの元。使うやつは頭が悪い。

    constructor() {
    }

    

    public child(child: HtmlComponentChild | undefined): this {
        if (child == null) { return this; }
        // ILV2MathMLComponentの自動展開
        if (this.isLV2MathMLComponent(child)) {
            this.dom.addChild(child.getMath());
            return this;
        }
        this.dom.addChild(child);
        return this;
    }

    /**
     * ILV2MathMLComponentかどうかを判定
     */
    private isLV2MathMLComponent(obj: any): obj is ILV2MathMLComponent {
        return obj != null && typeof obj.getMath === 'function' && typeof obj.getContent === 'function';
    }

    public childs(...childrenList: ((HtmlComponentChild|undefined)[] | Iterable<HtmlComponentChild|undefined>)[]): this {
        for (const children of childrenList) {
            for (const child of children) {
                this.child(child);
            }
        }
        return this;
    }

    

    public childIf(child:IFChild): this {
        if (child.If == true) {
            if (child.True == null) {return this;}
            return this.child(child.True);
        } else {
            if (child.False == null) {return this;}
            return this.child(child.False);
        }
    }

    public childIfs(childs:(IFChild|(HtmlComponentChild|undefined)[] | Iterable<HtmlComponentChild|undefined>|HtmlComponentChild|undefined)[]):this{
        for (const child of childs) {
            if (child == null ) { 
                continue; 
            } else if (child instanceof HtmlComponentBase){
                this.child(child);
            } else if (child instanceof SvgElementBase) {
                this.child(child);
            } else if (child instanceof MathC) {
                this.child(child);
            }
            else if ("If" in child){
                this.childIf(child);
            } else {
                this.childs(child);
            }
            
        }
        return this;
    }

    public removeChild(child: HtmlComponentChild): this {
        this.dom.deleteChild(child);
        return this;
    }

    /**
     * 条件付きで子要素を削除
     * @param ifRemove If: 条件式, True: 削除する子要素
     */
    public removeChildIf(ifRemove: { If: boolean, True: HtmlComponentChild }): this {
        if (ifRemove.If) {
            return this.removeChild(ifRemove.True);
        }
        return this;
    }

    /**
     * 子要素を指定位置に挿入
     */
    public insertChildAt(index: number, child: HtmlComponentChild): this {
        this.dom.insertChildAt(index, child);
        return this;
    }

    /**
     * 条件付きで子要素を指定位置に挿入
     * @param ifInsert If: 条件式, True: { child: 挿入する子要素, index: 挿入位置 }
     */
    public insertChildAtIf(ifInsert: { If: boolean, True: { child: HtmlComponentChild, index: number } }): this {
        if (ifInsert.If) {
            return this.insertChildAt(ifInsert.True.index, ifInsert.True.child);
        }
        return this;
    }

    /**
     * すべての子要素を削除
     */
    public clearChildren(): this {
        this.dom.clearChildren();
        return this;
    }

    /**
     * 条件付きですべての子要素を削除
     * @param ifClear If: 条件式
     */
    public clearChildrenIf(ifClear: { If: boolean }): this {
        if (ifClear.If) {
            return this.clearChildren();
        }
        return this;
    }

    /**
     * 子要素を指定位置に移動
     */
    public moveChildToIndex(child: HtmlComponentChild, newIndex: number): this {
        this.dom.moveChildToIndex(child, newIndex);
        return this;
    }

    /**
     * 条件付きで子要素を指定位置に移動
     * @param ifMove If: 条件式, True: { child: 移動する子要素, index: 新しい位置 }
     */
    public moveChildToIndexIf(ifMove: { If: boolean, True: { child: HtmlComponentChild, index: number } }): this {
        if (ifMove.If) {
            return this.moveChildToIndex(ifMove.True.child, ifMove.True.index);
        }
        return this;
    }

    //=============================================================================
    // 位置とサイズの取得・設定
    //============================================================================
    // - 手順1: 各取得系メソッドが参照しているブラウザ API の単位を確認  
    // - 手順2: セッター系メソッドで指定しているスタイル値の単位を確認し、まとめて回答します
    // 
    // ## 座標の単位について
    // 
    // ### 取得系メソッド
    // | メソッド名                 | 参照している値                                  | 単位                                                    |
    // |---------------------------|------------------------------------------------|--------------------------------------------------------|
    // | `getBoundingClientRect()` | `DOMRect`（`getBoundingClientRect()` の戻り値） | **CSS ピクセル**（px 相当。デバイス依存しない論理ピクセル） |
    // | `getViewportPosition()`   | `DOMRect.left / top`                           | 同上（CSS ピクセル）                                     |
    // | `getDocumentPosition()`   | `DOMRect.left/top` + `window.scrollX/Y`        | いずれも CSS ピクセルで計算                               |
    // | `getOffsetPosition()`     | `offsetLeft / offsetTop` など                  ｜ CSS ピクセル（整数）                                     |
    // 
    // ※ブラウザが返す `DOMRect` や `offsetLeft` はすべて CSS ピクセル単位です。物理的なディスプレイのピクセル数とは異なり、ズームや DPI に応じてスケーリングされた論理ピクセルになります。
    // 
    // ### 設定系メソッド
    // | メソッド名 | 設定しているスタイル | 単位 |
    // |------------|---------------------|------|
    // | `setViewportPosition()` | `left`, `top` に ``${数値}px`` | px |
    // | `setDocumentPosition()` | 同上 | px |
    // | `setOffsetPosition()` | 同上 | px |
    // 
    // これらのメソッドは最終的に `style.left/top = '...px'` という形で数値を文字列化しており、明示的に `px` を付けています。
    // 
    // ---
    // 
    // ### まとめ
    // - 取得系メソッド (`getBoundingClientRect` など) が返す座標は、ブラウザの `DOMRect` / `offset` 系 API の仕様どおり **すべて CSS ピクセル**（px相当）です。
    // - 設定系も `px` を付けて `left/top` を指定しているため、こちらも **px 単位で扱っています**。
    // - したがって「この辺で扱っている座標の数値単位はすべて px」と考えて問題ありません（正確には CSS ピクセルですが、通常の CSS の px と同義です）。
    // 
    // ズーム倍率が変わっても CSS ピクセル値は変わらない一方、物理ピクセルとは一致しない点だけ覚えておくと良いです。
    //
    //
    //



    /**
     * 現在の描画状態に基づく境界矩形を返します。
     * - ブラウザが描画している最新のレイアウトを参照して算出されます。
     * - 返る `DOMRect` の座標は「ビューポート（= ブラウザの表示領域）の左上」を原点とした値です。
     *   スクロール位置や `position: fixed` など CSS の最終計算結果が反映されます。
     * - CSS で `transform` を指定している場合も変換後の境界になります。
     */
    public getBoundingClientRect(): DOMRect {
        return this.dom.element.getBoundingClientRect();
    }

    /**
     * ビューポート（ブラウザの表示領域）を原点とした現在位置を取得します。
     * - ビューポートとは、スクロールを考慮した“いま画面に映っている領域”のことです。
     * - CSS で `position: absolute / fixed / relative` いずれであっても、最終的に描画された位置が反映されます。
     * - スクロールすると値が変化しますが、スクロール量そのものは加算されません（常に画面左上を原点とした座標）。
     */
    public getViewportPosition(): ビューポート座標値 {
        const rect = this.getBoundingClientRect();
        return ビューポート座標値.fromNumbers(rect.left, rect.top);
    }

    /**
     * ビューポート基準で位置を設定します。
     * - `position: fixed` を用いて画面左上からの距離を `left/top` で指定します。
     * - 現在 `position` が `static` の場合は `fixed` に変更します（`preservePositionProperty=true` で抑止可）。
     * - transform が指定されている場合はそのまま適用されるため、必要に応じて `setStyleCSS` でリセットしてください。
     */
    public setViewportPosition(
        position: ビューポート座標値,
        options: { preservePositionProperty?: boolean } = {}
    ): this {
        const computed = window.getComputedStyle(this.dom.element);
        if (!options.preservePositionProperty && computed.position !== "fixed") {
            this.setStyleCSS({ position: "fixed" });
        } else if (computed.position === "static") {
            this.setStyleCSS({ position: "fixed" });
        }

        this.setStyleCSS({
            left: position.x.toCssValue(),
            top: position.y.toCssValue()
        });
        return this;
    }

    /**
     * transform: translate()を使用してビューポート基準で位置を設定します。
     * - left/topを変更せず、transformのみで位置を変更するため、リフローを抑制できパフォーマンスが向上します。
     * - 初回呼び出し時に `position: fixed` を設定します（`preservePositionProperty=true` で抑止可）。
     * - 既存のtransformプロパティ（rotate, scaleなど）は上書きされるため、必要に応じて併記してください。
     * - ビューポート左上を原点とした座標で指定します。
     */
    public setViewportPositionByTransform(
        position: ビューポート座標値,
        options: { preservePositionProperty?: boolean; additionalTransform?: string } = {}
    ): this {
        const computed = window.getComputedStyle(this.dom.element);
        if (!options.preservePositionProperty && computed.position !== "fixed") {
            this.setStyleCSS({ position: "fixed" });
        } else if (computed.position === "static") {
            this.setStyleCSS({ position: "fixed" });
        }

        const translateValue = `translate(${position.x.toCssValue()}, ${position.y.toCssValue()})`;
        const transformValue = options.additionalTransform 
            ? `${translateValue} ${options.additionalTransform}`
            : translateValue;

        this.setStyleCSS({
            left: '0px',
            top: '0px',
            transform: transformValue
        });
        return this;
    }

    public setTranslate(pos :Px2DVector): this {
        this.setStyleCSS({
            transform: `translate(${pos.x.toCssValue()}, ${pos.y.toCssValue()})`
        });
        return this;
    }
        

    /**
     * 条件付きでビューポート基準の位置を設定
     * @param ifPosition If: 条件式, True: { position: 座標値, options?: オプション }, False: 偽の場合の設定（オプション）
     */
    public setViewportPositionIf(ifPosition: IFViewportPosition): this {
        if (ifPosition.If) {
            return this.setViewportPosition(ifPosition.True.position, ifPosition.True.options);
        } else if (ifPosition.False !== undefined) {
            return this.setViewportPosition(ifPosition.False.position, ifPosition.False.options);
        }
        return this;
    }

    /**
     * ページ全体（ドキュメント）左上を原点とした座標を取得します。
     * - ビューポート座標にスクロール量（`window.scrollX/Y`）を加算した値です。
     * - `position: absolute` などで CSS 上の left/top を確認したい場合はこちらが把握しやすいです。
     */
    public getDocumentPosition(): ドキュメント座標値 {
        const rect = this.getBoundingClientRect();
        return ドキュメント座標値.fromNumbers(
            rect.left + window.scrollX,
            rect.top + window.scrollY
        );
    }

    /**
     * ドキュメント基準の座標を設定します。
     * - `position: absolute` を利用して `left/top` を指定します。
     * - 親要素が `static` 以外の `position` を持つ場合、その要素が基準になることに注意してください。
     * - `preservePositionProperty=true` を指定すると `position` 値を変更しません（ただし `static` の場合は置き換えます）。
     */
    public setDocumentPosition(
        position: ドキュメント座標値,
        options: { preservePositionProperty?: boolean } = {}
    ): this {
        const computed = window.getComputedStyle(this.dom.element);
        if (!options.preservePositionProperty && computed.position === "static") {
            this.setStyleCSS({ position: "absolute" });
        } else if (computed.position === "static") {
            this.setStyleCSS({ position: "absolute" });
        }

        this.setStyleCSS({
            left: position.x.toCssValue(),
            top: position.y.toCssValue()
        });
        return this;
    }

    /**
     * 条件付きでドキュメント基準の座標を設定
     * @param ifPosition If: 条件式, True: { position: 座標値, options?: オプション }, False: 偽の場合の設定（オプション）
     */
    public setDocumentPositionIf(ifPosition: IFDocumentPosition): this {
        if (ifPosition.If) {
            return this.setDocumentPosition(ifPosition.True.position, ifPosition.True.options);
        } else if (ifPosition.False !== undefined) {
            return this.setDocumentPosition(ifPosition.False.position, ifPosition.False.options);
        }
        return this;
    }

    /**
     * offsetParent（CSS のレイアウト計算で親として扱われる要素）を基準にした座標を取得します。
     * - `offsetParent` は通常 `position: relative / absolute / fixed` の最も近い先祖要素です。
     * - CSS の `left/top` と概念的に近い値ですが、`transform` やスクロール位置は考慮されません。
     * - テーブル要素や SVG など一部の要素では 0 を返す場合があります。
     */
    public getOffsetPosition(): オフセット座標値 {
        let element: HTMLElement | null = this.dom.element;
        let offsetLeft = 0;
        let offsetTop = 0;

        while (element) {
            offsetLeft += element.offsetLeft;
            offsetTop += element.offsetTop;
            element = element.offsetParent as HTMLElement | null;
        }

        return オフセット座標値.fromNumbers(offsetLeft, offsetTop);
    }

    /**
     * offsetParent 基準の座標を設定します。
     * - 現在の `offsetParent`（最も近い position 指定先祖）の左上からの距離を `left/top` に設定します。
     * - 要素が `static` の場合は `absolute` に変更します（`preservePositionProperty=true` で抑止可）。
     * - 親のスクロール・transform は反映されないため、動的に変化する場合は `getViewportPosition` との併用を検討してください。
     */
    public setOffsetPosition(
        position: オフセット座標値,
        options: { preservePositionProperty?: boolean } = {}
    ): this {
        const computed = window.getComputedStyle(this.dom.element);
        if (!options.preservePositionProperty && computed.position === "static") {
            this.setStyleCSS({ position: "absolute" });
        } else if (computed.position === "static") {
            this.setStyleCSS({ position: "absolute" });
        }

        this.setStyleCSS({
            left: position.x.toCssValue(),
            top: position.y.toCssValue()
        });
        return this;
    }

    /**
     * 条件付きでoffsetParent基準の座標を設定
     * @param ifPosition If: 条件式, True: { position: 座標値, options?: オプション }, False: 偽の場合の設定（オプション）
     */
    public setOffsetPositionIf(ifPosition: IFOffsetPosition): this {
        if (ifPosition.If) {
            return this.setOffsetPosition(ifPosition.True.position, ifPosition.True.options);
        } else if (ifPosition.False !== undefined) {
            return this.setOffsetPosition(ifPosition.False.position, ifPosition.False.options);
        }
        return this;
    }

    /**
     * 子要素の数を取得
     */
    public getChildCount(): number {
        // DOM要素の子要素数を返す
        return this.dom.element.children.length;
    }

    /**
     * 指定インデックスの子要素のHTMLElementを取得
     */
    public getChildElementAt(index: number): HTMLElement | null {
        const child = this.dom.element.children[index];
        return child instanceof HTMLElement ? child : null;
    }

    /**
     * コンポーネントをDOMから削除し、関連リソースを解放します。
     */
    public delete(): void {
        this.dom.delete();
        // 他に必要なクリーンアップ処理があればここに追加
    }

    /**
     * 条件付きでコンポーネントを削除
     * @param ifDelete If: 条件式
     * @returns voidを返すため、メソッドチェーンは終了します
     */
    public deleteIf(ifDelete: { If: boolean }): void {
        if (ifDelete.If) {
            this.delete();
        }
    }

    public get style(): CSSStyleDeclaration {
        return this.dom.element.style;
    }    
    
    public setStyleCSS(style: Partial<CSSStyleDeclaration>): this {
        Object.assign(this.style, style);
        return this;
    }

    /**
     * 条件付きでCSSスタイルを設定
     * @param ifStyle If: 条件式, True: 真の場合のスタイル, False: 偽の場合のスタイル（オプション）
     */
    public setStyleCSSIf(ifStyle: IFStyle): this {
        if (ifStyle.If) {
            return this.setStyleCSS(ifStyle.True);
        } else if (ifStyle.False !== undefined) {
            return this.setStyleCSS(ifStyle.False);
        }
        return this;
    }

    public bind(func:(component: this) => void): this {
        func(this);
        return this;
    }

    /**
     * 条件付きでbind関数を実行
     * @param ifBind If: 条件式, True: 真の場合の関数, False: 偽の場合の関数（オプション）
     */
    public bindIf(ifBind: IFBind<this>): this {
        if (ifBind.If) {
            ifBind.True(this);
        } else if (ifBind.False !== undefined) {
            ifBind.False(this);
        }
        return this;
    }


    public addClass(className: string | string[] | null | undefined): this {
        if (className == null) { return this; }
        this.dom.addCSSClass(className);
        return this;
    }

    /**
     * 条件付きでCSSクラスを追加
     * @param ifClass If: 条件式, True: 真の場合のクラス, False: 偽の場合のクラス（オプション）
     */
    public addClassIf(ifClass: IFClass): this {
        if (ifClass.If) {
            return this.addClass(ifClass.True);
        } else if (ifClass.False !== undefined) {
            return this.addClass(ifClass.False);
        }
        return this;
    }

    public removeClass(className: string | string[]): this {
        this.dom.removeCSSClass(className);
        return this;
    }

    /**
     * 条件付きでCSSクラスを削除
     * @param ifClass If: 条件式, True: 真の場合のクラス, False: 偽の場合のクラス（オプション）
     */
    public removeClassIf(ifClass: IFClass): this {
        if (ifClass.If) {
            return this.removeClass(ifClass.True);
        } else if (ifClass.False !== undefined) {
            return this.removeClass(ifClass.False);
        }
        return this;
    }

    /**
     * ツールチップ（title属性）を設定
     * @param tooltip ホバー時に表示するテキスト
     */
    public setTooltip(tooltip: string|undefined): this {
        if (tooltip == null) {return this;}
        this.dom.element.setAttribute('title', tooltip);
        return this;
    }

    /**
     * 条件付きでツールチップを設定
     * @param ifTooltip If: 条件式, True: 真の場合のツールチップ, False: 偽の場合のツールチップ（オプション）
     */
    public setTooltipIf(ifTooltip: { If: boolean, True: string, False?: string }): this {
        if (ifTooltip.If) {
            return this.setTooltip(ifTooltip.True);
        } else if (ifTooltip.False !== undefined) {
            return this.setTooltip(ifTooltip.False);
        }
        return this;
    }

    public show(): this {
        this.dom.show();
        return this;
    }

    /**
     * 条件付きで表示/非表示を切り替え
     * @param ifShow If: 条件式（真なら表示、偽なら非表示）
     */
    public showIf(ifShow: { If: boolean }): this {
        if (ifShow.If) {
            return this.show();
        } else {
            return this.hide();
        }
    }

    public hide(): this {
        this.dom.hide();
        return this;
    }

    /**
     * 条件付きで非表示/表示を切り替え
     * @param ifHide If: 条件式（真なら非表示、偽なら表示）
     */
    public hideIf(ifHide: { If: boolean }): this {
        if (ifHide.If) {
            return this.hide();
        } else {
            return this.show();
        }
    }

    public toggleShowHide(): this {
        if (this.dom.isShow) {
            this.hide();
        } else {
            this.show();
        }
        return this;
    }

    public setAsParentComponent(): this {
        this.dom.setAsParentComponent();
        return this;
    }

    /**
     * 条件付きで親コンポーネントとして設定
     * @param ifParent If: 条件式
     */
    public setAsParentComponentIf(ifParent: { If: boolean }): this {
        if (ifParent.If) {
            return this.setAsParentComponent();
        }
        return this;
    }

    public setAsChildComponent(): this {
        this.dom.setAsChildComponent();
        return this;
    }

    /**
     * 条件付きで子コンポーネントとして設定
     * @param ifChild If: 条件式
     */
    public setAsChildComponentIf(ifChild: { If: boolean }): this {
        if (ifChild.If) {
            return this.setAsChildComponent();
        }
        return this;
    }

    // === Behavior Management ===
    
    /**
     * Behaviorを追加
     * @param behavior 追加するBehavior
     */
    public addBehavior(behavior: IBehavior): this {
        behavior.attach(this);
        return this;
    }

    /**
     * 条件付きでBehaviorを追加
     * @param ifBehavior If: 条件式, True: 追加するBehavior, False: 偽の場合に追加するBehavior（オプション）
     */
    public addBehaviorIf(ifBehavior: IFBehavior): this {
        if (ifBehavior.If) {
            return this.addBehavior(ifBehavior.True);
        } else if (ifBehavior.False !== undefined) {
            return this.addBehavior(ifBehavior.False);
        }
        return this;
    }
}

// SvgContainerBaseの派生クラスでも、HTMLの子要素になれるのはSvgC（<svg>タグ）だけです。他のコンテナ要素は全てSVG名前空間内でのみ有効です。
// MathMLも同様に、HTMLの子要素になれるのはMathC（<math>タグ）だけです。他のMathML要素は全てMathML名前空間内でのみ有効です。
export type HtmlComponentChild = HtmlComponentBase|SvgC|MathC;