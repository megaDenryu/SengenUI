import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";
import { SvgElementBase } from "./BaseClasses/SvgElementBase";

export interface MarkerOptions {
    markerWidth?: number;
    markerHeight?: number;
    refX?: number;
    refY?: number;
    orient?: string | number;
    markerUnits?: 'strokeWidth' | 'userSpaceOnUse';
    viewBox?: string;
    preserveAspectRatio?: string;
    overflow?: 'visible' | 'hidden';
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Marker要素のコンポーネント
 * 線の端点や中間点に表示するマーカーを定義するためのSVG要素をラップします
 */
export class MarkerC extends SvgContainerBase {
    

    constructor(options?: MarkerOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.markerWidth !== undefined) this.setMarkerWidth(options.markerWidth);
            if (options.markerHeight !== undefined) this.setMarkerHeight(options.markerHeight);
            if (options.refX !== undefined) this.setRefX(options.refX);
            if (options.refY !== undefined) this.setRefY(options.refY);
            if (options.orient !== undefined) this.setOrient(options.orient);
            if (options.markerUnits) this.setMarkerUnits(options.markerUnits);
            if (options.viewBox) this.setViewBox(options.viewBox);
            if (options.preserveAspectRatio) this.setPreserveAspectRatio(options.preserveAspectRatio);
            if (options.overflow) this.setOverflow(options.overflow);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const marker = SvgElementCreater.createMarkerElement();
        return new SvgElementProxy(marker);
    }

    /**
     * マーカーの幅を設定
     */
    public setMarkerWidth(width: number): this {
        this.setSvgAttribute("markerWidth", width);
        return this;
    }

    /**
     * マーカーの幅を取得
     */
    public getMarkerWidth(): number {
        return parseFloat(this.getSvgAttribute("markerWidth") || "3");
    }

    /**
     * マーカーの高さを設定
     */
    public setMarkerHeight(height: number): this {
        this.setSvgAttribute("markerHeight", height);
        return this;
    }

    /**
     * マーカーの高さを取得
     */
    public getMarkerHeight(): number {
        return parseFloat(this.getSvgAttribute("markerHeight") || "3");
    }

    /**
     * 基準点X座標を設定
     */
    public setRefX(refX: number): this {
        this.setSvgAttribute("refX", refX);
        return this;
    }

    /**
     * 基準点X座標を取得
     */
    public getRefX(): number {
        return parseFloat(this.getSvgAttribute("refX") || "0");
    }

    /**
     * 基準点Y座標を設定
     */
    public setRefY(refY: number): this {
        this.setSvgAttribute("refY", refY);
        return this;
    }

    /**
     * 基準点Y座標を取得
     */
    public getRefY(): number {
        return parseFloat(this.getSvgAttribute("refY") || "0");
    }

    /**
     * マーカーの向きを設定
     */
    public setOrient(orient: string | number): this {
        this.setSvgAttribute("orient", orient);
        return this;
    }

    /**
     * マーカーの向きを取得
     */
    public getOrient(): string {
        return this.getSvgAttribute("orient") || "0";
    }

    /**
     * マーカーの単位を設定
     */
    public setMarkerUnits(units: 'strokeWidth' | 'userSpaceOnUse'): this {
        this.setSvgAttribute("markerUnits", units);
        return this;
    }

    /**
     * マーカーの単位を取得
     */
    public getMarkerUnits(): string {
        return this.getSvgAttribute("markerUnits") || "strokeWidth";
    }

    /**
     * viewBox属性を設定
     */
    public setViewBox(viewBox: string): this {
        this.setSvgAttribute("viewBox", viewBox);
        return this;
    }

    /**
     * viewBox属性を取得
     */
    public getViewBox(): string {
        return this.getSvgAttribute("viewBox") || "";
    }

    /**
     * viewBoxを数値で設定
     */
    public setViewBoxValues(x: number, y: number, width: number, height: number): this {
        this.setViewBox(`${x} ${y} ${width} ${height}`);
        return this;
    }

    /**
     * preserveAspectRatio属性を設定
     */
    public setPreserveAspectRatio(value: string): this {
        this.setSvgAttribute("preserveAspectRatio", value);
        return this;
    }

    /**
     * preserveAspectRatio属性を取得
     */
    public getPreserveAspectRatio(): string {
        return this.getSvgAttribute("preserveAspectRatio") || "";
    }

    /**
     * オーバーフロー処理を設定
     */
    public setOverflow(overflow: 'visible' | 'hidden'): this {
        this.setSvgAttribute("overflow", overflow);
        return this;
    }

    /**
     * オーバーフロー処理を取得
     */
    public getOverflow(): string {
        return this.getSvgAttribute("overflow") || "hidden";
    }

    /**
     * 子要素を追加
     */
    public override child(child: SvgElementBase): this {
        this._children.push(child);
        this._svgDom.element.appendChild(child.dom.element);
        return this;
    }

    /**
     * 複数の子要素を追加
     */
    public override childs(children: SvgElementBase[]): this {
        children.forEach(child => this.child(child));
        return this;
    }

