import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLTokenBase } from "./BaseClasses/MathMLTokenBase";

export interface MtextOptions {
    text?: string;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mtext要素のコンポーネント (<mtext>タグ)
 * 通常のテキストを表す
 */
export class MtextC extends MathMLTokenBase {
    constructor(options?: MtextOptions | string) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        // 文字列の場合はテキストとして扱う
        if (typeof options === "string") {
            this.setText(options);
        } else if (options) {
            if (options.text) this.setText(options.text);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mtextElement = MathMLElementCreater.createMtextElement();
        return new MathMLElementProxy(mtextElement);
    }
}
