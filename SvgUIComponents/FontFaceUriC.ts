import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

/**
 * FontFaceUriコンポーネントのオプション
 */
export interface FontFaceUriOptions {
    className?: string | string[];
    id?: string;
    href: string;       // フォントファイルのURI（必須）
    format?: string;    // フォントフォーマット
}

/**
 * FontFaceUriC - SVGフォントフェースURI要素のコンポーネント
 * 
 * 外部フォントファイルの場所を指定する要素
 * font-face-src要素の子要素として使用される
 * 
 * @example
 * ```typescript
 * // 基本的なフォントURI
 * const fontUri = new FontFaceUriC({ 
 *     href: "fonts/myFont.woff2" 
 * });
 * 
 * // フォーマット指定付き
 * const fontUriWithFormat = new FontFaceUriC({ 
 *     href: "fonts/myFont.woff", 
 *     format: "woff" 
 * });
 * 
 * // Google Fonts
 * const googleFont = new FontFaceUriC({ 
 *     href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400",
 *     format: "woff2"
 * });
 * ```
 */
export class FontFaceUriC extends SvgFontBase {
    private _href: string;
    private _format?: string;

    constructor(options: FontFaceUriOptions) {
        super();
        this._href = options.href;
        this._format = options.format;
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const fontFaceUri = SvgElementCreater.createFontFaceUriElement();
        
        // 必須属性
        fontFaceUri.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this._href);
        
        // フォーマット要素を追加
        if (this._format) {
            this.addFormatElement(this._format);
        }
        
        return new SvgElementProxy(fontFaceUri);
    }

    private applyOptions(options: FontFaceUriOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    private addFormatElement(format: string): void {
        const formatElement = SvgElementCreater.createFontFaceFormatElement();
        formatElement.setAttribute("string", format);
        this._svgDom.element.appendChild(formatElement);
    }

    // === URI設定 ===

    /**
     * フォントファイルのURIを設定
     * @param href フォントファイルのURI
     */
    public setHref(href: string): this {
        this._href = href;
        this._svgDom.element.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href);
        return this;
    }

    /**
     * フォントファイルのURIを取得
     */
    public getHref(): string {
        return this._href;
    }

    // === フォーマット設定 ===

    /**
     * フォントフォーマットを設定
     * @param format フォントフォーマット（"woff", "woff2", "truetype", "opentype", "embedded-opentype", "svg"）
     */
    public setFormat(format: string): this {
        this._format = format;
        
        // 既存のフォーマット要素を削除
        const formatElements = this._svgDom.element.querySelectorAll("font-face-format");
        formatElements.forEach(el => el.remove());
        
        // 新しいフォーマット要素を追加
        this.addFormatElement(format);
        return this;
    }

    /**
     * フォントフォーマットを取得
     */
    public getFormat(): string | undefined {
        return this._format;
    }

    /**
     * フォーマット要素を削除
     */
    public removeFormat(): this {
        this._format = undefined;
        const formatElements = this._svgDom.element.querySelectorAll("font-face-format");
        formatElements.forEach(el => el.remove());
        return this;
    }

    // === ユーティリティメソッド ===

    /**
     * URIがローカルファイルかどうかを判定
     */
    public isLocalFile(): boolean {
        return !this._href.startsWith("http://") && !this._href.startsWith("https://");
    }

    /**
     * URIがWebフォントかどうかを判定
     */
    public isWebFont(): boolean {
        return this._href.startsWith("http://") || this._href.startsWith("https://");
    }

    /**
     * URIがGoogle Fontsかどうかを判定
     */
    public isGoogleFont(): boolean {
        return this._href.includes("fonts.googleapis.com");
    }

    // === プリセットメソッド ===

    /**
     * プリセット: WOFF2フォント
     */
    public presetWoff2(href: string): this {
        return this.setHref(href).setFormat("woff2");
    }

    /**
     * プリセット: WOFFフォント
     */
    public presetWoff(href: string): this {
        return this.setHref(href).setFormat("woff");
    }

    /**
     * プリセット: TrueTypeフォント
     */
    public presetTrueType(href: string): this {
        return this.setHref(href).setFormat("truetype");
    }

    /**
     * プリセット: OpenTypeフォント
     */
    public presetOpenType(href: string): this {
        return this.setHref(href).setFormat("opentype");
    }

    /**
     * プリセット: EOTフォント（IE対応）
     */
    public presetEot(href: string): this {
        return this.setHref(href).setFormat("embedded-opentype");
    }

    /**
     * プリセット: SVGフォント
     */
    public presetSvgFont(href: string): this {
        return this.setHref(href).setFormat("svg");
    }

    /**
     * プリセット: Google Fonts設定
     */
    public presetGoogleFont(fontFamily: string, weights: string[] = ["400"]): this {
        const weightStr = weights.join(";");
        const googleUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(" ", "+")}:wght@${weightStr}`;
        return this.setHref(googleUrl).setFormat("woff2");
    }

    /**
     * プリセット: CDN配信フォント
     */
    public presetCdnFont(cdnBaseUrl: string, fontFileName: string, format: string = "woff2"): this {
        const cdnUrl = `${cdnBaseUrl}/${fontFileName}.${format}`;
        return this.setHref(cdnUrl).setFormat(format);
    }

    /**
     * プリセット: ローカルフォントパス
     */
    public presetLocalFont(fontPath: string, format?: string): this {
        this.setHref(fontPath);
        
        // フォーマットが指定されていない場合、拡張子から推測
        if (!format) {
            if (fontPath.endsWith(".woff2")) format = "woff2";
            else if (fontPath.endsWith(".woff")) format = "woff";
            else if (fontPath.endsWith(".ttf")) format = "truetype";
            else if (fontPath.endsWith(".otf")) format = "opentype";
            else if (fontPath.endsWith(".eot")) format = "embedded-opentype";
            else if (fontPath.endsWith(".svg")) format = "svg";
        }
        
        if (format) {
            this.setFormat(format);
        }
        
        return this;
    }

    /**
     * プリセット: 相対パスフォント
     */
    public presetRelativeFont(relativePath: string, format?: string): this {
        const fullPath = `./fonts/${relativePath}`;
        return this.presetLocalFont(fullPath, format);
    }

    /**
     * プリセット: アセットフォルダフォント
     */
    public presetAssetFont(assetPath: string, fontFileName: string, format: string = "woff2"): this {
        const fullPath = `${assetPath}/fonts/${fontFileName}.${format}`;
        return this.setHref(fullPath).setFormat(format);
    }
}
