import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

/**
 * VKernコンポーネントのオプション
 */
export interface VKernOptions {
    className?: string | string[];
    id?: string;
    u1?: string;    // 第1グリフのUnicode値または名前
    g1?: string;    // 第1グリフのglyph-name
    u2?: string;    // 第2グリフのUnicode値または名前  
    g2?: string;    // 第2グリフのglyph-name
    k: number;      // 垂直カーニング値（必須）
}

/**
 * VKernC - SVG垂直カーニング要素のコンポーネント
 * 
 * SVGフォント内でグリフ間の垂直方向スペーシング調整を定義
 * 縦書きテキストや垂直配置における文字間距離を調整
 * 
 * @example
 * ```typescript
 * // 基本的な垂直カーニング
 * const vkern = new VKernC({ u1: "。", u2: "、", k: -0.3 });
 * 
 * // グリフ名による指定
 * const vkern2 = new VKernC({ g1: "period", g2: "comma", k: -0.2 });
 * 
 * // 句読点の垂直間隔調整
 * const vkern3 = new VKernC({ u1: "！", u2: "？", k: -0.4 });
 * ```
 */
export class VKernC extends SvgFontBase {
    private _u1?: string;
    private _g1?: string;
    private _u2?: string;
    private _g2?: string;
    private _k: number;

    constructor(options: VKernOptions) {
        super();
        this._u1 = options.u1;
        this._g1 = options.g1;
        this._u2 = options.u2;
        this._g2 = options.g2;
        this._k = options.k;
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const vkern = SvgElementCreater.createVKernElement();
        
        // 必須属性
        vkern.setAttribute("k", this._k.toString());
        
        // オプション属性
        if (this._u1) vkern.setAttribute("u1", this._u1);
        if (this._g1) vkern.setAttribute("g1", this._g1);
        if (this._u2) vkern.setAttribute("u2", this._u2);
        if (this._g2) vkern.setAttribute("g2", this._g2);
        
        return new SvgElementProxy(vkern);
    }

    private applyOptions(options: VKernOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    // === 垂直カーニング値設定 ===

    /**
     * 垂直カーニング値を設定
     * @param k 垂直カーニング値（負の値で文字間を狭く、正の値で広く）
     */
    public setVerticalKerning(k: number): this {
        this._k = k;
        this._svgDom.setSvgAttribute("k", k.toString());
        return this;
    }

    /**
     * 垂直カーニング値を取得
     */
    public getVerticalKerning(): number {
        return this._k;
    }

    // === グリフ指定設定 ===

    /**
     * 第1グリフのUnicode値を設定
     * @param u1 Unicode値またはカンマ区切りのリスト
     */
    public setU1(u1: string): this {
        this._u1 = u1;
        this._svgDom.setSvgAttribute("u1", u1);
        return this;
    }

    /**
     * 第1グリフの名前を設定
     * @param g1 グリフ名またはカンマ区切りのリスト
     */
    public setG1(g1: string): this {
        this._g1 = g1;
        this._svgDom.setSvgAttribute("g1", g1);
        return this;
    }

    /**
     * 第2グリフのUnicode値を設定
     * @param u2 Unicode値またはカンマ区切りのリスト
     */
    public setU2(u2: string): this {
        this._u2 = u2;
        this._svgDom.setSvgAttribute("u2", u2);
        return this;
    }

    /**
     * 第2グリフの名前を設定
     * @param g2 グリフ名またはカンマ区切りのリスト
     */
    public setG2(g2: string): this {
        this._g2 = g2;
        this._svgDom.setSvgAttribute("g2", g2);
        return this;
    }

    // === プリセットメソッド ===

    /**
     * プリセット: 日本語句読点の垂直カーニング
     */
    public presetJapanesePunctuation(): this {
        return this.setU1("。、！？")
                  .setU2("「」『』（）")
                  .setVerticalKerning(-0.3);
    }

    /**
     * プリセット: 縦書き用の英数字間調整
     */
    public presetVerticalAlphanumeric(): this {
        return this.setU1("A-Z,a-z")
                  .setU2("0-9")
                  .setVerticalKerning(-0.2);
    }

    /**
     * プリセット: 縦書きの引用符調整
     */
    public presetVerticalQuotation(): this {
        return this.setU1("「『（")
                  .setU2("」』）")
                  .setVerticalKerning(-0.4);
    }

    /**
     * プリセット: 長音符の垂直調整
     */
    public presetLongVowelMark(): this {
        return this.setU1("ー")
                  .setU2("あ-ん,ア-ン")
                  .setVerticalKerning(-0.1);
    }

    /**
     * プリセット: 小文字（ゃゅょっ等）の垂直調整
     */
    public presetSmallKana(): this {
        return this.setU1("ゃゅょっ")
                  .setU2("あ-ん")
                  .setVerticalKerning(-0.25);
    }

    /**
     * プリセット: 数式記号の垂直間隔
     */
    public presetMathSymbols(): this {
        return this.setU1("+-×÷=")
                  .setU2("0-9")
                  .setVerticalKerning(-0.15);
    }

    /**
     * プリセット: タイトル用の強い垂直カーニング
     */
    public presetVerticalTitle(): this {
        return this.setU1("大中小")
                  .setU2("学校")
                  .setVerticalKerning(-0.5);
    }

    /**
     * プリセット: 最小限の垂直カーニング
     */
    public presetMinimalVertical(): this {
        return this.setU1("。、")
                  .setU2("あ-ん")
                  .setVerticalKerning(-0.1);
    }

    /**
     * プリセット: 等幅フォント用（カーニング無効）
     */
    public presetMonospaceVertical(): this {
        return this.setVerticalKerning(0);
    }

    /**
     * プリセット: 欧文の垂直書き用調整
     */
    public presetWesternVertical(): this {
        return this.setU1(".,;:!?")
                  .setU2("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
                  .setVerticalKerning(-0.2);
    }
}
