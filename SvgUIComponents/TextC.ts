import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";

export interface TextOptions {
    x?: number;
    y?: number;
    text?: string;
    fontSize?: number | string;
    fontFamily?: string;
    fontWeight?: string | number;
    fontStyle?: string;
    textAnchor?: 'start' | 'middle' | 'end';
    dominantBaseline?: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    letterSpacing?: number | string;
    wordSpacing?: number | string;
    textDecoration?: 'none' | 'underline' | 'overline' | 'line-through';
    writingMode?: 'lr-tb' | 'rl-tb' | 'tb-rl' | 'lr' | 'rl' | 'tb';
    direction?: 'ltr' | 'rtl';
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Text要素のコンポーネント
 * テキストを描画するためのSVG要素をラップします
 */
export class TextC extends SvgContainerBase {
    constructor(options?: TextOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.text !== undefined) this.setText(options.text);
            if (options.fontSize !== undefined) this.setFontSize(options.fontSize);
            if (options.fontFamily) this.setFontFamily(options.fontFamily);
            if (options.fontWeight !== undefined) this.setFontWeight(options.fontWeight);
            if (options.fontStyle) this.setFontStyle(options.fontStyle);
            if (options.textAnchor) this.setTextAnchor(options.textAnchor);
            if (options.dominantBaseline) this.setDominantBaseline(options.dominantBaseline);
            if (options.fill) this.setFill(options.fill);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.letterSpacing !== undefined) this.setLetterSpacing(options.letterSpacing);
            if (options.wordSpacing !== undefined) this.setWordSpacing(options.wordSpacing);
            if (options.textDecoration) this.setTextDecoration(options.textDecoration);
            if (options.writingMode) this.setWritingMode(options.writingMode);
            if (options.direction) this.setDirection(options.direction);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const text = SvgElementCreater.createTextElement();
        return new SvgElementProxy(text);
    }

    /**
     * テキストのX座標を設定
     */
    public setX(x: number): this {
        this.setSvgAttribute("x", x);
        return this;
    }

    /**
     * テキストのX座標を取得
     */
    public getX(): number {
        return parseFloat(this.getSvgAttribute("x") || "0");
    }

    /**
     * テキストのY座標を設定
     */
    public setY(y: number): this {
        this.setSvgAttribute("y", y);
        return this;
    }

    /**
     * テキストのY座標を取得
     */
    public getY(): number {
        return parseFloat(this.getSvgAttribute("y") || "0");
    }

    /**
     * テキスト内容を設定
     */
    public setText(text: string): this {
        this._svgDom.element.textContent = text;
        return this;
    }

    /**
     * テキスト内容を取得
     */
    public getText(): string {
        return this._svgDom.element.textContent || "";
    }

    /**
     * フォントサイズを設定
     */
    public setFontSize(fontSize: number | string): this {
        this.setSvgAttribute("font-size", fontSize);
        return this;
    }

    /**
     * フォントサイズを取得
     */
    public getFontSize(): string {
        return this.getSvgAttribute("font-size") || "";
    }

    /**
     * フォントファミリーを設定
     */
    public setFontFamily(fontFamily: string): this {
        this.setSvgAttribute("font-family", fontFamily);
        return this;
    }

    /**
     * フォントファミリーを取得
     */
    public getFontFamily(): string {
        return this.getSvgAttribute("font-family") || "";
    }

    /**
     * フォントの太さを設定
     */
    public setFontWeight(fontWeight: string | number): this {
        this.setSvgAttribute("font-weight", fontWeight);
        return this;
    }

    /**
     * フォントの太さを取得
     */
    public getFontWeight(): string {
        return this.getSvgAttribute("font-weight") || "";
    }

    /**
     * フォントスタイルを設定
     */
    public setFontStyle(fontStyle: string): this {
        this.setSvgAttribute("font-style", fontStyle);
        return this;
    }

    /**
     * フォントスタイルを取得
     */
    public getFontStyle(): string {
        return this.getSvgAttribute("font-style") || "";
    }

    /**
     * テキストアンカー（水平配置）を設定
     */
    public setTextAnchor(textAnchor: 'start' | 'middle' | 'end'): this {
        this.setSvgAttribute("text-anchor", textAnchor);
        return this;
    }

    /**
     * テキストアンカーを取得
     */
    public getTextAnchor(): string {
        return this.getSvgAttribute("text-anchor") || "";
    }

    /**
     * 垂直ベースラインを設定
     */
    public setDominantBaseline(dominantBaseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top'): this {
        this.setSvgAttribute("dominant-baseline", dominantBaseline);
        return this;
    }

    /**
     * 垂直ベースラインを取得
     */
    public getDominantBaseline(): string {
        return this.getSvgAttribute("dominant-baseline") || "";
    }

    /**
     * 文字間隔を設定
     */
    public setLetterSpacing(letterSpacing: number | string): this {
        this.setSvgAttribute("letter-spacing", letterSpacing);
        return this;
    }

    /**
     * 文字間隔を取得
     */
    public getLetterSpacing(): string {
        return this.getSvgAttribute("letter-spacing") || "";
    }

    /**
     * 単語間隔を設定
     */
    public setWordSpacing(wordSpacing: number | string): this {
        this.setSvgAttribute("word-spacing", wordSpacing);
        return this;
    }

    /**
     * 単語間隔を取得
     */
    public getWordSpacing(): string {
        return this.getSvgAttribute("word-spacing") || "";
    }

    /**
     * テキスト装飾を設定
     */
    public setTextDecoration(textDecoration: 'none' | 'underline' | 'overline' | 'line-through'): this {
        this.setSvgAttribute("text-decoration", textDecoration);
        return this;
    }

    /**
     * テキスト装飾を取得
     */
    public getTextDecoration(): string {
        return this.getSvgAttribute("text-decoration") || "";
    }

    /**
     * 書字方向を設定
     */
    public setWritingMode(writingMode: 'lr-tb' | 'rl-tb' | 'tb-rl' | 'lr' | 'rl' | 'tb'): this {
        this.setSvgAttribute("writing-mode", writingMode);
        return this;
    }

    /**
     * 書字方向を取得
     */
    public getWritingMode(): string {
        return this.getSvgAttribute("writing-mode") || "";
    }

    /**
     * テキスト方向を設定
     */
    public setDirection(direction: 'ltr' | 'rtl'): this {
        this.setSvgAttribute("direction", direction);
        return this;
    }

    /**
     * テキスト方向を取得
     */
    public getDirection(): string {
        return this.getSvgAttribute("direction") || "";
    }

    /**
     * テキストの位置を設定
     */
    public setPosition(x: number, y: number): this {
        this.setX(x);
        this.setY(y);
        return this;
    }

    /**
     * テキストの位置を取得
     */
    public getPosition(): { x: number, y: number } {
        return {
            x: this.getX(),
            y: this.getY()
        };
    }

    /**
     * テキストスタイルを一括設定
     */
    public setTextStyle(style: {
        fontSize?: number | string;
        fontFamily?: string;
        fontWeight?: string | number;
        fontStyle?: string;
        fill?: string;
        textAnchor?: 'start' | 'middle' | 'end';
        dominantBaseline?: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    }): this {
        if (style.fontSize !== undefined) this.setFontSize(style.fontSize);
        if (style.fontFamily) this.setFontFamily(style.fontFamily);
        if (style.fontWeight !== undefined) this.setFontWeight(style.fontWeight);
        if (style.fontStyle) this.setFontStyle(style.fontStyle);
        if (style.fill) this.setFill(style.fill);
        if (style.textAnchor) this.setTextAnchor(style.textAnchor);
        if (style.dominantBaseline) this.setDominantBaseline(style.dominantBaseline);
        return this;
    }

    /**
     * テキストの境界ボックスを取得
     */
    public getBBox(): DOMRect {
        return (this._svgDom.element as SVGTextElement).getBBox();
    }

    /**
     * テキストの長さを取得
     */
    public getComputedTextLength(): number {
        return (this._svgDom.element as SVGTextElement).getComputedTextLength();
    }

    /**
     * 指定した長さにテキストをスケーリング
     */
    public setTextLength(length: number): this {
        this.setSvgAttribute("textLength", length);
        return this;
    }

    /**
     * テキスト長の調整方法を設定
     */
    public setLengthAdjust(lengthAdjust: 'spacing' | 'spacingAndGlyphs'): this {
        this.setSvgAttribute("lengthAdjust", lengthAdjust);
        return this;
    }
}
