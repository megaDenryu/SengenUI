import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgAnimationBase } from "./BaseClasses/SvgAnimationBase";

export interface AnimateTransformOptions {
    attributeName?: string;
    type?: "translate" | "scale" | "rotate" | "skewX" | "skewY";
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
 * SVG AnimateTransform要素のコンポーネント
 * SVG要素の変形アニメーションを定義するためのSVG要素をラップします
 */
export class AnimateTransformC extends SvgAnimationBase {
    constructor(options?: AnimateTransformOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.attributeName) this.setAttributeName(options.attributeName);
            if (options.type) this.setType(options.type);
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
        const animateTransform = SvgElementCreater.createAnimateTransformElement();
        return new SvgElementProxy(animateTransform);
    }

    /**
     * アニメーション対象の属性名を設定（通常は"transform"）
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
     * 変形の種類を設定
     */
    public setType(type: "translate" | "scale" | "rotate" | "skewX" | "skewY"): this {
        this.setSvgAttribute("type", type);
        return this;
    }

    /**
     * 変形の種類を取得
     */
    public getType(): string | null {
        return this.getSvgAttribute("type");
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
     * 移動アニメーションを作成
     */
    public createTranslateAnimation(fromX: number, fromY: number, toX: number, toY: number, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        this.setFrom(`${fromX} ${fromY}`);
        this.setTo(`${toX} ${toY}`);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * スケールアニメーションを作成
     */
    public createScaleAnimation(fromScale: number, toScale: number, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("scale");
        this.setFrom(fromScale.toString());
        this.setTo(toScale.toString());
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * X軸Y軸独立スケールアニメーションを作成
     */
    public createScaleXYAnimation(fromScaleX: number, fromScaleY: number, toScaleX: number, toScaleY: number, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("scale");
        this.setFrom(`${fromScaleX} ${fromScaleY}`);
        this.setTo(`${toScaleX} ${toScaleY}`);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 回転アニメーションを作成
     */
    public createRotateAnimation(fromAngle: number, toAngle: number, centerX: number = 0, centerY: number = 0, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("rotate");
        this.setFrom(`${fromAngle} ${centerX} ${centerY}`);
        this.setTo(`${toAngle} ${centerX} ${centerY}`);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 連続回転アニメーションを作成
     */
    public createContinuousRotation(centerX: number = 0, centerY: number = 0, duration: string = "3s"): this {
        this.setAttributeName("transform");
        this.setType("rotate");
        this.setFrom(`0 ${centerX} ${centerY}`);
        this.setTo(`360 ${centerX} ${centerY}`);
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * X軸スキューアニメーションを作成
     */
    public createSkewXAnimation(fromAngle: number, toAngle: number, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("skewX");
        this.setFrom(fromAngle.toString());
        this.setTo(toAngle.toString());
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * Y軸スキューアニメーションを作成
     */
    public createSkewYAnimation(fromAngle: number, toAngle: number, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("skewY");
        this.setFrom(fromAngle.toString());
        this.setTo(toAngle.toString());
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * パルスアニメーション（拡大縮小）を作成
     */
    public createPulseAnimation(minScale: number = 0.8, maxScale: number = 1.2, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("scale");
        this.setValues(`${minScale};${maxScale};${minScale}`);
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 振動アニメーション（左右移動）を作成
     */
    public createShakeAnimation(amplitude: number = 5, duration: string = "0.1s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        this.setValues(`-${amplitude} 0;${amplitude} 0;-${amplitude} 0;${amplitude} 0;0 0`);
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * バウンスアニメーション（上下移動）を作成
     */
    public createBounceAnimation(height: number = 20, duration: string = "0.6s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        this.setValues(`0 0;0 -${height};0 0`);
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * スピンアニメーション（高速回転）を作成
     */
    public createSpinAnimation(centerX: number = 0, centerY: number = 0, duration: string = "1s"): this {
        this.setAttributeName("transform");
        this.setType("rotate");
        this.setValues(`0 ${centerX} ${centerY};360 ${centerX} ${centerY}`);
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * ウィグルアニメーション（ランダムな動き）を作成
     */
    public createWiggleAnimation(range: number = 3, duration: string = "0.2s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        const values: string[] = [];
        for (let i = 0; i < 10; i++) {
            const x = (Math.random() - 0.5) * range * 2;
            const y = (Math.random() - 0.5) * range * 2;
            values.push(`${x} ${y}`);
        }
        values.push("0 0"); // 最後は元の位置に戻る
        this.setValues(values.join(";"));
        this.setDur(duration);
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * スライドインアニメーション（左から）を作成
     */
    public createSlideInLeft(distance: number = 100, duration: string = "0.5s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        this.setFrom(`-${distance} 0`);
        this.setTo("0 0");
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * スライドインアニメーション（右から）を作成
     */
    public createSlideInRight(distance: number = 100, duration: string = "0.5s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        this.setFrom(`${distance} 0`);
        this.setTo("0 0");
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * スライドインアニメーション（上から）を作成
     */
    public createSlideInTop(distance: number = 100, duration: string = "0.5s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        this.setFrom(`0 -${distance}`);
        this.setTo("0 0");
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * スライドインアニメーション（下から）を作成
     */
    public createSlideInBottom(distance: number = 100, duration: string = "0.5s"): this {
        this.setAttributeName("transform");
        this.setType("translate");
        this.setFrom(`0 ${distance}`);
        this.setTo("0 0");
        this.setDur(duration);
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
        const element = this._svgDom.element as SVGAnimateTransformElement;
        if ('beginElement' in element && typeof element.beginElement === 'function') {
            element.beginElement();
        }
    }

    /**
     * アニメーションの終了
     */
    public endAnimation(): void {
        const element = this._svgDom.element as SVGAnimateTransformElement;
        if ('endElement' in element && typeof element.endElement === 'function') {
            element.endElement();
        }
    }
}
