import { ElementProxy } from "./DomProxy";

/**
 * SVG要素専用のElementCreater
 * HTMLとは異なりSVG要素はnamespace URIが必要
 */
export class SvgElementCreater {
    private static readonly SVG_NAMESPACE = "http://www.w3.org/2000/svg";

    /**
     * SVG要素を作成します
     * @param tagName SVGタグ名 (circle, rect, line, path, g, svg等)
     * @param attributes 属性のオブジェクト
     */
    static createSvgElement<T extends SVGElement = SVGElement>(
        tagName: string, 
        attributes: Record<string, string | number> = {}
    ): T {
        const element = document.createElementNS(this.SVG_NAMESPACE, tagName) as T;
        
        // 属性を設定
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value.toString());
        });
        
        return element;
    }

    /**
     * SVG Circle要素を作成
     */
    static createCircleElement(
        cx: number = 0, 
        cy: number = 0, 
        r: number = 10, 
        fill: string = "blue",
        additionalAttributes: Record<string, string | number> = {}
    ): SVGCircleElement {
        return this.createSvgElement<SVGCircleElement>("circle", {
            cx,
            cy,
            r,
            fill,
            ...additionalAttributes
        });
    }

    /**
     * SVG Rectangle要素を作成
     */
    static createRectElement(
        x: number = 0,
        y: number = 0,
        width: number = 100,
        height: number = 50,
        fill: string = "red",
        additionalAttributes: Record<string, string | number> = {}
    ): SVGRectElement {
        return this.createSvgElement<SVGRectElement>("rect", {
            x,
            y,
            width,
            height,
            fill,
            ...additionalAttributes
        });
    }

    /**
     * SVG Line要素を作成
     */
    static createLineElement(
        x1: number = 0,
        y1: number = 0,
        x2: number = 100,
        y2: number = 100,
        stroke: string = "black",
        strokeWidth: number = 2,
        additionalAttributes: Record<string, string | number> = {}
    ): SVGLineElement {
        return this.createSvgElement<SVGLineElement>("line", {
            x1,
            y1,
            x2,
            y2,
            stroke,
            "stroke-width": strokeWidth,
            ...additionalAttributes
        });
    }

    /**
     * SVG Group要素を作成
     */
    static createGroupElement(
        transform: string = "",
        additionalAttributes: Record<string, string | number> = {}
    ): SVGGElement {
        const attributes: Record<string, string | number> = { ...additionalAttributes };
        if (transform) {
            attributes.transform = transform;
        }
        return this.createSvgElement<SVGGElement>("g", attributes);
    }

    /**
     * SVGコンテナ要素を作成
     */
    static createSvgContainerElement(
        width: number = 800,
        height: number = 600,
        viewBox: string = "",
        additionalAttributes: Record<string, string | number> = {}
    ): SVGSVGElement {
        const attributes: Record<string, string | number> = {
            width,
            height,
            ...additionalAttributes
        };
        if (viewBox) {
            attributes.viewBox = viewBox;
        }
        return this.createSvgElement<SVGSVGElement>("svg", attributes);
    }

    /**
     * SVG Text要素を作成
     */
    static createTextElement(
        x: number = 0,
        y: number = 0,
        text: string = "",
        fontSize: string | number = "16",
        fill: string = "black",
        additionalAttributes: Record<string, string | number> = {}
    ): SVGTextElement {
        const textElement = this.createSvgElement<SVGTextElement>("text", {
            x,
            y,
            "font-size": fontSize,
            fill,
            ...additionalAttributes
        });
        if (text) {
            textElement.textContent = text;
        }
        return textElement;
    }

    /**
     * SVG Ellipse要素を作成
     */
    static createEllipseElement(
        cx: number = 0,
        cy: number = 0,
        rx: number = 50,
        ry: number = 25,
        fill: string = "blue",
        additionalAttributes: Record<string, string | number> = {}
    ): SVGEllipseElement {
        return this.createSvgElement<SVGEllipseElement>("ellipse", {
            cx,
            cy,
            rx,
            ry,
            fill,
            ...additionalAttributes
        });
    }

    /**
     * SVG Path要素を作成
     */
    static createPathElement(
        d: string = "",
        fill: string = "none",
        stroke: string = "black",
        strokeWidth: number = 1,
        additionalAttributes: Record<string, string | number> = {}
    ): SVGPathElement {
        const attributes: Record<string, string | number> = {
            fill,
            stroke,
            "stroke-width": strokeWidth,
            ...additionalAttributes
        };
        if (d) {
            attributes.d = d;
        }
        return this.createSvgElement<SVGPathElement>("path", attributes);
    }

    /**
     * SVG Polygon要素を作成
     */
    public static createPolygonElement(): SVGPolygonElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    }

    /**
     * SVG Polyline要素を作成
     */
    public static createPolylineElement(): SVGPolylineElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    }

    /**
     * SVG TSpan要素を作成
     */
    public static createTSpanElement(): SVGTSpanElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    }

    /**
     * SVG TextPath要素を作成
     */
    public static createTextPathElement(): SVGTextPathElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    }

    /**
     * SVG Image要素を作成
     */
    public static createImageElement(): SVGImageElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "image");
    }

    /**
     * SVG Use要素を作成
     */
    public static createUseElement(): SVGUseElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "use");
    }

    /**
     * SVG Defs要素を作成
     */
    public static createDefsElement(): SVGDefsElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "defs");
    }

    /**
     * SVG Symbol要素を作成
     */
    public static createSymbolElement(): SVGSymbolElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "symbol");
    }

    /**
     * SVG LinearGradient要素を作成
     */
    public static createLinearGradientElement(): SVGLinearGradientElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    }

    /**
     * SVG RadialGradient要素を作成
     */
    public static createRadialGradientElement(): SVGRadialGradientElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    }

    /**
     * SVG Pattern要素を作成
     */
    public static createPatternElement(): SVGPatternElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    }

    /**
     * SVG Marker要素を作成
     */
    public static createMarkerElement(): SVGMarkerElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "marker");
    }

    /**
     * SVG Filter要素を作成
     */
    public static createFilterElement(): SVGFilterElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "filter");
    }

    /**
     * SVG ClipPath要素を作成
     */
    public static createClipPathElement(): SVGClipPathElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    }

    /**
     * SVG ForeignObject要素を作成
     */
    public static createForeignObjectElement(): SVGForeignObjectElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    }

    /**
     * SVG Mask要素を作成
     */
    public static createMaskElement(): SVGMaskElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "mask");
    }

    /**
     * SVG Stop要素を作成
     */
    public static createStopElement(): SVGStopElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "stop");
    }

    /**
     * SVG Animate要素を作成
     */
    public static createAnimateElement(): SVGAnimateElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "animate");
    }

    /**
     * SVG AnimateTransform要素を作成
     */
    public static createAnimateTransformElement(): SVGAnimateTransformElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    }

    /**
     * SVG AnimateMotion要素を作成
     */
    public static createAnimateMotionElement(): SVGAnimateMotionElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
    }

    /**
     * SVG FeGaussianBlur要素を作成
     */
    public static createFeGaussianBlurElement(): SVGFEGaussianBlurElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    }

    /**
     * SVG FeDropShadow要素を作成
     */
    public static createFeDropShadowElement(): SVGFEDropShadowElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
    }

    /**
     * SVG FeOffset要素を作成
     */
    public static createFeOffsetElement(): SVGFEOffsetElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feOffset");
    }

    /**
     * SVG FeMorphology要素を作成
     */
    public static createFeMorphologyElement(): SVGFEMorphologyElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feMorphology");
    }

    /**
     * SVG FeFlood要素を作成
     */
    public static createFeFloodElement(): SVGFEFloodElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feFlood");
    }

    /**
     * SVG FeComposite要素を作成
     */
    public static createFeCompositeElement(): SVGFECompositeElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
    }

    /**
     * SVG FeColorMatrix要素を作成
     */
    public static createFeColorMatrixElement(): SVGFEColorMatrixElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
    }

    /**
     * SVG FeTurbulence要素を作成
     */
    public static createFeTurbulenceElement(): SVGFETurbulenceElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
    }

    /**
     * SVG FeImage要素を作成
     */
    public static createFeImageElement(): SVGFEImageElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feImage");
    }

    /**
     * SVG FeConvolveMatrix要素を作成
     */
    public static createFeConvolveMatrixElement(): SVGFEConvolveMatrixElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feConvolveMatrix");
    }

    /**
     * SVG FeBlend要素を作成
     */
    public static createFeBlendElement(): SVGFEBlendElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
    }

    /**
     * SVG FeDiffuseLighting要素を作成
     */
    public static createFeDiffuseLightingElement(): SVGFEDiffuseLightingElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feDiffuseLighting");
    }

    /**
     * SVG FeSpecularLighting要素を作成
     */
    public static createFeSpecularLightingElement(): SVGFESpecularLightingElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feSpecularLighting");
    }

    /**
     * SVG FeDistantLight要素を作成
     */
    public static createFeDistantLightElement(): SVGFEDistantLightElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feDistantLight");
    }

    /**
     * SVG FePointLight要素を作成
     */
    public static createFePointLightElement(): SVGFEPointLightElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "fePointLight");
    }

    /**
     * SVG FeSpotLight要素を作成
     */
    public static createFeSpotLightElement(): SVGFESpotLightElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feSpotLight");
    }

    /**
     * SVG FeDisplacementMap要素を作成
     */
    public static createFeDisplacementMapElement(): SVGFEDisplacementMapElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feDisplacementMap");
    }

    /**
     * SVG FeComponentTransfer要素を作成
     */
    public static createFeComponentTransferElement(): SVGFEComponentTransferElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feComponentTransfer");
    }

    /**
     * SVG FeFuncR要素を作成
     */
    public static createFeFuncRElement(): SVGFEFuncRElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feFuncR");
    }

    /**
     * SVG FeFuncG要素を作成
     */
    public static createFeFuncGElement(): SVGFEFuncGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feFuncG");
    }

    /**
     * SVG FeFuncB要素を作成
     */
    public static createFeFuncBElement(): SVGFEFuncBElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feFuncB");
    }

    /**
     * SVG FeFuncA要素を作成
     */
    public static createFeFuncAElement(): SVGFEFuncAElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "feFuncA");
    }

    /**
     * SVG AnimateColor要素を作成
     */
    public static createAnimateColorElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "animateColor");
    }

    /**
     * SVG Set要素を作成
     */
    public static createSetElement(): SVGSetElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "set");
    }

    /**
     * SVG MPath要素を作成
     */
    public static createMPathElement(): SVGMPathElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "mpath");
    }

    /**
     * SVG Title要素を作成
     */
    public static createTitleElement(): SVGTitleElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "title");
    }

    /**
     * SVG Desc要素を作成
     */
    public static createDescElement(): SVGDescElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "desc");
    }

    /**
     * SVG Metadata要素を作成
     */
    public static createMetadataElement(): SVGMetadataElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "metadata");
    }

    /**
     * SVG A要素を作成
     */
    public static createAElement(): SVGAElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "a");
    }

    /**
     * SVG Switch要素を作成
     */
    public static createSwitchElement(): SVGSwitchElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "switch");
    }

    // === フォント関連要素（非推奨だが互換性のため） ===

    /**
     * SVG Font要素を作成
     */
    public static createFontElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "font");
    }

    /**
     * SVG FontFace要素を作成
     */
    public static createFontFaceElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "font-face");
    }

    /**
     * SVG Glyph要素を作成
     */
    public static createGlyphElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "glyph");
    }

    /**
     * SVG MissingGlyph要素を作成
     */
    public static createMissingGlyphElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "missing-glyph");
    }

    /**
     * SVG HKern要素を作成
     */
    public static createHKernElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "hkern");
    }

    /**
     * SVG VKern要素を作成
     */
    public static createVKernElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "vkern");
    }

    /**
     * SVG FontFaceSrc要素を作成
     */
    public static createFontFaceSrcElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "font-face-src");
    }

    /**
     * SVG FontFaceUri要素を作成
     */
    public static createFontFaceUriElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "font-face-uri");
    }

    /**
     * SVG FontFaceFormat要素を作成
     */
    public static createFontFaceFormatElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "font-face-format");
    }

    /**
     * SVG FontFaceName要素を作成
     */
    public static createFontFaceNameElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "font-face-name");
    }

    // === その他の要素 ===

    /**
     * SVG ColorProfile要素を作成（非推奨だが互換性のため）
     */
    public static createColorProfileElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "color-profile");
    }

    /**
     * SVG Cursor要素を作成（非推奨だが互換性のため）
     */
    public static createCursorElement(): SVGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "cursor");
    }
}





