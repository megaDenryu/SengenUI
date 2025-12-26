import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

/**
 * FontFaceNameコンポーネントのオプション
 */
export interface FontFaceNameOptions {
    className?: string | string[];
    id?: string;
    name: string;       // フォント名（必須）
}

/**
 * FontFaceNameC - SVGフォントフェース名要素のコンポーネント
 * 
 * システムにインストールされているフォント名を指定する要素
 * font-face-src要素の子要素として使用される
 * 
 * @example
 * ```typescript
 * // システムフォント名指定
 * const fontName = new FontFaceNameC({ name: "Arial" });
 * 
 * // 日本語フォント指定
 * const japaneseName = new FontFaceNameC({ name: "Hiragino Sans" });
 * 
 * // Webフォント指定
 * const webFontName = new FontFaceNameC({ name: "Roboto" });
 * ```
 */
export class FontFaceNameC extends SvgFontBase {
    private _name: string;

    constructor(options: FontFaceNameOptions) {
        super();
        this._name = options.name;
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const fontFaceName = SvgElementCreater.createFontFaceNameElement();
        
        // 必須属性
        fontFaceName.setAttribute("name", this._name);
        
        return new SvgElementProxy(fontFaceName);
    }

    private applyOptions(options: FontFaceNameOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    // === フォント名設定 ===

    /**
     * フォント名を設定
     * @param name フォント名（システムフォント名またはフォントファミリー名）
     */
    public setName(name: string): this {
        this._name = name;
        this._svgDom.setSvgAttribute("name", name);
        return this;
    }

    /**
     * フォント名を取得
     */
    public getName(): string {
        return this._name;
    }

    // === フォント名検証 ===

    /**
     * 設定されたフォント名が一般的なシステムフォントかどうかを判定
     */
    public isSystemFont(): boolean {
        const systemFonts = [
            "arial", "helvetica", "times", "times new roman", "courier", "courier new",
            "georgia", "verdana", "trebuchet ms", "comic sans ms", "impact",
            "system-ui", "-apple-system", "segoe ui", "roboto"
        ];
        return systemFonts.includes(this._name.toLowerCase());
    }

    /**
     * 設定されたフォント名が日本語フォントかどうかを判定
     */
    public isJapaneseFont(): boolean {
        const japaneseFonts = [
            "hiragino sans", "hiragino kaku gothic pro", "yu gothic", "meiryo",
            "ms pgothic", "ms gothic", "ipa", "noto sans jp", "source han sans",
            "kozgopro-medium", "kozminpro-regular"
        ];
        return japaneseFonts.some(font => this._name.toLowerCase().includes(font));
    }

    /**
     * 設定されたフォント名がWebフォントらしいかどうかを判定
     */
    public isWebFont(): boolean {
        const webFonts = [
            "roboto", "open sans", "lato", "montserrat", "source sans pro",
            "raleway", "poppins", "nunito", "ubuntu", "playfair display"
        ];
        return webFonts.includes(this._name.toLowerCase());
    }

    /**
     * 設定されたフォント名がモノスペースフォントかどうかを判定
     */
    public isMonospaceFont(): boolean {
        const monospaceFonts = [
            "courier", "courier new", "monaco", "consolas", "lucida console",
            "source code pro", "fira code", "inconsolata", "sf mono", "cascadia code",
            "roboto mono", "jetbrains mono"
        ];
        return monospaceFonts.includes(this._name.toLowerCase());
    }

    // === プリセットメソッド ===

    /**
     * プリセット: Arialフォント（汎用サンセリフ）
     */
    public presetArial(): this {
        return this.setName("Arial");
    }

    /**
     * プリセット: Helveticaフォント（デザイン用サンセリフ）
     */
    public presetHelvetica(): this {
        return this.setName("Helvetica");
    }

    /**
     * プリセット: Times New Romanフォント（セリフ）
     */
    public presetTimesNewRoman(): this {
        return this.setName("Times New Roman");
    }

    /**
     * プリセット: Georgiaフォント（Web用セリフ）
     */
    public presetGeorgia(): this {
        return this.setName("Georgia");
    }

    /**
     * プリセット: Verdanaフォント（可読性重視）
     */
    public presetVerdana(): this {
        return this.setName("Verdana");
    }

    /**
     * プリセット: Courier Newフォント（等幅）
     */
    public presetCourierNew(): this {
        return this.setName("Courier New");
    }

    /**
     * プリセット: system-ui（システム推奨フォント）
     */
    public presetSystemUi(): this {
        return this.setName("system-ui");
    }

    /**
     * プリセット: Segoe UI（Windows標準）
     */
    public presetSegoeUi(): this {
        return this.setName("Segoe UI");
    }

    /**
     * プリセット: Roboto（Android/Google標準）
     */
    public presetRoboto(): this {
        return this.setName("Roboto");
    }

    /**
     * プリセット: Hiragino Sans（macOS日本語）
     */
    public presetHiraginoSans(): this {
        return this.setName("Hiragino Sans");
    }

    /**
     * プリセット: Yu Gothic（Windows日本語）
     */
    public presetYuGothic(): this {
        return this.setName("Yu Gothic");
    }

    /**
     * プリセット: Meiryo（Windows日本語レガシー）
     */
    public presetMeiryo(): this {
        return this.setName("Meiryo");
    }

    /**
     * プリセット: Noto Sans JP（Google Fonts日本語）
     */
    public presetNotoSansJP(): this {
        return this.setName("Noto Sans JP");
    }

    /**
     * プリセット: Source Code Pro（プログラミング用）
     */
    public presetSourceCodePro(): this {
        return this.setName("Source Code Pro");
    }

    /**
     * プリセット: Monaco（macOS等幅）
     */
    public presetMonaco(): this {
        return this.setName("Monaco");
    }

    /**
     * プリセット: Consolas（Windows等幅）
     */
    public presetConsolas(): this {
        return this.setName("Consolas");
    }

    /**
     * プリセット: JetBrains Mono（モダン等幅）
     */
    public presetJetBrainsMono(): this {
        return this.setName("JetBrains Mono");
    }

    /**
     * プリセット: Fira Code（プログラミング合字対応）
     */
    public presetFiraCode(): this {
        return this.setName("Fira Code");
    }

    /**
     * プリセット: Cascadia Code（Microsoft開発者用）
     */
    public presetCascadiaCode(): this {
        return this.setName("Cascadia Code");
    }

    /**
     * プリセット: 汎用フォールバック（sans-serif）
     */
    public presetSansSerifFallback(): this {
        return this.setName("sans-serif");
    }

    /**
     * プリセット: セリフフォールバック（serif）
     */
    public presetSerifFallback(): this {
        return this.setName("serif");
    }

    /**
     * プリセット: 等幅フォールバック（monospace）
     */
    public presetMonospaceFallback(): this {
        return this.setName("monospace");
    }

    // === 静的ユーティリティメソッド ===

    /**
     * OS別の推奨システムフォント名を取得
     */
    public static getRecommendedSystemFont(os: "windows" | "macos" | "linux" = "windows"): string {
        const fontMap = {
            windows: "Segoe UI",
            macos: "system-ui",
            linux: "Ubuntu"
        };
        return fontMap[os];
    }

    /**
     * 用途別の推奨フォント名を取得
     */
    public static getRecommendedFontByPurpose(purpose: "ui" | "body" | "heading" | "code" | "japanese"): string {
        const purposeMap = {
            ui: "system-ui",
            body: "Georgia",
            heading: "Arial",
            code: "Consolas",
            japanese: "Hiragino Sans"
        };
        return purposeMap[purpose];
    }
}
