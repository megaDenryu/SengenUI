import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";
import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";

export interface PathOptions {
    d?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    strokeDasharray?: string;
    strokeDashoffset?: number;
    fillRule?: 'nonzero' | 'evenodd';
    opacity?: number;
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Path要素のコンポーネント
 * パス（複雑な図形や曲線）を描画するためのSVG要素をラップします
 */
export class PathC extends SvgGraphicsBase {
    private _pathBuilder: PathBuilder;

    constructor(options?: PathOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this._pathBuilder = new PathBuilder();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.d) this.setPath(options.d);
            if (options.fill) this.setFill(options.fill);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.strokeLinecap) this.setStrokeLinecap(options.strokeLinecap);
            if (options.strokeLinejoin) this.setStrokeLinejoin(options.strokeLinejoin);
            if (options.strokeDasharray) this.setStrokeDasharray(options.strokeDasharray);
            if (options.strokeDashoffset !== undefined) this.setStrokeDashoffset(options.strokeDashoffset);
            if (options.fillRule) this.setFillRule(options.fillRule);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const path = SvgElementCreater.createPathElement();
        return new SvgElementProxy(path);
    }

    /**
     * パスデータを設定
     */
    public setPath(d: string): this {
        this.setSvgAttribute("d", d);
        this._pathBuilder.setPath(d);
        return this;
    }

    /**
     * パスデータを取得
     */
    public getPath(): string {
        return this.getSvgAttribute("d") || "";
    }

    /**
     * 線端スタイルを設定
     */
    public setStrokeLinecap(linecap: 'butt' | 'round' | 'square'): this {
        this.setSvgAttribute("stroke-linecap", linecap);
        return this;
    }

    /**
     * 線端スタイルを取得
     */
    public getStrokeLinecap(): string {
        return this.getSvgAttribute("stroke-linecap") || "";
    }

    /**
     * 線の結合スタイルを設定
     */
    public setStrokeLinejoin(linejoin: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'): this {
        this.setSvgAttribute("stroke-linejoin", linejoin);
        return this;
    }

    /**
     * 線の結合スタイルを取得
     */
    public getStrokeLinejoin(): string {
        return this.getSvgAttribute("stroke-linejoin") || "";
    }

    /**
     * 破線パターンを設定
     */
    public setStrokeDasharray(dasharray: string): this {
        this.setSvgAttribute("stroke-dasharray", dasharray);
        return this;
    }

    /**
     * 破線パターンを取得
     */
    public getStrokeDasharray(): string {
        return this.getSvgAttribute("stroke-dasharray") || "";
    }

    /**
     * 破線オフセットを設定
     */
    public setStrokeDashoffset(dashoffset: number): this {
        this.setSvgAttribute("stroke-dashoffset", dashoffset);
        return this;
    }

    /**
     * 破線オフセットを取得
     */
    public getStrokeDashoffset(): number {
        return parseFloat(this.getSvgAttribute("stroke-dashoffset") || "0");
    }

    /**
     * 塗りつぶしルールを設定
     */
    public setFillRule(fillRule: 'nonzero' | 'evenodd'): this {
        this.setSvgAttribute("fill-rule", fillRule);
        return this;
    }

    /**
     * 塗りつぶしルールを取得
     */
    public getFillRule(): string {
        return this.getSvgAttribute("fill-rule") || "";
    }

    /**
     * パスビルダーを取得
     */
    public get pathBuilder(): PathBuilder {
        return this._pathBuilder;
    }

    /**
     * パスビルダーを使用してパスを構築し、適用
     */
    public buildPath(builderFn: (builder: PathBuilder) => void): this {
        this._pathBuilder.clear();
        builderFn(this._pathBuilder);
        this.setPath(this._pathBuilder.toString());
        return this;
    }

    /**
     * パスの境界ボックスを取得
     */
    public getBBox(): DOMRect {
        return (this._svgDom.element as SVGPathElement).getBBox();
    }

    /**
     * パスの総長を取得
     */
    public getTotalLength(): number {
        return (this._svgDom.element as SVGPathElement).getTotalLength();
    }

    /**
     * パス上の指定した距離の点を取得
     */
    public getPointAtLength(distance: number): DOMPoint {
        return (this._svgDom.element as SVGPathElement).getPointAtLength(distance);
    }
}

