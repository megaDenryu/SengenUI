import { SvgElementBase } from "./SvgElementBase";

/**
 * 子要素を持てるSVGコンテナ要素の基底クラス
 * <svg>, <g>, <defs>, <symbol>, <marker>, <mask>, <pattern> 等が継承します
 * 
 * 特徴：
 * - child()メソッドで子要素を追加できる
 * - childs()メソッドでIterableから複数の子要素を追加できる
 * - 子要素の管理機能を提供
 */
export abstract class SvgContainerBase extends SvgElementBase {
    protected _children: SvgElementBase[] = [];

    constructor() {
        super();
    }

    // ==================== 子要素管理 ====================

    /**
     * 子要素を追加
     * @param child 追加する子要素
     * @returns メソッドチェーン用の自己参照
     */
    public child(child: SvgElementBase): this {
        this._children.push(child);
        this._svgDom.element.appendChild(child.dom.element);
        return this;
    }

    /**
     * 複数の子要素を追加（Iterable対応）
     * 配列だけでなく、ジェネレーター関数からも子要素を追加できます
     * 
     * @example
     * ```typescript
     * // 配列から追加
     * container.childs([circle1, circle2, circle3]);
     * 
     * // ジェネレーター関数から追加
     * container.childs(function*() {
     *     for (let i = 0; i < 10; i++) {
     *         yield new CircleC({ cx: i * 50, cy: 100, r: 20 });
     *     }
     * }());
     * ```
     */
    public childs(children: Iterable<SvgElementBase>): this {
        for (const child of children) {
            this.child(child);
        }
        return this;
    }

    /**
     * 従来の配列形式の子要素追加（互換性のため）
     * @deprecated childs()を使用してください
     */
    public children(children: SvgElementBase[]): this {
        return this.childs(children);
    }

    /**
     * 子要素を削除
     */
    public removeChild(child: SvgElementBase): this {
        const index = this._children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 1);
            this._svgDom.element.removeChild(child.dom.element);
        }
        return this;
    }

    /**
     * すべての子要素を削除
     */
    public clearChildren(): this {
        this._children.forEach(child => {
            this._svgDom.element.removeChild(child.dom.element);
        });
        this._children = [];
        return this;
    }

    /**
     * 子要素の配列を取得
     */
    public getChildren(): SvgElementBase[] {
        return [...this._children];
    }

    // ==================== コンテナ共通メソッド ====================

    /**
     * スタイルを設定（オブジェクト形式）
     * DivCのsetStyleCSSと同じインターフェース
     * 
     * @example
     * ```typescript
     * container.setStyleCSS({
     *     position: "absolute",
     *     transform: "translate(-50%, -50%)",
     *     pointerEvents: "auto"
     * })
     * ```
     */
    public setStyleCSS(style: Partial<CSSStyleDeclaration>): this {
        Object.assign(this._svgDom.element.style, style);
        return this;
    }

    /**
     * ビューポート内の位置を設定（コンテナ要素用）
     * SVGコンテナやグループの位置調整に使用
     */
    public setViewportPosition(x: number, y: number): this {
        return this.setTranslate(x, y);
    }

    /**
     * コンポーネントを削除（子要素も含めて）
     */
    public override delete(): void {
        // 子要素を先に削除
        this._children.forEach(child => child.delete());
        this._children = [];
        
        // 自身を削除
        super.delete();
    }
}
