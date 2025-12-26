import { MathC } from "./MathC";
import { MathMLContainerBase } from "./MathMLContainerBase";
import { MrowC } from "../MrowC";
import { ILV2MathMLComponent } from "./ILV2MathMLComponent";

/**
 * Lv2 MathMLコンポーネントの抽象基底クラス
 * 
 * すべてのLv2 MathMLコンポーネントはこのクラスを継承する
 * - MathC要素を内部に保持し、完全な数式構造を提供
 * - 内部コンテンツへのアクセスを提供し、他のLv2コンポーネントの部品として使用可能
 * - ILV2MathMLComponentインターフェースを実装し、自動展開機能を提供
 */
export abstract class LV2MathMLComponentBase implements ILV2MathMLComponent {
    protected _math: MathC;
    protected _content: MathMLContainerBase;
    
    /**
     * コンストラクタ
     * @param display math要素の表示モード（"block" または "inline"）
     */
    constructor(display: "block" | "inline" = "inline") {
        this._math = new MathC({ display });
        // createContent()はサブクラスで呼び出す必要があります
        // ここでは空のMrowCを仮で作成
        this._content = new MrowC();
        this._math.child(this._content);
    }
    
    /**
     * 内部コンテンツのルート要素を生成
     * サブクラスで実装する必要がある
     * @returns 生成されたMathMLコンテナ要素
     */
    protected abstract createContent(): MathMLContainerBase;
    
    /**
     * MathC要素を取得
     * HTML要素に追加する際に使用する（通常は自動呼び出し）
     * @returns Math要素
     */
    public getMath(): MathC {
        return this._math;
    }
    
    /**
     * 内部コンテンツ要素を取得
     * 他のLv2コンポーネントの部品として使う際に使用する（通常は自動呼び出し）
     * @returns 内部コンテンツのルート要素
     */
    public getContent(): MathMLContainerBase {
        return this._content;
    }
    
    /**
     * Math要素の表示モードを変更
     * @param display 表示モード（"block" または "inline"）
     * @returns このインスタンス（メソッドチェーン用）
     */
    public setDisplay(display: "block" | "inline"): this {
        this._math.setDisplay(display);
        return this;
    }
    
    /**
     * Math要素にCSSクラスを追加
     * @param className 追加するクラス名（文字列または配列）
     * @returns このインスタンス（メソッドチェーン用）
     */
    public addClass(className: string | string[]): this {
        this._math.addClass(className);
        return this;
    }
    
    /**
     * Math要素にIDを設定
     * @param id ID文字列
     * @returns このインスタンス（メソッドチェーン用）
     */
    public setId(id: string): this {
        this._math.dom.element.id = id;
        return this;
    }
}

