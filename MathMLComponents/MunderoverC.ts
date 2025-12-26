import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MunderoverOptions {
    accent?: boolean;
    accentunder?: boolean;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Munderover要素のコンポーネント (<munderover>タグ)
 * 上下記号を表す（積分記号の範囲など）
 * 正確に3つの子要素（ベース、下部記号、上部記号）を持つ必要がある
 */
export class MunderoverC extends MathMLLayoutBase {
    constructor(options?: MunderoverOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.accent !== undefined) this.setAccent(options.accent);
            if (options.accentunder !== undefined) this.setAccentUnder(options.accentunder);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const munderoverElement = MathMLElementCreater.createMunderoverElement();
        return new MathMLElementProxy(munderoverElement);
    }

    /**
     * accent属性を設定
     */
    public setAccent(accent: boolean): this {
        this.setMathMLAttribute("accent", accent.toString());
        return this;
    }

    /**
     * accentunder属性を設定
     */
    public setAccentUnder(accentunder: boolean): this {
        this.setMathMLAttribute("accentunder", accentunder.toString());
        return this;
    }

    /**
     * ベース、下部記号、上部記号を一度に設定
     */
    public setBaseUnderscriptAndOverscript(
        base: MathMLComponentChild,
        underscript: MathMLComponentChild,
        overscript: MathMLComponentChild
    ): this {
        this.clearChildren();
        this.child(base);
        this.child(underscript);
        this.child(overscript);
        return this;
    }
}
