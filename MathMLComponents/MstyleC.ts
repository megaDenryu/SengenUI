import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export interface MstyleOptions {
    mathcolor?: string;
    mathsize?: string | number;
    mathvariant?: "normal" | "bold" | "italic" | "bold-italic" | "double-struck" | "bold-fraktur" | "script" | "bold-script" | "fraktur" | "sans-serif" | "bold-sans-serif" | "sans-serif-italic" | "sans-serif-bold-italic" | "monospace";
    displaystyle?: boolean;
    scriptlevel?: number;
    className?: string | string[];
    id?: string;
}

/**
 * MathML Mstyle要素のコンポーネント (<mstyle>タグ)
 * 子要素にスタイルを継承させる
 */
export class MstyleC extends MathMLContainerBase {
    constructor(options?: MstyleOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.mathcolor) this.setMathColor(options.mathcolor);
            if (options.mathsize) this.setMathSize(options.mathsize);
            if (options.mathvariant) this.setMathVariant(options.mathvariant);
            if (options.displaystyle !== undefined) this.setDisplayStyle(options.displaystyle);
            if (options.scriptlevel !== undefined) this.setScriptLevel(options.scriptlevel);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mstyleElement = MathMLElementCreater.createMstyleElement();
        return new MathMLElementProxy(mstyleElement);
    }

    /**
     * scriptlevel属性を設定（文字のサイズレベル）
     */
    public setScriptLevel(level: number): this {
        this.setMathMLAttribute("scriptlevel", level);
        return this;
    }
}
