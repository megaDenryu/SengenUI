import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MtableOptions {
    frame?: "none" | "solid" | "dashed";
    rowlines?: string;
    columnlines?: string;
    rowspacing?: string | number;
    columnspacing?: string | number;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mtable要素のコンポーネント (<mtable>タグ)
 * 行列・表を表す
 * 行要素（Mtr）のみを子として受け入れる
 */
export class MtableC extends MathMLContainerBase {
    constructor(options?: MtableOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.frame) this.setFrame(options.frame);
            if (options.rowlines) this.setRowLines(options.rowlines);
            if (options.columnlines) this.setColumnLines(options.columnlines);
            if (options.rowspacing !== undefined) this.setRowSpacing(options.rowspacing);
            if (options.columnspacing !== undefined) this.setColumnSpacing(options.columnspacing);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mtableElement = MathMLElementCreater.createMtableElement();
        return new MathMLElementProxy(mtableElement);
    }

    /**
     * frame属性を設定（表の枠線）
     */
    public setFrame(frame: "none" | "solid" | "dashed"): this {
        this.setMathMLAttribute("frame", frame);
        return this;
    }

    /**
     * rowlines属性を設定（行間の線）
     */
    public setRowLines(rowlines: string): this {
        this.setMathMLAttribute("rowlines", rowlines);
        return this;
    }

    /**
     * columnlines属性を設定（列間の線）
     */
    public setColumnLines(columnlines: string): this {
        this.setMathMLAttribute("columnlines", columnlines);
        return this;
    }

    /**
     * rowspacing属性を設定（行間隔）
     */
    public setRowSpacing(spacing: string | number): this {
        this.setMathMLAttribute("rowspacing", spacing);
        return this;
    }

    /**
     * columnspacing属性を設定（列間隔）
     */
    public setColumnSpacing(spacing: string | number): this {
        this.setMathMLAttribute("columnspacing", spacing);
        return this;
    }
}
