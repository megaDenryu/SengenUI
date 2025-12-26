import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

/**
 * FontFaceSrcコンポーネントのオプション
 */
export interface FontFaceSrcOptions {
    className?: string | string[];
    id?: string;
}

/**
 * FontFaceSrcC - SVGフォントフェースソース要素のコンポーネント
 * 
 * font-face要素内でフォントの取得先を定義するコンテナ要素
 * font-face-uri要素やfont-face-name要素を子要素として持つ
 * 
 * @example
 * ```typescript
 * // 基本的なフォントソース定義
 * const fontSrc = new FontFaceSrcC()
 *     .addFontUri("fonts/myFont.woff", "woff")
 *     .addFontName("MyCustomFont");
 * 
 * // 複数フォーマットのフォールバック
 * const fontSrcMulti = new FontFaceSrcC()
 *     .addFontUri("fonts/font.woff2", "woff2")
 *     .addFontUri("fonts/font.woff", "woff")
 *     .addFontName("system-font-name");
 * ```
 */
export class FontFaceSrcC extends SvgFontBase {

    constructor(options: FontFaceSrcOptions = {}) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const fontFaceSrc = SvgElementCreater.createFontFaceSrcElement();
        return new SvgElementProxy(fontFaceSrc);
    }

    private applyOptions(options: FontFaceSrcOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    // === 子要素管理 ===

    /**
     * font-face-uri要素を追加
     * @param uri フォントファイルのURI
     * @param format フォントフォーマット（例: "woff", "woff2", "truetype"）
     */
    public addFontUri(uri: string, format?: string): this {
        const fontUri = SvgElementCreater.createFontFaceUriElement();
        fontUri.setAttribute("xlink:href", uri);
        
        if (format) {
            const formatElement = SvgElementCreater.createFontFaceFormatElement();
            formatElement.setAttribute("string", format);
            fontUri.appendChild(formatElement);
        }
        
        this._svgDom.element.appendChild(fontUri);
        return this;
    }

    /**
     * font-face-name要素を追加
     * @param name システムフォント名
     */
    public addFontName(name: string): this {
        const fontName = SvgElementCreater.createFontFaceNameElement();
        fontName.setAttribute("name", name);
        this._svgDom.element.appendChild(fontName);
        return this;
    }

    /**
     * 複数のURIを一度に追加（フォールバック順）
     * @param uris URIとフォーマットのペアのリスト
     */
    public addMultipleFontUris(uris: Array<{uri: string, format?: string}>): this {
        uris.forEach(({uri, format}) => {
            this.addFontUri(uri, format);
        });
        return this;
    }

    /**
     * すべての子要素をクリア
     */
    public clearAllSources(): this {
        while (this._svgDom.element.firstChild) {
            this._svgDom.element.removeChild(this._svgDom.element.firstChild);
        }
        return this;
    }

    // === プリセットメソッド ===

    /**
     * プリセット: 標準的なWebフォント設定（WOFF2/WOFF）
     */
    public presetStandardWebFont(fontBaseName: string): this {
        return this.addFontUri(`${fontBaseName}.woff2`, "woff2")
                  .addFontUri(`${fontBaseName}.woff`, "woff");
    }

    /**
     * プリセット: 完全なWebフォントフォールバック
     */
    public presetCompleteWebFont(fontBaseName: string): this {
        return this.addFontUri(`${fontBaseName}.woff2`, "woff2")
                  .addFontUri(`${fontBaseName}.woff`, "woff")
                  .addFontUri(`${fontBaseName}.ttf`, "truetype")
                  .addFontUri(`${fontBaseName}.eot`, "embedded-opentype");
    }

    /**
     * プリセット: システムフォントフォールバック
     */
    public presetSystemFontFallback(): this {
        return this.addFontName("system-ui")
                  .addFontName("-apple-system")
                  .addFontName("BlinkMacSystemFont")
                  .addFontName("Segoe UI")
                  .addFontName("Roboto")
                  .addFontName("sans-serif");
    }

    /**
     * プリセット: Google Fonts設定
     */
    public presetGoogleFont(fontFamily: string, weights: string[] = ["400"]): this {
        const weightStr = weights.join(";");
        const googleUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(" ", "+")}:wght@${weightStr}`;
        return this.addFontUri(googleUrl, "woff2");
    }

    /**
     * プリセット: ローカルフォント優先設定
     */
    public presetLocalFirst(localName: string, webBaseName: string): this {
        return this.addFontName(localName)
                  .addFontUri(`${webBaseName}.woff2`, "woff2")
                  .addFontUri(`${webBaseName}.woff`, "woff");
    }

    /**
     * プリセット: CDN配信フォント
     */
    public presetCdnFont(cdnBaseUrl: string, fontFileName: string): this {
        return this.addFontUri(`${cdnBaseUrl}/${fontFileName}.woff2`, "woff2")
                  .addFontUri(`${cdnBaseUrl}/${fontFileName}.woff`, "woff");
    }

    /**
     * プリセット: レガシーブラウザ対応フォント
     */
    public presetLegacySupport(fontBaseName: string): this {
        return this.addFontUri(`${fontBaseName}.eot`, "embedded-opentype")
                  .addFontUri(`${fontBaseName}.woff2`, "woff2")
                  .addFontUri(`${fontBaseName}.woff`, "woff")
                  .addFontUri(`${fontBaseName}.ttf`, "truetype")
                  .addFontUri(`${fontBaseName}.svg#${fontBaseName}`, "svg");
    }

    /**
     * プリセット: モノスペースフォント設定
     */
    public presetMonospaceFont(): this {
        return this.addFontName("'SF Mono'")
                  .addFontName("Monaco")
                  .addFontName("'Cascadia Code'")
                  .addFontName("'Roboto Mono'")
                  .addFontName("Consolas")
                  .addFontName("'Courier New'")
                  .addFontName("monospace");
    }

    /**
     * プリセット: 日本語フォント設定
     */
    public presetJapaneseFont(): this {
        return this.addFontName("'Hiragino Sans'")
                  .addFontName("'Yu Gothic'")
                  .addFontName("'Meiryo'")
                  .addFontName("'MS PGothic'")
                  .addFontName("sans-serif");
    }

    /**
     * プリセット: セリフフォント設定
     */
    public presetSerifFont(): this {
        return this.addFontName("'Times New Roman'")
                  .addFontName("'Georgia'")
                  .addFontName("'Baskerville'")
                  .addFontName("serif");
    }
}
