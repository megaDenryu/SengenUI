import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";
import { MathMLComponentChild } from "./BaseClasses/MathMLElementBase";

export interface MunderOptions {
    accentunder?: boolean;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Munder要素のコンポーネント (<munder>タグ)
 * 下部記号を表す（総和記号の下の範囲など）
 * 正確に2つの子要素（ベースと下部記号）を持つ必要がある
 */
export class MunderC extends MathMLLayoutBase {
    constructor(options?: MunderOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.accentunder !== undefined) this.setAccentUnder(options.accentunder);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const munderElement = MathMLElementCreater.createMunderElement();
        return new MathMLElementProxy(munderElement);
    }

    /**
     * accentunder属性を設定
     */
    public setAccentUnder(accentunder: boolean): this {
        this.setMathMLAttribute("accentunder", accentunder.toString());
        return this;
    }

    /**
     * ベースと下部記号を一度に設定
     */
    public setBaseAndUnderscript(base: MathMLComponentChild, underscript: MathMLComponentChild): this {
        this.clearChildren();
        this.child(base);
        this.child(underscript);
        return this;
    }
}