/**
 * SVGパス構築のためのヘルパークラス
 */
export class PathBuilder {
    private _commands: string[] = [];

    /**
     * 指定した座標に移動
     */
    public moveTo(x: number, y: number): this {
        this._commands.push(`M ${x} ${y}`);
        return this;
    }

    /**
     * 指定した座標まで直線を描画
     */
    public lineTo(x: number, y: number): this {
        this._commands.push(`L ${x} ${y}`);
        return this;
    }

    /**
     * 水平線を描画
     */
    public horizontalLineTo(x: number): this {
        this._commands.push(`H ${x}`);
        return this;
    }

    /**
     * 垂直線を描画
     */
    public verticalLineTo(y: number): this {
        this._commands.push(`V ${y}`);
        return this;
    }

    /**
     * 3次ベジェ曲線を描画
     */
    public curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this {
        this._commands.push(`C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`);
        return this;
    }

    /**
     * 滑らかな3次ベジェ曲線を描画
     */
    public smoothCurveTo(x2: number, y2: number, x: number, y: number): this {
        this._commands.push(`S ${x2} ${y2} ${x} ${y}`);
        return this;
    }

    /**
     * 2次ベジェ曲線を描画
     */
    public quadraticCurveTo(x1: number, y1: number, x: number, y: number): this {
        this._commands.push(`Q ${x1} ${y1} ${x} ${y}`);
        return this;
    }

    /**
     * 滑らかな2次ベジェ曲線を描画
     */
    public smoothQuadraticCurveTo(x: number, y: number): this {
        this._commands.push(`T ${x} ${y}`);
        return this;
    }

    /**
     * 楕円弧を描画
     */
    public arcTo(rx: number, ry: number, xAxisRotation: number, largeArcFlag: 0 | 1, sweepFlag: 0 | 1, x: number, y: number): this {
        this._commands.push(`A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`);
        return this;
    }

    /**
     * パスを閉じる
     */
    public closePath(): this {
        this._commands.push("Z");
        return this;
    }

    /**
     * 相対移動
     */
    public relativeMoveTo(dx: number, dy: number): this {
        this._commands.push(`m ${dx} ${dy}`);
        return this;
    }

    /**
     * 相対直線
     */
    public relativeLineTo(dx: number, dy: number): this {
        this._commands.push(`l ${dx} ${dy}`);
        return this;
    }

    /**
     * 矩形を描画
     */
    public rect(x: number, y: number, width: number, height: number): this {
        return this.moveTo(x, y)
            .horizontalLineTo(x + width)
            .verticalLineTo(y + height)
            .horizontalLineTo(x)
            .closePath();
    }

    /**
     * 円を描画
     */
    public circle(cx: number, cy: number, r: number): this {
        return this.moveTo(cx + r, cy)
            .arcTo(r, r, 0, 0, 1, cx, cy + r)
            .arcTo(r, r, 0, 0, 1, cx - r, cy)
            .arcTo(r, r, 0, 0, 1, cx, cy - r)
            .arcTo(r, r, 0, 0, 1, cx + r, cy);
    }

    /**
     * 楕円を描画
     */
    public ellipse(cx: number, cy: number, rx: number, ry: number): this {
        return this.moveTo(cx + rx, cy)
            .arcTo(rx, ry, 0, 0, 1, cx, cy + ry)
            .arcTo(rx, ry, 0, 0, 1, cx - rx, cy)
            .arcTo(rx, ry, 0, 0, 1, cx, cy - ry)
            .arcTo(rx, ry, 0, 0, 1, cx + rx, cy);
    }

    /**
     * コマンドをクリア
     */
    public clear(): this {
        this._commands = [];
        return this;
    }

    /**
     * 既存のパス文字列を設定
     */
    public setPath(d: string): this {
        this._commands = [d];
        return this;
    }

    /**
     * パス文字列を取得
     */
    public toString(): string {
        return this._commands.join(" ");
    }
}
