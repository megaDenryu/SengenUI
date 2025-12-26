import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLLayoutBase } from "./BaseClasses/MathMLLayoutBase";

export interface MsqrtOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Msqrt要素のコンポーネント (<msqrt>タグ)
 * 平方根を表す
 * 任意の数の子要素を持つことができる
 */
export class MsqrtC extends MathMLLayoutBase {
    constructor(options?: MsqrtOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const msqrtElement = MathMLElementCreater.createMsqrtElement();
        return new MathMLElementProxy(msqrtElement);
    }
}
