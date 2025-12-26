import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgMetadataBase } from "./BaseClasses/SvgMetadataBase";

export interface TitleOptions {
    className?: string | string[];
    id?: string;
    text?: string;
}

/**
 * SVGメタデータ要素：タイトル
 * SVG要素のタイトルを定義（ツールチップとして表示される）
 */
export class TitleC extends SvgMetadataBase {
    constructor(options?: TitleOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.text) this.setText(options.text);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createTitleElement();
        return new SvgElementProxy(element);
    }

    /**
     * テキスト内容を設定
     */
    public setText(text: string): this {
        this._svgDom.element.textContent = text;
        return this;
    }

    /**
     * テキスト内容を取得
     */
    public getText(): string {
        return this._svgDom.element.textContent || "";
    }

    /**
     * テキスト内容を追加
     */
    public appendText(text: string): this {
        this._svgDom.element.textContent = (this._svgDom.element.textContent || "") + text;
        return this;
    }

    /**
     * テキスト内容をクリア
     */
    public clearText(): this {
        this._svgDom.element.textContent = "";
        return this;
    }

    // === プリセットメソッド ===

    /**
     * 基本的なタイトルを設定
     */
    public createBasicTitle(title: string): this {
        this.setText(title);
        return this;
    }

    /**
     * 詳細な説明タイトル
     */
    public createDetailedTitle(elementName: string, description: string): this {
        this.setText(`${elementName}: ${description}`);
        return this;
    }

    /**
     * 多言語対応タイトル
     */
    public createMultiLanguageTitle(titles: { [lang: string]: string }): this {
        const defaultLang = Object.keys(titles)[0];
        const titleText = titles[defaultLang] || "";
        this.setText(titleText);
        // 言語属性を設定
        this.setSvgAttribute("lang", defaultLang);
        return this;
    }

    /**
     * アクセシビリティ用タイトル
     */
    public createAccessibilityTitle(role: string, description: string): this {
        this.setText(`${role}: ${description}`);
        this.setSvgAttribute("role", "tooltip");
        return this;
    }

    /**
     * 図形の説明タイトル
     */
    public createShapeTitle(shapeType: string, properties: string[]): this {
        const description = properties.join(", ");
        this.setText(`${shapeType} - ${description}`);
        return this;
    }

    /**
     * グラフ要素のタイトル
     */
    public createChartTitle(chartType: string, dataLabel: string, value?: string | number): this {
        let title = `${chartType}: ${dataLabel}`;
        if (value !== undefined) {
            title += ` (${value})`;
        }
        this.setText(title);
        return this;
    }

    /**
     * インタラクティブ要素のタイトル
     */
    public createInteractiveTitle(action: string, target: string): this {
        this.setText(`${action} ${target}`);
        return this;
    }

    /**
     * 時間情報付きタイトル
     */
    public createTimeBasedTitle(title: string, timestamp?: Date): this {
        let text = title;
        if (timestamp) {
            text += ` (${timestamp.toLocaleDateString()})`;
        }
        this.setText(text);
        return this;
    }

    /**
     * 状態付きタイトル
     */
    public createStatusTitle(title: string, status: "active" | "inactive" | "disabled" | "selected"): this {
        const statusText = {
            active: "アクティブ",
            inactive: "非アクティブ", 
            disabled: "無効",
            selected: "選択中"
        };
        this.setText(`${title} (${statusText[status]})`);
        return this;
    }

    /**
     * データ値付きタイトル
     */
    public createDataTitle(label: string, value: string | number, unit?: string): this {
        let text = `${label}: ${value}`;
        if (unit) {
            text += ` ${unit}`;
        }
        this.setText(text);
        return this;
    }

    /**
     * 進捗情報付きタイトル
     */
    public createProgressTitle(title: string, current: number, total: number): this {
        const percentage = Math.round((current / total) * 100);
        this.setText(`${title} (${current}/${total}, ${percentage}%)`);
        return this;
    }

    /**
     * 座標情報付きタイトル
     */
    public createCoordinateTitle(title: string, x: number, y: number): this {
        this.setText(`${title} at (${x}, ${y})`);
        return this;
    }

    /**
     * 寸法情報付きタイトル
     */
    public createDimensionTitle(title: string, width: number, height: number): this {
        this.setText(`${title} - ${width} × ${height}`);
        return this;
    }

    /**
     * 色情報付きタイトル
     */
    public createColorTitle(title: string, color: string): this {
        this.setText(`${title} (${color})`);
        return this;
    }

    /**
     * フィルター効果のタイトル
     */
    public createFilterTitle(filterType: string, parameters?: string[]): this {
        let text = `Filter: ${filterType}`;
        if (parameters && parameters.length > 0) {
            text += ` (${parameters.join(", ")})`;
        }
        this.setText(text);
        return this;
    }
}
