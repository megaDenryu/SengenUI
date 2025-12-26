import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgLegacyBase } from "./BaseClasses/SvgLegacyBase";

/**
 * ColorProfileコンポーネントのオプション
 */
export interface ColorProfileOptions {
    className?: string | string[];
    id?: string;
    name?: string;              // カラープロファイル名
    renderingIntent?: "auto" | "perceptual" | "relative-colorimetric" | "saturation" | "absolute-colorimetric";
    href?: string;              // プロファイルファイルのURI
    local?: string;             // ローカルカラープロファイル名
}

/**
 * ColorProfileC - SVGカラープロファイル要素のコンポーネント
 * 
 * SVGでカラーマネジメントを行うための要素（非推奨だが互換性のため実装）
 * 印刷やプロフェッショナルな色管理が必要な用途で使用される
 * 
 * 注意: この要素は多くのモダンブラウザで非推奨となっており、
 * CSS Color Module Level 4やICCプロファイルの直接指定が推奨される
 * 
 * @example
 * ```typescript
 * // 基本的なカラープロファイル定義
 * const colorProfile = new ColorProfileC({ 
 *     name: "sRGB",
 *     renderingIntent: "perceptual"
 * });
 * 
 * // 外部プロファイルファイル指定
 * const externalProfile = new ColorProfileC({ 
 *     name: "AdobeRGB",
 *     href: "profiles/AdobeRGB1998.icc"
 * });
 * 
 * // ローカルプロファイル指定
 * const localProfile = new ColorProfileC({ 
 *     name: "DisplayProfile",
 *     local: "Display Profile"
 * });
 * ```
 */
export class ColorProfileC extends SvgLegacyBase {
    private _name?: string;
    private _renderingIntent?: string;
    private _href?: string;
    private _local?: string;

    constructor(options: ColorProfileOptions = {}) {
        super();
        this._name = options.name;
        this._renderingIntent = options.renderingIntent;
        this._href = options.href;
        this._local = options.local;
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const colorProfile = SvgElementCreater.createColorProfileElement();
        
        // オプション属性を設定
        if (this._name) colorProfile.setAttribute("name", this._name);
        if (this._renderingIntent) colorProfile.setAttribute("rendering-intent", this._renderingIntent);
        if (this._href) colorProfile.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this._href);
        if (this._local) colorProfile.setAttribute("local", this._local);
        
