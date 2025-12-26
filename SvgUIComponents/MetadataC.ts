import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgMetadataBase } from "./BaseClasses/SvgMetadataBase";

export interface MetadataOptions {
    className?: string | string[];
    id?: string;
    content?: string;
    format?: "xml" | "json" | "rdf" | "custom";
}

/**
 * SVGメタデータ要素：メタデータ
 * SVG文書に関するメタデータを定義（作成者、作成日、バージョンなど）
 */
export class MetadataC extends SvgMetadataBase {
    constructor(options?: MetadataOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.content) this.setContent(options.content);
            if (options.format) this.setFormat(options.format);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createMetadataElement();
        return new SvgElementProxy(element);
    }

    /**
     * メタデータ内容を設定
     */
    public setContent(content: string): this {
        this._svgDom.element.innerHTML = content;
        return this;
    }

    /**
     * メタデータ内容を取得
     */
    public getContent(): string {
        return this._svgDom.element.innerHTML || "";
    }

    /**
     * メタデータ形式を設定
     */
    public setFormat(format: "xml" | "json" | "rdf" | "custom"): this {
        this.setSvgAttribute("data-format", format);
        return this;
    }

    /**
     * メタデータ形式を取得
     */
    public getFormat(): string | null {
        return this.getSvgAttribute("data-format");
    }

    /**
     * テキスト形式でメタデータを設定
     */
    public setText(text: string): this {
        this._svgDom.element.textContent = text;
        return this;
    }

    /**
     * テキスト形式でメタデータを取得
     */
    public getText(): string {
        return this._svgDom.element.textContent || "";
    }

    // === プリセットメソッド ===

    /**
     * 基本的な文書情報
     */
    public createDocumentInfo(
        title: string, 
        author: string, 
        created: Date, 
        description?: string
    ): this {
        const metadata = {
            title,
            author,
            created: created.toISOString(),
            description: description || ""
        };
        this.setContent(JSON.stringify(metadata, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * Dublin Core メタデータ
     */
    public createDublinCore(metadata: {
        title?: string;
        creator?: string;
        subject?: string;
        description?: string;
        publisher?: string;
        contributor?: string;
        date?: string;
        type?: string;
        format?: string;
        identifier?: string;
        source?: string;
        language?: string;
        relation?: string;
        coverage?: string;
        rights?: string;
    }): this {
        const dcElements = Object.entries(metadata)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `<dc:${key}>${value}</dc:${key}>`)
            .join('\n');
        
        const content = `<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" 
                                xmlns:dc="http://purl.org/dc/elements/1.1/">
            <rdf:Description>
                ${dcElements}
            </rdf:Description>
        </rdf:RDF>`;
        
        this.setContent(content);
        this.setFormat("rdf");
        return this;
    }

    /**
     * 作成者情報
     */
    public createAuthorInfo(
        name: string, 
        email?: string, 
        organization?: string, 
        website?: string
    ): this {
        const authorInfo = {
            name,
            email: email || "",
            organization: organization || "",
            website: website || "",
            type: "author"
        };
        this.setContent(JSON.stringify(authorInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * バージョン情報
     */
    public createVersionInfo(
        version: string, 
        releaseDate: Date, 
        changes: string[], 
        previousVersion?: string
    ): this {
        const versionInfo = {
            version,
            releaseDate: releaseDate.toISOString(),
            changes,
            previousVersion: previousVersion || "",
            type: "version"
        };
        this.setContent(JSON.stringify(versionInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * ライセンス情報
     */
    public createLicenseInfo(
        license: string, 
        url?: string, 
        restrictions?: string[], 
        permissions?: string[]
    ): this {
        const licenseInfo = {
            license,
            url: url || "",
            restrictions: restrictions || [],
            permissions: permissions || [],
            type: "license"
        };
        this.setContent(JSON.stringify(licenseInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * 技術的仕様
     */
    public createTechnicalSpecs(specs: {
        svgVersion?: string;
        targetViewport?: { width: number, height: number };
        colorSpace?: string;
        resolution?: number;
        compatibility?: string[];
        requirements?: string[];
    }): this {
        const technicalSpecs = {
            ...specs,
            type: "technical-specs"
        };
        this.setContent(JSON.stringify(technicalSpecs, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * データソース情報
     */
    public createDataSourceInfo(
        sources: Array<{
            name: string;
            url?: string;
            lastUpdated?: Date;
            format?: string;
            description?: string;
        }>
    ): this {
        const dataSourceInfo = {
            sources: sources.map(source => ({
                ...source,
                lastUpdated: source.lastUpdated?.toISOString() || ""
            })),
            type: "data-sources"
        };
        this.setContent(JSON.stringify(dataSourceInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * アクセシビリティ情報
     */
    public createAccessibilityInfo(info: {
        wcagLevel?: "A" | "AA" | "AAA";
        screenReaderCompatible?: boolean;
        keyboardNavigable?: boolean;
        colorBlindnessConsidered?: boolean;
        alternativeFormats?: string[];
        accessibilityFeatures?: string[];
    }): this {
        const a11yInfo = {
            ...info,
            type: "accessibility"
        };
        this.setContent(JSON.stringify(a11yInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * パフォーマンス情報
     */
    public createPerformanceInfo(info: {
        fileSize?: number;
        elementCount?: number;
        renderingComplexity?: "low" | "medium" | "high";
        optimizations?: string[];
        benchmarks?: { [key: string]: number };
    }): this {
        const perfInfo = {
            ...info,
            type: "performance"
        };
        this.setContent(JSON.stringify(perfInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * 国際化情報
     */
    public createInternationalizationInfo(info: {
        defaultLanguage: string;
        supportedLanguages: string[];
        textDirection?: "ltr" | "rtl" | "auto";
        localizationNotes?: string[];
    }): this {
        const i18nInfo = {
            ...info,
            type: "internationalization"
        };
        this.setContent(JSON.stringify(i18nInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * カスタムメタデータ
     */
    public createCustomMetadata(
        namespace: string, 
        data: { [key: string]: any }
    ): this {
        const customMetadata = {
            namespace,
            data,
            type: "custom"
        };
        this.setContent(JSON.stringify(customMetadata, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * XML形式のメタデータ
     */
    public createXmlMetadata(
        rootElement: string, 
        attributes: { [key: string]: string }, 
        content: string
    ): this {
        const attrString = Object.entries(attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        
        const xmlContent = `<${rootElement} ${attrString}>${content}</${rootElement}>`;
        this.setContent(xmlContent);
        this.setFormat("xml");
        return this;
    }

    /**
     * 統計情報
     */
    public createStatistics(stats: {
        creationTime?: Date;
        lastModified?: Date;
        editCount?: number;
        viewCount?: number;
        downloadCount?: number;
        averageRating?: number;
        tags?: string[];
    }): this {
        const statisticsInfo = {
            ...stats,
            creationTime: stats.creationTime?.toISOString() || "",
            lastModified: stats.lastModified?.toISOString() || "",
            type: "statistics"
        };
        this.setContent(JSON.stringify(statisticsInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * 依存関係情報
     */
    public createDependencyInfo(dependencies: Array<{
        name: string;
        version?: string;
        url?: string;
        type: "library" | "font" | "image" | "data" | "other";
        required: boolean;
    }>): this {
        const depInfo = {
            dependencies,
            type: "dependencies"
        };
        this.setContent(JSON.stringify(depInfo, null, 2));
        this.setFormat("json");
        return this;
    }

    /**
     * セキュリティ情報
     */
    public createSecurityInfo(info: {
        securityLevel?: "public" | "internal" | "confidential" | "restricted";
        encryption?: boolean;
        accessControls?: string[];
        securityNotes?: string[];
    }): this {
        const securityInfo = {
            ...info,
            type: "security"
        };
        this.setContent(JSON.stringify(securityInfo, null, 2));
        this.setFormat("json");
        return this;
    }
}
