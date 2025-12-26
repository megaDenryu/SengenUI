import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterContainerBase } from "./BaseClasses/SvgFilterContainerBase";

export interface FilterOptions {
    id?: string;
    x?: number | string;
    y?: number | string;
    width?: number | string;
    height?: number | string;
    filterUnits?: "userSpaceOnUse" | "objectBoundingBox";
    primitiveUnits?: "userSpaceOnUse" | "objectBoundingBox";
    transform?: string;
    opacity?: number;
    className?: string | string[];
}

/**
 * SVG Filter要素のコンポーネント
 * フィルター効果を定義するためのSVG要素をラップします
 */
export class FilterC extends SvgFilterContainerBase {
    constructor(options?: FilterOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.id) this._svgDom.element.id = options.id;
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.filterUnits) this.setFilterUnits(options.filterUnits);
            if (options.primitiveUnits) this.setPrimitiveUnits(options.primitiveUnits);
            if (options.transform) this.setTransform(options.transform);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.className) this.addSvgClass(options.className);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const filter = SvgElementCreater.createFilterElement();
        return new SvgElementProxy(filter);
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
     * filterUnits属性を設定
     */
    public setFilterUnits(units: "userSpaceOnUse" | "objectBoundingBox"): this {
        this.setSvgAttribute("filterUnits", units);
        return this;
    }

    /**
     * filterUnits属性を取得
     */
    public getFilterUnits(): string | null {
        return this.getSvgAttribute("filterUnits");
    }

    /**
     * primitiveUnits属性を設定
     */
    public setPrimitiveUnits(units: "userSpaceOnUse" | "objectBoundingBox"): this {
        this.setSvgAttribute("primitiveUnits", units);
        return this;
    }

    /**
     * primitiveUnits属性を取得
     */
    public getPrimitiveUnits(): string | null {
        return this.getSvgAttribute("primitiveUnits");
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
     * ユーザー空間座標系でフィルターを設定
     */
    public useUserSpaceOnUse(): this {
        this.setFilterUnits("userSpaceOnUse");
        this.setPrimitiveUnits("userSpaceOnUse");
        return this;
    }

    /**
     * オブジェクト境界ボックス座標系でフィルターを設定
     */
    public useObjectBoundingBox(): this {
        this.setFilterUnits("objectBoundingBox");
        this.setPrimitiveUnits("objectBoundingBox");
        return this;
    }

    /**
     * ガウシアンブラーフィルターを追加
     */
    public addGaussianBlur(stdDeviation: number, input?: string, result?: string): this {
        const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
        blur.setAttribute("stdDeviation", stdDeviation.toString());
        if (input) blur.setAttribute("in", input);
        if (result) blur.setAttribute("result", result);
        this._svgDom.element.appendChild(blur);
        return this;
    }

    /**
     * カラーマトリックスフィルターを追加
     */
    public addColorMatrix(type: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha", values?: string, result?: string): this {
        const colorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        colorMatrix.setAttribute("type", type);
        if (values) colorMatrix.setAttribute("values", values);
        if (result) colorMatrix.setAttribute("result", result);
        this._svgDom.element.appendChild(colorMatrix);
        return this;
    }

    /**
     * オフセットフィルターを追加
     */
    public addOffset(dx: number, dy: number, input?: string, result?: string): this {
        const offset = document.createElementNS("http://www.w3.org/2000/svg", "feOffset");
        offset.setAttribute("dx", dx.toString());
        offset.setAttribute("dy", dy.toString());
        if (input) offset.setAttribute("in", input);
        if (result) offset.setAttribute("result", result);
        this._svgDom.element.appendChild(offset);
        return this;
    }

    /**
     * フラッドフィルターを追加
     */
    public addFlood(color: string, opacity: number = 1, result?: string): this {
        const flood = document.createElementNS("http://www.w3.org/2000/svg", "feFlood");
        flood.setAttribute("flood-color", color);
        flood.setAttribute("flood-opacity", opacity.toString());
        if (result) flood.setAttribute("result", result);
        this._svgDom.element.appendChild(flood);
        return this;
    }

    /**
     * コンポジットフィルターを追加
     */
    public addComposite(operator: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic", in1?: string, in2?: string, result?: string): this {
        const composite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
        composite.setAttribute("operator", operator);
        if (in1) composite.setAttribute("in", in1);
        if (in2) composite.setAttribute("in2", in2);
        if (result) composite.setAttribute("result", result);
        this._svgDom.element.appendChild(composite);
        return this;
    }

    /**
     * モーフォロジーフィルターを追加
     */
    public addMorphology(operator: "erode" | "dilate", radius: number, input?: string, result?: string): this {
        const morphology = document.createElementNS("http://www.w3.org/2000/svg", "feMorphology");
        morphology.setAttribute("operator", operator);
        morphology.setAttribute("radius", radius.toString());
        if (input) morphology.setAttribute("in", input);
        if (result) morphology.setAttribute("result", result);
        this._svgDom.element.appendChild(morphology);
        return this;
    }

    /**
     * 畳み込みマトリックスフィルターを追加
     */
    public addConvolveMatrix(order: number, kernelMatrix: string, input?: string, result?: string): this {
        const convolve = document.createElementNS("http://www.w3.org/2000/svg", "feConvolveMatrix");
        convolve.setAttribute("order", order.toString());
        convolve.setAttribute("kernelMatrix", kernelMatrix);
        if (input) convolve.setAttribute("in", input);
        if (result) convolve.setAttribute("result", result);
        this._svgDom.element.appendChild(convolve);
        return this;
    }

    /**
     * 湿潤フィルターを追加
     */
    public addTurbulence(baseFrequency: string, numOctaves: number = 4, seed: number = 2, stitchTiles: "stitch" | "noStitch" = "noStitch", type: "fractalNoise" | "turbulence" = "turbulence", result?: string): this {
        const turbulence = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
        turbulence.setAttribute("baseFrequency", baseFrequency);
        turbulence.setAttribute("numOctaves", numOctaves.toString());
        turbulence.setAttribute("seed", seed.toString());
        turbulence.setAttribute("stitchTiles", stitchTiles);
        turbulence.setAttribute("type", type);
        if (result) turbulence.setAttribute("result", result);
        this._svgDom.element.appendChild(turbulence);
        return this;
    }

    /**
     * 置換マップフィルターを追加
     */
    public addDisplacementMap(scale: number, xChannelSelector: "R" | "G" | "B" | "A", yChannelSelector: "R" | "G" | "B" | "A", input?: string, input2?: string, result?: string): this {
        const displacement = document.createElementNS("http://www.w3.org/2000/svg", "feDisplacementMap");
        displacement.setAttribute("scale", scale.toString());
        displacement.setAttribute("xChannelSelector", xChannelSelector);
        displacement.setAttribute("yChannelSelector", yChannelSelector);
        if (input) displacement.setAttribute("in", input);
        if (input2) displacement.setAttribute("in2", input2);
        if (result) displacement.setAttribute("result", result);
        this._svgDom.element.appendChild(displacement);
        return this;
    }

    /**
     * 照明フィルターを追加
     */
    public addDiffuseLighting(surfaceScale: number = 1, diffuseConstant: number = 1, kernelUnitLength?: string, input?: string, result?: string): this {
        const lighting = document.createElementNS("http://www.w3.org/2000/svg", "feDiffuseLighting");
        lighting.setAttribute("surfaceScale", surfaceScale.toString());
        lighting.setAttribute("diffuseConstant", diffuseConstant.toString());
        if (kernelUnitLength) lighting.setAttribute("kernelUnitLength", kernelUnitLength);
        if (input) lighting.setAttribute("in", input);
        if (result) lighting.setAttribute("result", result);
        this._svgDom.element.appendChild(lighting);
        return this;
    }

    /**
     * スペキュラー照明フィルターを追加
     */
    public addSpecularLighting(surfaceScale: number = 1, specularConstant: number = 1, specularExponent: number = 1, kernelUnitLength?: string, input?: string, result?: string): this {
        const lighting = document.createElementNS("http://www.w3.org/2000/svg", "feSpecularLighting");
        lighting.setAttribute("surfaceScale", surfaceScale.toString());
        lighting.setAttribute("specularConstant", specularConstant.toString());
        lighting.setAttribute("specularExponent", specularExponent.toString());
        if (kernelUnitLength) lighting.setAttribute("kernelUnitLength", kernelUnitLength);
        if (input) lighting.setAttribute("in", input);
        if (result) lighting.setAttribute("result", result);
        this._svgDom.element.appendChild(lighting);
        return this;
    }

    /**
     * 簡単なドロップシャドウ効果を作成
     */
    public createDropShadow(dx: number = 2, dy: number = 2, blur: number = 3, color: string = "black", opacity: number = 0.5): this {
        // オフセット
        this.addOffset(dx, dy, "SourceGraphic", "offset");
        
        // ブラー
        this.addGaussianBlur(blur, "blur");
        
        // 色を設定
        this.addFlood(color, opacity, "shadowColor");
        
        // 色を適用
        this.addComposite("in", "blur", "shadowColor", "shadow");
        
        // 元の画像と合成
        this.addComposite("over", "SourceGraphic", "shadow");
        
        return this;
    }

    /**
     * 光る効果を作成
     */
    public createGlow(blur: number = 5, color: string = "yellow", intensity: number = 1): this {
        // ブラー効果
        this.addGaussianBlur(blur, undefined, "blur");
        
        // 光る色を設定
        this.addFlood(color, intensity, "glowColor");
        
        // 色を適用
        this.addComposite("in", "blur", "glowColor", "glow");
        
        // 元の画像と合成
        this.addComposite("over", "glow", "SourceGraphic");
        
        return this;
    }

    /**
     * エンボス効果を作成
     */
    public createEmboss(): this {
        const matrix = "-2 -1 0 -1 1 1 0 1 2";
        this.addConvolveMatrix(3, matrix, "SourceGraphic", "emboss");
        return this;
    }

    /**
     * エッジ検出効果を作成
     */
    public createEdgeDetection(): this {
        const matrix = "0 -1 0 -1 4 -1 0 -1 0";
        this.addConvolveMatrix(3, matrix, "SourceGraphic", "edges");
        return this;
    }

    /**
     * セピア効果を作成
     */
    public createSepia(): this {
        const values = "0.393 0.769 0.189 0 0 0.349 0.686 0.168 0 0 0.272 0.534 0.131 0 0 0 0 0 1 0";
        this.addColorMatrix("matrix", values);
        return this;
    }

    /**
     * グレースケール効果を作成
     */
    public createGrayscale(): this {
        const values = "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0";
        this.addColorMatrix("matrix", values);
        return this;
    }

    /**
     * 色相回転効果を作成
     */
    public createHueRotation(degrees: number): this {
        this.addColorMatrix("hueRotate", degrees.toString());
        return this;
    }

    /**
     * 彩度調整効果を作成
     */
    public createSaturation(value: number): this {
        this.addColorMatrix("saturate", value.toString());
        return this;
    }

    /**
     * 色反転効果を作成
     */
    public createInvert(): this {
        const values = "-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0";
        this.addColorMatrix("matrix", values);
        return this;
    }

    /**
     * 3D効果を作成
     */
    public create3DEffect(depth: number = 3): this {
        // 影を作成
        this.addOffset(depth, depth, "SourceGraphic", "offset");
        this.addFlood("#000000", 0.6, "shadowColor");
        this.addComposite("in", "offset", "shadowColor", "shadow");
        
        // 元の画像と合成
        this.addComposite("over", "SourceGraphic", "shadow");
        
        return this;
    }

    /**
     * ノイズ効果を作成
     */
    public createNoise(intensity: number = 0.1): this {
        this.addTurbulence("0.9", 4, 2, "noStitch", "turbulence", "noise");
        this.addComposite("arithmetic", "SourceGraphic", "noise", undefined);
        return this;
    }

    /**
     * 水彩効果を作成
     */
    public createWatercolor(): this {
        // タービュランスでテクスチャを作成
        this.addTurbulence("0.04", 3, 5, "noStitch", "fractalNoise", "texture");
        
        // 置換マップで歪みを追加
        this.addDisplacementMap(20, "R", "G", "SourceGraphic", "texture", "distorted");
        
        // ブラーを追加
        this.addGaussianBlur(1, "distorted", "blurred");
        
        return this;
    }

    /**
     * フィルターの内容をクリア
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
}