        return new SvgElementProxy(colorProfile);
    }

    private applyOptions(options: ColorProfileOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    // === プロファイル名設定 ===

    /**
     * カラープロファイル名を設定
     * @param name プロファイル名（後で参照する際の識別子）
     */
    public setName(name: string): this {
        this._name = name;
        this._svgDom.setSvgAttribute("name", name);
        return this;
    }

    /**
     * カラープロファイル名を取得
     */
    public getName(): string | undefined {
        return this._name;
    }

    // === レンダリングインテント設定 ===

    /**
     * レンダリングインテントを設定
     * @param intent レンダリングインテント
     */
    public setRenderingIntent(intent: "auto" | "perceptual" | "relative-colorimetric" | "saturation" | "absolute-colorimetric"): this {
        this._renderingIntent = intent;
        this._svgDom.setSvgAttribute("rendering-intent", intent);
        return this;
    }

    /**
     * レンダリングインテントを取得
     */
    public getRenderingIntent(): string | undefined {
        return this._renderingIntent;
    }

    // === プロファイルソース設定 ===

    /**
     * 外部プロファイルファイルのURIを設定
     * @param href プロファイルファイルのURI
     */
    public setHref(href: string): this {
        this._href = href;
        this._svgDom.element.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href);
        return this;
    }

    /**
     * 外部プロファイルファイルのURIを取得
     */
    public getHref(): string | undefined {
        return this._href;
    }

    /**
     * ローカルカラープロファイル名を設定
     * @param local システムにインストールされたプロファイル名
     */
    public setLocal(local: string): this {
        this._local = local;
        this._svgDom.setSvgAttribute("local", local);
        return this;
    }

    /**
     * ローカルカラープロファイル名を取得
     */
    public getLocal(): string | undefined {
        return this._local;
    }

    // === プリセットメソッド ===

    /**
     * プリセット: sRGBカラープロファイル
     */
    public presetSRGB(): this {
        return this.setName("sRGB")
                  .setRenderingIntent("perceptual")
                  .setLocal("sRGB");
    }

    /**
     * プリセット: Adobe RGBカラープロファイル
     */
    public presetAdobeRGB(): this {
        return this.setName("AdobeRGB")
                  .setRenderingIntent("relative-colorimetric")
                  .setLocal("Adobe RGB (1998)");
    }

    /**
     * プリセット: Display P3カラープロファイル
     */
    public presetDisplayP3(): this {
        return this.setName("DisplayP3")
                  .setRenderingIntent("perceptual")
                  .setLocal("Display P3");
    }

    /**
     * プリセット: ProPhoto RGBカラープロファイル（印刷用）
     */
    public presetProPhotoRGB(): this {
        return this.setName("ProPhotoRGB")
                  .setRenderingIntent("relative-colorimetric")
                  .setLocal("ProPhoto RGB");
    }

    /**
     * プリセット: CMYK印刷用プロファイル
     */
    public presetCMYKPrint(): this {
        return this.setName("CMYKPrint")
                  .setRenderingIntent("perceptual")
                  .setLocal("ISO Coated v2 (ECI)");
    }

    /**
     * プリセット: グレースケールプロファイル
     */
    public presetGrayscale(): this {
        return this.setName("Grayscale")
                  .setRenderingIntent("perceptual")
                  .setLocal("Gray Gamma 2.2");
    }

    /**
     * プリセット: Webセーフカラープロファイル
     */
    public presetWebSafe(): this {
        return this.setName("WebSafe")
                  .setRenderingIntent("saturation")
                  .setLocal("sRGB");
    }

    /**
     * プリセット: 印刷用高精度プロファイル
     */
    public presetPrintHighQuality(): this {
        return this.setName("PrintHQ")
                  .setRenderingIntent("absolute-colorimetric")
                  .setLocal("ISO Coated v2 300% (ECI)");
    }

    /**
     * プリセット: モニター表示用プロファイル
     */
    public presetMonitorDisplay(): this {
        return this.setName("MonitorDisplay")
                  .setRenderingIntent("perceptual")
                  .setLocal("Display Profile");
    }

    /**
     * プリセット: 外部ICCプロファイルファイル
     */
    public presetExternalICC(profilePath: string, profileName: string = "CustomProfile"): this {
        return this.setName(profileName)
                  .setHref(profilePath)
                  .setRenderingIntent("relative-colorimetric");
    }

    // === ユーティリティメソッド ===

    /**
     * プロファイルが外部ファイルを参照しているかどうかを判定
     */
    public isExternalProfile(): boolean {
        return !!this._href;
    }

    /**
     * プロファイルがローカルシステムを参照しているかどうかを判定
     */
    public isLocalProfile(): boolean {
        return !!this._local;
    }

    /**
     * プロファイルの設定情報を取得
     */
    public getProfileInfo(): {
        name?: string;
        renderingIntent?: string;
        href?: string;
        local?: string;
        type: "external" | "local" | "undefined";
    } {
        return {
            name: this._name,
            renderingIntent: this._renderingIntent,
            href: this._href,
            local: this._local,
            type: this.isExternalProfile() ? "external" : 
                  this.isLocalProfile() ? "local" : "undefined"
        };
    }

    // === 非推奨警告メソッド ===

    /**
     * このコンポーネントの非推奨状況について警告を表示
     */
    public showDeprecationWarning(): void {
        console.warn(`
ColorProfileC は非推奨のSVG要素を使用しています。
モダンなブラウザでは以下の代替手段を検討してください：
- CSS Color Module Level 4 の color() 関数
- ICC プロファイルの直接指定
- Canvas API でのカラーマネジメント
        `);
    }

    /**
     * モダンなカラーマネジメント手法の提案を取得
     */
    public getModernAlternatives(): string[] {
        return [
            "CSS color() function with ICC profiles",
            "Canvas 2D context colorSpace property",
            "WebGL color space extensions",
            "CSS @color-profile rule",
            "color-gamut media queries"
        ];
    }
}
