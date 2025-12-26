import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MrowOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mrow要素のコンポーネント (<mrow>タグ)
 * 数式の行を表すコンテナ要素
 */
export class MrowC extends MathMLContainerBase {
    constructor(options?: MrowOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mrowElement = MathMLElementCreater.createMrowElement();
        return new MathMLElementProxy(mrowElement);
    }
}
