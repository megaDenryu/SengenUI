import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";
import { SvgElementBase } from "./BaseClasses/SvgElementBase";

export interface PatternOptions {
    x?: number | string;
    y?: number | string;
    width?: number | string;
    height?: number | string;
    patternUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    patternContentUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    patternTransform?: string;
    viewBox?: string;
    preserveAspectRatio?: string;
    href?: string;
    className?: string | string[];
    id?: string;
}

/**
 * SVG Pattern要素のコンポーネント
 * 繰り返しパターンを定義するためのSVG要素をラップします
 */
export class PatternC extends SvgContainerBase {
    

    constructor(options?: PatternOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.patternUnits) this.setPatternUnits(options.patternUnits);
            if (options.patternContentUnits) this.setPatternContentUnits(options.patternContentUnits);
            if (options.patternTransform) this.setPatternTransform(options.patternTransform);
            if (options.viewBox) this.setViewBox(options.viewBox);
            if (options.preserveAspectRatio) this.setPreserveAspectRatio(options.preserveAspectRatio);
            if (options.href) this.setHref(options.href);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const pattern = SvgElementCreater.createPatternElement();
        return new SvgElementProxy(pattern);
    }

    /**
     * パターンのX座標を設定
     */
    public setX(x: number | string): this {
        this.setSvgAttribute("x", x);
        return this;
    }

    /**
     * パターンのX座標を取得
     */
    public getX(): string {
        return this.getSvgAttribute("x") || "0";
    }

    /**
     * パターンのY座標を設定
     */
    public setY(y: number | string): this {
        this.setSvgAttribute("y", y);
        return this;
    }

    /**
     * パターンのY座標を取得
     */
    public getY(): string {
        return this.getSvgAttribute("y") || "0";
    }

    /**
     * パターンの幅を設定
     */
    public setWidth(width: number | string): this {
        this.setSvgAttribute("width", width);
        return this;
    }

    /**
     * パターンの幅を取得
     */
    public getWidth(): string {
        return this.getSvgAttribute("width") || "0";
    }

    /**
     * パターンの高さを設定
     */
    public setHeight(height: number | string): this {
        this.setSvgAttribute("height", height);
        return this;
    }

    /**
     * パターンの高さを取得
     */
    public getHeight(): string {
        return this.getSvgAttribute("height") || "0";
    }

    /**
     * パターン単位を設定
     */
    public setPatternUnits(units: 'userSpaceOnUse' | 'objectBoundingBox'): this {
        this.setSvgAttribute("patternUnits", units);
        return this;
    }

    /**
     * パターン単位を取得
     */
    public getPatternUnits(): string {
        return this.getSvgAttribute("patternUnits") || "objectBoundingBox";
    }

    /**
     * パターンコンテンツ単位を設定
     */
    public setPatternContentUnits(units: 'userSpaceOnUse' | 'objectBoundingBox'): this {
        this.setSvgAttribute("patternContentUnits", units);
        return this;
    }

    /**
     * パターンコンテンツ単位を取得
     */
    public getPatternContentUnits(): string {
        return this.getSvgAttribute("patternContentUnits") || "userSpaceOnUse";
    }

    /**
     * パターン変形を設定
     */
    public setPatternTransform(transform: string): this {
        this.setSvgAttribute("patternTransform", transform);
        return this;
    }

    /**
     * パターン変形を取得
     */
    public getPatternTransform(): string {
        return this.getSvgAttribute("patternTransform") || "";
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
     * 継承元パターンを設定
     */
    public setHref(href: string): this {
        if (!href.startsWith('#')) {
            href = '#' + href;
        }
        this.setSvgAttribute("href", href);
        return this;
    }

    /**
     * 継承元パターンを取得
     */
    public getHref(): string {
        return this.getSvgAttribute("href") || "";
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
    public override getChildren(): SvgElementBase[] {
        return this._children;
    }

    /**
     * パターンのサイズを設定
     */
    public setSize(width: number | string, height: number | string): this {
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    /**
     * パターンの位置を設定
     */
    public setPosition(x: number | string, y: number | string): this {
        this.setX(x);
        this.setY(y);
        return this;
    }

    /**
     * パターンの位置とサイズを設定
     */
    public setBounds(x: number | string, y: number | string, width: number | string, height: number | string): this {
        this.setPosition(x, y);
        this.setSize(width, height);
        return this;
    }

    /**
     * ストライプパターンを作成
     */
    public createStripePattern(stripeWidth: number, stripeColor: string, backgroundColor: string = "transparent"): this {
        this.clearChildren();
        this.setSize(stripeWidth * 2, stripeWidth);
        
        // 背景
        if (backgroundColor !== "transparent") {
            const bg = SvgElementCreater.createRectElement();
            bg.setAttribute("width", "100%");
            bg.setAttribute("height", "100%");
            bg.setAttribute("fill", backgroundColor);
            this._svgDom.element.appendChild(bg);
        }
        
        // ストライプ
        const stripe = SvgElementCreater.createRectElement();
        stripe.setAttribute("x", "0");
        stripe.setAttribute("y", "0");
        stripe.setAttribute("width", stripeWidth.toString());
        stripe.setAttribute("height", "100%");
        stripe.setAttribute("fill", stripeColor);
        this._svgDom.element.appendChild(stripe);
        
        return this;
    }

    /**
     * チェッカーボードパターンを作成
     */
    public createCheckerboardPattern(squareSize: number, color1: string, color2: string): this {
        this.clearChildren();
        this.setSize(squareSize * 2, squareSize * 2);
        
        // 左上と右下
        const square1a = SvgElementCreater.createRectElement();
        square1a.setAttribute("x", "0");
        square1a.setAttribute("y", "0");
        square1a.setAttribute("width", squareSize.toString());
        square1a.setAttribute("height", squareSize.toString());
        square1a.setAttribute("fill", color1);
        this._svgDom.element.appendChild(square1a);
        
        const square1b = SvgElementCreater.createRectElement();
        square1b.setAttribute("x", squareSize.toString());
        square1b.setAttribute("y", squareSize.toString());
        square1b.setAttribute("width", squareSize.toString());
        square1b.setAttribute("height", squareSize.toString());
        square1b.setAttribute("fill", color1);
        this._svgDom.element.appendChild(square1b);
        
        // 右上と左下
        const square2a = SvgElementCreater.createRectElement();
        square2a.setAttribute("x", squareSize.toString());
        square2a.setAttribute("y", "0");
        square2a.setAttribute("width", squareSize.toString());
        square2a.setAttribute("height", squareSize.toString());
        square2a.setAttribute("fill", color2);
        this._svgDom.element.appendChild(square2a);
        
        const square2b = SvgElementCreater.createRectElement();
        square2b.setAttribute("x", "0");
        square2b.setAttribute("y", squareSize.toString());
        square2b.setAttribute("width", squareSize.toString());
        square2b.setAttribute("height", squareSize.toString());
        square2b.setAttribute("fill", color2);
        this._svgDom.element.appendChild(square2b);
        
        return this;
    }

    /**
     * ドットパターンを作成
     */
    public createDotPattern(dotRadius: number, spacing: number, dotColor: string, backgroundColor: string = "transparent"): this {
        this.clearChildren();
        this.setSize(spacing, spacing);
        
        // 背景
        if (backgroundColor !== "transparent") {
            const bg = SvgElementCreater.createRectElement();
            bg.setAttribute("width", "100%");
            bg.setAttribute("height", "100%");
            bg.setAttribute("fill", backgroundColor);
            this._svgDom.element.appendChild(bg);
        }
        
        // ドット
        const dot = SvgElementCreater.createCircleElement();
        dot.setAttribute("cx", (spacing / 2).toString());
        dot.setAttribute("cy", (spacing / 2).toString());
        dot.setAttribute("r", dotRadius.toString());
        dot.setAttribute("fill", dotColor);
        this._svgDom.element.appendChild(dot);
        
        return this;
    }

    /**
     * グリッドパターンを作成
     */
    public createGridPattern(gridSize: number, lineWidth: number, lineColor: string, backgroundColor: string = "transparent"): this {
        this.clearChildren();
        this.setSize(gridSize, gridSize);
        
        // 背景
        if (backgroundColor !== "transparent") {
            const bg = SvgElementCreater.createRectElement();
            bg.setAttribute("width", "100%");
            bg.setAttribute("height", "100%");
            bg.setAttribute("fill", backgroundColor);
            this._svgDom.element.appendChild(bg);
        }
        
        // 縦線
        const vLine = SvgElementCreater.createLineElement();
        vLine.setAttribute("x1", "0");
        vLine.setAttribute("y1", "0");
        vLine.setAttribute("x2", "0");
        vLine.setAttribute("y2", gridSize.toString());
        vLine.setAttribute("stroke", lineColor);
        vLine.setAttribute("stroke-width", lineWidth.toString());
        this._svgDom.element.appendChild(vLine);
        
        // 横線
        const hLine = SvgElementCreater.createLineElement();
        hLine.setAttribute("x1", "0");
        hLine.setAttribute("y1", "0");
        hLine.setAttribute("x2", gridSize.toString());
        hLine.setAttribute("y2", "0");
        hLine.setAttribute("stroke", lineColor);
        hLine.setAttribute("stroke-width", lineWidth.toString());
        this._svgDom.element.appendChild(hLine);
        
        return this;
    }

    /**
     * 対角線パターンを作成
     */
    public createDiagonalPattern(size: number, lineWidth: number, lineColor: string, backgroundColor: string = "transparent"): this {
        this.clearChildren();
        this.setSize(size, size);
        
        // 背景
        if (backgroundColor !== "transparent") {
            const bg = SvgElementCreater.createRectElement();
            bg.setAttribute("width", "100%");
            bg.setAttribute("height", "100%");
            bg.setAttribute("fill", backgroundColor);
            this._svgDom.element.appendChild(bg);
        }
        
        // 対角線
        const diagonal = SvgElementCreater.createLineElement();
        diagonal.setAttribute("x1", "0");
        diagonal.setAttribute("y1", "0");
        diagonal.setAttribute("x2", size.toString());
        diagonal.setAttribute("y2", size.toString());
        diagonal.setAttribute("stroke", lineColor);
        diagonal.setAttribute("stroke-width", lineWidth.toString());
        this._svgDom.element.appendChild(diagonal);
        
        return this;
    }

    /**
     * パターンのURL参照を取得
     */
    public getPatternUrl(): string {
        const id = this._svgDom.element.id;
        return id ? `url(#${id})` : "";
    }

    /**
     * パターンが使用されているかチェック
     */
    public isUsedInDocument(): boolean {
        const id = this._svgDom.element.id;
        if (!id) return false;
        
        const rootSvg = this._svgDom.element.ownerSVGElement;
        if (!rootSvg) return false;
        
        const patternUrl = `url(#${id})`;
        const elements = rootSvg.querySelectorAll('[fill], [stroke]');
        
        return Array.from(elements).some(element => {
            const fill = element.getAttribute('fill');
            const stroke = element.getAttribute('stroke');
            return fill === patternUrl || stroke === patternUrl;
        });
    }

    /**
     * パターンをコピー
     */
    public clone(newId?: string): PatternC {
        const clone = new PatternC({
            id: newId,
            x: this.getX(),
            y: this.getY(),
            width: this.getWidth(),
            height: this.getHeight(),
            patternUnits: this.getPatternUnits() as 'userSpaceOnUse' | 'objectBoundingBox',
            patternContentUnits: this.getPatternContentUnits() as 'userSpaceOnUse' | 'objectBoundingBox',
            patternTransform: this.getPatternTransform(),
            viewBox: this.getViewBox(),
            preserveAspectRatio: this.getPreserveAspectRatio()
        });
        
        // 子要素のコピーは実装されていません（複雑なため）
        return clone;
    }
}
