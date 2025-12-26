import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MsupOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Msup要素のコンポーネント (<msup>タグ)
 * 上付き文字を表す
 * 正確に2つの子要素（ベースと上付き文字）を持つ必要がある
 */
export class MsupC extends MathMLLayoutBase {
    constructor(options?: MsupOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const msupElement = MathMLElementCreater.createMsupElement();
        return new MathMLElementProxy(msupElement);
    }

    /**
     * ベースと上付き文字を一度に設定
     */
    public setBaseAndSuperscript(base: MathMLComponentChild, superscript: MathMLComponentChild): this {
        this.clearChildren();
        this.child(base);
        this.child(superscript);
        return this;
    }
}
