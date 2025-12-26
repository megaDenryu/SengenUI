import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";
import { SvgElementBase } from "./BaseClasses/SvgElementBase";

export interface SymbolOptions {
    viewBox?: string;
    preserveAspectRatio?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    refX?: number;
    refY?: number;
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Symbol要素のコンポーネント
 * 再利用可能なグラフィック要素を定義するためのSVG要素をラップします
 */
export class SymbolC extends SvgContainerBase {
    // 基底クラスの_childrenを使用するため、ここでは宣言しない

    constructor(options?: SymbolOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.viewBox) this.setViewBox(options.viewBox);
            if (options.preserveAspectRatio) this.setPreserveAspectRatio(options.preserveAspectRatio);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.refX !== undefined) this.setRefX(options.refX);
            if (options.refY !== undefined) this.setRefY(options.refY);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const symbol = SvgElementCreater.createSymbolElement();
        return new SvgElementProxy(symbol);
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
     * X座標を設定
     */
    public setX(x: number): this {
        this.setSvgAttribute("x", x);
        return this;
    }

    /**
     * X座標を取得
     */
    public getX(): number {
        return parseFloat(this.getSvgAttribute("x") || "0");
    }

    /**
     * Y座標を設定
     */
    public setY(y: number): this {
        this.setSvgAttribute("y", y);
        return this;
    }

    /**
     * Y座標を取得
     */
    public getY(): number {
        return parseFloat(this.getSvgAttribute("y") || "0");
    }

    /**
     * 幅を設定
     */
    public setWidth(width: number): this {
        this.setSvgAttribute("width", width);
        return this;
    }

    /**
     * 幅を取得
     */
    public getWidth(): number {
        return parseFloat(this.getSvgAttribute("width") || "0");
    }

    /**
     * 高さを設定
     */
    public setHeight(height: number): this {
        this.setSvgAttribute("height", height);
        return this;
    }

    /**
     * 高さを取得
     */
    public getHeight(): number {
        return parseFloat(this.getSvgAttribute("height") || "0");
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
     * 子要素を追加
     */
    public addChild(child: SvgElementBase): this {
        this._children.push(child);
        this._svgDom.element.appendChild(child.dom.element);
        return this;
    }

    /**
     * 複数の子要素を追加
     */
    public addChildren(children: SvgElementBase[]): this {
        children.forEach(child => this.addChild(child));
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
     * すべての子要素を削除
     */
    public clearChildren(): this {
        this._children.forEach(child => {
            this._svgDom.element.removeChild(child.dom.element);
        });
        this._children = [];
        return this;
    }

    /**
     * 子要素の配列を取得
     */
    public getChildren(): SvgElementBase[] {
        return [...this._children];
    }

    /**
     * 子要素の数を取得
     */
    public getChildCount(): number {
        return this._children.length;
    }

    /**
     * 指定したインデックスの子要素を取得
     */
    public getChildAt(index: number): SvgElementBase | undefined {
        return this._children[index];
    }

    /**
     * 位置とサイズを一度に設定
     */
    public setBounds(x: number, y: number, width: number, height: number): this {
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    /**
     * 位置とサイズを取得
     */
    public getBounds(): { x: number, y: number, width: number, height: number } {
        return {
            x: this.getX(),
            y: this.getY(),
            width: this.getWidth(),
            height: this.getHeight()
        };
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
     * 基準点を取得
     */
    public getReferencePoint(): { refX: number, refY: number } {
        return {
            refX: this.getRefX(),
            refY: this.getRefY()
        };
    }

    /**
     * アスペクト比を維持して表示
     */
    public maintainAspectRatio(): this {
        this.setPreserveAspectRatio("xMidYMid meet");
        return this;
    }

    /**
     * 領域全体に引き伸ばし
     */
    public stretchToFit(): this {
        this.setPreserveAspectRatio("none");
        return this;
    }

    /**
     * 切り抜いて表示
     */
    public cropToFit(): this {
        this.setPreserveAspectRatio("xMidYMid slice");
        return this;
    }

    /**
     * アイコン用のシンボル設定
     */
    public setAsIcon(size: number = 24): this {
        this.setViewBoxValues(0, 0, size, size);
        this.setWidth(size);
        this.setHeight(size);
        this.maintainAspectRatio();
        return this;
    }

    /**
     * タイル用のシンボル設定
     */
    public setAsTile(width: number, height: number): this {
        this.setViewBoxValues(0, 0, width, height);
        this.setWidth(width);
        this.setHeight(height);
        this.stretchToFit();
        return this;
    }

    /**
     * 複雑なグラフィック用の設定
     */
    public setAsGraphic(viewBoxWidth: number, viewBoxHeight: number): this {
        this.setViewBoxValues(0, 0, viewBoxWidth, viewBoxHeight);
        this.maintainAspectRatio();
        return this;
    }

    /**
     * シンボルの境界ボックスを取得
     * symbol要素自体は境界ボックスを持たないため、子要素の境界ボックスを計算
     */
    public getBBox(): DOMRect | null {
        // symbol要素は構造的要素なので直接getBBoxを持たない
        // 代わりに子要素の境界ボックスを計算する
        if (this._children.length === 0) {
            return null;
        }

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        let hasValidBBox = false;

        this._children.forEach(child => {
            try {
                // 子要素のSVG要素がSVGGraphicsElementかチェック
                const childElement = child.dom.element;
                if ('getBBox' in childElement && typeof childElement.getBBox === 'function') {
                    const bbox = (childElement as SVGGraphicsElement).getBBox();
                    minX = Math.min(minX, bbox.x);
                    minY = Math.min(minY, bbox.y);
                    maxX = Math.max(maxX, bbox.x + bbox.width);
                    maxY = Math.max(maxY, bbox.y + bbox.height);
                    hasValidBBox = true;
                }
            } catch (error) {
                // getBBoxが失敗した場合は無視
            }
        });

        if (!hasValidBBox) {
            return null;
        }

        // DOMRectライクなオブジェクトを返す
        return new DOMRect(minX, minY, maxX - minX, maxY - minY);
    }

    /**
     * シンボルをUse要素で参照するためのID取得
     */
    public getUseReference(): string {
        const id = this._svgDom.element.id;
        return id ? `#${id}` : "";
    }

    /**
     * シンボルがUse要素から参照されているかチェック
     */
    public isReferencedInDocument(): boolean {
        const id = this._svgDom.element.id;
        if (!id) return false;
        
        const rootSvg = this._svgDom.element.ownerSVGElement;
        if (!rootSvg) return false;
        
        const useElements = rootSvg.querySelectorAll('use');
        return Array.from(useElements).some(use => 
            use.getAttribute('href') === `#${id}` || 
            use.getAttribute('xlink:href') === `#${id}`
        );
    }

    /**
     * シンボル内の全要素のIDリストを取得
     */
    public getInternalElementIds(): string[] {
        const elements = this._svgDom.element.querySelectorAll('[id]');
        return Array.from(elements).map(el => el.id).filter(Boolean);
    }

    /**
     * シンボルの使用統計を取得
     */
    public getUsageStatistics(): {
        childCount: number;
        hasViewBox: boolean;
        hasReferencePoint: boolean;
        isReferenced: boolean;
        boundingBox: DOMRect | null;
    } {
        return {
            childCount: this.getChildCount(),
            hasViewBox: !!this.getViewBox(),
            hasReferencePoint: this.getRefX() !== 0 || this.getRefY() !== 0,
            isReferenced: this.isReferencedInDocument(),
            boundingBox: this.getBBox()
        };
    }
}
