import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MrootOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mroot要素のコンポーネント (<mroot>タグ)
 * n乗根を表す
 * 正確に2つの子要素（ベースと根指数）を持つ必要がある
 */
export class MrootC extends MathMLLayoutBase {
    constructor(options?: MrootOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mrootElement = MathMLElementCreater.createMrootElement();
        return new MathMLElementProxy(mrootElement);
    }

    /**
     * ベースと根指数を一度に設定
     */
    public setBaseAndIndex(base: MathMLComponentChild, index: MathMLComponentChild): this {
        this.clearChildren();
        this.child(base);
        this.child(index);
        return this;
    }
}
