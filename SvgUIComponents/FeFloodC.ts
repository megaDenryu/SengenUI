import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeFloodOptions {
    className?: string | string[];
    id?: string;
    floodColor?: string;
    floodOpacity?: string | number;
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：色塗りつぶし
 * 指定した色で矩形領域を塗りつぶし
 */
export class FeFloodC extends SvgFilterPrimitiveBase {
    constructor(options?: FeFloodOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.floodColor) this.setFloodColor(options.floodColor);
            if (options.floodOpacity !== undefined) this.setFloodOpacity(options.floodOpacity);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeFloodElement();
        return new SvgElementProxy(element);
    }

    /**
     * 塗りつぶし色を設定
     */
    public setFloodColor(color: string): this {
        this.setSvgAttribute("flood-color", color);
        return this;
    }

    /**
     * 塗りつぶし色を取得
     */
    public getFloodColor(): string | null {
        return this.getSvgAttribute("flood-color");
    }

    /**
     * 塗りつぶし不透明度を設定
     */
    public setFloodOpacity(opacity: string | number): this {
        this.setSvgAttribute("flood-opacity", opacity.toString());
        return this;
    }

    /**
     * 塗りつぶし不透明度を取得
     */
    public getFloodOpacity(): string | null {
        return this.getSvgAttribute("flood-opacity");
    }

    /**
     * 色と不透明度を同時に設定
     */
    public setFlood(color: string, opacity?: number): this {
        this.setFloodColor(color);
        if (opacity !== undefined) this.setFloodOpacity(opacity);
        return this;
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
     * 基本的な色塗りつぶしを作成
     */
    public createBasicFlood(
        color: string,
        opacity: number = 1,
        result: string = "flood"
    ): this {
        this.setFloodColor(color);
        this.setFloodOpacity(opacity);
        this.setResult(result);
        return this;
    }

    /**
     * 黒色塗りつぶしを作成（シャドウ用）
     */
    public createBlackFlood(
        opacity: number = 0.5,
        result: string = "black-flood"
    ): this {
        this.setFloodColor("black");
        this.setFloodOpacity(opacity);
        this.setResult(result);
        return this;
    }

    /**
     * 白色塗りつぶしを作成（ハイライト用）
     */
    public createWhiteFlood(
        opacity: number = 0.8,
        result: string = "white-flood"
    ): this {
        this.setFloodColor("white");
        this.setFloodOpacity(opacity);
        this.setResult(result);
        return this;
    }

    /**
     * 透明塗りつぶしを作成
     */
    public createTransparentFlood(
        result: string = "transparent-flood"
    ): this {
        this.setFloodColor("transparent");
        this.setFloodOpacity(0);
        this.setResult(result);
        return this;
    }

    /**
     * グレー塗りつぶしを作成
     */
    public createGrayFlood(
        shade: "light" | "medium" | "dark" = "medium",
        opacity: number = 0.6,
        result: string = "gray-flood"
    ): this {
        const colors = {
            light: "#cccccc",
            medium: "#808080",
            dark: "#333333"
        };
        this.setFloodColor(colors[shade]);
        this.setFloodOpacity(opacity);
        this.setResult(result);
        return this;
    }

    /**
     * カラー塗りつぶしを作成（プリセットカラー）
     */
    public createColorFlood(
        colorName: "red" | "green" | "blue" | "yellow" | "purple" | "orange" | "pink" | "cyan",
        opacity: number = 0.7,
        result?: string
    ): this {
        const colors = {
            red: "#ff0000",
            green: "#00ff00",
            blue: "#0000ff",
            yellow: "#ffff00",
            purple: "#800080",
            orange: "#ffa500",
            pink: "#ffc0cb",
            cyan: "#00ffff"
        };
        this.setFloodColor(colors[colorName]);
        this.setFloodOpacity(opacity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * グラデーション用ベース色を作成
     */
    public createGradientBaseFlood(
        color: string,
        opacity: number = 1,
        result: string = "gradient-base"
    ): this {
        this.setFloodColor(color);
        this.setFloodOpacity(opacity);
        this.setResult(result);
        return this;
    }

    /**
     * シャドウ用暗色塗りつぶしを作成
     */
    public createShadowFlood(
        darkness: "light" | "medium" | "dark" = "medium",
        result: string = "shadow-flood"
    ): this {
        const opacities = {
            light: 0.2,
            medium: 0.4,
            dark: 0.6
        };
        this.setFloodColor("black");
        this.setFloodOpacity(opacities[darkness]);
        this.setResult(result);
        return this;
    }

    /**
     * ハイライト用明色塗りつぶしを作成
     */
    public createHighlightFlood(
        brightness: "soft" | "medium" | "bright" = "medium",
        result: string = "highlight-flood"
    ): this {
        const colors = {
            soft: "#f8f8f8",
            medium: "#ffffff",
            bright: "#ffffff"
        };
        const opacities = {
            soft: 0.3,
            medium: 0.6,
            bright: 0.9
        };
        this.setFloodColor(colors[brightness]);
        this.setFloodOpacity(opacities[brightness]);
        this.setResult(result);
        return this;
    }

    /**
     * グロー効果用塗りつぶしを作成
     */
    public createGlowFlood(
        glowColor: string = "#00ff00",
        intensity: number = 0.8,
        result: string = "glow-flood"
    ): this {
        this.setFloodColor(glowColor);
        this.setFloodOpacity(intensity);
        this.setResult(result);
        return this;
    }

    /**
     * ネオン効果用塗りつぶしを作成
     */
    public createNeonFlood(
        neonColor: string = "#ff00ff",
        intensity: number = 0.9,
        result: string = "neon-flood"
    ): this {
        this.setFloodColor(neonColor);
        this.setFloodOpacity(intensity);
        this.setResult(result);
        return this;
    }

    /**
     * 背景オーバーレイ用塗りつぶしを作成
     */
    public createOverlayFlood(
        overlayColor: string = "black",
        opacity: number = 0.3,
        result: string = "overlay-flood"
    ): this {
        this.setFloodColor(overlayColor);
        this.setFloodOpacity(opacity);
        this.setResult(result);
        return this;
    }

    /**
     * 境界マスク用塗りつぶしを作成
     */
    public createMaskFlood(
        maskColor: string = "white",
        result: string = "mask-flood"
    ): this {
        this.setFloodColor(maskColor);
        this.setFloodOpacity(1);
        this.setResult(result);
        return this;
    }

    /**
     * カスタムRGBA色を作成
     */
    public createRGBAFlood(
        r: number,
        g: number,
        b: number,
        a: number = 1,
        result?: string
    ): this {
        this.setFloodColor(`rgb(${r}, ${g}, ${b})`);
        this.setFloodOpacity(a);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * HSL色を作成
     */
    public createHSLFlood(
        h: number,
        s: number,
        l: number,
        opacity: number = 1,
        result?: string
    ): this {
        this.setFloodColor(`hsl(${h}, ${s}%, ${l}%)`);
        this.setFloodOpacity(opacity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 領域全体を塗りつぶすように境界を設定
     */
    public fillEntireRegion(): this {
        this.setX("0%");
        this.setY("0%");
        this.setWidth("100%");
        this.setHeight("100%");
        return this;
    }

    /**
     * カスタム領域を設定
     */
    public setCustomRegion(x: number, y: number, width: number, height: number): this {
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }
}
