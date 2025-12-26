import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

export interface GlyphOptions {
    className?: string | string[];
    id?: string;
    unicode?: string;
    glyphName?: string;
    d?: string;
    horizAdvX?: number;
    vertOriginX?: number;
    vertOriginY?: number;
    vertAdvY?: number;
    arabicForm?: string;
    lang?: string;
    orientation?: string;
}

/**
 * SVGグリフ要素 <glyph>
 * フォント内の個別の文字やシンボルを定義する要素（非推奨だが互換性のために提供）
 * 
 * @example
 * ```typescript
 * const glyph = new GlyphC({
 *     unicode: "A",
 *     glyphName: "A",
 *     horizAdvX: 1000,
 *     d: "M100 0L900 0L900 100L500 500L100 100Z"
 * })
 *     .setVerticalOrigin(500, 750);
 * ```
 */
export class GlyphC extends SvgFontBase {
    constructor(options?: GlyphOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const glyph = SvgElementCreater.createGlyphElement();
        return new SvgElementProxy(glyph);
    }

    private applyOptions(options?: GlyphOptions): void {
        if (!options) return;

        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
        if (options.unicode) {
            this.setUnicode(options.unicode);
        }
        if (options.glyphName) {
            this.setGlyphName(options.glyphName);
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
        if (options.arabicForm) {
            this.setArabicForm(options.arabicForm);
        }
        if (options.lang) {
            this.setLang(options.lang);
        }
        if (options.orientation) {
            this.setOrientation(options.orientation);
        }
    }

    // === Core Glyph Methods ===

    /**
     * Unicode文字を設定
     */
    public setUnicode(unicode: string): this {
        this._svgDom.setSvgAttribute('unicode', unicode);
        return this;
    }

    /**
     * グリフ名を設定
     */
    public setGlyphName(glyphName: string): this {
        this._svgDom.setSvgAttribute('glyph-name', glyphName);
        return this;
    }

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

    /**
     * アラビア文字の形式を設定
     */
    public setArabicForm(arabicForm: string): this {
        this._svgDom.setSvgAttribute('arabic-form', arabicForm);
        return this;
    }

    /**
     * 言語を設定
     */
    public setLang(lang: string): this {
        this._svgDom.setSvgAttribute('lang', lang);
        return this;
    }

    /**
     * 文字の向きを設定
     */
    public setOrientation(orientation: string): this {
        this._svgDom.setSvgAttribute('orientation', orientation);
        return this;
    }

    // === Preset Methods ===

    /**
     * 基本的な文字グリフ設定
     */
    public presetBasicCharacter(unicode: string, name: string, path: string): this {
        return this.setUnicode(unicode)
            .setGlyphName(name)
            .setD(path)
            .setHorizAdvX(1000);
    }

    /**
     * 数字グリフ設定
     */
    public presetDigit(digit: string, path: string): this {
        return this.setUnicode(digit)
            .setGlyphName(`digit${digit}`)
            .setD(path)
            .setHorizAdvX(600);
    }

    /**
     * 大文字アルファベット設定
     */
    public presetUppercaseLetter(letter: string, path: string): this {
        return this.setUnicode(letter)
            .setGlyphName(`uppercase${letter}`)
            .setD(path)
            .setHorizAdvX(800);
    }

    /**
     * 小文字アルファベット設定
     */
    public presetLowercaseLetter(letter: string, path: string): this {
        return this.setUnicode(letter)
            .setGlyphName(`lowercase${letter}`)
            .setD(path)
            .setHorizAdvX(600);
    }

    /**
     * 記号グリフ設定
     */
    public presetSymbol(unicode: string, name: string, path: string): this {
        return this.setUnicode(unicode)
            .setGlyphName(name)
            .setD(path)
            .setHorizAdvX(500);
    }

    /**
     * 垂直書き用グリフ設定
     */
    public presetVerticalGlyph(unicode: string, path: string): this {
        return this.setUnicode(unicode)
            .setD(path)
            .setVertAdvY(1000)
            .setVerticalOrigin(500, 880)
            .setOrientation("v");
    }

    /**
     * 等幅グリフ設定
     */
    public presetMonospaceGlyph(unicode: string, path: string): this {
        return this.setUnicode(unicode)
            .setD(path)
            .setHorizAdvX(600);
    }

    /**
     * デバッグ用グリフ設定
     */
    public presetDebugGlyph(unicode: string): this {
        // 簡単な矩形グリフ
        const debugPath = "M50 0L550 0L550 700L50 700Z";
        return this.setUnicode(unicode)
            .setGlyphName(`debug_${unicode}`)
            .setD(debugPath)
            .setHorizAdvX(600);
    }
}
