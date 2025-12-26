import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgTextBase } from "./BaseClasses/SvgTextBase";

export interface TextPathOptions {
    text?: string;
    href?: string;
    startOffset?: number | string;
    method?: 'align' | 'stretch';
    spacing?: 'auto' | 'exact';
    side?: 'left' | 'right';
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
 * SVG TextPath要素のコンポーネント
 * パスに沿ってテキストを描画するためのSVG要素をラップします
 */
export class TextPathC extends SvgTextBase {
    constructor(options?: TextPathOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.text !== undefined) this.setText(options.text);
            if (options.href) this.setHref(options.href);
            if (options.startOffset !== undefined) this.setStartOffset(options.startOffset);
            if (options.method) this.setMethod(options.method);
            if (options.spacing) this.setSpacing(options.spacing);
            if (options.side) this.setSide(options.side);
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
        const textPath = SvgElementCreater.createTextPathElement();
        return new SvgElementProxy(textPath);
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
     * 参照するパスのhrefを設定
     */
    public setHref(href: string): this {
        if (!href.startsWith('#')) {
            href = '#' + href;
        }
        this.setSvgAttribute("href", href);
        return this;
    }

    /**
     * 参照するパスのhrefを取得
     */
    public getHref(): string {
        return this.getSvgAttribute("href") || "";
    }

    /**
     * パス上の開始オフセットを設定
     */
    public setStartOffset(offset: number | string): this {
        this.setSvgAttribute("startOffset", offset);
        return this;
    }

    /**
     * パス上の開始オフセットを取得
     */
    public getStartOffset(): string {
        return this.getSvgAttribute("startOffset") || "";
    }

    /**
     * テキストレンダリングメソッドを設定
     */
    public setMethod(method: 'align' | 'stretch'): this {
        this.setSvgAttribute("method", method);
        return this;
    }

    /**
     * テキストレンダリングメソッドを取得
     */
    public getMethod(): string {
        return this.getSvgAttribute("method") || "";
    }

    /**
     * 文字間スペーシングを設定
     */
    public setSpacing(spacing: 'auto' | 'exact'): this {
        this.setSvgAttribute("spacing", spacing);
        return this;
    }

    /**
     * 文字間スペーシングを取得
     */
    public getSpacing(): string {
        return this.getSvgAttribute("spacing") || "";
    }

    /**
     * パスのどちら側にテキストを配置するかを設定
     */
    public setSide(side: 'left' | 'right'): this {
        this.setSvgAttribute("side", side);
        return this;
    }

    /**
     * パスのどちら側にテキストを配置するかを取得
     */
    public getSide(): string {
        return this.getSvgAttribute("side") || "";
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
        return (this._svgDom.element as SVGTextPathElement).getBBox();
    }

    /**
     * 計算された文字数を取得
     */
    public getNumberOfChars(): number {
        return (this._svgDom.element as SVGTextPathElement).getNumberOfChars();
    }

    /**
     * 指定した文字位置でのテキスト長を取得
     */
    public getSubStringLength(charnum: number, nchars: number): number {
        return (this._svgDom.element as SVGTextPathElement).getSubStringLength(charnum, nchars);
    }

    /**
     * 指定した位置での文字位置を取得
     */
    public getCharNumAtPosition(point: DOMPoint): number {
        return (this._svgDom.element as SVGTextPathElement).getCharNumAtPosition(point);
    }

    /**
     * パーセンテージでの開始オフセットを設定
     */
    public setStartOffsetPercent(percent: number): this {
        this.setStartOffset(`${percent}%`);
        return this;
    }

    /**
     * パスの中央にテキストを配置
     */
    public centerOnPath(): this {
        this.setStartOffset("50%");
        return this;
    }

    /**
     * パスの終端にテキストを配置
     */
    public alignToEnd(): this {
        this.setStartOffset("100%");
        return this;
    }

    /**
     * パスの開始点にテキストを配置
     */
    public alignToStart(): this {
        this.setStartOffset("0%");
        return this;
    }

    /**
     * 円形パス用の設定
     */
    public setCircularPath(radius: number, centerX: number = 0, centerY: number = 0): this {
        // Note: 実際の円形パスは別途作成する必要があります
        // ここでは設定のヘルパーメソッドとして提供
        this.setMethod("align");
        this.setSpacing("auto");
        return this;
    }

    /**
     * ウェーブパス用の設定
     */
    public setWavePath(): this {
        this.setMethod("align");
        this.setSpacing("exact");
        return this;
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
     * アニメーション用のオフセット設定
     */
    public animateAlongPath(duration: string = "3s", direction: 'forward' | 'reverse' = 'forward'): this {
        const startOffset = direction === 'forward' ? "0%" : "100%";
        const endOffset = direction === 'forward' ? "100%" : "0%";
        
        // アニメーション要素を作成（簡単な実装例）
        const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animate.setAttribute("attributeName", "startOffset");
        animate.setAttribute("values", `${startOffset};${endOffset}`);
        animate.setAttribute("dur", duration);
        animate.setAttribute("repeatCount", "indefinite");
        
        this._svgDom.element.appendChild(animate);
        return this;
    }

    /**
     * パスID による参照設定
     */
    public setPathById(pathId: string): this {
        this.setHref(`#${pathId}`);
        return this;
    }
}
