import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";

export interface MaskOptions {
    id?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    maskUnits?: "userSpaceOnUse" | "objectBoundingBox";
    maskContentUnits?: "userSpaceOnUse" | "objectBoundingBox";
    transform?: string;
    opacity?: number;
    className?: string | string[];
}

/**
 * SVG Mask要素のコンポーネント
 * マスキング効果を定義するためのSVG要素をラップします
 */
export class MaskC extends SvgContainerBase {
    constructor(options?: MaskOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.id) this._svgDom.element.id = options.id;
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.maskUnits) this.setMaskUnits(options.maskUnits);
            if (options.maskContentUnits) this.setMaskContentUnits(options.maskContentUnits);
            if (options.transform) this.setTransform(options.transform);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.className) this.addSvgClass(options.className);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const mask = SvgElementCreater.createMaskElement();
        return new SvgElementProxy(mask);
    }

    /**
     * X座標を設定
     */
    public setX(x: number | string): this {
        this.setSvgAttribute("x", x);
        return this;
    }

    /**
     * X座標を取得
     */
    public getX(): string | null {
        return this.getSvgAttribute("x");
    }

    /**
     * Y座標を設定
     */
    public setY(y: number | string): this {
        this.setSvgAttribute("y", y);
        return this;
    }

    /**
     * Y座標を取得
     */
    public getY(): string | null {
        return this.getSvgAttribute("y");
    }

    /**
     * 幅を設定
     */
    public setWidth(width: number | string): this {
        this.setSvgAttribute("width", width);
        return this;
    }

    /**
     * 幅を取得
     */
    public getWidth(): string | null {
        return this.getSvgAttribute("width");
    }

    /**
     * 高さを設定
     */
    public setHeight(height: number | string): this {
        this.setSvgAttribute("height", height);
        return this;
    }

    /**
     * 高さを取得
     */
    public getHeight(): string | null {
        return this.getSvgAttribute("height");
    }

    /**
     * maskUnits属性を設定
     */
    public setMaskUnits(units: "userSpaceOnUse" | "objectBoundingBox"): this {
        this.setSvgAttribute("maskUnits", units);
        return this;
    }

    /**
     * maskUnits属性を取得
     */
    public getMaskUnits(): string | null {
        return this.getSvgAttribute("maskUnits");
    }

    /**
     * maskContentUnits属性を設定
     */
    public setMaskContentUnits(units: "userSpaceOnUse" | "objectBoundingBox"): this {
        this.setSvgAttribute("maskContentUnits", units);
        return this;
    }

    /**
     * maskContentUnits属性を取得
     */
    public getMaskContentUnits(): string | null {
        return this.getSvgAttribute("maskContentUnits");
    }

    /**
     * 位置とサイズを設定
     */
    public setBounds(x: number | string, y: number | string, width: number | string, height: number | string): this {
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    /**
     * ユーザー空間座標系でマスクを設定
     */
    public useUserSpaceOnUse(): this {
        this.setMaskUnits("userSpaceOnUse");
        this.setMaskContentUnits("userSpaceOnUse");
        return this;
    }

    /**
     * オブジェクト境界ボックス座標系でマスクを設定
     */
    public useObjectBoundingBox(): this {
        this.setMaskUnits("objectBoundingBox");
        this.setMaskContentUnits("objectBoundingBox");
        return this;
    }

    /**
     * 白い矩形マスクを作成（完全表示）
     */
    public createWhiteRectMask(x: number = 0, y: number = 0, width: number = 100, height: number = 100): this {
        const rect = SvgElementCreater.createRectElement(x, y, width, height);
        rect.setAttribute("fill", "white");
        this._svgDom.element.appendChild(rect);
        return this;
    }

    /**
     * 黒い矩形マスクを作成（完全非表示）
     */
    public createBlackRectMask(x: number = 0, y: number = 0, width: number = 100, height: number = 100): this {
        const rect = SvgElementCreater.createRectElement(x, y, width, height);
        rect.setAttribute("fill", "black");
        this._svgDom.element.appendChild(rect);
        return this;
    }

    /**
     * グレーの矩形マスクを作成（半透明）
     */
    public createGrayRectMask(x: number = 0, y: number = 0, width: number = 100, height: number = 100, grayLevel: number = 0.5): this {
        const gray = Math.round(grayLevel * 255);
        const rect = SvgElementCreater.createRectElement(x, y, width, height);
        rect.setAttribute("fill", `rgb(${gray}, ${gray}, ${gray})`);
        this._svgDom.element.appendChild(rect);
        return this;
    }

    /**
     * 円形マスクを作成
     */
    public createCircleMask(cx: number, cy: number, r: number, fill: string = "white"): this {
        const circle = SvgElementCreater.createCircleElement(cx, cy, r);
        circle.setAttribute("fill", fill);
        this._svgDom.element.appendChild(circle);
        return this;
    }

    /**
     * 楕円マスクを作成
     */
    public createEllipseMask(cx: number, cy: number, rx: number, ry: number, fill: string = "white"): this {
        const ellipse = SvgElementCreater.createEllipseElement(cx, cy, rx, ry);
        ellipse.setAttribute("fill", fill);
        this._svgDom.element.appendChild(ellipse);
        return this;
    }

    /**
     * パスマスクを作成
     */
    public createPathMask(d: string, fill: string = "white"): this {
        const path = SvgElementCreater.createPathElement();
        path.setAttribute("d", d);
        path.setAttribute("fill", fill);
        this._svgDom.element.appendChild(path);
        return this;
    }

    /**
     * 多角形マスクを作成
     */
    public createPolygonMask(points: string, fill: string = "white"): this {
        const polygon = SvgElementCreater.createPolygonElement();
        polygon.setAttribute("points", points);
        polygon.setAttribute("fill", fill);
        this._svgDom.element.appendChild(polygon);
        return this;
    }

    /**
     * グラデーションマスクを作成
     */
    public createGradientMask(gradientId: string, x: number = 0, y: number = 0, width: number = 100, height: number = 100): this {
        const rect = SvgElementCreater.createRectElement(x, y, width, height);
        rect.setAttribute("fill", `url(#${gradientId})`);
        this._svgDom.element.appendChild(rect);
        return this;
    }

    /**
     * 線形グラデーションマスクを作成
     */
    public createLinearGradientMask(x: number = 0, y: number = 0, width: number = 100, height: number = 100, direction: "horizontal" | "vertical" | "diagonal" = "horizontal"): this {
        // 線形グラデーションを作成
        const gradientId = `mask-gradient-${Math.random().toString(36).substr(2, 9)}`;
        const gradient = SvgElementCreater.createLinearGradientElement();
        gradient.id = gradientId;

        // 方向に応じて設定
        switch (direction) {
            case "horizontal":
                gradient.setAttribute("x1", "0%");
                gradient.setAttribute("y1", "0%");
                gradient.setAttribute("x2", "100%");
                gradient.setAttribute("y2", "0%");
                break;
            case "vertical":
                gradient.setAttribute("x1", "0%");
                gradient.setAttribute("y1", "0%");
                gradient.setAttribute("x2", "0%");
                gradient.setAttribute("y2", "100%");
                break;
            case "diagonal":
                gradient.setAttribute("x1", "0%");
                gradient.setAttribute("y1", "0%");
                gradient.setAttribute("x2", "100%");
                gradient.setAttribute("y2", "100%");
                break;
        }

        // グラデーションストップを追加
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "white");
        stop1.setAttribute("stop-opacity", "1");

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "black");
        stop2.setAttribute("stop-opacity", "1");

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);

        // defsに追加（もしくは親要素に追加）
        this._svgDom.element.appendChild(gradient);

        // グラデーションを使用する矩形を作成
        return this.createGradientMask(gradientId, x, y, width, height);
    }

    /**
     * 放射状グラデーションマスクを作成
     */
    public createRadialGradientMask(cx: number, cy: number, r: number): this {
        // 放射状グラデーションを作成
        const gradientId = `mask-radial-gradient-${Math.random().toString(36).substr(2, 9)}`;
        const gradient = SvgElementCreater.createRadialGradientElement();
        gradient.id = gradientId;
        gradient.setAttribute("cx", "50%");
        gradient.setAttribute("cy", "50%");
        gradient.setAttribute("r", "50%");

        // グラデーションストップを追加
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "white");
        stop1.setAttribute("stop-opacity", "1");

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "black");
        stop2.setAttribute("stop-opacity", "1");

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);

        // defsに追加
        this._svgDom.element.appendChild(gradient);

        // グラデーションを使用する円を作成
        const circle = SvgElementCreater.createCircleElement(cx, cy, r);
        circle.setAttribute("fill", `url(#${gradientId})`);
        this._svgDom.element.appendChild(circle);

        return this;
    }

    /**
     * フェードアウトマスクを作成
     */
    public createFadeOutMask(x: number = 0, y: number = 0, width: number = 100, height: number = 100, fadeDirection: "top" | "bottom" | "left" | "right" = "bottom"): this {
        const gradientId = `fade-mask-${Math.random().toString(36).substr(2, 9)}`;
        const gradient = SvgElementCreater.createLinearGradientElement();
        gradient.id = gradientId;

        let x1 = "0%", y1 = "0%", x2 = "0%", y2 = "100%";
        let startColor = "white", endColor = "black";

        switch (fadeDirection) {
            case "top":
                x1 = "0%"; y1 = "0%"; x2 = "0%"; y2 = "100%";
                startColor = "black"; endColor = "white";
                break;
            case "bottom":
                x1 = "0%"; y1 = "0%"; x2 = "0%"; y2 = "100%";
                startColor = "white"; endColor = "black";
                break;
            case "left":
                x1 = "0%"; y1 = "0%"; x2 = "100%"; y2 = "0%";
                startColor = "black"; endColor = "white";
                break;
            case "right":
                x1 = "0%"; y1 = "0%"; x2 = "100%"; y2 = "0%";
                startColor = "white"; endColor = "black";
                break;
        }

        gradient.setAttribute("x1", x1);
        gradient.setAttribute("y1", y1);
        gradient.setAttribute("x2", x2);
        gradient.setAttribute("y2", y2);

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", startColor);

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", endColor);

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        this._svgDom.element.appendChild(gradient);

        return this.createGradientMask(gradientId, x, y, width, height);
    }

    /**
     * テキストマスクを作成
     */
    public createTextMask(text: string, x: number, y: number, fontSize: number = 16, fontFamily: string = "Arial", fill: string = "white"): this {
        const textElement = SvgElementCreater.createTextElement(x, y, text, fontSize);
        textElement.setAttribute("font-family", fontFamily);
        textElement.setAttribute("fill", fill);
        this._svgDom.element.appendChild(textElement);
        return this;
    }

    /**
     * ビネットマスクを作成
     */
    public createVignetteMask(cx: number, cy: number, innerRadius: number, outerRadius: number): this {
        const gradientId = `vignette-mask-${Math.random().toString(36).substr(2, 9)}`;
        const gradient = SvgElementCreater.createRadialGradientElement();
        gradient.id = gradientId;
        gradient.setAttribute("cx", "50%");
        gradient.setAttribute("cy", "50%");
        gradient.setAttribute("r", "50%");

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "white");

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", `${(innerRadius / outerRadius) * 100}%`);
        stop2.setAttribute("stop-color", "white");

        const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop3.setAttribute("offset", "100%");
        stop3.setAttribute("stop-color", "black");

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        gradient.appendChild(stop3);
        this._svgDom.element.appendChild(gradient);

        const circle = SvgElementCreater.createCircleElement(cx, cy, outerRadius);
        circle.setAttribute("fill", `url(#${gradientId})`);
        this._svgDom.element.appendChild(circle);

        return this;
    }

    /**
     * パターンマスクを作成
     */
    public createPatternMask(patternId: string, x: number = 0, y: number = 0, width: number = 100, height: number = 100): this {
        const rect = SvgElementCreater.createRectElement(x, y, width, height);
        rect.setAttribute("fill", `url(#${patternId})`);
        this._svgDom.element.appendChild(rect);
        return this;
    }

    /**
     * マスクの内容をクリア
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
     * マスクの境界ボックスを取得
     * mask要素は構造的要素なので、子要素の境界ボックスを計算
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
