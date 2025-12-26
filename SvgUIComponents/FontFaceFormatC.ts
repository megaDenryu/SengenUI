import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

/**
 * FontFaceFormatコンポーネントのオプション
 */
export interface FontFaceFormatOptions {
    className?: string | string[];
    id?: string;
    string: string;     // フォントフォーマット文字列（必須）
}

/**
 * FontFaceFormatC - SVGフォントフェースフォーマット要素のコンポーネント
 * 
 * フォントファイルのフォーマットを明示的に指定する要素
 * font-face-uri要素の子要素として使用される
 * 
 * @example
 * ```typescript
 * // WOFF2フォーマット指定
 * const format = new FontFaceFormatC({ string: "woff2" });
 * 
 * // TrueTypeフォーマット指定
 * const ttfFormat = new FontFaceFormatC({ string: "truetype" });
 * 
 * // OpenTypeフォーマット指定
 * const otfFormat = new FontFaceFormatC({ string: "opentype" });
 * ```
 */
export class FontFaceFormatC extends SvgFontBase {
    private _formatString: string;

    constructor(options: FontFaceFormatOptions) {
        super();
        this._formatString = options.string;
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const fontFaceFormat = SvgElementCreater.createFontFaceFormatElement();
        
        // 必須属性
        fontFaceFormat.setAttribute("string", this._formatString);
        
        return new SvgElementProxy(fontFaceFormat);
    }

    private applyOptions(options: FontFaceFormatOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    // === フォーマット設定 ===

    /**
     * フォントフォーマット文字列を設定
     * @param formatString フォントフォーマット（"woff", "woff2", "truetype", "opentype", "embedded-opentype", "svg"）
     */
    public setFormatString(formatString: string): this {
        this._formatString = formatString;
        this._svgDom.setSvgAttribute("string", formatString);
        return this;
    }

    /**
     * フォントフォーマット文字列を取得
     */
    public getFormatString(): string {
        return this._formatString;
    }

    // === フォーマット検証 ===

    /**
     * 設定されたフォーマットが標準的なWebフォーマットかどうかを判定
     */
    public isWebFormat(): boolean {
        const webFormats = ["woff", "woff2", "truetype", "opentype"];
        return webFormats.includes(this._formatString.toLowerCase());
    }

    /**
     * 設定されたフォーマットがレガシーフォーマットかどうかを判定
     */
    public isLegacyFormat(): boolean {
        const legacyFormats = ["embedded-opentype", "svg"];
        return legacyFormats.includes(this._formatString.toLowerCase());
    }

    /**
     * 設定されたフォーマットが圧縮フォーマットかどうかを判定
     */
    public isCompressedFormat(): boolean {
        const compressedFormats = ["woff", "woff2"];
        return compressedFormats.includes(this._formatString.toLowerCase());
    }

    // === ユーティリティメソッド ===

    /**
     * フォーマットの一般的なMIMEタイプを取得
     */
    public getMimeType(): string {
        const mimeMap: Record<string, string> = {
            "woff": "font/woff",
            "woff2": "font/woff2",
            "truetype": "font/ttf",
            "opentype": "font/otf",
            "embedded-opentype": "application/vnd.ms-fontobject",
            "svg": "image/svg+xml"
        };
        return mimeMap[this._formatString.toLowerCase()] || "application/octet-stream";
    }

    /**
     * フォーマットの一般的なファイル拡張子を取得
     */
    public getFileExtension(): string {
        const extensionMap: Record<string, string> = {
            "woff": ".woff",
            "woff2": ".woff2",
            "truetype": ".ttf",
            "opentype": ".otf",
            "embedded-opentype": ".eot",
            "svg": ".svg"
        };
        return extensionMap[this._formatString.toLowerCase()] || "";
    }

    /**
     * フォーマットの説明を取得
     */
    public getFormatDescription(): string {
        const descriptionMap: Record<string, string> = {
            "woff": "Web Open Font Format (圧縮TTF/OTF)",
            "woff2": "Web Open Font Format 2.0 (Brotli圧縮)",
            "truetype": "TrueType Font (.ttf)",
            "opentype": "OpenType Font (.otf)",
            "embedded-opentype": "Embedded OpenType (IE専用)",
            "svg": "SVG Font (レガシー)"
        };
        return descriptionMap[this._formatString.toLowerCase()] || "不明なフォーマット";
    }

    // === プリセットメソッド ===

    /**
     * プリセット: WOFF2フォーマット（最新の圧縮形式）
     */
    public presetWoff2(): this {
        return this.setFormatString("woff2");
    }

    /**
     * プリセット: WOFFフォーマット（標準圧縮形式）
     */
    public presetWoff(): this {
        return this.setFormatString("woff");
    }

    /**
     * プリセット: TrueTypeフォーマット（.ttf）
     */
    public presetTrueType(): this {
        return this.setFormatString("truetype");
    }

    /**
     * プリセット: OpenTypeフォーマット（.otf）
     */
    public presetOpenType(): this {
        return this.setFormatString("opentype");
    }

    /**
     * プリセット: EOTフォーマット（Internet Explorer対応）
     */
    public presetEmbeddedOpenType(): this {
        return this.setFormatString("embedded-opentype");
    }

    /**
     * プリセット: SVGフォーマット（レガシー対応）
     */
    public presetSvgFont(): this {
        return this.setFormatString("svg");
    }

    /**
     * プリセット: モダンブラウザ推奨フォーマット（WOFF2）
     */
    public presetModernFormat(): this {
        return this.presetWoff2();
    }

    /**
     * プリセット: 互換性重視フォーマット（WOFF）
     */
    public presetCompatibleFormat(): this {
        return this.presetWoff();
    }

    /**
     * プリセット: 高品質フォーマット（OpenType）
     */
    public presetHighQualityFormat(): this {
        return this.presetOpenType();
    }

    /**
     * プリセット: 汎用フォーマット（TrueType）
     */
    public presetUniversalFormat(): this {
        return this.presetTrueType();
    }

    /**
     * プリセット: レガシーブラウザ対応フォーマット（EOT）
     */
    public presetLegacySupport(): this {
        return this.presetEmbeddedOpenType();
    }

    // === 静的ユーティリティメソッド ===

    /**
     * ファイル拡張子からフォーマット文字列を推測
     */
    public static inferFormatFromExtension(filename: string): string {
        const extension = filename.toLowerCase().split('.').pop() || '';
        const formatMap: Record<string, string> = {
            "woff2": "woff2",
            "woff": "woff",
            "ttf": "truetype",
            "otf": "opentype",
            "eot": "embedded-opentype",
            "svg": "svg"
        };
        return formatMap[extension] || "truetype";
    }

    /**
     * 複数のフォーマットから最適なものを選択
     */
    public static selectOptimalFormat(availableFormats: string[]): string {
        const priority = ["woff2", "woff", "opentype", "truetype", "embedded-opentype", "svg"];
        for (const format of priority) {
            if (availableFormats.includes(format)) {
                return format;
            }
        }
        return availableFormats[0] || "truetype";
    }
}
