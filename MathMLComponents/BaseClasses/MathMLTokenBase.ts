import { MathMLElementBase } from "./MathMLElementBase";

/**
 * トークン系MathML要素の基底クラス
 * テキストコンテンツを持つMathML要素（mi, mn, mo, mtext等）が継承します
 */
export abstract class MathMLTokenBase extends MathMLElementBase {
    constructor() {
        super();
    }

    // ==================== テキストコンテンツ管理 ====================

    /**
     * テキストコンテンツを設定
     */
    public setText(text: string): this {
        this._mathmlDom.setTextContent(text);
        return this;
    }

    /**
     * テキストコンテンツを取得
     */
    public getText(): string {
        return this._mathmlDom.getTextContent();
    }

    /**
     * テキストコンテンツをクリア
     */
    public clearText(): this {
        this._mathmlDom.setTextContent("");
        return this;
    }
}
