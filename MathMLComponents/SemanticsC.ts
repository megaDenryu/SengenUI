import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface SemanticsOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Semantics要素のコンポーネント (<semantics>タグ)
 * 表示と意味論的意味を分離する
 * 最初の子要素が表示内容、以降が意味論情報（annotation等）
 */
export class SemanticsC extends MathMLContainerBase {
    constructor(options?: SemanticsOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const semanticsElement = MathMLElementCreater.createSemanticsElement();
        return new MathMLElementProxy(semanticsElement);
    }
}
