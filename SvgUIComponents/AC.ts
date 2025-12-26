import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";

export interface AOptions {
    className?: string | string[];
    id?: string;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top" | string;
    rel?: string;
    type?: string;
    hreflang?: string;
    download?: string;
}

/**
 * SVGインタラクション要素：リンク
 * SVG要素をリンクとして機能させる
 */
export class AC extends SvgContainerBase {
    constructor(options?: AOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.href) this.setHref(options.href);
            if (options.target) this.setTarget(options.target);
            if (options.rel) this.setRel(options.rel);
            if (options.type) this.setType(options.type);
            if (options.hreflang) this.setHreflang(options.hreflang);
            if (options.download) this.setDownload(options.download);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createAElement();
        return new SvgElementProxy(element);
    }

    /**
     * リンク先URLを設定
     */
    public setHref(href: string): this {
        this.setSvgAttribute("href", href);
        return this;
    }

    /**
     * リンク先URLを取得
     */
    public getHref(): string | null {
        return this.getSvgAttribute("href");
    }

    /**
     * リンクターゲットを設定
     */
    public setTarget(target: "_blank" | "_self" | "_parent" | "_top" | string): this {
        this.setSvgAttribute("target", target);
        return this;
    }

    /**
     * リンクターゲットを取得
     */
    public getTarget(): string | null {
        return this.getSvgAttribute("target");
    }

    /**
     * リンク関係を設定
     */
    public setRel(rel: string): this {
        this.setSvgAttribute("rel", rel);
        return this;
    }

    /**
     * リンク関係を取得
     */
    public getRel(): string | null {
        return this.getSvgAttribute("rel");
    }

    /**
     * MIMEタイプを設定
     */
    public setType(type: string): this {
        this.setSvgAttribute("type", type);
        return this;
    }

    /**
     * MIMEタイプを取得
     */
    public getType(): string | null {
        return this.getSvgAttribute("type");
    }

    /**
     * リンク先の言語を設定
     */
    public setHreflang(lang: string): this {
        this.setSvgAttribute("hreflang", lang);
        return this;
    }

    /**
     * リンク先の言語を取得
     */
    public getHreflang(): string | null {
        return this.getSvgAttribute("hreflang");
    }

    /**
     * ダウンロードファイル名を設定
     */
    public setDownload(filename?: string): this {
        this.setSvgAttribute("download", filename || "");
        return this;
    }

    /**
     * ダウンロードファイル名を取得
     */
    public getDownload(): string | null {
        return this.getSvgAttribute("download");
    }

    /**
     * 古い形式のxlink:hrefを設定（互換性用）
     */
    public setXlinkHref(href: string): this {
        this.setSvgAttribute("xlink:href", href);
        return this;
    }

    /**
     * 古い形式のxlink:hrefを取得
     */
    public getXlinkHref(): string | null {
        return this.getSvgAttribute("xlink:href");
    }

    // === プリセットメソッド ===

    /**
     * 基本的な外部リンクを作成
     */
    public createExternalLink(url: string, openInNewTab: boolean = true): this {
        this.setHref(url);
        if (openInNewTab) {
            this.setTarget("_blank");
            this.setRel("noopener noreferrer");
        }
        return this;
    }

    /**
     * 内部アンカーリンクを作成
     */
    public createAnchorLink(elementId: string): this {
        this.setHref(`#${elementId}`);
        this.setTarget("_self");
        return this;
    }

    /**
     * メールリンクを作成
     */
    public createEmailLink(email: string, subject?: string, body?: string): this {
        let href = `mailto:${email}`;
        const params: string[] = [];
        
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);
        
        if (params.length > 0) {
            href += `?${params.join('&')}`;
        }
        
        this.setHref(href);
        return this;
    }

    /**
     * 電話リンクを作成
     */
    public createTelLink(phoneNumber: string): this {
        this.setHref(`tel:${phoneNumber}`);
        return this;
    }

    /**
     * SMSリンクを作成
     */
    public createSmsLink(phoneNumber: string, message?: string): this {
        let href = `sms:${phoneNumber}`;
        if (message) {
            href += `?body=${encodeURIComponent(message)}`;
        }
        this.setHref(href);
        return this;
    }

    /**
     * ファイルダウンロードリンクを作成
     */
    public createDownloadLink(fileUrl: string, filename?: string, fileType?: string): this {
        this.setHref(fileUrl);
        if (filename) this.setDownload(filename);
        if (fileType) this.setType(fileType);
        return this;
    }

    /**
     * PDFファイルリンクを作成
     */
    public createPdfLink(pdfUrl: string, openInNewTab: boolean = true): this {
        this.setHref(pdfUrl);
        this.setType("application/pdf");
        if (openInNewTab) {
            this.setTarget("_blank");
        }
        return this;
    }

    /**
     * 画像リンクを作成
     */
    public createImageLink(imageUrl: string, openInNewTab: boolean = true): this {
        this.setHref(imageUrl);
        this.setType("image/*");
        if (openInNewTab) {
            this.setTarget("_blank");
        }
        return this;
    }

    /**
     * APIエンドポイントリンクを作成
     */
    public createApiLink(apiUrl: string, method: "GET" | "POST" = "GET"): this {
        this.setHref(apiUrl);
        this.setType("application/json");
        this.setSvgAttribute("data-method", method);
        return this;
    }

    /**
     * 多言語リンクを作成
     */
    public createMultiLanguageLink(url: string, language: string): this {
        this.setHref(url);
        this.setHreflang(language);
        return this;
    }

    /**
     * ソーシャルメディアリンクを作成
     */
    public createSocialLink(
        platform: "twitter" | "facebook" | "linkedin" | "instagram" | "youtube",
        username: string
    ): this {
        const urls = {
            twitter: `https://twitter.com/${username}`,
            facebook: `https://facebook.com/${username}`,
            linkedin: `https://linkedin.com/in/${username}`,
            instagram: `https://instagram.com/${username}`,
            youtube: `https://youtube.com/c/${username}`
        };
        
        this.setHref(urls[platform]);
        this.setTarget("_blank");
        this.setRel("noopener noreferrer");
        this.setSvgAttribute("data-platform", platform);
        return this;
    }

    /**
     * 地図リンクを作成
     */
    public createMapLink(latitude: number, longitude: number, zoom?: number): this {
        let href = `https://maps.google.com/?q=${latitude},${longitude}`;
        if (zoom) href += `&z=${zoom}`;
        
        this.setHref(href);
        this.setTarget("_blank");
        return this;
    }

    /**
     * JavaScript実行リンクを作成
     */
    public createJavaScriptLink(jsCode: string): this {
        this.setHref(`javascript:${jsCode}`);
        return this;
    }

    /**
     * 条件付きリンクを作成
     */
    public createConditionalLink(
        defaultUrl: string, 
        conditions: Array<{ condition: boolean, url: string }>
    ): this {
        let activeUrl = defaultUrl;
        
        for (const { condition, url } of conditions) {
            if (condition) {
                activeUrl = url;
                break;
            }
        }
        
        this.setHref(activeUrl);
        return this;
    }

    /**
     * トラッキング付きリンクを作成
     */
    public createTrackedLink(url: string, trackingParams: { [key: string]: string }): this {
        const urlObj = new URL(url);
        Object.entries(trackingParams).forEach(([key, value]) => {
            urlObj.searchParams.set(key, value);
        });
        
        this.setHref(urlObj.toString());
        return this;
    }

    /**
     * 遅延リンクを作成（JavaScript経由）
     */
    public createDelayedLink(url: string, delayMs: number): this {
        this.setHref(`javascript:setTimeout(function(){window.location.href='${url}';}, ${delayMs});`);
        return this;
    }

    /**
     * 確認付きリンクを作成
     */
    public createConfirmedLink(url: string, message: string): this {
        this.setHref(`javascript:if(confirm('${message}'))window.location.href='${url}';`);
        return this;
    }

    /**
     * データURIリンクを作成
     */
    public createDataUriLink(data: string, mimeType: string = "text/plain"): this {
        this.setHref(`data:${mimeType},${encodeURIComponent(data)}`);
        return this;
    }
}
