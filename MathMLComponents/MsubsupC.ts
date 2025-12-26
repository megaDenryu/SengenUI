import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MsubsupOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Msubsup要素のコンポーネント (<msubsup>タグ)
 * 上下付き文字を表す
 * 正確に3つの子要素（ベース、下付き文字、上付き文字）を持つ必要がある
 */
export class MsubsupC extends MathMLLayoutBase {
    constructor(options?: MsubsupOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const msubsupElement = MathMLElementCreater.createMsubsupElement();
        return new MathMLElementProxy(msubsupElement);
    }

    /**
     * ベース、下付き文字、上付き文字を一度に設定
     */
    public setBaseSubscriptAndSuperscript(
        base: MathMLComponentChild,
        subscript: MathMLComponentChild,
        superscript: MathMLComponentChild
    ): this {
        this.clearChildren();
        this.child(base);
        this.child(subscript);
        this.child(superscript);
        return this;
    }
}