/**
 * SVGElement用Proxy
 * SVG要素固有の機能を提供
 */
export class SvgElementProxy extends ElementProxy<SVGElement> {
    constructor(svgElement: SVGElement, addClassName: string[] = [], vertexViewContent: any | null = null) {
        super(svgElement);
        this.addCSSClass(addClassName);
    }

    // ========================================
    // SVGElement固有機能: 子要素管理（型安全）
    // ========================================

    addChild(child: HaveSvgElementProxy): void {
        this._element.appendChild(child.dom.element);
    }

    addChilds(childs: HaveSvgElementProxy[]): void {
        for (const child of childs) {
            this.addChild(child);
        }
    }

    /**
     * 子要素を指定位置に挿入
     */
    insertChildAt(index: number, child: HaveSvgElementProxy): void {
        const children = this._element.children;
        if (index < 0 || index > children.length) {
            throw new Error(`Invalid index: ${index}`);
        }
        if (index === children.length) {
            this._element.appendChild(child.dom.element);
        } else {
            this._element.insertBefore(child.dom.element, children[index]);
        }
    }

    deleteChild(child: HaveSvgElementProxy): void {
        if (this._element.contains(child.dom.element)) {
            this._element.removeChild(child.dom.element);
        } else {
            console.warn('Child element not found in parent.');
        }
    }

