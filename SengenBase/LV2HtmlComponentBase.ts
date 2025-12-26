
import { HtmlElementProxy } from "./DomProxy";
import { HtmlComponentBase } from "./HtmlComponentBase";
import { ILV2HtmlComponentBase } from "./HtmlComponentBaseInterfaces";

/**
 * LV2 UIコンポーネントの基底クラス。
 * 他のLV1またはLV2コンポーネントを組み合わせて構成されることを目的とします。
 */
export abstract class LV2HtmlComponentBase extends HtmlComponentBase implements ILV2HtmlComponentBase {
    /**
     * LV2コンポーネントのルートとなるDomProxyを生成します。
     * 通常、これは内部に持つ主要なLV1コンポーネントのDomProxyであるか、
     * LV2コンポーネント自身がルート要素として機能するLV1コンポーネントを生成してそのDomProxyを返します。
     */
    protected _componentRoot: HtmlComponentBase;
    public override get dom(): HtmlElementProxy {return this._componentRoot.dom;} //フレームワークを実装するために仕方なくpublicになってるだけなので基底クラス以外がdomを直接参照することは禁止。重大な犯罪行為。重大なバグの元。使うやつは頭が悪い。

    constructor() {
        super();
        // LV2コンポーネントの初期化時に、内部の子コンポーネントを構築し、
        // this.appendChild() を使ってDOMに追加する処理をここで行うか、
        // サブクラスのコンストラクタや専用の初期化メソッドで行います。
        // this.buildComponentStructure();
    }

    protected abstract createComponentRoot(...args: any[]): HtmlComponentBase 

    /**
     * LV2コンポーネントの内部構造を構築します。
     * サブクラスはこのメソッドをオーバーライドして、
     * 内部の子コンポーネントをインスタンス化し、appendChildで追加します。
     * createDomProxyが呼ばれた後、かつsuper()の後に実行されるようにコンストラクタで呼び出します。
     */
    // protected abstract buildComponentStructure(): void;

    // LV2コンポーネントに特有の共通メソッドがあればここに追加できます。
    
}