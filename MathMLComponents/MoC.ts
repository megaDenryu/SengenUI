import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLTokenBase } from "./BaseClasses/MathMLTokenBase";

export interface MoOptions {
    text?: string;
    form?: "prefix" | "infix" | "postfix";
    stretchy?: boolean;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mo要素のコンポーネント (<mo>タグ)
 * 演算子を表す
 */
export class MoC extends MathMLTokenBase {
    constructor(options?: MoOptions | string) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        // 文字列の場合はテキストとして扱う
        if (typeof options === "string") {
            this.setText(options);
        } else if (options) {
            if (options.text) this.setText(options.text);
            if (options.form) this.setForm(options.form);
            if (options.stretchy !== undefined) this.setStretchy(options.stretchy);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const moElement = MathMLElementCreater.createMoElement();
        return new MathMLElementProxy(moElement);
    }

    /**
     * form属性を設定
     */
    public setForm(form: "prefix" | "infix" | "postfix"): this {
        this.setMathMLAttribute("form", form);
        return this;
    }

    /**
     * stretchy属性を設定
     */
    public setStretchy(stretchy: boolean): this {
        this.setMathMLAttribute("stretchy", stretchy.toString());
        return this;
    }
}
