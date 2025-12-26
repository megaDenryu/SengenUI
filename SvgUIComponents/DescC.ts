import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgMetadataBase } from "./BaseClasses/SvgMetadataBase";

export interface DescOptions {
    className?: string | string[];
    id?: string;
    text?: string;
}

/**
 * SVGメタデータ要素：説明
 * SVG要素の詳細な説明を定義（アクセシビリティ向上）
 */
export class DescC extends SvgMetadataBase {
    constructor(options?: DescOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.text) this.setText(options.text);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createDescElement();
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

    /**
     * HTMLタグを含むリッチテキストを設定
     */
    public setRichText(html: string): this {
        this._svgDom.element.innerHTML = html;
        return this;
    }

    // === プリセットメソッド ===

    /**
     * 基本的な説明を設定
     */
    public createBasicDescription(description: string): this {
        this.setText(description);
        return this;
    }

    /**
     * 詳細な機能説明
     */
    public createFunctionalDescription(purpose: string, behavior: string, context?: string): this {
        let text = `目的: ${purpose}. 動作: ${behavior}`;
        if (context) {
            text += `. 文脈: ${context}`;
        }
        this.setText(text);
        return this;
    }

    /**
     * アクセシビリティ向け説明
     */
    public createAccessibilityDescription(role: string, state: string, instructions?: string): this {
        let text = `このアイテムは${role}です。現在の状態: ${state}`;
        if (instructions) {
            text += `. 操作方法: ${instructions}`;
        }
        this.setText(text);
        return this;
    }

    /**
     * 図形の詳細説明
     */
    public createShapeDescription(
        shapeType: string, 
        dimensions: { [key: string]: number | string }, 
        properties?: { [key: string]: string }
    ): this {
        let text = `${shapeType}の詳細: `;
        
        const dimensionTexts = Object.entries(dimensions).map(([key, value]) => `${key}=${value}`);
        text += dimensionTexts.join(", ");
        
        if (properties) {
            const propTexts = Object.entries(properties).map(([key, value]) => `${key}: ${value}`);
            text += `. 属性: ${propTexts.join(", ")}`;
        }
        
        this.setText(text);
        return this;
    }

    /**
     * データ可視化の説明
     */
    public createDataVisualizationDescription(
        chartType: string, 
        dataSource: string, 
        metrics: string[], 
        dateRange?: string
    ): this {
        let text = `${chartType}チャート: ${dataSource}からのデータを表示。計測項目: ${metrics.join(", ")}`;
        if (dateRange) {
            text += `. 期間: ${dateRange}`;
        }
        this.setText(text);
        return this;
    }

    /**
     * インタラクション説明
     */
    public createInteractionDescription(
        triggers: string[], 
        actions: string[], 
        effects: string[]
    ): this {
        const text = `インタラクション: ${triggers.join("または")}すると、${actions.join("および")}が実行され、${effects.join("、")}の効果があります。`;
        this.setText(text);
        return this;
    }

    /**
     * アニメーション説明
     */
    public createAnimationDescription(
        animationType: string, 
        duration: string, 
        properties: string[], 
        timing?: string
    ): this {
        let text = `${animationType}アニメーション（${duration}間継続）: ${properties.join(", ")}が変化します`;
        if (timing) {
            text += `. タイミング: ${timing}`;
        }
        this.setText(text);
        return this;
    }

    /**
     * フィルター効果の説明
     */
    public createFilterDescription(
        filterType: string, 
        parameters: { [key: string]: string | number }, 
        visualEffect: string
    ): this {
        const paramTexts = Object.entries(parameters).map(([key, value]) => `${key}=${value}`);
        const text = `${filterType}フィルター（${paramTexts.join(", ")}）: ${visualEffect}の視覚効果を適用`;
        this.setText(text);
        return this;
    }

    /**
     * グループ要素の説明
     */
    public createGroupDescription(groupPurpose: string, childCount: number, groupType?: string): this {
        let text = `グループ: ${groupPurpose}のために${childCount}個の要素をまとめています`;
        if (groupType) {
            text += `（${groupType}）`;
        }
        this.setText(text);
        return this;
    }

    /**
     * 技術的な詳細説明
     */
    public createTechnicalDescription(
        implementation: string, 
        performance: string, 
        compatibility: string[]
    ): this {
        const text = `技術詳細: ${implementation}で実装。パフォーマンス: ${performance}。対応環境: ${compatibility.join(", ")}`;
        this.setText(text);
        return this;
    }

    /**
     * 多段落の構造化説明
     */
    public createStructuredDescription(sections: { title: string, content: string }[]): this {
        const text = sections.map(section => `${section.title}: ${section.content}`).join(". ");
        this.setText(text);
        return this;
    }

    /**
     * 国際化対応説明
     */
    public createInternationalizedDescription(
        descriptions: { [language: string]: string }, 
        defaultLang: string = "ja"
    ): this {
        const description = descriptions[defaultLang] || descriptions[Object.keys(descriptions)[0]];
        this.setText(description);
        this.setSvgAttribute("lang", defaultLang);
        return this;
    }

    /**
     * 動的説明（プレースホルダー付き）
     */
    public createDynamicDescription(template: string, values: { [key: string]: string | number }): this {
        let text = template;
        Object.entries(values).forEach(([key, value]) => {
            text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), value.toString());
        });
        this.setText(text);
        return this;
    }

    /**
     * コンテキスト依存説明
     */
    public createContextualDescription(
        baseDescription: string, 
        context: "desktop" | "mobile" | "print" | "screen-reader"
    ): this {
        const contextSuffix = {
            desktop: "（デスクトップ表示用）",
            mobile: "（モバイル表示用）", 
            print: "（印刷用）",
            "screen-reader": "（スクリーンリーダー用）"
        };
        
        this.setText(baseDescription + contextSuffix[context]);
        return this;
    }

    /**
     * 警告・注意事項付き説明
     */
    public createWarningDescription(description: string, warnings: string[]): this {
        let text = description;
        if (warnings.length > 0) {
            text += `. 注意: ${warnings.join("; ")}`;
        }
        this.setText(text);
        return this;
    }
}
