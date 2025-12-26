import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgLegacyBase } from "./BaseClasses/SvgLegacyBase";

/**
 * Cursorコンポーネントのオプション
 */
export interface CursorOptions {
    className?: string | string[];
    id?: string;
    href?: string;              // カーソル画像のURI
    x?: number;                 // カーソルのホットスポットX座標
    y?: number;                 // カーソルのホットスポットY座標
}

/**
 * CursorC - SVGカーソル定義要素のコンポーネント
 * 
 * SVG要素のカーソル表示をカスタマイズするための要素（非推奨だが互換性のため実装）
 * カスタムカーソル画像とホットスポット位置を定義
 * 
 * 注意: この要素は多くのモダンブラウザで非推奨となっており、
 * CSS cursor プロパティの使用が推奨される
 * 
 * @example
 * ```typescript
 * // 基本的なカーソル定義
 * const cursor = new CursorC({ 
 *     href: "cursors/hand.png",
 *     x: 10, y: 5
 * });
 * 
 * // SVG画像をカーソルとして使用
 * const svgCursor = new CursorC({ 
 *     href: "cursors/pointer.svg",
 *     x: 0, y: 0
 * });
 * 
 * // プリセットカーソル
 * const handCursor = new CursorC().presetHandPointer();
 * ```
 */
export class CursorC extends SvgLegacyBase {
    private _href?: string;
    private _x?: number;
    private _y?: number;

    constructor(options: CursorOptions = {}) {
        super();
        this._href = options.href;
        this._x = options.x;
        this._y = options.y;
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const cursor = SvgElementCreater.createCursorElement();
        
        // オプション属性を設定
        if (this._href) cursor.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this._href);
        if (this._x !== undefined) cursor.setAttribute("x", this._x.toString());
        if (this._y !== undefined) cursor.setAttribute("y", this._y.toString());
        
