import { MathMLElementBase, MathMLComponentChild } from "./MathMLElementBase";
import { ILV2MathMLComponent } from "./ILV2MathMLComponent";

/**
 * コンテナ系MathML要素の基底クラス
 * 子要素を持つことができるMathML要素（math, mrow, mstyle等）が継承します
 */
export abstract class MathMLContainerBase extends MathMLElementBase {
    constructor() {
        super();
    }

    // ==================== 子要素管理 ====================

    /**
     * 子要素を追加
     */
    public child(child: MathMLComponentChild | undefined): this {
        if (child == null) { return this; }
        // ILV2MathMLComponentの自動展開
        if (this.isLV2MathMLComponent(child)) {
            this._mathmlDom.addChild(child.getContent());
            return this;
        }
        this._mathmlDom.addChild(child);
        return this;
    }

    /**
     * ILV2MathMLComponentかどうかを判定
     */
    private isLV2MathMLComponent(obj: any): obj is ILV2MathMLComponent {
        return obj != null && typeof obj.getMath === 'function' && typeof obj.getContent === 'function';
    }

    /**
     * 複数の子要素を追加
     */
    public childs(...childrenList: ((MathMLComponentChild | undefined)[] | Iterable<MathMLComponentChild | undefined>)[]): this {
        for (const children of childrenList) {
            for (const child of children) {
                this.child(child);
            }
        }
        return this;
    }

    /**
     * 子要素を削除
     */
    public removeChild(child: MathMLComponentChild): this {
        this._mathmlDom.deleteChild(child);
        return this;
    }

    /**
     * 子要素を指定位置に挿入
     */
    public insertChildAt(index: number, child: MathMLComponentChild): this {
        this._mathmlDom.insertChildAt(index, child);
        return this;
    }

    /**
     * すべての子要素を削除
     */
    public clearChildren(): this {
        this._mathmlDom.clearChildren();
        return this;
    }

    /**
     * 子要素を指定位置に移動
     */
    public moveChildToIndex(child: MathMLComponentChild, newIndex: number): this {
        this._mathmlDom.moveChildToIndex(child, newIndex);
        return this;
    }

    /**
     * 子要素の数を取得
     */
    public getChildCount(): number {
        return this._mathmlDom.element.children.length;
    }
}
