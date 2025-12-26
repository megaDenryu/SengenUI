import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MtrOptions {
    rowalign?: "top" | "bottom" | "center" | "baseline" | "axis";
    columnalign?: "left" | "center" | "right";
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mtr要素のコンポーネント (<mtr>タグ)
 * 表の行を表す
 * セル要素（Mtd）のみを子として受け入れる
 */
export class MtrC extends MathMLContainerBase {
    constructor(options?: MtrOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.rowalign) this.setRowAlign(options.rowalign);
            if (options.columnalign) this.setColumnAlign(options.columnalign);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mtrElement = MathMLElementCreater.createMtrElement();
        return new MathMLElementProxy(mtrElement);
    }

    /**
     * rowalign属性を設定（行の垂直配置）
     */
    public setRowAlign(align: "top" | "bottom" | "center" | "baseline" | "axis"): this {
        this.setMathMLAttribute("rowalign", align);
        return this;
    }

    /**
     * columnalign属性を設定（列の水平配置）
     */
    public setColumnAlign(align: "left" | "center" | "right"): this {
        this.setMathMLAttribute("columnalign", align);
        return this;
    }
}
