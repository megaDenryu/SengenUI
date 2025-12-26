import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeFuncBOptions {
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
 * SVGフィルタープリミティブ：青チャンネル関数
 * FeComponentTransfer内で青チャンネルの変換関数を定義
 */
export class FeFuncBC extends SvgFilterPrimitiveBase {
    constructor(options?: FeFuncBOptions) {
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
        const element = SvgElementCreater.createFeFuncBElement();
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
     * 青チャンネル強調
     */
    public enhanceBlue(factor: number = 1.2): this {
        this.createLinear(factor, 0);
        return this;
    }

    /**
     * 青チャンネル抑制
     */
    public suppressBlue(factor: number = 0.8): this {
        this.createLinear(factor, 0);
        return this;
    }

    /**
     * 青チャンネル反転
     */
    public invertBlue(): this {
        this.createLinear(-1, 1);
        return this;
    }

    /**
     * 寒色調整（青を強調）
     */
    public createCoolTone(): this {
        this.createLinear(1.1, 0.05);
        return this;
    }

    /**
     * 暖色調整（青を抑制）
     */
    public createWarmTone(): this {
        this.createLinear(0.9, -0.02);
        return this;
    }

    /**
     * 空色効果（明るい青を強調）
     */
    public createSkyBlue(): this {
        this.createGamma(1.15, 0.9, 0.02);
        return this;
    }

    /**
     * 海色効果（深い青を強調）
     */
    public createOceanBlue(): this {
        this.createGamma(1.3, 1.2, -0.05);
        return this;
    }

    /**
     * 氷色効果（薄い青を強調）
     */
    public createIceBlue(): this {
        this.createLinear(0.95, 0.08);
        return this;
    }

    /**
     * 夜色効果（暗い青を強調）
     */
    public createNightBlue(): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = Math.pow(x, 1.5) * 1.1; // 暗部強調
            values.push(Math.max(0, Math.min(1, y)));
        }
        this.createTable(values);
        return this;
    }

    /**
     * 波形カーブ
     */
    public createWaveEffect(): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = x + 0.1 * Math.sin(2 * Math.PI * x); // 波形
            values.push(Math.max(0, Math.min(1, y)));
        }
        this.createTable(values);
        return this;
    }
}
