import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgAnimationBase } from "./BaseClasses/SvgAnimationBase";

export interface AnimateColorOptions {
    className?: string | string[];
    id?: string;
    attributeName?: string;
    from?: string;
    to?: string;
    values?: string;
    dur?: string;
    begin?: string;
    end?: string;
    repeatCount?: string | number;
    fill?: "freeze" | "remove";
    calcMode?: "discrete" | "linear" | "paced" | "spline";
    keyTimes?: string;
    keySplines?: string;
}

/**
 * SVGアニメーション要素：色アニメーション
 * 非推奨要素だが互換性のために実装
 * 現在は<animate>要素の使用が推奨
 */
export class AnimateColorC extends SvgAnimationBase {
    constructor(options?: AnimateColorOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.attributeName) this.setAttributeName(options.attributeName);
            if (options.from) this.setFrom(options.from);
            if (options.to) this.setTo(options.to);
            if (options.values) this.setValues(options.values);
            if (options.dur) this.setDur(options.dur);
            if (options.begin) this.setBegin(options.begin);
            if (options.end) this.setEnd(options.end);
            if (options.repeatCount) this.setRepeatCount(options.repeatCount);
            if (options.fill) this.setFill(options.fill);
            if (options.calcMode) this.setCalcMode(options.calcMode);
            if (options.keyTimes) this.setKeyTimes(options.keyTimes);
            if (options.keySplines) this.setKeySplines(options.keySplines);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createAnimateColorElement();
        return new SvgElementProxy(element);
    }

    /**
     * アニメーション対象の属性名を設定
     */
    public setAttributeName(name: string): this {
        this.setSvgAttribute("attributeName", name);
        return this;
    }

    /**
     * アニメーション対象の属性名を取得
     */
    public getAttributeName(): string | null {
        return this.getSvgAttribute("attributeName");
    }

    /**
     * 開始値を設定
     */
    public setFrom(from: string): this {
        this.setSvgAttribute("from", from);
        return this;
    }

    /**
     * 開始値を取得
     */
    public getFrom(): string | null {
        return this.getSvgAttribute("from");
    }

    /**
     * 終了値を設定
     */
    public setTo(to: string): this {
        this.setSvgAttribute("to", to);
        return this;
    }

    /**
     * 終了値を取得
     */
    public getTo(): string | null {
        return this.getSvgAttribute("to");
    }

    /**
     * 値のリストを設定（キーフレームアニメーション用）
     */
    public setValues(values: string): this {
        this.setSvgAttribute("values", values);
        return this;
    }

    /**
     * 値のリストを取得
     */
    public getValues(): string | null {
        return this.getSvgAttribute("values");
    }

    /**
     * アニメーション継続時間を設定
     */
    public setDur(dur: string): this {
        this.setSvgAttribute("dur", dur);
        return this;
    }

    /**
     * アニメーション継続時間を取得
     */
    public getDur(): string | null {
        return this.getSvgAttribute("dur");
    }

    /**
     * アニメーション開始時間を設定
     */
    public setBegin(begin: string): this {
        this.setSvgAttribute("begin", begin);
        return this;
    }

    /**
     * アニメーション開始時間を取得
     */
    public getBegin(): string | null {
        return this.getSvgAttribute("begin");
    }

    /**
     * アニメーション終了時間を設定
     */
    public setEnd(end: string): this {
        this.setSvgAttribute("end", end);
        return this;
    }

    /**
     * アニメーション終了時間を取得
     */
    public getEnd(): string | null {
        return this.getSvgAttribute("end");
    }

    /**
     * 繰り返し回数を設定
     */
    public setRepeatCount(count: string | number): this {
        this.setSvgAttribute("repeatCount", count.toString());
        return this;
    }

    /**
     * 繰り返し回数を取得
     */
    public getRepeatCount(): string | null {
        return this.getSvgAttribute("repeatCount");
    }

    /**
     * アニメーション終了後の状態を設定
     */
    public setFill(fill: "freeze" | "remove"): this {
        this.setSvgAttribute("fill", fill);
        return this;
    }

    /**
     * アニメーション終了後の状態を取得
     */
    public getFill(): string | null {
        return this.getSvgAttribute("fill");
    }

    /**
     * 計算モードを設定
     */
    public setCalcMode(mode: "discrete" | "linear" | "paced" | "spline"): this {
        this.setSvgAttribute("calcMode", mode);
        return this;
    }

    /**
     * 計算モードを取得
     */
    public getCalcMode(): string | null {
        return this.getSvgAttribute("calcMode");
    }

    /**
     * キータイムを設定
     */
    public setKeyTimes(times: string): this {
        this.setSvgAttribute("keyTimes", times);
        return this;
    }

    /**
     * キータイムを取得
     */
    public getKeyTimes(): string | null {
        return this.getSvgAttribute("keyTimes");
    }

    /**
     * キースプラインを設定
     */
    public setKeySplines(splines: string): this {
        this.setSvgAttribute("keySplines", splines);
        return this;
    }

    /**
     * キースプラインを取得
     */
    public getKeySplines(): string | null {
        return this.getSvgAttribute("keySplines");
    }

    // === プリセットメソッド ===

    /**
     * 色のフェードイン
     */
    public createFadeIn(from: string = "#000000", to: string = "#ffffff", duration: string = "1s"): this {
        this.setAttributeName("fill");
        this.setFrom(from);
        this.setTo(to);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 色のフェードアウト
     */
    public createFadeOut(from: string = "#ffffff", to: string = "#000000", duration: string = "1s"): this {
        this.setAttributeName("fill");
        this.setFrom(from);
        this.setTo(to);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 色の点滅
     */
    public createBlink(color1: string = "#ffffff", color2: string = "#000000", duration: string = "0.5s"): this {
        this.setAttributeName("fill");
        this.setValues(`${color1};${color2};${color1}`);
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 虹色アニメーション
     */
    public createRainbow(duration: string = "3s"): this {
        this.setAttributeName("fill");
        this.setValues("#ff0000;#ff8000;#ffff00;#80ff00;#00ff00;#00ff80;#00ffff;#0080ff;#0000ff;#8000ff;#ff00ff;#ff0080;#ff0000");
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 温度変化アニメーション（寒色→暖色）
     */
    public createTemperatureChange(duration: string = "2s"): this {
        this.setAttributeName("fill");
        this.setValues("#0066cc;#0080ff;#40a0ff;#80c0ff;#ffccaa;#ff9966;#ff6600;#cc3300");
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * パルス効果
     */
    public createPulse(baseColor: string = "#ffffff", pulseColor: string = "#ff0000", duration: string = "1s"): this {
        this.setAttributeName("fill");
        this.setValues(`${baseColor};${pulseColor};${baseColor}`);
        this.setKeyTimes("0;0.5;1");
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 警告色アニメーション
     */
    public createWarning(duration: string = "0.3s"): this {
        this.setAttributeName("fill");
        this.setValues("#ffff00;#ff0000;#ffff00");
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * エラー色アニメーション
     */
    public createError(duration: string = "0.2s"): this {
        this.setAttributeName("fill");
        this.setValues("#ff0000;#cc0000;#ff0000");
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 成功色アニメーション
     */
    public createSuccess(duration: string = "2s"): this {
        this.setAttributeName("fill");
        this.setFrom("#cccccc");
        this.setTo("#00cc00");
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * グラデーション色変化
     */
    public createGradientShift(colors: string[], duration: string = "2s"): this {
        this.setAttributeName("fill");
        this.setValues(colors.join(";"));
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }
}
