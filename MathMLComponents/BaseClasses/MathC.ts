import { MathMLElementProxy } from "../../SengenBase/MathMLDomProxy";
import { MathMLElementCreater } from "../../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./MathMLContainerBase";

export interface MathOptions {
    display?: "block" | "inline";
    className?: string | string[];
    id?: string;
}

/**
 * MathML Math要素のコンポーネント (<math>タグ)
 * MathML数式のルート要素
 * HTML要素の子として追加可能な唯一のMathML要素
 */
export class MathC extends MathMLContainerBase {
    constructor(options?: MathOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.display) this.setDisplay(options.display);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mathElement = MathMLElementCreater.createMathElement();
        return new MathMLElementProxy(mathElement);
    }

    /**
     * display属性を設定
     */
    public setDisplay(display: "block" | "inline"): this {
        this.setMathMLAttribute("display", display);
        return this;
    }

    /**
     * display属性を取得
     */
    public getDisplay(): "block" | "inline" {
        return (this.getMathMLAttribute("display") as "block" | "inline") || "inline";
    }
}
