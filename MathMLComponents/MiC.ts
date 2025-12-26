import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLTokenBase } from "./BaseClasses/MathMLTokenBase";

export interface MiOptions {
    text?: string;
    mathvariant?: "normal" | "bold" | "italic" | "bold-italic";
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mi要素のコンポーネント (<mi>タグ)
 * 識別子（変数名など）を表す
 */
export class MiC extends MathMLTokenBase {
    constructor(options?: MiOptions | string) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        // 文字列の場合はテキストとして扱う
        if (typeof options === "string") {
            this.setText(options);
        } else if (options) {
            if (options.text) this.setText(options.text);
            if (options.mathvariant) this.setMathVariant(options.mathvariant);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const miElement = MathMLElementCreater.createMiElement();
        return new MathMLElementProxy(miElement);
    }
}
