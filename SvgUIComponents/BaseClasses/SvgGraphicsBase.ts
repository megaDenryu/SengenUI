import { SvgElementBase } from "./SvgElementBase";

/**
 * 描画専用のSVGグラフィクス要素の基底クラス
 * <circle>, <rect>, <line>, <path>, <polygon>, <polyline>, <ellipse>, <image>, <use> 等が継承します
 * 
 * 重要な制約：
 * - child()メソッドは意図的に実装していません
 * - 描画要素は子要素を持つべきではないため、型システムで不正な操作を防ぎます
 * - もし子要素が必要な場合は、<g>等のコンテナ要素でラップしてください
 * 
 * @example
 * ```typescript
 * // ✅ 正しい使い方
 * const circle = new CircleC({ cx: 100, cy: 100, r: 50 });
 * svg.child(circle);
 * 
 * // ❌ コンパイルエラー（child()メソッドが存在しない）
 * circle.child(new CircleC()); // Error!
 * 
 * // ✅ グループ化が必要な場合
 * const group = new GroupC();
 * group.child(circle1).child(circle2);
 * svg.child(group);
 * ```
 */
export abstract class SvgGraphicsBase extends SvgElementBase {
    constructor() {
        super();
    }

    /**
     * スタイルを設定（オブジェクト形式）
     * DivCのsetStyleCSSと同じインターフェース
     * 
     * @example
     * ```typescript
     * graphics.setStyleCSS({
     *     cursor: "pointer",
     *     opacity: "0.8"
     * })
     * ```
     */
    public setStyleCSS(style: Partial<CSSStyleDeclaration>): this {
        Object.assign(this._svgDom.element.style, style);
        return this;
    }

    // 注意：child()メソッドは意図的に実装していません
    // グラフィクス要素は子要素を持つべきではありません
}
