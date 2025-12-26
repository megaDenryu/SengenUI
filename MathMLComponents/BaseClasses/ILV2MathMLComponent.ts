import { MathC } from "./MathC";
import { MathMLContainerBase } from "./MathMLContainerBase";

/**
 * Lv2 MathMLコンポーネントが実装すべきインターフェース
 * このインターフェースを実装することで、HtmlComponentBaseとMathMLレイアウト要素の
 * child()メソッドで自動展開が可能になる
 */
export interface ILV2MathMLComponent {
    /**
     * MathC要素を取得
     * HTML要素に追加する際に自動的に呼ばれる
     */
    getMath(): MathC;
    
    /**
     * 内部コンテンツ要素を取得
     * 他のLv2コンポーネントの部品として使う際に自動的に呼ばれる
     */
    getContent(): MathMLContainerBase;
}

