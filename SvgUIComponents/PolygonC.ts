import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";

export interface PolygonOptions {
    points?: string | number[][];
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    strokeDasharray?: string;
    fillRule?: 'nonzero' | 'evenodd';
    opacity?: number;
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Polygon要素のコンポーネント
 * 多角形（閉じた図形）を描画するためのSVG要素をラップします
 */
export class PolygonC extends SvgGraphicsBase {
    constructor(options?: PolygonOptions) {
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
            if (options.fillRule) this.setFillRule(options.fillRule);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const polygon = SvgElementCreater.createPolygonElement();
        return new SvgElementProxy(polygon);
    }

    /**
     * 多角形の点を設定（文字列または座標配列）
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
     * 多角形の点を取得
     */
    public getPoints(): string {
        return this.getSvgAttribute("points") || "";
    }

    /**
     * 多角形の点を座標配列として取得
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
     * 多角形の境界ボックスを取得
     */
    public getBBox(): DOMRect {
        return (this._svgDom.element as SVGPolygonElement).getBBox();
    }

    /**
     * 正多角形を作成
     */
    public static createRegularPolygon(
        centerX: number, 
        centerY: number, 
        radius: number, 
        sides: number, 
        rotation: number = 0
    ): number[][] {
        const points: number[][] = [];
        const angleStep = (2 * Math.PI) / sides;
        const startAngle = rotation * (Math.PI / 180);
        
        for (let i = 0; i < sides; i++) {
            const angle = startAngle + i * angleStep;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push([x, y]);
        }
        
        return points;
    }

    /**
     * 星形を作成
     */
    public static createStar(
        centerX: number, 
        centerY: number, 
        outerRadius: number, 
        innerRadius: number, 
        points: number, 
        rotation: number = 0
    ): number[][] {
        const coords: number[][] = [];
        const angleStep = Math.PI / points;
        const startAngle = rotation * (Math.PI / 180);
        
        for (let i = 0; i < points * 2; i++) {
            const angle = startAngle + i * angleStep;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            coords.push([x, y]);
        }
        
        return coords;
    }

    /**
     * 正多角形として設定
     */
    public setAsRegularPolygon(
        centerX: number, 
        centerY: number, 
        radius: number, 
        sides: number, 
        rotation: number = 0
    ): this {
        const points = PolygonC.createRegularPolygon(centerX, centerY, radius, sides, rotation);
        this.setPoints(points);
        return this;
    }

    /**
     * 星形として設定
     */
    public setAsStar(
        centerX: number, 
        centerY: number, 
        outerRadius: number, 
        innerRadius: number, 
        points: number, 
        rotation: number = 0
    ): this {
        const starPoints = PolygonC.createStar(centerX, centerY, outerRadius, innerRadius, points, rotation);
        this.setPoints(starPoints);
        return this;
    }

    /**
     * 多角形の面積を計算（鞋紐公式）
     */
    public getArea(): number {
        const points = this.getPointsArray();
        if (points.length < 3) return 0;
        
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            const j = (i + 1) % points.length;
            area += points[i][0] * points[j][1];
            area -= points[j][0] * points[i][1];
        }
        return Math.abs(area / 2);
    }

    /**
     * 多角形の重心を計算
     */
    public getCentroid(): { x: number, y: number } {
        const points = this.getPointsArray();
        if (points.length === 0) return { x: 0, y: 0 };
        
        const sum = points.reduce((acc, point) => ({
            x: acc.x + point[0],
            y: acc.y + point[1]
        }), { x: 0, y: 0 });
        
        return {
            x: sum.x / points.length,
            y: sum.y / points.length
        };
    }
}
