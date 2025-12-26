import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgAnimationBase } from "./BaseClasses/SvgAnimationBase";

export interface AnimateOptions {
    attributeName?: string;
    values?: string;
    from?: string;
    to?: string;
    dur?: string;
    begin?: string;
    end?: string;
    fill?: "freeze" | "remove";
    repeatCount?: string | number;
    repeatDur?: string;
    restart?: "always" | "whenNotActive" | "never";
    calcMode?: "discrete" | "linear" | "paced" | "spline";
    keyTimes?: string;
    keySplines?: string;
    additive?: "replace" | "sum";
    accumulate?: "none" | "sum";
    className?: string | string[];
    id?: string;
}

/**
 * SVG Animate要素のコンポーネント
 * SVG要素の属性アニメーションを定義するためのSVG要素をラップします
 */
export class AnimateC extends SvgAnimationBase {
    constructor(options?: AnimateOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.attributeName) this.setAttributeName(options.attributeName);
            if (options.values) this.setValues(options.values);
            if (options.from) this.setFrom(options.from);
            if (options.to) this.setTo(options.to);
            if (options.dur) this.setDur(options.dur);
            if (options.begin) this.setBegin(options.begin);
            if (options.end) this.setEnd(options.end);
            if (options.fill) this.setFill(options.fill);
            if (options.repeatCount !== undefined) this.setRepeatCount(options.repeatCount);
            if (options.repeatDur) this.setRepeatDur(options.repeatDur);
            if (options.restart) this.setRestart(options.restart);
            if (options.calcMode) this.setCalcMode(options.calcMode);
            if (options.keyTimes) this.setKeyTimes(options.keyTimes);
            if (options.keySplines) this.setKeySplines(options.keySplines);
            if (options.additive) this.setAdditive(options.additive);
            if (options.accumulate) this.setAccumulate(options.accumulate);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const animate = SvgElementCreater.createAnimateElement();
        return new SvgElementProxy(animate);
    }

    /**
     * アニメーション対象の属性名を設定
     */
    public setAttributeName(attributeName: string): this {
        this.setSvgAttribute("attributeName", attributeName);
        return this;
    }

    /**
     * アニメーション対象の属性名を取得
     */
    public getAttributeName(): string | null {
        return this.getSvgAttribute("attributeName");
    }

    /**
     * アニメーションの値リストを設定
     */
    public setValues(values: string): this {
        this.setSvgAttribute("values", values);
        return this;
    }

    /**
     * アニメーションの値リストを取得
     */
    public getValues(): string | null {
        return this.getSvgAttribute("values");
    }

    /**
     * アニメーションの開始値を設定
     */
    public setFrom(from: string): this {
        this.setSvgAttribute("from", from);
        return this;
    }

    /**
     * アニメーションの開始値を取得
     */
    public getFrom(): string | null {
        return this.getSvgAttribute("from");
    }

    /**
     * アニメーションの終了値を設定
     */
    public setTo(to: string): this {
        this.setSvgAttribute("to", to);
        return this;
    }

    /**
     * アニメーションの終了値を取得
     */
    public getTo(): string | null {
        return this.getSvgAttribute("to");
    }

    /**
     * アニメーションの継続時間を設定
     */
    public setDur(dur: string): this {
        this.setSvgAttribute("dur", dur);
        return this;
    }

    /**
     * アニメーションの継続時間を取得
     */
    public getDur(): string | null {
        return this.getSvgAttribute("dur");
    }

    /**
     * アニメーションの開始時刻を設定
     */
    public setBegin(begin: string): this {
        this.setSvgAttribute("begin", begin);
        return this;
    }

    /**
     * アニメーションの開始時刻を取得
     */
    public getBegin(): string | null {
        return this.getSvgAttribute("begin");
    }

    /**
     * アニメーションの終了時刻を設定
     */
    public setEnd(end: string): this {
        this.setSvgAttribute("end", end);
        return this;
    }

    /**
     * アニメーションの終了時刻を取得
     */
    public getEnd(): string | null {
        return this.getSvgAttribute("end");
    }

    /**
     * アニメーション終了後の動作を設定
     */
    public setFill(fill: "freeze" | "remove"): this {
        this.setSvgAttribute("fill", fill);
        return this;
    }

    /**
     * アニメーション終了後の動作を取得
     */
    public getFillMode(): string | null {
        return this.getSvgAttribute("fill");
    }

    /**
     * 繰り返し回数を設定
     */
    public setRepeatCount(repeatCount: string | number): this {
        this.setSvgAttribute("repeatCount", repeatCount.toString());
        return this;
    }

    /**
     * 繰り返し回数を取得
     */
    public getRepeatCount(): string | null {
        return this.getSvgAttribute("repeatCount");
    }

    /**
     * 繰り返し時間を設定
     */
    public setRepeatDur(repeatDur: string): this {
        this.setSvgAttribute("repeatDur", repeatDur);
        return this;
    }

    /**
     * 繰り返し時間を取得
     */
    public getRepeatDur(): string | null {
        return this.getSvgAttribute("repeatDur");
    }

    /**
     * 再開動作を設定
     */
    public setRestart(restart: "always" | "whenNotActive" | "never"): this {
        this.setSvgAttribute("restart", restart);
        return this;
    }

    /**
     * 再開動作を取得
     */
    public getRestart(): string | null {
        return this.getSvgAttribute("restart");
    }

    /**
     * 計算モードを設定
     */
    public setCalcMode(calcMode: "discrete" | "linear" | "paced" | "spline"): this {
        this.setSvgAttribute("calcMode", calcMode);
        return this;
    }

    /**
     * 計算モードを取得
     */
    public getCalcMode(): string | null {
        return this.getSvgAttribute("calcMode");
    }

    /**
     * キーフレームタイミングを設定
     */
    public setKeyTimes(keyTimes: string): this {
        this.setSvgAttribute("keyTimes", keyTimes);
        return this;
    }

    /**
     * キーフレームタイミングを取得
     */
    public getKeyTimes(): string | null {
        return this.getSvgAttribute("keyTimes");
    }

    /**
     * スプライン制御点を設定
     */
    public setKeySplines(keySplines: string): this {
        this.setSvgAttribute("keySplines", keySplines);
        return this;
    }

    /**
     * スプライン制御点を取得
     */
    public getKeySplines(): string | null {
        return this.getSvgAttribute("keySplines");
    }

    /**
     * 加算モードを設定
     */
    public setAdditive(additive: "replace" | "sum"): this {
        this.setSvgAttribute("additive", additive);
        return this;
    }

    /**
     * 加算モードを取得
     */
    public getAdditive(): string | null {
        return this.getSvgAttribute("additive");
    }

    /**
     * 累積モードを設定
     */
    public setAccumulate(accumulate: "none" | "sum"): this {
        this.setSvgAttribute("accumulate", accumulate);
        return this;
    }

    /**
     * 累積モードを取得
     */
    public getAccumulate(): string | null {
        return this.getSvgAttribute("accumulate");
    }

    /**
     * 簡単なフェードインアニメーションを作成
     */
    public createFadeIn(duration: string = "1s"): this {
        this.setAttributeName("opacity");
        this.setFrom("0");
        this.setTo("1");
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 簡単なフェードアウトアニメーションを作成
     */
    public createFadeOut(duration: string = "1s"): this {
        this.setAttributeName("opacity");
        this.setFrom("1");
        this.setTo("0");
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 点滅アニメーションを作成
     */
    public createBlink(duration: string = "1s"): this {
        this.setAttributeName("opacity");
        this.setValues("1;0;1");
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * サイズアニメーションを作成（円の半径用）
     */
    public createRadiusAnimation(fromRadius: number, toRadius: number, duration: string = "1s"): this {
        this.setAttributeName("r");
        this.setFrom(fromRadius.toString());
        this.setTo(toRadius.toString());
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 色アニメーションを作成
     */
    public createColorAnimation(fromColor: string, toColor: string, duration: string = "1s"): this {
        this.setAttributeName("fill");
        this.setFrom(fromColor);
        this.setTo(toColor);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * ストローク幅アニメーションを作成
     */
    public createStrokeWidthAnimation(fromWidth: number, toWidth: number, duration: string = "1s"): this {
        this.setAttributeName("stroke-width");
        this.setFrom(fromWidth.toString());
        this.setTo(toWidth.toString());
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * パスアニメーションを作成（パスの描画）
     */
    public createPathDrawAnimation(duration: string = "3s"): this {
        this.setAttributeName("stroke-dasharray");
        this.setFrom("0,1000");
        this.setTo("1000,0");
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * スケールアニメーションを作成（transform属性用）
     */
    public createScaleAnimation(fromScale: number, toScale: number, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setFrom(`scale(${fromScale})`);
        this.setTo(`scale(${toScale})`);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 数値補間アニメーションを作成
     */
    public createNumericAnimation(attribute: string, from: number, to: number, duration: string = "1s"): this {
        this.setAttributeName(attribute);
        this.setFrom(from.toString());
        this.setTo(to.toString());
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 複数値アニメーションを作成
     */
    public createMultiValueAnimation(attribute: string, values: (string | number)[], duration: string = "2s"): this {
        this.setAttributeName(attribute);
        this.setValues(values.map(v => v.toString()).join(";"));
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * イージングアニメーションを作成
     */
    public createEasingAnimation(attribute: string, from: string, to: string, duration: string = "1s", easing: "ease-in" | "ease-out" | "ease-in-out" = "ease-in-out"): this {
        this.setAttributeName(attribute);
        this.setFrom(from);
        this.setTo(to);
        this.setDur(duration);
        this.setCalcMode("spline");
        
        // イージング関数のスプライン制御点
        const easingSplines = {
            "ease-in": "0.42 0 1 1",
            "ease-out": "0 0 0.58 1",
            "ease-in-out": "0.42 0 0.58 1"
        };
        
        this.setKeyTimes("0;1");
        this.setKeySplines(easingSplines[easing]);
        this.setFill("freeze");
        return this;
    }

    /**
     * 遅延開始を設定
     */
    public withDelay(delay: string): this {
        this.setBegin(delay);
        return this;
    }

    /**
     * 無限繰り返しを設定
     */
    public repeatIndefinitely(): this {
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 指定回数繰り返しを設定
     */
    public repeatTimes(count: number): this {
        this.setRepeatCount(count);
        return this;
    }

    /**
     * 値を保持して終了
     */
    public freezeOnEnd(): this {
        this.setFill("freeze");
        return this;
    }

    /**
     * 元の値に戻して終了
     */
    public removeOnEnd(): this {
        this.setFill("remove");
        return this;
    }

    /**
     * アニメーションの開始
     */
    public startAnimation(): void {
        const element = this._svgDom.element as SVGAnimateElement;
        if ('beginElement' in element && typeof element.beginElement === 'function') {
            element.beginElement();
        }
    }

    /**
     * アニメーションの終了
     */
    public endAnimation(): void {
        const element = this._svgDom.element as SVGAnimateElement;
        if ('endElement' in element && typeof element.endElement === 'function') {
            element.endElement();
        }
    }

    /**
     * アニメーションの現在時刻を取得
     */
    public getCurrentTime(): number {
        const element = this._svgDom.element as SVGAnimateElement;
        if ('getCurrentTime' in element && typeof element.getCurrentTime === 'function') {
            return element.getCurrentTime();
        }
        return 0;
    }
}
