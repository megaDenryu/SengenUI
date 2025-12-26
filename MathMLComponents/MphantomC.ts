import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MphantomOptions {
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mphantom要素のコンポーネント (<mphantom>タグ)
 * 不可視だがスペースを占有する要素(レイアウト調整用)
 */
export class MphantomC extends MathMLContainerBase {
    constructor(options?: MphantomOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mphantomElement = MathMLElementCreater.createMphantomElement();
        return new MathMLElementProxy(mphantomElement);
    }
}
