import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MoverOptions {
    accent?: boolean;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mover要素のコンポーネント (<mover>タグ)
 * 上部記号を表す（ベクトルの矢印、ハット記号など）
 * 正確に2つの子要素（ベースと上部記号）を持つ必要がある
 */
export class MoverC extends MathMLLayoutBase {
    constructor(options?: MoverOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.accent !== undefined) this.setAccent(options.accent);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const moverElement = MathMLElementCreater.createMoverElement();
        return new MathMLElementProxy(moverElement);
    }

    /**
     * accent属性を設定
     */
    public setAccent(accent: boolean): this {
        this.setMathMLAttribute("accent", accent.toString());
        return this;
    }

    /**
     * ベースと上部記号を一度に設定
     */
    public setBaseAndOverscript(base: MathMLComponentChild, overscript: MathMLComponentChild): this {
        this.clearChildren();
        this.child(base);
        this.child(overscript);
        return this;
    }
}
