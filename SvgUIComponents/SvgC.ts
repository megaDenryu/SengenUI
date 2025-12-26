import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";

export interface SvgOptions {
    className?: string | string[];
    id?: string;
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    xmlns?: string;
    preserveAspectRatio?: string;
    style?: string;
}

/**
 * SVGコンテナ要素 <svg>
 * SVG要素の最上位コンテナとして機能します
 * 
 * @example
 * ```typescript
 * const svg = new SvgC({
 *     width: 800,
 *     height: 600,
 *     viewBox: "0 0 800 600"
 * })
 *     .child(new CircleC({ cx: 100, cy: 100, r: 50 }))
 *     .child(new RectangleC({ x: 200, y: 50, width: 100, height: 75 }));
 * ```
 */
export class SvgC extends SvgContainerBase {
    constructor(options?: SvgOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const svg = SvgElementCreater.createSvgContainerElement();
        return new SvgElementProxy(svg);
    }

    private applyOptions(options?: SvgOptions): void {
        if (!options) return;

        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
        if (options.width !== undefined) {
            this.setWidth(options.width);
        }
        if (options.height !== undefined) {
            this.setHeight(options.height);
        }
        if (options.viewBox) {
            this.setViewBox(options.viewBox);
        }
        if (options.xmlns) {
            this.setXmlns(options.xmlns);
        }
        if (options.preserveAspectRatio) {
            this.setPreserveAspectRatio(options.preserveAspectRatio);
        }
        if (options.style) {
            this.setStyle(options.style);
        }
    }

    // === Core SVG Methods ===

    /**
     * SVGの幅を設定
     */
    public setWidth(width: number | string): this {
        this._svgDom.setSvgAttribute('width', width.toString());
        return this;
    }

    /**
     * SVGの高さを設定
     */
    public setHeight(height: number | string): this {
        this._svgDom.setSvgAttribute('height', height.toString());
        return this;
    }

    /**
     * SVGのビューボックスを設定
     */
    public setViewBox(viewBox: string): this {
        this._svgDom.setSvgAttribute('viewBox', viewBox);
        return this;
    }

    /**
     * XML名前空間を設定
     */
    public setXmlns(xmlns: string): this {
        this._svgDom.setSvgAttribute('xmlns', xmlns);
        return this;
    }

    /**
     * アスペクト比の保持方法を設定
     */
    public setPreserveAspectRatio(value: string): this {
        this._svgDom.setSvgAttribute('preserveAspectRatio', value);
        return this;
    }

    /**
     * スタイルを設定（文字列形式）
     */
    public setStyle(style: string): this {
        this._svgDom.setSvgAttribute('style', style);
        return this;
    }

    /**
     * スタイルを設定（オブジェクト形式）
     * DivCのsetStyleCSSと同じインターフェース
     * @example
     * ```typescript
     * svg.setStyleCSS({
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

    // === Preset Methods ===

    /**
     * フルサイズのSVGキャンバスを作成
     */
    public presetFullSize(): this {
        return this.setWidth('100%').setHeight('100%');
    }

    /**
     * 固定サイズのSVGキャンバスを作成
     */
    public presetFixedSize(width: number, height: number): this {
        return this.setWidth(width).setHeight(height).setViewBox(`0 0 ${width} ${height}`);
    }

    /**
     * レスポンシブなSVGキャンバスを作成
     */
    public presetResponsive(aspectRatio: string = "xMidYMid meet"): this {
        return this.setWidth('100%')
            .setHeight('auto')
            .setPreserveAspectRatio(aspectRatio);
    }

    /**
     * 座標系が見えるデバッグ用SVG
     */
    public presetDebugGrid(width: number = 400, height: number = 400, gridSize: number = 20): this {
        this.setWidth(width)
            .setHeight(height)
            .setViewBox(`0 0 ${width} ${height}`)
            .setStyle('border: 1px solid #ccc; background: linear-gradient(to right, #f9f9f9 1px, transparent 1px), linear-gradient(to bottom, #f9f9f9 1px, transparent 1px); background-size: ' + gridSize + 'px ' + gridSize + 'px;');
        return this;
    }

    /**
     * 図表・チャート用のSVG設定
     */
    public presetChart(width: number = 800, height: number = 600): this {
        return this.setWidth(width)
            .setHeight(height)
            .setViewBox(`0 0 ${width} ${height}`)
            .setPreserveAspectRatio("xMidYMid meet");
    }

    /**
     * アイコン用のSVG設定
     */
    public presetIcon(size: number = 24): this {
        return this.setWidth(size)
            .setHeight(size)
            .setViewBox(`0 0 ${size} ${size}`)
            .setPreserveAspectRatio("xMidYMid meet");
    }

    /**
     * ダッシュボード用の小さなSVG
     */
    public presetDashboardWidget(width: number = 300, height: number = 200): this {
        return this.setWidth(width)
            .setHeight(height)
            .setViewBox(`0 0 ${width} ${height}`)
            .setPreserveAspectRatio("xMidYMid meet");
    }

    /**
     * プリント用の高解像度SVG
     */
    public presetPrint(width: number = 1200, height: number = 800): this {
        return this.setWidth(width)
            .setHeight(height)
            .setViewBox(`0 0 ${width} ${height}`)
            .setPreserveAspectRatio("xMidYMid meet");
    }

    /**
     * モバイル最適化SVG
     */
    public presetMobile(): this {
        return this.setWidth('100%')
            .setHeight('auto')
            .setPreserveAspectRatio("xMidYMid meet")
            .setStyle('max-width: 100%; height: auto;');
    }

    /**
     * インラインSVG（テキスト内埋め込み用）
     */
    public presetInline(size: number = 16): this {
        return this.setWidth(size)
            .setHeight(size)
            .setViewBox(`0 0 ${size} ${size}`)
            .setStyle('vertical-align: middle; display: inline-block;');
    }
}
