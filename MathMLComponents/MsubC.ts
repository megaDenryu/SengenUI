import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MsubOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Msub要素のコンポーネント (<msub>タグ)
 * 下付き文字を表す
 * 正確に2つの子要素（ベースと下付き文字）を持つ必要がある
 */
export class MsubC extends MathMLLayoutBase {
    constructor(options?: MsubOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const msubElement = MathMLElementCreater.createMsubElement();
        return new MathMLElementProxy(msubElement);
    }

    /**
     * ベースと下付き文字を一度に設定
     */
    public setBaseAndSubscript(base: MathMLComponentChild, subscript: MathMLComponentChild): this {
        this.clearChildren();
        this.child(base);
        this.child(subscript);
        return this;
    }
}
