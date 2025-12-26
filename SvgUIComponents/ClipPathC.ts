import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";

export interface ClipPathOptions {
    id?: string;
    clipPathUnits?: "userSpaceOnUse" | "objectBoundingBox";
    transform?: string;
    opacity?: number;
    className?: string | string[];
}

/**
 * SVG ClipPath要素のコンポーネント
 * クリッピングパスを定義するためのSVG要素をラップします
 */
export class ClipPathC extends SvgContainerBase {
    constructor(options?: ClipPathOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.id) this._svgDom.element.id = options.id;
            if (options.clipPathUnits) this.setClipPathUnits(options.clipPathUnits);
            if (options.transform) this.setTransform(options.transform);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.className) this.addSvgClass(options.className);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const clipPath = SvgElementCreater.createClipPathElement();
        return new SvgElementProxy(clipPath);
    }

    /**
     * clipPathUnits属性を設定
     */
    public setClipPathUnits(units: "userSpaceOnUse" | "objectBoundingBox"): this {
        this.setSvgAttribute("clipPathUnits", units);
        return this;
    }

    /**
     * clipPathUnits属性を取得
     */
    public getClipPathUnits(): string | null {
        return this.getSvgAttribute("clipPathUnits");
    }

    /**
     * ユーザー空間座標系を使用
     */
    public useUserSpaceOnUse(): this {
        return this.setClipPathUnits("userSpaceOnUse");
    }

    /**
     * オブジェクト境界ボックス座標系を使用
     */
    public useObjectBoundingBox(): this {
        return this.setClipPathUnits("objectBoundingBox");
    }

    /**
     * 矩形クリッピングパスを作成
     */
    public createRectClip(x: number, y: number, width: number, height: number): this {
        const rect = SvgElementCreater.createRectElement(x, y, width, height);
        this._svgDom.element.appendChild(rect);
        return this;
    }

    /**
     * 円形クリッピングパスを作成
     */
    public createCircleClip(cx: number, cy: number, r: number): this {
        const circle = SvgElementCreater.createCircleElement(cx, cy, r);
        this._svgDom.element.appendChild(circle);
        return this;
    }

    /**
     * 楕円クリッピングパスを作成
     */
    public createEllipseClip(cx: number, cy: number, rx: number, ry: number): this {
        const ellipse = SvgElementCreater.createEllipseElement(cx, cy, rx, ry);
        this._svgDom.element.appendChild(ellipse);
        return this;
    }

    /**
     * パスクリッピングパスを作成
     */
    public createPathClip(d: string): this {
        const path = SvgElementCreater.createPathElement();
        path.setAttribute("d", d);
        this._svgDom.element.appendChild(path);
        return this;
    }

    /**
     * 多角形クリッピングパスを作成
     */
    public createPolygonClip(points: string): this {
        const polygon = SvgElementCreater.createPolygonElement();
        polygon.setAttribute("points", points);
        this._svgDom.element.appendChild(polygon);
        return this;
    }

    /**
     * 線クリッピングパスを作成
     */
    public createLineClip(x1: number, y1: number, x2: number, y2: number): this {
        const line = SvgElementCreater.createLineElement(x1, y1, x2, y2);
        this._svgDom.element.appendChild(line);
        return this;
    }

    /**
     * 複数の点から多角形クリッピングパスを作成
     */
    public createPolygonClipFromPoints(points: Array<{x: number, y: number}>): this {
        const pointsString = points.map(p => `${p.x},${p.y}`).join(" ");
        return this.createPolygonClip(pointsString);
    }

    /**
     * ベジェ曲線クリッピングパスを作成
     */
    public createBezierClip(startX: number, startY: number, cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, endX: number, endY: number): this {
        const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
        return this.createPathClip(d);
    }

    /**
     * 角丸矩形クリッピングパスを作成
     */
    public createRoundedRectClip(x: number, y: number, width: number, height: number, rx: number, ry?: number): this {
        const rect = SvgElementCreater.createRectElement(x, y, width, height);
        rect.setAttribute("rx", rx.toString());
        if (ry !== undefined) {
            rect.setAttribute("ry", ry.toString());
        }
        this._svgDom.element.appendChild(rect);
        return this;
    }

    /**
     * 星形クリッピングパスを作成
     */
    public createStarClip(cx: number, cy: number, outerRadius: number, innerRadius: number, points: number = 5): this {
        const pathData = this.generateStarPath(cx, cy, outerRadius, innerRadius, points);
        return this.createPathClip(pathData);
    }

    /**
     * ハート形クリッピングパスを作成
     */
    public createHeartClip(cx: number, cy: number, size: number): this {
        const pathData = this.generateHeartPath(cx, cy, size);
        return this.createPathClip(pathData);
    }

    /**
     * 三角形クリッピングパスを作成
     */
    public createTriangleClip(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): this {
        const points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
        return this.createPolygonClip(points);
    }

    /**
     * 六角形クリッピングパスを作成
     */
    public createHexagonClip(cx: number, cy: number, radius: number): this {
        const points: Array<{x: number, y: number}> = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60) * Math.PI / 180;
            points.push({
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle)
            });
        }
        return this.createPolygonClipFromPoints(points);
    }

    /**
     * 矢印クリッピングパスを作成
     */
    public createArrowClip(x: number, y: number, width: number, height: number, headWidth: number = 20): this {
        const pathData = `M ${x} ${y + height/2} 
                         L ${x + width - headWidth} ${y} 
                         L ${x + width - headWidth} ${y + height/4} 
                         L ${x + width} ${y + height/2} 
                         L ${x + width - headWidth} ${y + 3*height/4} 
                         L ${x + width - headWidth} ${y + height} 
                         Z`;
        return this.createPathClip(pathData);
    }

    /**
     * 扇形クリッピングパスを作成
     */
    public createSectorClip(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): this {
        const startRad = startAngle * Math.PI / 180;
        const endRad = endAngle * Math.PI / 180;
        
        const x1 = cx + radius * Math.cos(startRad);
        const y1 = cy + radius * Math.sin(startRad);
        const x2 = cx + radius * Math.cos(endRad);
        const y2 = cy + radius * Math.sin(endRad);
        
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        
        const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
        return this.createPathClip(pathData);
    }

    /**
     * 複合パスクリッピングパスを作成
     */
    public createCompoundClip(pathCommands: string[]): this {
        const pathData = pathCommands.join(" ");
        return this.createPathClip(pathData);
    }

    /**
     * テキストベースのクリッピングパスを作成
     */
    public createTextClip(text: string, x: number, y: number, fontSize: number = 16, fontFamily: string = "Arial"): this {
        const textElement = SvgElementCreater.createTextElement(x, y, text, fontSize);
        textElement.setAttribute("font-family", fontFamily);
        this._svgDom.element.appendChild(textElement);
        return this;
    }

    /**
     * グリッドパターンクリッピングパスを作成
     */
    public createGridClip(x: number, y: number, width: number, height: number, cellWidth: number, cellHeight: number): this {
        for (let i = x; i <= x + width; i += cellWidth) {
            for (let j = y; j <= y + height; j += cellHeight) {
                this.createRectClip(i, j, cellWidth, cellHeight);
            }
        }
        return this;
    }

    /**
     * 波形クリッピングパスを作成
     */
    public createWaveClip(x: number, y: number, width: number, amplitude: number, frequency: number): this {
        let pathData = `M ${x} ${y}`;
        const steps = width / 2;
        
        for (let i = 0; i <= steps; i++) {
            const currentX = x + (i / steps) * width;
            const currentY = y + amplitude * Math.sin((i / steps) * frequency * 2 * Math.PI);
            pathData += ` L ${currentX} ${currentY}`;
        }
        
        return this.createPathClip(pathData);
    }

    /**
     * 星形パスデータを生成
     */
    private generateStarPath(cx: number, cy: number, outerRadius: number, innerRadius: number, points: number): string {
        let pathData = "";
        const angleStep = Math.PI / points;
        
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = i * angleStep;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            
            if (i === 0) {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        }
        
        return pathData + " Z";
    }

    /**
     * ハート形パスデータを生成
     */
    private generateHeartPath(cx: number, cy: number, size: number): string {
        const x = cx;
        const y = cy - size / 4;
        
        return `M ${x} ${y + size/2} 
                C ${x} ${y + size/2 - size/4}, ${x - size/2} ${y - size/4}, ${x - size/2} ${y} 
                C ${x - size/2} ${y - size/4}, ${x} ${y - size/4}, ${x} ${y} 
                C ${x} ${y - size/4}, ${x + size/2} ${y - size/4}, ${x + size/2} ${y} 
                C ${x + size/2} ${y - size/4}, ${x} ${y + size/2 - size/4}, ${x} ${y + size/2} Z`;
    }

    /**
     * クリッピングパスの内容をクリア
     */
    public clear(): this {
        while (this._svgDom.element.firstChild) {
            this._svgDom.element.removeChild(this._svgDom.element.firstChild);
        }
        return this;
    }

    /**
     * 子要素の数を取得
     */
    public getChildCount(): number {
        return this._svgDom.element.children.length;
    }

    /**
     * 指定されたインデックスの子要素を取得
     */
    public getChildAt(index: number): SVGElement | null {
        return this._svgDom.element.children[index] as SVGElement || null;
    }

    /**
     * クリッピングパスの境界ボックスを取得
     * clipPath要素は構造的要素なので、子要素の境界ボックスを計算
     */
    public getBBox(): DOMRect | null {
        const children = this._svgDom.element.children;
        if (children.length === 0) {
            return null;
        }

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        let hasValidBBox = false;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            try {
                if ('getBBox' in child && typeof child.getBBox === 'function') {
                    const bbox = (child as SVGGraphicsElement).getBBox();
                    minX = Math.min(minX, bbox.x);
                    minY = Math.min(minY, bbox.y);
                    maxX = Math.max(maxX, bbox.x + bbox.width);
                    maxY = Math.max(maxY, bbox.y + bbox.height);
                    hasValidBBox = true;
                }
            } catch (error) {
                // getBBoxが失敗した場合は無視
            }
        }

        if (!hasValidBBox) {
            return null;
        }

        return new DOMRect(minX, minY, maxX - minX, maxY - minY);
    }
}
