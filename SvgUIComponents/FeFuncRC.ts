import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeFuncROptions {
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
 * SVGフィルタープリミティブ：赤チャンネル関数
 * FeComponentTransfer内で赤チャンネルの変換関数を定義
 */
export class FeFuncRC extends SvgFilterPrimitiveBase {
    constructor(options?: FeFuncROptions) {
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
        const element = SvgElementCreater.createFeFuncRElement();
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
     * 赤チャンネル強調
     */
    public enhanceRed(factor: number = 1.2): this {
        this.createLinear(factor, 0);
        return this;
    }

    /**
     * 赤チャンネル抑制
     */
    public suppressRed(factor: number = 0.8): this {
        this.createLinear(factor, 0);
        return this;
    }

    /**
     * 赤チャンネル反転
     */
    public invertRed(): this {
        this.createLinear(-1, 1);
        return this;
    }

    /**
     * 暖色調整
     */
    public createWarmTone(): this {
        this.createLinear(1.1, 0.05);
        return this;
    }

    /**
     * 寒色調整
     */
    public createCoolTone(): this {
        this.createLinear(0.9, -0.02);
        return this;
    }

    /**
     * S字カーブ
     */
    public createSCurve(): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = 3 * x * x - 2 * x * x * x; // S字カーブ
            values.push(y);
        }
        this.createTable(values);
        return this;
    }
}
