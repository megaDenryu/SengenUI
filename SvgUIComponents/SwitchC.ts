import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";
import { SvgElementBase } from "./BaseClasses/SvgElementBase";

export interface SwitchOptions {
    className?: string | string[];
    id?: string;
    allowReorder?: boolean;
}

/**
 * SVGインタラクション要素：条件分岐表示
 * 複数の子要素から条件に基づいて1つを選択して表示
 */
export class SwitchC extends SvgContainerBase {
    private conditions: Map<SVGElement, () => boolean> = new Map();
    private activeChild: SVGElement | null = null;

    constructor(options?: SwitchOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.allowReorder !== undefined) this.setAllowReorder(options.allowReorder);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createSwitchElement();
        return new SvgElementProxy(element);
    }

    /**
     * 並び替え許可を設定
     */
    public setAllowReorder(allow: boolean): this {
        this.setSvgAttribute("allowReorder", allow.toString());
        return this;
    }

    /**
     * 並び替え許可を取得
     */
    public getAllowReorder(): boolean {
        return this.getSvgAttribute("allowReorder") === "true";
    }

    /**
     * 条件付き子要素を追加
     */
    public addConditionalChild(child: SvgElementBase, condition: () => boolean): this {
        this.child(child);
        this.conditions.set(child.dom.element, condition);
        this.evaluateConditions();
        return this;
    }

    /**
     * 言語条件付き子要素を追加
     */
    public addLanguageChild(child: SvgElementBase, languages: string[]): this {
        const condition = () => {
            const userLang = navigator.language || (navigator as any).userLanguage;
            return languages.some(lang => userLang.startsWith(lang));
        };
        
        child.setSvgAttribute("systemLanguage", languages.join(" "));
        return this.addConditionalChild(child, condition);
    }

    /**
     * 必要拡張機能条件付き子要素を追加
     */
    public addRequiredExtensionsChild(child: SvgElementBase, extensions: string[]): this {
        const condition = () => {
            // 実際のブラウザサポート確認は複雑なので、簡略化
            return true; // 実装時に適切な判定ロジックを追加
        };
        
        child.setSvgAttribute("requiredExtensions", extensions.join(" "));
        return this.addConditionalChild(child, condition);
    }

    /**
     * 機能条件付き子要素を追加
     */
    public addRequiredFeaturesChild(child: SvgElementBase, features: string[]): this {
        const condition = () => {
            // SVG機能サポート確認
            return features.every(feature => {
                // 基本的な機能チェックの例
                switch (feature) {
                    case "http://www.w3.org/TR/SVG11/feature#Shape":
                        return true;
                    case "http://www.w3.org/TR/SVG11/feature#Text":
                        return true;
                    case "http://www.w3.org/TR/SVG11/feature#Animation":
                        return !!SVGElement.prototype.animate;
                    default:
                        return true;
                }
            });
        };
        
        child.setSvgAttribute("requiredFeatures", features.join(" "));
        return this.addConditionalChild(child, condition);
    }

    /**
     * 条件を評価して適切な子要素を表示
     */
    public evaluateConditions(): this {
        // 現在アクティブな子要素を非表示に
        if (this.activeChild) {
            this.activeChild.style.display = "none";
        }

        // 条件に合致する最初の子要素を探す
        for (const [element, condition] of this.conditions) {
            if (condition()) {
                element.style.display = "";
                this.activeChild = element;
                return this;
            }
        }

        // 条件に合致する要素がない場合、最初の子要素を表示
        const firstChild = this._svgDom.element.firstElementChild as SVGElement;
        if (firstChild && !this.conditions.has(firstChild)) {
            firstChild.style.display = "";
            this.activeChild = firstChild;
        }

        return this;
    }

    /**
     * 現在アクティブな子要素を取得
     */
    public getActiveChild(): SVGElement | null {
        return this.activeChild;
    }

    /**
     * 手動で子要素を切り替え
     */
    public switchToChild(childIndex: number): this {
        const children = Array.from(this._svgDom.element.children) as SVGElement[];
        
        // すべての子要素を非表示に
        children.forEach(child => child.style.display = "none");
        
        // 指定された子要素を表示
        if (children[childIndex]) {
            children[childIndex].style.display = "";
            this.activeChild = children[childIndex];
        }
        
        return this;
    }

    /**
     * 条件を再評価
     */
    public refresh(): this {
        return this.evaluateConditions();
    }

    // === プリセットメソッド ===

    /**
     * 多言語対応スイッチを作成
     */
    public createLanguageSwitch(contentMap: { [language: string]: SvgElementBase }): this {
        Object.entries(contentMap).forEach(([lang, content]) => {
            this.addLanguageChild(content, [lang]);
        });
        return this;
    }

    /**
     * デバイス種別対応スイッチを作成
     */
    public createDeviceSwitch(content: {
        desktop?: SvgElementBase;
        tablet?: SvgElementBase;
        mobile?: SvgElementBase;
    }): this {
        if (content.mobile) {
            this.addConditionalChild(content.mobile, () => window.innerWidth < 768);
        }
        if (content.tablet) {
            this.addConditionalChild(content.tablet, () => 
                window.innerWidth >= 768 && window.innerWidth < 1024
            );
        }
        if (content.desktop) {
            this.addConditionalChild(content.desktop, () => window.innerWidth >= 1024);
        }
        return this;
    }

    /**
     * 時間帯対応スイッチを作成
     */
    public createTimeBasedSwitch(content: {
        morning?: SvgElementBase;   // 6-12
        afternoon?: SvgElementBase; // 12-18
        evening?: SvgElementBase;   // 18-24
        night?: SvgElementBase;     // 0-6
    }): this {
        const currentHour = new Date().getHours();
        
        if (content.morning) {
            this.addConditionalChild(content.morning, () => {
                const hour = new Date().getHours();
                return hour >= 6 && hour < 12;
            });
        }
        if (content.afternoon) {
            this.addConditionalChild(content.afternoon, () => {
                const hour = new Date().getHours();
                return hour >= 12 && hour < 18;
            });
        }
        if (content.evening) {
            this.addConditionalChild(content.evening, () => {
                const hour = new Date().getHours();
                return hour >= 18 && hour < 24;
            });
        }
        if (content.night) {
            this.addConditionalChild(content.night, () => {
                const hour = new Date().getHours();
                return hour >= 0 && hour < 6;
            });
        }
        return this;
    }

    /**
     * 機能サポート対応スイッチを作成
     */
    public createFeatureSwitch(content: {
        advanced?: SvgElementBase;  // 高機能版
        basic?: SvgElementBase;     // 基本版
        fallback?: SvgElementBase;  // フォールバック
    }): this {
        if (content.advanced) {
            this.addConditionalChild(content.advanced, () => {
                // CSS Grid, Flexbox, ES6などの機能チェック
                return 'CSS' in window && 'supports' in (window as any).CSS &&
                       (window as any).CSS.supports('display', 'grid');
            });
        }
        if (content.basic) {
            this.addConditionalChild(content.basic, () => {
                return 'querySelector' in document;
            });
        }
        if (content.fallback) {
            this.addConditionalChild(content.fallback, () => true); // 常に真
        }
        return this;
    }

    /**
     * ユーザー設定対応スイッチを作成
     */
    public createPreferenceSwitch(
        settingKey: string,
        content: { [value: string]: SvgElementBase }
    ): this {
        Object.entries(content).forEach(([value, component]) => {
            this.addConditionalChild(component, () => {
                return localStorage.getItem(settingKey) === value;
            });
        });
        return this;
    }

    /**
     * ダークモード対応スイッチを作成
     */
    public createThemeSwitch(content: {
        dark?: SvgElementBase;
        light?: SvgElementBase;
        auto?: SvgElementBase;
    }): this {
        if (content.dark) {
            this.addConditionalChild(content.dark, () => {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            });
        }
        if (content.light) {
            this.addConditionalChild(content.light, () => {
                return window.matchMedia('(prefers-color-scheme: light)').matches;
            });
        }
        if (content.auto) {
            this.addConditionalChild(content.auto, () => true);
        }
        return this;
    }

    /**
     * 解像度対応スイッチを作成
     */
    public createResolutionSwitch(content: {
        highDPI?: SvgElementBase;
        standardDPI?: SvgElementBase;
    }): this {
        if (content.highDPI) {
            this.addConditionalChild(content.highDPI, () => {
                return window.devicePixelRatio > 1.5;
            });
        }
        if (content.standardDPI) {
            this.addConditionalChild(content.standardDPI, () => {
                return window.devicePixelRatio <= 1.5;
            });
        }
        return this;
    }

    /**
     * 接続状態対応スイッチを作成
     */
    public createConnectivitySwitch(content: {
        online?: SvgElementBase;
        offline?: SvgElementBase;
    }): this {
        if (content.online) {
            this.addConditionalChild(content.online, () => navigator.onLine);
        }
        if (content.offline) {
            this.addConditionalChild(content.offline, () => !navigator.onLine);
        }

        // オンライン/オフライン状態の変化を監視
        window.addEventListener('online', () => this.evaluateConditions());
        window.addEventListener('offline', () => this.evaluateConditions());
        
        return this;
    }

    /**
     * カスタム条件スイッチを作成
     */
    public createCustomSwitch(conditions: Array<{
        condition: () => boolean;
        content: SvgElementBase;
        priority?: number;
    }>): this {
        // 優先度でソート
        const sortedConditions = conditions.sort((a, b) => (b.priority || 0) - (a.priority || 0));
        
        sortedConditions.forEach(({ condition, content }) => {
            this.addConditionalChild(content, condition);
        });
        
        return this;
    }
}
