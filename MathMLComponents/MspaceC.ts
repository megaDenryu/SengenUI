import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLTokenBase } from "./BaseClasses/MathMLTokenBase";

export interface MspaceOptions {
    width?: string | number;
    height?: string | number;
    depth?: string | number;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mspace要素のコンポーネント (<mspace>タグ)
 * スペースを表す
 */
export class MspaceC extends MathMLTokenBase {
    constructor(options?: MspaceOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.depth !== undefined) this.setDepth(options.depth);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mspaceElement = MathMLElementCreater.createMspaceElement();
        return new MathMLElementProxy(mspaceElement);
    }

    /**
     * width属性を設定
     */
    public setWidth(width: string | number): this {
        this.setMathMLAttribute("width", width);
        return this;
    }

    /**
     * height属性を設定
     */
    public setHeight(height: string | number): this {
        this.setMathMLAttribute("height", height);
        return this;
    }

    /**
     * depth属性を設定
     */
    public setDepth(depth: string | number): this {
        this.setMathMLAttribute("depth", depth);
        return this;
    }
}
