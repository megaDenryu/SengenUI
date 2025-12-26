import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

export interface FontFaceOptions {
    className?: string | string[];
    id?: string;
    fontFamily?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    fontStretch?: string;
    fontSize?: string;
    unicodeRange?: string;
    unitsPerEm?: number;
    panose1?: string;
    stemv?: number;
    stemh?: number;
    slope?: number;
    capHeight?: number;
    xHeight?: number;
    accentHeight?: number;
    ascent?: number;
    descent?: number;
    widths?: string;
    bbox?: string;
    ideographic?: number;
    alphabetic?: number;
    mathematical?: number;
    hanging?: number;
    vIdeographic?: number;
    vAlphabetic?: number;
    vMathematical?: number;
    vHanging?: number;
    underlinePosition?: number;
    underlineThickness?: number;
    strikethroughPosition?: number;
    strikethroughThickness?: number;
    overlinePosition?: number;
    overlineThickness?: number;
}

/**
 * SVGフォントフェース要素 <font-face>
 * フォントの特性を定義する要素（非推奨だが互換性のために提供）
 * 
 * @example
 * ```typescript
 * const fontFace = new FontFaceC({
 *     fontFamily: "MyCustomFont",
 *     unitsPerEm: 1000,
 *     ascent: 800,
 *     descent: 200
 * })
 *     .setFontWeight("normal")
 *     .setFontStyle("normal");
 * ```
 */
export class FontFaceC extends SvgFontBase {
    constructor(options?: FontFaceOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const fontFace = SvgElementCreater.createFontFaceElement();
        return new SvgElementProxy(fontFace);
    }

    private applyOptions(options?: FontFaceOptions): void {
        if (!options) return;

        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
        if (options.fontFamily) {
            this.setFontFamily(options.fontFamily);
        }
        if (options.fontStyle) {
            this.setFontStyle(options.fontStyle);
        }
        if (options.fontVariant) {
            this.setFontVariant(options.fontVariant);
        }
        if (options.fontWeight) {
            this.setFontWeight(options.fontWeight);
        }
        if (options.fontStretch) {
            this.setFontStretch(options.fontStretch);
        }
        if (options.fontSize) {
            this.setFontSize(options.fontSize);
        }
        if (options.unicodeRange) {
            this.setUnicodeRange(options.unicodeRange);
        }
        if (options.unitsPerEm !== undefined) {
            this.setUnitsPerEm(options.unitsPerEm);
        }
        if (options.panose1) {
            this.setPanose1(options.panose1);
        }
        if (options.stemv !== undefined) {
            this.setStemV(options.stemv);
        }
        if (options.stemh !== undefined) {
            this.setStemH(options.stemh);
        }
        if (options.slope !== undefined) {
            this.setSlope(options.slope);
        }
        if (options.capHeight !== undefined) {
            this.setCapHeight(options.capHeight);
        }
        if (options.xHeight !== undefined) {
            this.setXHeight(options.xHeight);
        }
        if (options.accentHeight !== undefined) {
            this.setAccentHeight(options.accentHeight);
        }
        if (options.ascent !== undefined) {
            this.setAscent(options.ascent);
        }
        if (options.descent !== undefined) {
            this.setDescent(options.descent);
        }
        if (options.alphabetic !== undefined) {
            this.setAlphabetic(options.alphabetic);
        }
    }

    // === Core Font Face Methods ===

    /**
     * フォントファミリーを設定
     */
    public setFontFamily(fontFamily: string): this {
        this._svgDom.setSvgAttribute('font-family', fontFamily);
        return this;
    }

    /**
     * フォントスタイルを設定
     */
    public setFontStyle(fontStyle: string): this {
        this._svgDom.setSvgAttribute('font-style', fontStyle);
        return this;
    }

    /**
     * フォントバリアントを設定
     */
    public setFontVariant(fontVariant: string): this {
        this._svgDom.setSvgAttribute('font-variant', fontVariant);
        return this;
    }

