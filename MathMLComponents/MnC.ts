import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLTokenBase } from "./BaseClasses/MathMLTokenBase";

export interface MnOptions {
    text?: string;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mn要素のコンポーネント (<mn>タグ)
 * 数値を表す
 */
export class MnC extends MathMLTokenBase {
    constructor(options?: MnOptions | string | number) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        // 文字列または数値の場合はテキストとして扱う
        if (typeof options === "string" || typeof options === "number") {
            this.setText(options.toString());
        } else if (options) {
            if (options.text) this.setText(options.text);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mnElement = MathMLElementCreater.createMnElement();
        return new MathMLElementProxy(mnElement);
    }
}
