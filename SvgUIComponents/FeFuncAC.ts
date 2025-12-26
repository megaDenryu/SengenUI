import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeFuncAOptions {
    className?: string | string[];
    id?: string;
    type?: "identity" | "table" | "discrete" | "linear" | "gamma";
    tableValues?: number[];
    slope?: number;
    intercept?: number;
    amplitude?: number;
    exponent?: number;
    offset?: number;
}

/**
 * SVGフィルタープリミティブ：アルファチャンネル関数
 * FeComponentTransfer内でアルファチャンネルの変換関数を定義
 */
export class FeFuncAC extends SvgFilterPrimitiveBase {
    constructor(options?: FeFuncAOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.type) this.setType(options.type);
            if (options.tableValues) this.setTableValues(options.tableValues);
            if (options.slope !== undefined) this.setSlope(options.slope);
            if (options.intercept !== undefined) this.setIntercept(options.intercept);
            if (options.amplitude !== undefined) this.setAmplitude(options.amplitude);
            if (options.exponent !== undefined) this.setExponent(options.exponent);
            if (options.offset !== undefined) this.setOffset(options.offset);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeFuncAElement();
        return new SvgElementProxy(element);
    }

    /**
     * 関数タイプを設定
     */
    public setType(type: "identity" | "table" | "discrete" | "linear" | "gamma"): this {
        this.setSvgAttribute("type", type);
        return this;
    }

    /**
     * 関数タイプを取得
     */
    public getType(): string | null {
        return this.getSvgAttribute("type");
    }

    /**
     * テーブル値を設定（table/discrete関数用）
     */
    public setTableValues(values: number[]): this {
        this.setSvgAttribute("tableValues", values.join(" "));
        return this;
    }

    /**
     * テーブル値を取得
     */
    public getTableValues(): number[] | null {
        const value = this.getSvgAttribute("tableValues");
        return value ? value.split(" ").map(Number) : null;
    }

    /**
     * 傾きを設定（linear関数用）
     */
    public setSlope(slope: number): this {
        this.setSvgAttribute("slope", slope.toString());
        return this;
    }

    /**
     * 傾きを取得
     */
    public getSlope(): number | null {
        const value = this.getSvgAttribute("slope");
        return value ? Number(value) : null;
    }

    /**
     * 切片を設定（linear関数用）
     */
    public setIntercept(intercept: number): this {
        this.setSvgAttribute("intercept", intercept.toString());
        return this;
    }

    /**
     * 切片を取得
     */
    public getIntercept(): number | null {
        const value = this.getSvgAttribute("intercept");
        return value ? Number(value) : null;
    }

    /**
     * 振幅を設定（gamma関数用）
     */
    public setAmplitude(amplitude: number): this {
        this.setSvgAttribute("amplitude", amplitude.toString());
        return this;
    }

    /**
     * 振幅を取得
     */
    public getAmplitude(): number | null {
        const value = this.getSvgAttribute("amplitude");
        return value ? Number(value) : null;
    }

    /**
     * 指数を設定（gamma関数用）
     */
    public setExponent(exponent: number): this {
        this.setSvgAttribute("exponent", exponent.toString());
        return this;
    }

    /**
     * 指数を取得
     */
    public getExponent(): number | null {
        const value = this.getSvgAttribute("exponent");
        return value ? Number(value) : null;
    }

    /**
     * オフセットを設定（gamma関数用）
     */
    public setOffset(offset: number): this {
        this.setSvgAttribute("offset", offset.toString());
        return this;
    }

    /**
     * オフセットを取得
     */
    public getOffset(): number | null {
        const value = this.getSvgAttribute("offset");
        return value ? Number(value) : null;
    }

    // === プリセットメソッド ===

    /**
     * 恒等関数（変化なし）
     */
    public createIdentity(): this {
        this.setType("identity");
        return this;
    }

    /**
     * 線形変換
     */
    public createLinear(slope: number = 1, intercept: number = 0): this {
        this.setType("linear");
        this.setSlope(slope);
        this.setIntercept(intercept);
        return this;
    }

    /**
     * ガンマ変換
     */
    public createGamma(amplitude: number = 1, exponent: number = 1, offset: number = 0): this {
        this.setType("gamma");
        this.setAmplitude(amplitude);
        this.setExponent(exponent);
        this.setOffset(offset);
        return this;
    }

    /**
     * カスタムテーブル
     */
    public createTable(values: number[]): this {
        this.setType("table");
        this.setTableValues(values);
        return this;
    }

    /**
     * 離散テーブル
     */
    public createDiscrete(values: number[]): this {
        this.setType("discrete");
        this.setTableValues(values);
        return this;
    }

    /**
     * 透明度調整
     */
    public setOpacity(opacity: number): this {
        this.createLinear(opacity, 0);
        return this;
    }

    /**
     * 透明度反転
     */
    public invertAlpha(): this {
        this.createLinear(-1, 1);
        return this;
    }

    /**
     * フェードイン効果
     */
    public createFadeIn(): this {
        this.createGamma(1, 0.5, 0);
        return this;
    }

    /**
     * フェードアウト効果
     */
    public createFadeOut(): this {
        this.createGamma(1, 2, 0);
        return this;
    }

    /**
     * エッジフェード（縁を透明に）
     */
    public createEdgeFade(): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = Math.sin(Math.PI * x); // エッジが透明
            values.push(y);
        }
        this.createTable(values);
        return this;
    }

    /**
     * 中央フェード（中央を透明に）
     */
    public createCenterFade(): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = Math.abs(x - 0.5) * 2; // 中央が透明
            values.push(y);
        }
        this.createTable(values);
        return this;
    }

    /**
     * ゴーストエフェクト（部分的透明）
     */
    public createGhostEffect(): this {
        this.createLinear(0.3, 0.1);
        return this;
    }

    /**
     * シャープエッジ（急激な透明度変化）
     */
    public createSharpEdge(threshold: number = 0.5): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = x > threshold ? 1 : 0;
            values.push(y);
        }
        this.createTable(values);
        return this;
    }

    /**
     * ソフトエッジ（柔らかな透明度変化）
     */
    public createSoftEdge(): this {
        this.createGamma(1, 3, 0);
        return this;
    }

    /**
     * パルス効果（透明度の振動）
     */
    public createPulseEffect(): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = 0.5 + 0.5 * Math.sin(4 * Math.PI * x); // パルス
            values.push(Math.max(0, Math.min(1, y)));
        }
        this.createTable(values);
        return this;
    }

    /**
     * グラデーション効果（線形グラデーション）
     */
    public createGradient(): this {
        this.createLinear(1, 0);
        return this;
    }
}