    /**
     * フォントウェイトを設定
     */
    public setFontWeight(fontWeight: string): this {
        this._svgDom.setSvgAttribute('font-weight', fontWeight);
        return this;
    }

    /**
     * フォントストレッチを設定
     */
    public setFontStretch(fontStretch: string): this {
        this._svgDom.setSvgAttribute('font-stretch', fontStretch);
        return this;
    }

    /**
     * フォントサイズを設定
     */
    public setFontSize(fontSize: string): this {
        this._svgDom.setSvgAttribute('font-size', fontSize);
        return this;
    }

    /**
     * Unicode範囲を設定
     */
    public setUnicodeRange(unicodeRange: string): this {
        this._svgDom.setSvgAttribute('unicode-range', unicodeRange);
        return this;
    }

    /**
     * EMユニット数を設定
     */
    public setUnitsPerEm(unitsPerEm: number): this {
        this._svgDom.setSvgAttribute('units-per-em', unitsPerEm);
        return this;
    }

    /**
     * PANOSE-1分類を設定
     */
    public setPanose1(panose1: string): this {
        this._svgDom.setSvgAttribute('panose-1', panose1);
        return this;
    }

    /**
     * 垂直ステム幅を設定
     */
    public setStemV(stemv: number): this {
        this._svgDom.setSvgAttribute('stemv', stemv);
        return this;
    }

    /**
     * 水平ステム幅を設定
     */
    public setStemH(stemh: number): this {
        this._svgDom.setSvgAttribute('stemh', stemh);
        return this;
    }

    /**
     * 斜体の傾きを設定
     */
    public setSlope(slope: number): this {
        this._svgDom.setSvgAttribute('slope', slope);
        return this;
    }

    /**
     * キャップハイトを設定
     */
    public setCapHeight(capHeight: number): this {
        this._svgDom.setSvgAttribute('cap-height', capHeight);
        return this;
    }

    /**
     * Xハイトを設定
     */
    public setXHeight(xHeight: number): this {
        this._svgDom.setSvgAttribute('x-height', xHeight);
        return this;
    }

    /**
     * アクセントハイトを設定
     */
    public setAccentHeight(accentHeight: number): this {
        this._svgDom.setSvgAttribute('accent-height', accentHeight);
        return this;
    }

    /**
     * アセント値を設定
     */
    public setAscent(ascent: number): this {
        this._svgDom.setSvgAttribute('ascent', ascent);
        return this;
    }

    /**
     * ディセント値を設定
     */
    public setDescent(descent: number): this {
        this._svgDom.setSvgAttribute('descent', descent);
        return this;
    }

    /**
     * アルファベットベースラインを設定
     */
    public setAlphabetic(alphabetic: number): this {
        this._svgDom.setSvgAttribute('alphabetic', alphabetic);
        return this;
    }

    // === Preset Methods ===

    /**
     * 基本的な欧文フォント設定
     */
    public presetLatinFont(fontFamily: string): this {
        return this.setFontFamily(fontFamily)
            .setUnitsPerEm(1000)
            .setAscent(800)
            .setDescent(200)
            .setAlphabetic(0);
    }

    /**
     * 太字フォント設定
     */
    public presetBoldFont(): this {
        return this.setFontWeight("bold")
            .setFontStyle("normal");
    }

    /**
     * イタリック体フォント設定
     */
    public presetItalicFont(): this {
        return this.setFontStyle("italic")
            .setSlope(-15);
    }

    /**
     * 等幅フォント設定
     */
    public presetMonospaceFont(): this {
        return this.setFontFamily("monospace")
            .setFontStretch("normal")
            .setFontVariant("normal");
    }

    /**
     * 表示用フォント設定
     */
    public presetDisplayFont(): this {
        return this.setFontWeight("normal")
            .setFontStyle("normal")
            .setFontStretch("normal");
    }

    /**
     * デバッグ用フォント設定
     */
    public presetDebugFont(): this {
        return this.setFontFamily("debug")
            .setUnitsPerEm(1000)
            .setAscent(750)
            .setDescent(250);
    }
}
