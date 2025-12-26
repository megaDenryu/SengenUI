import { MathMLElementProxy, MathMLElementCreater } from "../SengenBase/MathMLDomProxy";
import { MathMLContainerBase } from "./BaseClasses/MathMLContainerBase";

export type MencloseNotation =
    | "longdiv"
    | "actuarial"
    | "radical"
    | "box"
    | "roundedbox"
    | "circle"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "updiagonalstrike"
    | "downdiagonalstrike"
    | "verticalstrike"
    | "horizontalstrike"
    | "madruwb"
    | "updiagonalarrow"
    | "phasorangle";

export interface MencloseOptions {
    notation?: MencloseNotation | MencloseNotation[];
    className?: string | string[];
    id?: string;
}

/**
 * MathML Menclose要素のコンポーネント (<menclose>タグ)
 * 要素を図形や線で囲む
 */
export class MencloseC extends MathMLContainerBase {
    constructor(options?: MencloseOptions) {
        super();
        this._mathmlDom = this.createMathMLDomProxy();

        if (options) {
            if (options.notation) this.setNotation(options.notation);
            if (options.className) this.addClass(options.className);
            if (options.id) this._mathmlDom.element.id = options.id;
        }
    }

    protected createMathMLDomProxy(): MathMLElementProxy {
        const mencloseElement = MathMLElementCreater.createMencloseElement();
        return new MathMLElementProxy(mencloseElement);
    }

    /**
     * notation属性を設定(囲み方の種類)
     */
    public setNotation(notation: MencloseNotation | MencloseNotation[]): this {
        const notationValue = Array.isArray(notation) ? notation.join(" ") : notation;
        this.setMathMLAttribute("notation", notationValue);
        return this;
    }
}
