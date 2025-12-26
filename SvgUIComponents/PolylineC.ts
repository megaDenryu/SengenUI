import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";
import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";

export interface PolylineOptions {
    points?: string | number[][];
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    strokeDasharray?: string;
    strokeDashoffset?: number;
    opacity?: number;
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Polyline要素のコンポーネント
 * 連続した線（開いた図形）を描画するためのSVG要素をラップします
 */
export class PolylineC extends SvgGraphicsBase {
    constructor(options?: PolylineOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.points) this.setPoints(options.points);
            if (options.fill) this.setFill(options.fill);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.strokeLinecap) this.setStrokeLinecap(options.strokeLinecap);
            if (options.strokeLinejoin) this.setStrokeLinejoin(options.strokeLinejoin);
            if (options.strokeDasharray) this.setStrokeDasharray(options.strokeDasharray);
            if (options.strokeDashoffset !== undefined) this.setStrokeDashoffset(options.strokeDashoffset);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const polyline = SvgElementCreater.createPolylineElement();
        return new SvgElementProxy(polyline);
    }

    /**
     * ポリラインの点を設定（文字列または座標配列）
     */
    public setPoints(points: string | number[][]): this {
        let pointsString: string;
        
        if (typeof points === 'string') {
            pointsString = points;
        } else {
            pointsString = points.map(point => `${point[0]},${point[1]}`).join(' ');
        }
        
        this.setSvgAttribute("points", pointsString);
        return this;
    }

    /**
     * ポリラインの点を取得
     */
    public getPoints(): string {
        return this.getSvgAttribute("points") || "";
    }

    /**
     * ポリラインの点を座標配列として取得
     */
    public getPointsArray(): number[][] {
        const pointsString = this.getPoints();
        if (!pointsString) return [];
        
        return pointsString.split(/\s+/)
            .filter(Boolean)
            .map(point => {
                const [x, y] = point.split(',').map(Number);
                return [x, y];
            });
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
     * 点を追加
     */
    public addPoint(x: number, y: number): this {
        const currentPoints = this.getPointsArray();
        currentPoints.push([x, y]);
        this.setPoints(currentPoints);
        return this;
    }

    /**
     * 指定したインデックスの点を削除
     */
    public removePoint(index: number): this {
        const currentPoints = this.getPointsArray();
        if (index >= 0 && index < currentPoints.length) {
            currentPoints.splice(index, 1);
            this.setPoints(currentPoints);
        }
        return this;
    }

    /**
     * 指定したインデックスの点を更新
     */
    public updatePoint(index: number, x: number, y: number): this {
        const currentPoints = this.getPointsArray();
        if (index >= 0 && index < currentPoints.length) {
            currentPoints[index] = [x, y];
            this.setPoints(currentPoints);
        }
        return this;
    }

    /**
     * 点を挿入
     */
    public insertPoint(index: number, x: number, y: number): this {
        const currentPoints = this.getPointsArray();
        if (index >= 0 && index <= currentPoints.length) {
            currentPoints.splice(index, 0, [x, y]);
            this.setPoints(currentPoints);
        }
        return this;
    }

    /**
     * ポリラインの境界ボックスを取得
     */
    public getBBox(): DOMRect {
        return (this._svgDom.element as SVGPolylineElement).getBBox();
    }

    /**
     * ポリラインの総長を取得
     */
    public getTotalLength(): number {
        return (this._svgDom.element as SVGPolylineElement).getTotalLength();
    }

    /**
     * ポリライン上の指定した距離の点を取得
     */
    public getPointAtLength(distance: number): DOMPoint {
        return (this._svgDom.element as SVGPolylineElement).getPointAtLength(distance);
    }

    /**
     * 滑らかな曲線として設定（ベジェ曲線近似）
     */
    public setSmoothCurve(points: number[][], tension: number = 0.5): this {
        if (points.length < 2) {
            this.setPoints(points);
            return this;
        }

        const smoothPoints: number[][] = [];
        
        // 最初の点
        smoothPoints.push(points[0]);
        
        // 中間点（ベジェ曲線による補間）
        for (let i = 1; i < points.length - 1; i++) {
            const p0 = points[i - 1];
            const p1 = points[i];
            const p2 = points[i + 1];
            
            // 制御点の計算
            const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
            const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
            
            // 曲線の近似点を追加
            for (let t = 0; t <= 1; t += 0.1) {
                const x = (1 - t) * p1[0] + t * cp1x;
                const y = (1 - t) * p1[1] + t * cp1y;
                smoothPoints.push([x, y]);
            }
        }
        
        // 最後の点
        smoothPoints.push(points[points.length - 1]);
        
        this.setPoints(smoothPoints);
        return this;
    }

    /**
     * グラフデータとして設定
     */
    public setGraphData(data: number[], xScale: number = 1, yScale: number = 1, xOffset: number = 0, yOffset: number = 0): this {
        const points = data.map((y, x) => [
            x * xScale + xOffset,
            y * yScale + yOffset
        ]);
        this.setPoints(points);
        return this;
    }

    /**
     * 正弦波として設定
     */
    public setSineWave(
        amplitude: number = 50, 
        frequency: number = 1, 
        phase: number = 0, 
        length: number = 360, 
        step: number = 5,
        xOffset: number = 0,
        yOffset: number = 0
    ): this {
        const points: number[][] = [];
        
        for (let x = 0; x <= length; x += step) {
            const y = amplitude * Math.sin((x * frequency + phase) * Math.PI / 180);
            points.push([x + xOffset, y + yOffset]);
        }
        
        this.setPoints(points);
        return this;
    }

    /**
     * すべての点をクリア
     */
    public clearPoints(): this {
        this.setPoints("");
        return this;
    }
}
