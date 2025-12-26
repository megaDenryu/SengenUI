import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MfracOptions {
    linethickness?: string | number;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mfrac要素のコンポーネント (<mfrac>タグ)
 * 分数を表す
 * 正確に2つの子要素（分子と分母）を持つ必要がある
 */
export class MfracC extends MathMLLayoutBase {
    constructor(options?: MfracOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.linethickness !== undefined) this.setLineThickness(options.linethickness);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mfracElement = MathMLElementCreater.createMfracElement();
        return new MathMLElementProxy(mfracElement);
    }

    /**
     * linethickness属性を設定（分数線の太さ）
     */
    public setLineThickness(thickness: string | number): this {
        this.setMathMLAttribute("linethickness", thickness);
        return this;
    }

    /**
     * 分子と分母を一度に設定
     */
    public setNumeratorAndDenominator(numerator: MathMLComponentChild, denominator: MathMLComponentChild): this {
        this.clearChildren();
        this.child(numerator);
        this.child(denominator);
        return this;
    }
}
