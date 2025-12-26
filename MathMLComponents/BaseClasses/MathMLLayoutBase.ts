import { MathMLContainerBase } from "./MathMLContainerBase";

/**
 * レイアウト系MathML要素の基底クラス
 * レイアウト機能を持つMathML要素（mfrac, msup, msub, msqrt等）が継承します
 */
export abstract class MathMLLayoutBase extends MathMLContainerBase {
    constructor() {
        super();
    }

    // レイアウト系要素共通のメソッドを追加する場合はここに実装
    // 現時点ではMathMLContainerBaseの機能のみで十分
}
