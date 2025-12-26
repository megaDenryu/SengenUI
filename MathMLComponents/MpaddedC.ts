import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MpaddedOptions {
    width?: string | number;
    height?: string | number;
    depth?: string | number;
    lspace?: string | number;
    voffset?: string | number;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mpadded要素のコンポーネント (<mpadded>タグ)
 * 要素のサイズとパディングを調整する
 */
export class MpaddedC extends MathMLContainerBase {
    constructor(options?: MpaddedOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.depth !== undefined) this.setDepth(options.depth);
            if (options.lspace !== undefined) this.setLSpace(options.lspace);
            if (options.voffset !== undefined) this.setVOffset(options.voffset);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mpaddedElement = MathMLElementCreater.createMpaddedElement();
        return new MathMLElementProxy(mpaddedElement);
    }

    /**
     * width属性を設定(要素の幅)
     */
    public setWidth(width: string | number): this {
        this.setMathMLAttribute("width", width);
        return this;
    }

    /**
     * height属性を設定(ベースラインから上の高さ)
     */
    public setHeight(height: string | number): this {
        this.setMathMLAttribute("height", height);
        return this;
    }

    /**
     * depth属性を設定(ベースラインから下の深さ)
     */
    public setDepth(depth: string | number): this {
        this.setMathMLAttribute("depth", depth);
        return this;
    }

    /**
     * lspace属性を設定(左側のスペース)
     */
    public setLSpace(lspace: string | number): this {
        this.setMathMLAttribute("lspace", lspace);
        return this;
    }

    /**
     * voffset属性を設定(垂直オフセット)
     */
    public setVOffset(voffset: string | number): this {
        this.setMathMLAttribute("voffset", voffset);
        return this;
    }
}
