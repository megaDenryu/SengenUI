import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgAnimationBase } from "./BaseClasses/SvgAnimationBase";

export interface AnimateMotionOptions {
    path?: string;
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
    rotate?: "auto" | "auto-reverse" | number | string;
    keyPoints?: string;
    className?: string | string[];
    id?: string;
}

/**
 * SVG AnimateMotion要素のコンポーネント
 * SVG要素のパスに沿った移動アニメーションを定義するためのSVG要素をラップします
 */
export class AnimateMotionC extends SvgAnimationBase {
    private _mpath: SVGMPathElement | null = null;

    constructor(options?: AnimateMotionOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.path) this.setPath(options.path);
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
            if (options.rotate !== undefined) this.setRotate(options.rotate);
            if (options.keyPoints) this.setKeyPoints(options.keyPoints);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const animateMotion = SvgElementCreater.createAnimateMotionElement();
        return new SvgElementProxy(animateMotion);
    }

    /**
     * 移動パスを設定
     */
    public setPath(path: string): this {
        this.setSvgAttribute("path", path);
        return this;
    }

    /**
     * 移動パスを取得
     */
    public getPath(): string | null {
        return this.getSvgAttribute("path");
    }

    /**
     * アニメーションの値リストを設定（座標のリスト）
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
     * アニメーションの開始位置を設定
     */
    public setFrom(from: string): this {
        this.setSvgAttribute("from", from);
        return this;
    }

    /**
     * アニメーションの開始位置を取得
     */
    public getFrom(): string | null {
        return this.getSvgAttribute("from");
    }

    /**
     * アニメーションの終了位置を設定
     */
    public setTo(to: string): this {
        this.setSvgAttribute("to", to);
        return this;
    }

    /**
     * アニメーションの終了位置を取得
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
     * 回転設定を設定
     */
    public setRotate(rotate: "auto" | "auto-reverse" | number | string): this {
        this.setSvgAttribute("rotate", rotate.toString());
        return this;
    }

    /**
     * 回転設定を取得
     */
    public getRotate(): string | null {
        return this.getSvgAttribute("rotate");
    }

    /**
     * キーポイントを設定
     */
    public setKeyPoints(keyPoints: string): this {
        this.setSvgAttribute("keyPoints", keyPoints);
        return this;
    }

    /**
     * キーポイントを取得
     */
    public getKeyPoints(): string | null {
        return this.getSvgAttribute("keyPoints");
    }

    /**
     * mpathエレメントを追加（参照パス用）
     */
    public addMPath(pathId: string): this {
        if (this._mpath) {
            this._svgDom.element.removeChild(this._mpath);
        }
        
        this._mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
        this._mpath.setAttribute("href", `#${pathId}`);
        this._svgDom.element.appendChild(this._mpath);
        return this;
    }

    /**
     * mpathエレメントを削除
     */
    public removeMPath(): this {
        if (this._mpath) {
            this._svgDom.element.removeChild(this._mpath);
            this._mpath = null;
        }
        return this;
    }

    /**
     * 直線移動アニメーションを作成
     */
    public createLinearMotion(fromX: number, fromY: number, toX: number, toY: number, duration: string = "1s"): this {
        this.setFrom(`${fromX},${fromY}`);
        this.setTo(`${toX},${toY}`);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 複数点移動アニメーションを作成
     */
    public createMultiPointMotion(points: Array<{x: number, y: number}>, duration: string = "2s"): this {
        const values = points.map(p => `${p.x},${p.y}`).join(";");
        this.setValues(values);
        this.setDur(duration);
        this.setFill("freeze");
        return this;
    }

    /**
     * 円形移動アニメーションを作成
     */
    public createCircularMotion(centerX: number, centerY: number, radius: number, duration: string = "3s"): this {
        const path = `M ${centerX + radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`;
        this.setPath(path);
        this.setDur(duration);
        this.setRotate("auto");
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 楕円移動アニメーションを作成
     */
    public createEllipticalMotion(centerX: number, centerY: number, radiusX: number, radiusY: number, duration: string = "3s"): this {
        const path = `M ${centerX + radiusX} ${centerY} A ${radiusX} ${radiusY} 0 1 1 ${centerX + radiusX} ${centerY}`;
        this.setPath(path);
        this.setDur(duration);
        this.setRotate("auto");
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 波形移動アニメーションを作成
     */
    public createWaveMotion(startX: number, startY: number, endX: number, amplitude: number, frequency: number, duration: string = "3s"): this {
        const segments = 50;
        const stepX = (endX - startX) / segments;
        let path = `M ${startX} ${startY}`;
        
        for (let i = 1; i <= segments; i++) {
            const x = startX + i * stepX;
            const y = startY + amplitude * Math.sin((i / segments) * frequency * 2 * Math.PI);
            path += ` L ${x} ${y}`;
        }
        
        this.setPath(path);
        this.setDur(duration);
        this.setRotate("auto");
        this.setFill("freeze");
        return this;
    }

    /**
     * らせん移動アニメーションを作成
     */
    public createSpiralMotion(centerX: number, centerY: number, maxRadius: number, turns: number, duration: string = "5s"): this {
        const segments = turns * 20;
        let path = `M ${centerX} ${centerY}`;
        
        for (let i = 1; i <= segments; i++) {
            const angle = (i / segments) * turns * 2 * Math.PI;
            const radius = (i / segments) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            path += ` L ${x} ${y}`;
        }
        
        this.setPath(path);
        this.setDur(duration);
        this.setRotate("auto");
        this.setFill("freeze");
        return this;
    }

    /**
     * ベジェ曲線移動アニメーションを作成
     */
    public createBezierMotion(startX: number, startY: number, cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, endX: number, endY: number, duration: string = "2s"): this {
        const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${endX} ${endY}`;
        this.setPath(path);
        this.setDur(duration);
        this.setRotate("auto");
        this.setFill("freeze");
        return this;
    }

    /**
     * 四角形軌道移動アニメーションを作成
     */
    public createRectangularMotion(x: number, y: number, width: number, height: number, duration: string = "4s"): this {
        const values = [
            `${x},${y}`,
            `${x + width},${y}`,
            `${x + width},${y + height}`,
            `${x},${y + height}`,
            `${x},${y}`
        ];
        this.setValues(values.join(";"));
        this.setDur(duration);
        this.setRotate("auto");
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * ランダム移動アニメーションを作成
     */
    public createRandomMotion(centerX: number, centerY: number, range: number, points: number = 10, duration: string = "3s"): this {
        const motionPoints: Array<{x: number, y: number}> = [];
        
        for (let i = 0; i < points; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * range;
            motionPoints.push({
                x: centerX + distance * Math.cos(angle),
                y: centerY + distance * Math.sin(angle)
            });
        }
        
        // 最後は開始点に戻る
        motionPoints.push({x: centerX, y: centerY});
        
        return this.createMultiPointMotion(motionPoints, duration);
    }

    /**
     * 8の字移動アニメーションを作成
     */
    public createFigureEightMotion(centerX: number, centerY: number, radius: number, duration: string = "4s"): this {
        const segments = 100;
        let path = `M ${centerX + radius} ${centerY}`;
        
        for (let i = 1; i <= segments; i++) {
            const t = (i / segments) * 4 * Math.PI;
            const x = centerX + radius * Math.sin(t);
            const y = centerY + radius * Math.sin(t) * Math.cos(t);
            path += ` L ${x} ${y}`;
        }
        
        this.setPath(path);
        this.setDur(duration);
        this.setRotate("auto");
        this.setRepeatCount("indefinite");
        return this;
    }

    /**
     * 自動回転を有効にする
     */
    public enableAutoRotation(): this {
        this.setRotate("auto");
        return this;
    }

    /**
     * 逆方向自動回転を有効にする
     */
    public enableAutoReverseRotation(): this {
        this.setRotate("auto-reverse");
        return this;
    }

    /**
     * 固定角度回転を設定
     */
    public setFixedRotation(angle: number): this {
        this.setRotate(angle);
        return this;
    }

    /**
     * 回転を無効にする
     */
    public disableRotation(): this {
        this.setRotate("0");
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
        const element = this._svgDom.element as SVGAnimateMotionElement;
        if ('beginElement' in element && typeof element.beginElement === 'function') {
            element.beginElement();
        }
    }

    /**
     * アニメーションの終了
     */
    public endAnimation(): void {
        const element = this._svgDom.element as SVGAnimateMotionElement;
        if ('endElement' in element && typeof element.endElement === 'function') {
            element.endElement();
        }
    }
}
