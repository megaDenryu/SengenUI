import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgAnimationBase } from "./BaseClasses/SvgAnimationBase";

export interface SetOptions {
    className?: string | string[];
    id?: string;
    attributeName?: string;
    to?: string;
    begin?: string;
    end?: string;
    dur?: string;
    fill?: "freeze" | "remove";
}

/**
 * SVGアニメーション要素：値設定
 * 指定した時刻に属性値を設定する
 */
export class SetC extends SvgAnimationBase {
    constructor(options?: SetOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.attributeName) this.setAttributeName(options.attributeName);
            if (options.to) this.setTo(options.to);
            if (options.begin) this.setBegin(options.begin);
            if (options.end) this.setEnd(options.end);
            if (options.dur) this.setDur(options.dur);
            if (options.fill) this.setFill(options.fill);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createSetElement();
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
     * 設定値を設定
     */
    public setTo(to: string): this {
        this.setSvgAttribute("to", to);
        return this;
    }

    /**
     * 設定値を取得
     */
    public getTo(): string | null {
        return this.getSvgAttribute("to");
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

    // === プリセットメソッド ===

    /**
     * 即座に色を変更
     */
    public setColorInstant(color: string, startTime: string = "0s"): this {
        this.setAttributeName("fill");
        this.setTo(color);
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 即座にストローク色を変更
     */
    public setStrokeColorInstant(color: string, startTime: string = "0s"): this {
        this.setAttributeName("stroke");
        this.setTo(color);
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 可視性を切り替え
     */
    public setVisibility(visible: boolean, startTime: string = "0s"): this {
        this.setAttributeName("visibility");
        this.setTo(visible ? "visible" : "hidden");
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 表示/非表示を切り替え
     */
    public setDisplay(display: boolean, startTime: string = "0s"): this {
        this.setAttributeName("display");
        this.setTo(display ? "inline" : "none");
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 不透明度を設定
     */
    public setOpacity(opacity: number, startTime: string = "0s"): this {
        this.setAttributeName("opacity");
        this.setTo(opacity.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * フィルターを適用
     */
    public setFilter(filterId: string, startTime: string = "0s"): this {
        this.setAttributeName("filter");
        this.setTo(`url(#${filterId})`);
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * クリッピングパスを適用
     */
    public setClipPath(clipPathId: string, startTime: string = "0s"): this {
        this.setAttributeName("clip-path");
        this.setTo(`url(#${clipPathId})`);
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * マスクを適用
     */
    public setMask(maskId: string, startTime: string = "0s"): this {
        this.setAttributeName("mask");
        this.setTo(`url(#${maskId})`);
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 座標を設定
     */
    public setPosition(x: number, y: number, startTime: string = "0s"): this {
        // 複数の属性を設定するため、このメソッドでは一つずつ設定
        this.setAttributeName("x");
        this.setTo(x.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * X座標を設定
     */
    public setX(x: number, startTime: string = "0s"): this {
        this.setAttributeName("x");
        this.setTo(x.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * Y座標を設定
     */
    public setY(y: number, startTime: string = "0s"): this {
        this.setAttributeName("y");
        this.setTo(y.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 幅を設定
     */
    public setWidth(width: number, startTime: string = "0s"): this {
        this.setAttributeName("width");
        this.setTo(width.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 高さを設定
     */
    public setHeight(height: number, startTime: string = "0s"): this {
        this.setAttributeName("height");
        this.setTo(height.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 半径を設定
     */
    public setRadius(radius: number, startTime: string = "0s"): this {
        this.setAttributeName("r");
        this.setTo(radius.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * ストローク幅を設定
     */
    public setStrokeWidth(width: number, startTime: string = "0s"): this {
        this.setAttributeName("stroke-width");
        this.setTo(width.toString());
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * テキストを設定
     */
    public setText(text: string, startTime: string = "0s"): this {
        this.setAttributeName("textContent");
        this.setTo(text);
        this.setBegin(startTime);
        this.setFill("freeze");
        return this;
    }

    /**
     * 遅延後に値を設定
     */
    public setDelayed(attributeName: string, value: string, delay: string): this {
        this.setAttributeName(attributeName);
        this.setTo(value);
        this.setBegin(delay);
        this.setFill("freeze");
        return this;
    }

    /**
     * 一時的に値を設定（指定時間後に元に戻る）
     */
    public setTemporary(attributeName: string, value: string, startTime: string = "0s", duration: string = "1s"): this {
        this.setAttributeName(attributeName);
        this.setTo(value);
        this.setBegin(startTime);
        this.setDur(duration);
        this.setFill("remove");
        return this;
    }
}