    /**
     * 子要素の順序を変更
     */
    moveChildToIndex(child: HaveSvgElementProxy, newIndex: number): void {
        const childElement = child.dom.element;
        const children = Array.from(this._element.children);
        const currentIndex = children.indexOf(childElement);
        
        if (currentIndex === -1) {
            throw new Error("Child not found in parent");
        }
        
        if (newIndex < 0 || newIndex >= children.length) {
            throw new Error(`Invalid index: ${newIndex}`);
        }
        
        if (currentIndex === newIndex) {
            return;
        }
        
        this._element.removeChild(childElement);
        
        if (newIndex === children.length - 1) {
            this._element.appendChild(childElement);
        } else {
            const targetIndex = newIndex > currentIndex ? newIndex : newIndex;
            const nextSibling = this._element.children[targetIndex];
            if (nextSibling) {
                this._element.insertBefore(childElement, nextSibling);
            } else {
                this._element.appendChild(childElement);
            }
        }
    }

    // ========================================
    // SVGElement固有機能: スタイル
    // ========================================

    setStyle(styles: Partial<CSSStyleDeclaration>): void {
        Object.assign(this._element.style, styles);
    }

    get isShow(): boolean {
        const style = window.getComputedStyle(this._element);
        return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0' &&
            document.body.contains(this._element)
        );
    }
    
    show(): void {
        this._element.style.display = 'block';
        this._element.style.visibility = 'visible';
        this._element.style.opacity = '1';
    }
    
    hide(): void {
        this._element.style.display = 'none';
        this._element.style.visibility = 'hidden';
        this._element.style.opacity = '0';
    }

    // ========================================
    // SVGElement固有機能: SVG属性操作
    // ========================================

    /**
     * SVG属性を設定
     */
    setSvgAttribute(name: string, value: string | number): this {
        this._element.setAttribute(name, value.toString());
        return this;
    }

    /**
     * SVG属性を取得
     */
    getSvgAttribute(name: string): string | null {
        return this._element.getAttribute(name);
    }

    /**
     * SVG属性を削除
     */
    removeSvgAttribute(name: string): this {
        this._element.removeAttribute(name);
        return this;
    }

    // ========================================
    // SVGElement固有機能: トランスフォーム
    // ========================================

    /**
     * transform属性を設定
     */
    setTransform(transform: string): this {
        return this.setSvgAttribute("transform", transform);
    }

    /**
     * 移動変形を設定
     */
    setTranslate(x: number, y: number): this {
        return this.setTransform(`translate(${x}, ${y})`);
    }

    /**
     * 回転変形を設定
     */
    setRotate(angle: number, cx?: number, cy?: number): this {
        const rotation = cx !== undefined && cy !== undefined 
            ? `rotate(${angle}, ${cx}, ${cy})`
            : `rotate(${angle})`;
        return this.setTransform(rotation);
    }

    /**
     * スケール変形を設定
     */
    setScale(sx: number, sy?: number): this {
        const scale = sy !== undefined ? `scale(${sx}, ${sy})` : `scale(${sx})`;
        return this.setTransform(scale);
    }

    /**
     * 複合変形を設定
     */
    setComplexTransform(transforms: string[]): this {
        return this.setTransform(transforms.join(" "));
    }

    // ========================================
    // SVGElement固有機能: 描画属性
    // ========================================

    /**
     * fill属性を設定
     */
    setFill(color: string): this {
        return this.setSvgAttribute("fill", color);
    }

    /**
     * stroke属性を設定
     */
    setStroke(color: string, width?: number): this {
        this.setSvgAttribute("stroke", color);
        if (width !== undefined) {
            this.setSvgAttribute("stroke-width", width);
        }
        return this;
    }

    /**
     * 不透明度を設定
     */
    setOpacity(opacity: number): this {
        return this.setSvgAttribute("opacity", opacity);
    }

    // ========================================
    // SVGElement固有機能: SVG特有のプロパティ
    // ========================================

    /**
     * ownerSVGElementを取得
     */
    get ownerSVGElement(): SVGSVGElement | null {
        return this._element.ownerSVGElement;
    }

    /**
     * viewportElementを取得
     */
    get viewportElement(): SVGElement | null {
        return this._element.viewportElement;
    }
}

export interface HaveSvgElementProxy {
    readonly dom: SvgElementProxy;
    delete(): void;
}