        return new SvgElementProxy(cursor);
    }

    private applyOptions(options: CursorOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    // === カーソル画像設定 ===

    /**
     * カーソル画像のURIを設定
     * @param href 画像ファイルのURI
     */
    public setHref(href: string): this {
        this._href = href;
        this._svgDom.element.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href);
        return this;
    }

    /**
     * カーソル画像のURIを取得
     */
    public getHref(): string | undefined {
        return this._href;
    }

    // === ホットスポット設定 ===

    /**
     * カーソルのホットスポットX座標を設定
     * @param x X座標（画像内での座標）
     */
    public setX(x: number): this {
        this._x = x;
        this._svgDom.setSvgAttribute("x", x.toString());
        return this;
    }

    /**
     * カーソルのホットスポットX座標を取得
     */
    public getX(): number | undefined {
        return this._x;
    }

    /**
     * カーソルのホットスポットY座標を設定
     * @param y Y座標（画像内での座標）
     */
    public setY(y: number): this {
        this._y = y;
        this._svgDom.setSvgAttribute("y", y.toString());
        return this;
    }

    /**
     * カーソルのホットスポットY座標を取得
     */
    public getY(): number | undefined {
        return this._y;
    }

    /**
     * ホットスポット座標を同時に設定
     * @param x X座標
     * @param y Y座標
     */
    public setHotspot(x: number, y: number): this {
        return this.setX(x).setY(y);
    }

    /**
     * ホットスポット座標を取得
     */
    public getHotspot(): { x?: number; y?: number } {
        return { x: this._x, y: this._y };
    }

    // === プリセットメソッド ===

    /**
     * プリセット: ハンドポインターカーソル
     */
    public presetHandPointer(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M13.5 2L12 3.5L10.5 2L9 3.5L7.5 2L6 3.5L4.5 2L3 3.5V22L21 22V3.5L19.5 2L18 3.5L16.5 2L15 3.5Z' fill='%23333'/></svg>")
                  .setHotspot(8, 2);
    }

    /**
     * プリセット: 十字カーソル
     */
    public presetCrosshair(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2V10M12 14V22M2 12H10M14 12H22' stroke='%23333' stroke-width='2'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: 移動カーソル
     */
    public presetMove(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2L8 6H11V11H6V8L2 12L6 16V13H11V18H8L12 22L16 18H13V13H18V16L22 12L18 8V11H13V6H16Z' fill='%23333'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: リサイズカーソル（水平）
     */
    public presetResizeHorizontal(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M2 12L6 8V11H18V8L22 12L18 16V13H6V16Z' fill='%23333'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: リサイズカーソル（垂直）
     */
    public presetResizeVertical(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2L8 6H11V18H8L12 22L16 18H13V6H16Z' fill='%23333'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: リサイズカーソル（対角線右下）
     */
    public presetResizeSE(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M22 22L18 18H21V15L22 16V22ZM2 2L6 6H3V9L2 8V2Z' fill='%23333'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: リサイズカーソル（対角線左下）
     */
    public presetResizeSW(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M2 22L6 18H3V15L2 16V22ZM22 2L18 6H21V9L22 8V2Z' fill='%23333'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: テキスト選択カーソル
     */
    public presetText(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2V4M12 20V22M8 3H16M8 21H16' stroke='%23333' stroke-width='2'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: 待機カーソル
     */
    public presetWait(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='8' fill='none' stroke='%23333' stroke-width='2'/><path d='M12 6V12L16 16' stroke='%23333' stroke-width='2'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: 禁止カーソル
     */
    public presetNotAllowed(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='none' stroke='%23d32f2f' stroke-width='2'/><path d='M6 6L18 18' stroke='%23d32f2f' stroke-width='2'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: ヘルプカーソル
     */
    public presetHelp(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='none' stroke='%23333' stroke-width='2'/><path d='M9.5 9C9.5 7.5 10.5 6.5 12 6.5S14.5 7.5 14.5 9C14.5 10.5 12 11 12 13M12 17H12.01' stroke='%23333' stroke-width='2'/></svg>")
                  .setHotspot(12, 12);
    }

    /**
     * プリセット: ズームインカーソル
     */
    public presetZoomIn(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='10' cy='10' r='7' fill='none' stroke='%23333' stroke-width='2'/><path d='M21 21L15 15M10 7V13M7 10H13' stroke='%23333' stroke-width='2'/></svg>")
                  .setHotspot(10, 10);
    }

    /**
     * プリセット: ズームアウトカーソル
     */
    public presetZoomOut(): this {
        return this.setHref("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='10' cy='10' r='7' fill='none' stroke='%23333' stroke-width='2'/><path d='M21 21L15 15M7 10H13' stroke='%23333' stroke-width='2'/></svg>")
                  .setHotspot(10, 10);
    }

    // === ユーティリティメソッド ===

    /**
     * カーソルがSVG画像を使用しているかどうかを判定
     */
    public isSvgCursor(): boolean {
        return !!this._href && (this._href.includes('.svg') || this._href.includes('data:image/svg+xml'));
    }

    /**
     * カーソルがData URIを使用しているかどうかを判定
     */
    public isDataUri(): boolean {
        return !!this._href && this._href.startsWith('data:');
    }

    /**
     * カーソルが外部ファイルを参照しているかどうかを判定
     */
    public isExternalFile(): boolean {
        return !!this._href && !this.isDataUri() && (this._href.startsWith('http') || this._href.includes('.'));
    }

    /**
     * カーソルの設定情報を取得
     */
    public getCursorInfo(): {
        href?: string;
        hotspot: { x?: number; y?: number };
        type: "svg" | "image" | "data-uri" | "external" | "undefined";
    } {
        return {
            href: this._href,
            hotspot: this.getHotspot(),
            type: this.isSvgCursor() ? "svg" :
                  this.isDataUri() ? "data-uri" :
                  this.isExternalFile() ? "external" :
                  this._href ? "image" : "undefined"
        };
    }

    // === 非推奨警告メソッド ===

    /**
     * このコンポーネントの非推奨状況について警告を表示
     */
    public showDeprecationWarning(): void {
        console.warn(`
CursorC は非推奨のSVG要素を使用しています。
モダンなブラウザでは以下のCSS cursor プロパティを使用してください：
- cursor: url('image.png') x y, auto;
- cursor: pointer;
- cursor: crosshair;
- cursor: move;
- cursor: resize;
        `);
    }

    /**
     * CSS cursor プロパティ用の文字列を生成
     */
    public toCssCursor(): string {
        if (!this._href) return "auto";
        
        const hotspot = (this._x !== undefined && this._y !== undefined) 
            ? ` ${this._x} ${this._y}` 
            : "";
        
        return `url('${this._href}')${hotspot}, auto`;
    }

    /**
     * モダンなカーソル設定手法の提案を取得
     */
    public getModernAlternatives(): string[] {
        return [
            "CSS cursor property with url()",
            "CSS cursor: pointer, crosshair, move, etc.",
            "CSS cursor with multiple fallbacks",
            "CSS custom properties for dynamic cursors",
            "JavaScript cursor change on events"
        ];
    }
}
