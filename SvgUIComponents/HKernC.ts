import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

/**
 * HKernコンポーネントのオプション
 */
export interface HKernOptions {
    className?: string | string[];
    id?: string;
    u1?: string;    // 第1グリフのUnicode値または名前
    g1?: string;    // 第1グリフのglyph-name
    u2?: string;    // 第2グリフのUnicode値または名前  
    g2?: string;    // 第2グリフのglyph-name
    k: number;      // カーニング値（必須）
}

/**
 * HKernC - SVG水平カーニング要素のコンポーネント
 * 
 * SVGフォント内でグリフ間の水平方向スペーシング調整を定義
 * 特定のグリフペア間の距離を調整してタイポグラフィを改善
 * 
 * @example
 * ```typescript
 * // 基本的な水平カーニング
 * const hkern = new HKernC({ u1: "A", u2: "V", k: -0.5 });
 * 
 * // グリフ名による指定
 * const hkern2 = new HKernC({ g1: "A", g2: "V", k: -0.3 });
 * 
 * // 複数文字の範囲指定
 * const hkern3 = new HKernC({ u1: "A,B,C", u2: "V,W,Y", k: -0.4 });
 * ```
 */
export class HKernC extends SvgFontBase {
    private _u1?: string;
    private _g1?: string;
    private _u2?: string;
    private _g2?: string;
    private _k: number;

    constructor(options: HKernOptions) {
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
        const hkern = SvgElementCreater.createHKernElement();
        
        // 必須属性
        hkern.setAttribute("k", this._k.toString());
        
        // オプション属性
        if (this._u1) hkern.setAttribute("u1", this._u1);
        if (this._g1) hkern.setAttribute("g1", this._g1);
        if (this._u2) hkern.setAttribute("u2", this._u2);
        if (this._g2) hkern.setAttribute("g2", this._g2);
        
        return new SvgElementProxy(hkern);
    }

    private applyOptions(options: HKernOptions): void {
        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
    }

    // === カーニング値設定 ===

    /**
     * カーニング値を設定
     * @param k カーニング値（負の値で文字間を狭く、正の値で広く）
     */
    public setKerning(k: number): this {
        this._k = k;
        this._svgDom.setSvgAttribute("k", k.toString());
        return this;
    }

    /**
     * カーニング値を取得
     */
    public getKerning(): number {
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
     * プリセット: 大文字間のカーニング（A-V, A-W, A-Y等）
     */
    public presetUppercaseKerning(): this {
        return this.setU1("A,Á,À,Â,Ä,Ã,Å")
                  .setU2("V,W,Y")
                  .setKerning(-0.5);
    }

    /**
     * プリセット: 小文字間のカーニング（r-a, r-e等）
     */
    public presetLowercaseKerning(): this {
        return this.setU1("r")
                  .setU2("a,e,o")
                  .setKerning(-0.2);
    }

    /**
     * プリセット: 数字間のカーニング（1の後の数字）
     */
    public presetNumericKerning(): this {
        return this.setU1("1")
                  .setU2("0,1,2,3,4,5,6,7,8,9")
                  .setKerning(-0.1);
    }

    /**
     * プリセット: 句読点の前後カーニング
     */
    public presetPunctuationKerning(): this {
        return this.setU1(".,;:!?")
                  .setU2("\",'")
                  .setKerning(-0.3);
    }

    /**
     * プリセット: 引用符のカーニング
     */
    public presetQuotationKerning(): this {
        return this.setU1("\",'")
                  .setU2("A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z")
                  .setKerning(-0.2);
    }

    /**
     * プリセット: タイトル用強いカーニング
     */
    public presetTitleKerning(): this {
        return this.setU1("T")
                  .setU2("a,e,i,o,u")
                  .setKerning(-0.6);
    }

    /**
     * プリセット: 最小限のカーニング（読みやすさ重視）
     */
    public presetMinimalKerning(): this {
        return this.setU1("V,W,Y")
                  .setU2("a,e,i,o,u")
                  .setKerning(-0.15);
    }

    /**
     * プリセット: モノスペースフォント用カーニング無効
     */
    public presetMonospaceNoKerning(): this {
        return this.setKerning(0);
    }
}