    /**
     * 子要素を削除
     */
    public removeChild(child: SvgElementBase): this {
        const index = this._children.indexOf(child);
        if (index > -1) {
            this._children.splice(index, 1);
            this._svgDom.element.removeChild(child.dom.element);
        }
        return this;
    }

    /**
     * 子要素の配列を取得
     */
    public override getChildren(): SvgElementBase[] {
        return this._children;
    }

    /**
     * マーカーのサイズを一度に設定
     */
    public setSize(width: number, height: number): this {
        this.setMarkerWidth(width);
        this.setMarkerHeight(height);
        return this;
    }

    /**
     * 基準点を設定
     */
    public setReferencePoint(refX: number, refY: number): this {
        this.setRefX(refX);
        this.setRefY(refY);
        return this;
    }

    /**
     * 自動向き設定
     */
    public setAutoOrient(): this {
        this.setOrient("auto");
        return this;
    }

    /**
     * 自動向き（開始角度）設定
     */
    public setAutoStartReverse(): this {
        this.setOrient("auto-start-reverse");
        return this;
    }

    /**
     * 固定角度設定
     */
    public setFixedAngle(degrees: number): this {
        this.setOrient(degrees);
        return this;
    }

    /**
     * 矢印型マーカーを作成
     */
    public static createArrowMarker(id: string, size: number = 10, color: string = "black"): MarkerC {
        const marker = new MarkerC({
            id: id,
            markerWidth: size,
            markerHeight: size,
            refX: size - 1,
            refY: size / 2,
            orient: "auto",
            markerUnits: "strokeWidth"
        });

        // 矢印パスを追加
        const arrowPath = SvgElementCreater.createPathElement();
        arrowPath.setAttribute("d", `M0,0 L0,${size} L${size},${size/2} z`);
        arrowPath.setAttribute("fill", color);
        
        marker._svgDom.element.appendChild(arrowPath);
        return marker;
    }

    /**
     * 円型マーカーを作成
     */
    public static createCircleMarker(id: string, radius: number = 3, color: string = "black"): MarkerC {
        const size = radius * 2 + 2;
        const marker = new MarkerC({
            id: id,
            markerWidth: size,
            markerHeight: size,
            refX: radius + 1,
            refY: radius + 1,
            markerUnits: "strokeWidth"
        });

        // 円を追加
        const circle = SvgElementCreater.createCircleElement();
        circle.setAttribute("cx", (radius + 1).toString());
        circle.setAttribute("cy", (radius + 1).toString());
        circle.setAttribute("r", radius.toString());
        circle.setAttribute("fill", color);
        
        marker._svgDom.element.appendChild(circle);
        return marker;
    }

    /**
     * 四角型マーカーを作成
     */
    public static createSquareMarker(id: string, size: number = 6, color: string = "black"): MarkerC {
        const marker = new MarkerC({
            id: id,
            markerWidth: size + 2,
            markerHeight: size + 2,
            refX: size / 2 + 1,
            refY: size / 2 + 1,
            markerUnits: "strokeWidth"
        });

        // 四角形を追加
        const rect = SvgElementCreater.createRectElement();
        rect.setAttribute("x", "1");
        rect.setAttribute("y", "1");
        rect.setAttribute("width", size.toString());
        rect.setAttribute("height", size.toString());
        rect.setAttribute("fill", color);
        
        marker._svgDom.element.appendChild(rect);
        return marker;
    }

    /**
     * ダイヤモンド型マーカーを作成
     */
    public static createDiamondMarker(id: string, size: number = 8, color: string = "black"): MarkerC {
        const marker = new MarkerC({
            id: id,
            markerWidth: size + 2,
            markerHeight: size + 2,
            refX: size / 2 + 1,
            refY: size / 2 + 1,
            markerUnits: "strokeWidth"
        });

        // ダイヤモンド形パスを追加
        const diamond = SvgElementCreater.createPathElement();
        const half = size / 2;
        const center = half + 1;
        diamond.setAttribute("d", `M${center},1 L${size + 1},${center} L${center},${size + 1} L1,${center} z`);
        diamond.setAttribute("fill", color);
        
        marker._svgDom.element.appendChild(diamond);
        return marker;
    }

    /**
     * マーカーが使用されているかチェック
     */
    public isUsedInDocument(): boolean {
        const id = this._svgDom.element.id;
        if (!id) return false;
        
        const rootSvg = this._svgDom.element.ownerSVGElement;
        if (!rootSvg) return false;
        
        const markerRefs = [`url(#${id})`, `#${id}`];
        const elements = rootSvg.querySelectorAll('[marker-start], [marker-mid], [marker-end]');
        
        return Array.from(elements).some(element => {
            const startMarker = element.getAttribute('marker-start');
            const midMarker = element.getAttribute('marker-mid');
            const endMarker = element.getAttribute('marker-end');
            
            return markerRefs.includes(startMarker || '') ||
                   markerRefs.includes(midMarker || '') ||
                   markerRefs.includes(endMarker || '');
        });
    }

    /**
     * マーカーの参照URL を取得
     */
    public getMarkerUrl(): string {
        const id = this._svgDom.element.id;
        return id ? `url(#${id})` : "";
    }
}
