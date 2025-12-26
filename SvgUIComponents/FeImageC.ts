import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeImageOptions {
    className?: string | string[];
    id?: string;
    href?: string;
    preserveAspectRatio?: string;
    crossorigin?: "anonymous" | "use-credentials";
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：画像フィルター
 * 外部画像をフィルターグラフに組み込み
 */
export class FeImageC extends SvgFilterPrimitiveBase {
    constructor(options?: FeImageOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.href) this.setHref(options.href);
            if (options.preserveAspectRatio) this.setPreserveAspectRatio(options.preserveAspectRatio);
            if (options.crossorigin) this.setCrossorigin(options.crossorigin);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeImageElement();
        return new SvgElementProxy(element);
    }

    /**
     * 画像のURLまたは参照を設定
     */
    public setHref(href: string): this {
        this.setSvgAttribute("href", href);
        // 旧形式の互換性のためxlink:hrefも設定
        this.setSvgAttribute("xlink:href", href);
        return this;
    }

    /**
     * 画像のURLまたは参照を取得
     */
    public getHref(): string | null {
        return this.getSvgAttribute("href") || this.getSvgAttribute("xlink:href");
    }

    /**
     * アスペクト比の保持方式を設定
     */
    public setPreserveAspectRatio(preserveAspectRatio: string): this {
        this.setSvgAttribute("preserveAspectRatio", preserveAspectRatio);
        return this;
    }

    /**
     * アスペクト比の保持方式を取得
     */
    public getPreserveAspectRatio(): string | null {
        return this.getSvgAttribute("preserveAspectRatio");
    }

    /**
     * クロスオリジン設定を設定
     */
    public setCrossorigin(crossorigin: "anonymous" | "use-credentials"): this {
        this.setSvgAttribute("crossorigin", crossorigin);
        return this;
    }

    /**
     * クロスオリジン設定を取得
     */
    public getCrossorigin(): string | null {
        return this.getSvgAttribute("crossorigin");
    }

    /**
     * 結果の識別子を設定
     */
    public setResult(result: string): this {
        this.setSvgAttribute("result", result);
        return this;
    }

    /**
     * 結果の識別子を取得
     */
    public getResult(): string | null {
        return this.getSvgAttribute("result");
    }

    /**
     * X座標を設定
     */
    public setX(x: string | number): this {
        this.setSvgAttribute("x", x.toString());
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
    public setY(y: string | number): this {
        this.setSvgAttribute("y", y.toString());
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
    public setWidth(width: string | number): this {
        this.setSvgAttribute("width", width.toString());
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
    public setHeight(height: string | number): this {
        this.setSvgAttribute("height", height.toString());
        return this;
    }

    /**
     * 高さを取得
     */
    public getHeight(): string | null {
        return this.getSvgAttribute("height");
    }

    // === プリセットメソッド ===

    /**
     * 外部画像を読み込み
     */
    public loadExternalImage(
        imageUrl: string,
        width?: number,
        height?: number,
        result: string = "external-image"
    ): this {
        this.setHref(imageUrl);
        this.setCrossorigin("anonymous");
        if (width !== undefined) this.setWidth(width);
        if (height !== undefined) this.setHeight(height);
        this.setResult(result);
        return this;
    }

    /**
     * Data URLから画像を読み込み
     */
    public loadDataURL(
        dataUrl: string,
        width?: number,
        height?: number,
        result: string = "data-image"
    ): this {
        this.setHref(dataUrl);
        if (width !== undefined) this.setWidth(width);
        if (height !== undefined) this.setHeight(height);
        this.setResult(result);
        return this;
    }

    /**
     * Base64画像を読み込み
     */
    public loadBase64Image(
        base64Data: string,
        mimeType: string = "image/png",
        width?: number,
        height?: number,
        result: string = "base64-image"
    ): this {
        const dataUrl = `data:${mimeType};base64,${base64Data}`;
        this.setHref(dataUrl);
        if (width !== undefined) this.setWidth(width);
        if (height !== undefined) this.setHeight(height);
        this.setResult(result);
        return this;
    }

    /**
     * SVG内の他の要素を参照
     */
    public referenceElement(
        elementId: string,
        result: string = "referenced-element"
    ): this {
        this.setHref(`#${elementId}`);
        this.setResult(result);
        return this;
    }

    /**
     * アスペクト比を保持して表示
     */
    public preserveAspectRatio(
        align: "none" | "xMinYMin" | "xMidYMin" | "xMaxYMin" | "xMinYMid" | "xMidYMid" | "xMaxYMid" | "xMinYMax" | "xMidYMax" | "xMaxYMax" = "xMidYMid",
        meetOrSlice: "meet" | "slice" = "meet"
    ): this {
        this.setPreserveAspectRatio(`${align} ${meetOrSlice}`);
        return this;
    }

    /**
     * アスペクト比を無視して引き伸ばし
     */
    public stretchToFit(): this {
        this.setPreserveAspectRatio("none");
        return this;
    }

    /**
     * 背景画像として設定
     */
    public createBackgroundImage(
        imageUrl: string,
        result: string = "background"
    ): this {
        this.setHref(imageUrl);
        this.setX("0%");
        this.setY("0%");
        this.setWidth("100%");
        this.setHeight("100%");
        this.preserveAspectRatio("xMidYMid", "slice");
        this.setResult(result);
        return this;
    }

    /**
     * タイル状の背景画像を作成
     */
    public createTiledBackground(
        imageUrl: string,
        tileWidth: number,
        tileHeight: number,
        result: string = "tiled-background"
    ): this {
        this.setHref(imageUrl);
        this.setWidth(tileWidth);
        this.setHeight(tileHeight);
        this.stretchToFit();
        this.setResult(result);
        return this;
    }

    /**
     * ウォーターマーク画像を作成
     */
    public createWatermark(
        imageUrl: string,
        x: number = 0,
        y: number = 0,
        width: number = 100,
        height: number = 100,
        result: string = "watermark"
    ): this {
        this.setHref(imageUrl);
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        this.preserveAspectRatio("xMidYMid", "meet");
        this.setResult(result);
        return this;
    }

    /**
     * テクスチャ画像を作成
     */
    public createTexture(
        imageUrl: string,
        result: string = "texture"
    ): this {
        this.setHref(imageUrl);
        this.setX("0%");
        this.setY("0%");
        this.setWidth("100%");
        this.setHeight("100%");
        this.stretchToFit();
        this.setResult(result);
        return this;
    }

    /**
     * アイコン画像を作成
     */
    public createIcon(
        imageUrl: string,
        size: number,
        x: number = 0,
        y: number = 0,
        result: string = "icon"
    ): this {
        this.setHref(imageUrl);
        this.setX(x);
        this.setY(y);
        this.setWidth(size);
        this.setHeight(size);
        this.preserveAspectRatio("xMidYMid", "meet");
        this.setResult(result);
        return this;
    }

    /**
     * ロゴ画像を作成
     */
    public createLogo(
        imageUrl: string,
        width: number,
        height: number,
        x: number = 0,
        y: number = 0,
        result: string = "logo"
    ): this {
        this.setHref(imageUrl);
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        this.preserveAspectRatio("xMidYMid", "meet");
        this.setResult(result);
        return this;
    }

    /**
     * パターン画像を作成
     */
    public createPattern(
        imageUrl: string,
        patternWidth: number,
        patternHeight: number,
        result: string = "pattern"
    ): this {
        this.setHref(imageUrl);
        this.setWidth(patternWidth);
        this.setHeight(patternHeight);
        this.stretchToFit();
        this.setResult(result);
        return this;
    }

    /**
     * マスク用画像を作成
     */
    public createMaskImage(
        imageUrl: string,
        result: string = "mask-image"
    ): this {
        this.setHref(imageUrl);
        this.setX("0%");
        this.setY("0%");
        this.setWidth("100%");
        this.setHeight("100%");
        this.preserveAspectRatio("xMidYMid", "slice");
        this.setResult(result);
        return this;
    }

    /**
     * オーバーレイ画像を作成
     */
    public createOverlay(
        imageUrl: string,
        opacity: number = 0.5,
        result: string = "overlay"
    ): this {
        this.setHref(imageUrl);
        this.setX("0%");
        this.setY("0%");
        this.setWidth("100%");
        this.setHeight("100%");
        this.preserveAspectRatio("xMidYMid", "slice");
        this.setSvgAttribute("opacity", opacity.toString());
        this.setResult(result);
        return this;
    }

    /**
     * クロスオリジンを有効にして外部画像を読み込み
     */
    public enableCrossOrigin(credentials: boolean = false): this {
        this.setCrossorigin(credentials ? "use-credentials" : "anonymous");
        return this;
    }

    /**
     * 中央に配置
     */
    public centerImage(containerWidth: number, containerHeight: number): this {
        const currentWidth = parseFloat(this.getWidth() || "0");
        const currentHeight = parseFloat(this.getHeight() || "0");
        
        const x = (containerWidth - currentWidth) / 2;
        const y = (containerHeight - currentHeight) / 2;
        
        this.setX(x);
        this.setY(y);
        return this;
    }

    /**
     * 境界を自動設定
     */
    public fitContainer(): this {
        this.setX("0%");
        this.setY("0%");
        this.setWidth("100%");
        this.setHeight("100%");
        return this;
    }
}
