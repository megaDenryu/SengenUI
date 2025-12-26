import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MtdOptions {
    rowspan?: number;
    columnspan?: number;
    rowalign?: "top" | "bottom" | "center" | "baseline" | "axis";
    columnalign?: "left" | "center" | "right";
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mtd要素のコンポーネント (<mtd>タグ)
 * 表のセルを表す
 * 任意のMathML要素を子として受け入れる
 */
export class MtdC extends MathMLContainerBase {
    constructor(options?: MtdOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.rowspan !== undefined) this.setRowSpan(options.rowspan);
            if (options.columnspan !== undefined) this.setColumnSpan(options.columnspan);
            if (options.rowalign) this.setRowAlign(options.rowalign);
            if (options.columnalign) this.setColumnAlign(options.columnalign);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mtdElement = MathMLElementCreater.createMtdElement();
        return new MathMLElementProxy(mtdElement);
    }

    /**
     * rowspan属性を設定（行の結合）
     */
    public setRowSpan(rowspan: number): this {
        this.setMathMLAttribute("rowspan", rowspan);
        return this;
    }

    /**
     * columnspan属性を設定（列の結合）
     */
    public setColumnSpan(columnspan: number): this {
        this.setMathMLAttribute("columnspan", columnspan);
        return this;
    }

    /**
     * rowalign属性を設定（セル内の垂直配置）
     */
    public setRowAlign(align: "top" | "bottom" | "center" | "baseline" | "axis"): this {
        this.setMathMLAttribute("rowalign", align);
        return this;
    }

    /**
     * columnalign属性を設定（セル内の水平配置）
     */
    public setColumnAlign(align: "left" | "center" | "right"): this {
        this.setMathMLAttribute("columnalign", align);
        return this;
    }
}
