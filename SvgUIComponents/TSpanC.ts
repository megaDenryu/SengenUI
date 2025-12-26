import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgTextBase } from "./BaseClasses/SvgTextBase";

export interface TSpanOptions {
    text?: string;
    x?: number | number[];
    y?: number | number[];
    dx?: number | number[];
    dy?: number | number[];
    rotate?: number | number[];
    textLength?: number;
    lengthAdjust?: 'spacing' | 'spacingAndGlyphs';
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    textDecoration?: 'none' | 'underline' | 'overline' | 'line-through';
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    className?: string | string[];
    id?: string;
}

/**
 * SVG TSpan要素のコンポーネント
 * Text要素内での部分的なテキストスタイリングのためのSVG要素をラップします
 */
export class TSpanC extends SvgTextBase {
    constructor(options?: TSpanOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.text !== undefined) this.setText(options.text);
            if (options.x !== undefined) this.setXArray(options.x);
            if (options.y !== undefined) this.setYArray(options.y);
            if (options.dx !== undefined) this.setDxArray(options.dx);
            if (options.dy !== undefined) this.setDyArray(options.dy);
            if (options.rotate !== undefined) this.setRotate(options.rotate);
            if (options.textLength !== undefined) this.setTextLength(options.textLength);
            if (options.lengthAdjust) this.setLengthAdjust(options.lengthAdjust);
            if (options.fontFamily) this.setFontFamily(options.fontFamily);
            if (options.fontSize !== undefined) this.setFontSize(options.fontSize);
            if (options.fontWeight !== undefined) this.setFontWeight(options.fontWeight);
            if (options.fontStyle) this.setFontStyle(options.fontStyle);
            if (options.textDecoration) this.setTextDecoration(options.textDecoration);
            if (options.fill) this.setFill(options.fill);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const tspan = SvgElementCreater.createTSpanElement();
        return new SvgElementProxy(tspan);
    }

    /**
     * テキストコンテンツを設定
     */
    public setText(text: string): this {
        this._svgDom.element.textContent = text;
        return this;
    }

    /**
     * テキストコンテンツを取得
     */
    public getText(): string {
        return this._svgDom.element.textContent || "";
    }

    /**
     * X座標を設定（単一値または配列）
     */
    public setXArray(x: number | number[]): this {
        const value = Array.isArray(x) ? x.join(' ') : x.toString();
        this.setSvgAttribute("x", value);
        return this;
    }

    /**
     * X座標を取得
     */
    public getX(): string {
        return this.getSvgAttribute("x") || "";
    }

    /**
     * Y座標を設定（単一値または配列）
     */
    public setYArray(y: number | number[]): this {
        const value = Array.isArray(y) ? y.join(' ') : y.toString();
        this.setSvgAttribute("y", value);
        return this;
    }

    /**
     * Y座標を取得
     */
    public getY(): string {
        return this.getSvgAttribute("y") || "";
    }

    /**
     * X方向オフセットを設定（単一値または配列）
     */
    public setDxArray(dx: number | number[]): this {
        const value = Array.isArray(dx) ? dx.join(' ') : dx.toString();
        this.setSvgAttribute("dx", value);
        return this;
    }

    /**
     * X方向オフセットを取得
     */
    public getDx(): string {
        return this.getSvgAttribute("dx") || "";
    }

    /**
     * Y方向オフセットを設定（単一値または配列）
     */
    public setDyArray(dy: number | number[]): this {
        const value = Array.isArray(dy) ? dy.join(' ') : dy.toString();
        this.setSvgAttribute("dy", value);
        return this;
    }

    /**
     * Y方向オフセットを取得
     */
    public getDy(): string {
        return this.getSvgAttribute("dy") || "";
    }

    /**
     * 回転角度を設定（単一値または配列）
     */
    public setRotate(rotate: number | number[]): this {
        const value = Array.isArray(rotate) ? rotate.join(' ') : rotate.toString();
        this.setSvgAttribute("rotate", value);
        return this;
    }

    /**
     * 回転角度を取得
     */
    public getRotate(): string {
        return this.getSvgAttribute("rotate") || "";
    }

    /**
     * テキストの長さを設定
     */
    public setTextLength(length: number): this {
        this.setSvgAttribute("textLength", length);
        return this;
    }

    /**
     * テキストの長さを取得
     */
    public getTextLength(): number {
        return parseFloat(this.getSvgAttribute("textLength") || "0");
    }

    /**
     * 長さ調整方法を設定
     */
    public setLengthAdjust(adjust: 'spacing' | 'spacingAndGlyphs'): this {
        this.setSvgAttribute("lengthAdjust", adjust);
        return this;
    }

    /**
     * 長さ調整方法を取得
     */
    public getLengthAdjust(): string {
        return this.getSvgAttribute("lengthAdjust") || "";
    }

    /**
     * フォントファミリーを設定
     */
    public setFontFamily(family: string): this {
        this.setSvgAttribute("font-family", family);
        return this;
    }

    /**
     * フォントファミリーを取得
     */
    public getFontFamily(): string {
        return this.getSvgAttribute("font-family") || "";
    }

    /**
     * フォントサイズを設定
     */
    public setFontSize(size: number | string): this {
        this.setSvgAttribute("font-size", size);
        return this;
    }

    /**
     * フォントサイズを取得
     */
    public getFontSize(): string {
        return this.getSvgAttribute("font-size") || "";
    }

    /**
     * フォントウェイトを設定
     */
    public setFontWeight(weight: number | string): this {
        this.setSvgAttribute("font-weight", weight);
        return this;
    }

    /**
     * フォントウェイトを取得
     */
    public getFontWeight(): string {
        return this.getSvgAttribute("font-weight") || "";
    }

    /**
     * フォントスタイルを設定
     */
    public setFontStyle(style: 'normal' | 'italic' | 'oblique'): this {
        this.setSvgAttribute("font-style", style);
        return this;
    }

    /**
     * フォントスタイルを取得
     */
    public getFontStyle(): string {
        return this.getSvgAttribute("font-style") || "";
    }

    /**
     * テキスト装飾を設定
     */
    public setTextDecoration(decoration: 'none' | 'underline' | 'overline' | 'line-through'): this {
        this.setSvgAttribute("text-decoration", decoration);
        return this;
    }

    /**
     * テキスト装飾を取得
     */
    public getTextDecoration(): string {
        return this.getSvgAttribute("text-decoration") || "";
    }

    /**
     * テキストの境界ボックスを取得
     */
    public getBBox(): DOMRect {
        return (this._svgDom.element as SVGTSpanElement).getBBox();
    }

    /**
     * 計算された文字数を取得
     */
    public getNumberOfChars(): number {
        return (this._svgDom.element as SVGTSpanElement).getNumberOfChars();
    }

    /**
     * 指定した文字位置でのテキスト長を取得
     */
    public getSubStringLength(charnum: number, nchars: number): number {
        return (this._svgDom.element as SVGTSpanElement).getSubStringLength(charnum, nchars);
    }

    /**
     * 指定した位置での文字位置を取得
     */
    public getCharNumAtPosition(point: DOMPoint): number {
        return (this._svgDom.element as SVGTSpanElement).getCharNumAtPosition(point);
    }

    /**
     * 強調表示を追加
     */
    public emphasize(): this {
        this.setFontWeight("bold");
        return this;
    }

    /**
     * イタリック体を設定
     */
    public italicize(): this {
        this.setFontStyle("italic");
        return this;
    }

    /**
     * 下線を追加
     */
    public underline(): this {
        this.setTextDecoration("underline");
        return this;
    }

    /**
     * 取り消し線を追加
     */
    public strikethrough(): this {
        this.setTextDecoration("line-through");
        return this;
    }

    /**
     * 相対位置移動
     */
    public moveBy(dx: number, dy: number): this {
        this.setDxArray(dx);
        this.setDyArray(dy);
        return this;
    }

    /**
     * 絶対位置設定
     */
    public moveTo(x: number, y: number): this {
        this.setXArray(x);
        this.setYArray(y);
        return this;
    }

    /**
     * 色付きテキストとしてスタイルを設定
     */
    public setColoredText(text: string, color: string, fontSize?: number | string): this {
        this.setText(text);
        this.setFill(color);
        if (fontSize !== undefined) this.setFontSize(fontSize);
        return this;
    }

    /**
     * 上付き文字スタイルを設定
     */
    public setSuperscript(baselineShift: string = "super"): this {
        this.setSvgAttribute("baseline-shift", baselineShift);
        this.setFontSize("0.7em");
        return this;
    }

    /**
     * 下付き文字スタイルを設定
     */
    public setSubscript(baselineShift: string = "sub"): this {
        this.setSvgAttribute("baseline-shift", baselineShift);
        this.setFontSize("0.7em");
        return this;
    }
}
