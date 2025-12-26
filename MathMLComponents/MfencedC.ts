import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MfencedOptions {
    open?: string;
    close?: string;
    separators?: string;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mfenced要素のコンポーネント (<mfenced>タグ)
 * 括弧で囲まれた式を表現
 * 注意: MathML3では非推奨。代わりにmrowとmoを使用することが推奨される
 */
export class MfencedC extends MathMLContainerBase {
    constructor(options?: MfencedOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.open !== undefined) this.setOpen(options.open);
            if (options.close !== undefined) this.setClose(options.close);
            if (options.separators !== undefined) this.setSeparators(options.separators);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mfencedElement = MathMLElementCreater.createMfencedElement();
        return new MathMLElementProxy(mfencedElement);
    }

    /**
     * open属性を設定(開き括弧)
     */
    public setOpen(open: string): this {
        this.setMathMLAttribute("open", open);
        return this;
    }

    /**
     * close属性を設定(閉じ括弧)
     */
    public setClose(close: string): this {
        this.setMathMLAttribute("close", close);
        return this;
    }

    /**
     * separators属性を設定(区切り文字)
     */
    public setSeparators(separators: string): this {
        this.setMathMLAttribute("separators", separators);
        return this;
    }
}
