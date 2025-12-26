import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

export interface MissingGlyphOptions {
    className?: string | string[];
    id?: string;
    d?: string;
    horizAdvX?: number;
    vertOriginX?: number;
    vertOriginY?: number;
    vertAdvY?: number;
}

/**
 * SVG欠損グリフ要素 <missing-glyph>
 * フォントで定義されていない文字に対するフォールバックグリフを定義（非推奨だが互換性のために提供）
 * 
 * @example
 * ```typescript
 * const missingGlyph = new MissingGlyphC({
 *     horizAdvX: 1000,
 *     d: "M100 100L900 100L900 600L100 600ZM200 200L800 200L800 500L200 500Z"
 * })
 *     .presetQuestionMarkFallback();
 * ```
 */
export class MissingGlyphC extends SvgFontBase {
    constructor(options?: MissingGlyphOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const missingGlyph = SvgElementCreater.createMissingGlyphElement();
        return new SvgElementProxy(missingGlyph);
    }

    private applyOptions(options?: MissingGlyphOptions): void {
        if (!options) return;

        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
        if (options.d) {
            this.setD(options.d);
        }
        if (options.horizAdvX !== undefined) {
            this.setHorizAdvX(options.horizAdvX);
        }
        if (options.vertOriginX !== undefined) {
            this.setVertOriginX(options.vertOriginX);
        }
        if (options.vertOriginY !== undefined) {
            this.setVertOriginY(options.vertOriginY);
        }
        if (options.vertAdvY !== undefined) {
            this.setVertAdvY(options.vertAdvY);
        }
    }

    // === Core Missing Glyph Methods ===

    /**
     * パスデータを設定
     */
    public setD(d: string): this {
        this._svgDom.setSvgAttribute('d', d);
        return this;
    }

    /**
     * 水平方向の前進幅を設定
     */
    public setHorizAdvX(horizAdvX: number): this {
        this._svgDom.setSvgAttribute('horiz-adv-x', horizAdvX);
        return this;
    }

    /**
     * 垂直方向の原点X座標を設定
     */
    public setVertOriginX(vertOriginX: number): this {
        this._svgDom.setSvgAttribute('vert-origin-x', vertOriginX);
        return this;
    }

    /**
     * 垂直方向の原点Y座標を設定
     */
    public setVertOriginY(vertOriginY: number): this {
        this._svgDom.setSvgAttribute('vert-origin-y', vertOriginY);
        return this;
    }

    /**
     * 垂直方向の前進幅を設定
     */
    public setVertAdvY(vertAdvY: number): this {
        this._svgDom.setSvgAttribute('vert-adv-y', vertAdvY);
        return this;
    }

    /**
     * 垂直方向の原点を設定
     */
    public setVerticalOrigin(x: number, y: number): this {
        return this.setVertOriginX(x).setVertOriginY(y);
    }

    // === Preset Methods ===

    /**
     * 基本的な欠損グリフ設定（空の矩形）
     */
    public presetBasicMissing(): this {
        const emptyBoxPath = "M100 100L900 100L900 600L100 600ZM200 200L800 200L800 500L200 500Z";
        return this.setD(emptyBoxPath)
            .setHorizAdvX(1000);
    }

    /**
     * クエスチョンマーク型の欠損グリフ
     */
    public presetQuestionMarkFallback(): this {
        // 簡易的な?マーク形状
        const questionPath = "M350 650C350 680 380 700 420 700C460 700 490 680 490 650C490 620 470 600 450 580L430 550L430 480L450 480L450 550L470 580C500 610 520 630 520 650C520 700 480 740 420 740C360 740 320 700 320 650L350 650ZM420 400C440 400 460 380 460 360C460 340 440 320 420 320C400 320 380 340 380 360C380 380 400 400 420 400Z";
        return this.setD(questionPath)
            .setHorizAdvX(800);
    }

    /**
     * X印型の欠損グリフ
     */
    public presetCrossFallback(): this {
        const crossPath = "M200 200L400 400L600 200L700 300L500 500L700 700L600 800L400 600L200 800L100 700L300 500L100 300Z";
        return this.setD(crossPath)
            .setHorizAdvX(800);
    }

    /**
     * 四角形の欠損グリフ
     */
    public presetSquareFallback(): this {
        const squarePath = "M150 150L650 150L650 650L150 650Z";
        return this.setD(squarePath)
            .setHorizAdvX(800);
    }

    /**
     * 三角形の欠損グリフ
     */
    public presetTriangleFallback(): this {
        const trianglePath = "M400 150L650 600L150 600Z";
        return this.setD(trianglePath)
            .setHorizAdvX(800);
    }

    /**
     * ドット型の欠損グリフ
     */
    public presetDotFallback(): this {
        const dotPath = "M350 350C350 380 370 400 400 400C430 400 450 380 450 350C450 320 430 300 400 300C370 300 350 320 350 350Z";
        return this.setD(dotPath)
            .setHorizAdvX(800);
    }

    /**
     * 感嘆符型の欠損グリフ
     */
    public presetExclamationFallback(): this {
        const exclamationPath = "M380 700L420 700L420 400L380 400ZM380 350L420 350L420 300L380 300Z";
        return this.setD(exclamationPath)
            .setHorizAdvX(800);
    }

    /**
     * 垂直書き用の欠損グリフ
     */
    public presetVerticalMissing(): this {
        const verticalPath = "M100 100L600 100L600 900L100 900ZM200 200L500 200L500 800L200 800Z";
        return this.setD(verticalPath)
            .setVertAdvY(1000)
            .setVerticalOrigin(350, 500);
    }

    /**
     * 等幅用の欠損グリフ
     */
    public presetMonospaceMissing(): this {
        const monoPath = "M50 100L550 100L550 600L50 600ZM100 150L500 150L500 550L100 550Z";
        return this.setD(monoPath)
            .setHorizAdvX(600);
    }

    /**
     * デバッグ用の欠損グリフ
     */
    public presetDebugMissing(): this {
        // デバッグ用の格子模様
        const debugPath = "M0 0L1000 0L1000 1000L0 1000ZM100 100L900 100M100 200L900 200M100 300L900 300M100 400L900 400M100 500L900 500M100 600L900 600M100 700L900 700M100 800L900 800M100 900L900 900M100 100L100 900M200 100L200 900M300 100L300 900M400 100L400 900M500 100L500 900M600 100L600 900M700 100L700 900M800 100L800 900M900 100L900 900";
        return this.setD(debugPath)
            .setHorizAdvX(1000);
    }
}
