/**
 * UIComponentBase、LV1UIComponentBase、LV2UIComponentBaseに対応するインターフェース定義
 * 
 * このファイルは、UIコンポーネント階層の公開APIをインターフェースとして提供します。
 */

import { HtmlElementProxy } from "./DomProxy";
import { IBehavior } from "../Behaviors";
import {
    ビューポート座標値,
    ドキュメント座標値,
    オフセット座標値
} from "./css長さ単位";
import { CommonEventType, TypedEventListener } from "./EventTypes";
import { HtmlComponentChild } from "./HtmlComponentBase";

// UIComponentBaseで使用される型定義をインポート

export interface IFChild {
    If: boolean,
    True: HtmlComponentChild,
    False?: HtmlComponentChild
}

export interface IFClass {
    If: boolean,
    True: string | string[],
    False?: string | string[]
}

export interface IFStyle {
    If: boolean,
    True: Partial<CSSStyleDeclaration>,
    False?: Partial<CSSStyleDeclaration>
}

export interface IFBind<T> {
    If: boolean,
    True: (component: T) => void,
    False?: (component: T) => void
}

export interface IFBehavior {
    If: boolean,
    True: IBehavior,
    False?: IBehavior
}

/**
 * UIComponentBaseの公開APIインターフェース
 * すべてのUIコンポーネントが持つべき基本的なメソッドを定義
 * 
 * 注意: このインターフェースは実装クラスUIComponentBaseの実際のシグネチャに合わせています。
 * 一部のメソッドは条件付きオブジェクトを受け取る設計になっています。
 */
export interface IHtmlComponentBase {
    // DOMプロキシアクセス
    readonly dom: HtmlElementProxy;
    
    // 子要素管理
    child(child: HtmlComponentChild | undefined): this;
    childs(...childrenList: ((HtmlComponentChild|undefined)[] | Iterable<HtmlComponentChild|undefined>)[]): this;
    childIf(child: IFChild): this;
    
    // スタイル操作
    setStyleCSS(style: Partial<CSSStyleDeclaration>): this;
    addClass(className: string | string[]): this;
    
    // 条件付きスタイル操作
    setStyleCSSIf(ifStyle: IFStyle): this;
    addClassIf(ifClass: IFClass): this;
    
    // 位置取得
    getViewportPosition(): ビューポート座標値 | null;
    getDocumentPosition(): ドキュメント座標値 | null;
    getOffsetPosition(): オフセット座標値 | null;
    
    // 位置設定
    setViewportPosition(position: ビューポート座標値, options?: { preservePositionProperty?: boolean }): this;
    setDocumentPosition(position: ドキュメント座標値, options?: { preservePositionProperty?: boolean }): this;
    setOffsetPosition(position: オフセット座標値): this;
    
    // 表示制御
    show(): this;
    hide(): this;
    toggleShowHide(): this;
    
    // 条件付き表示制御
    showIf(ifShow: { If: boolean }): this;
    hideIf(ifHide: { If: boolean }): this;
    
    // ユーティリティメソッド
    bind(callback: (self: this) => void): this;
    bindIf(ifBind: IFBind<this>): this;
    
    // ビヘイビア追加
    addBehavior(behavior: IBehavior): this;
    addBehaviorIf(ifBehavior: IFBehavior): this;
    
    // ライフサイクル
    delete(): void;
}

/**
 * LV1UIComponentBaseの公開APIインターフェース
 * 単一のHTML要素をラップするコンポーネントのインターフェース
 * 
 * UIComponentBaseを拡張し、型安全なイベントリスナーを追加
 */
export interface ILV1HtmlComponentBase extends IHtmlComponentBase {
    // 型安全なイベントリスナー追加メソッド
    addTypedEventListener<K extends CommonEventType>(
        type: K,
        listener: TypedEventListener<K>,
        options?: boolean | AddEventListenerOptions
    ): this;
    
    // 各HTML要素タイプに応じた専用メソッドが実装クラスに存在
    // (例: onClick, onInput, onChange, onFocus, onBlur など)
    // これらは実装クラスの具体的な要素タイプに依存するため、
    // インターフェースでは基本的なTypedEventListenerで表現
}

/**
 * LV2UIComponentBaseの公開APIインターフェース
 * 複数のコンポーネントを組み合わせた複合コンポーネントのインターフェース
 * 
 * UIComponentBaseと同じメソッドセットを持つが、
 * 内部的に_componentRootを通じて動作する
 */
export interface ILV2HtmlComponentBase extends IHtmlComponentBase {
    // LV2は内部的に_componentRootを持つが、
    // 公開APIとしてはIUIComponentBaseと同じメソッドセットを提供
    // 追加の公開メソッドは特にない
}

/**
 * 型ガード関数: IUIComponentBaseの実装を確認
 */
export function isIUIComponentBase(obj: any): obj is IHtmlComponentBase {
    return obj !== null &&
           typeof obj === 'object' &&
           'dom' in obj &&
           typeof obj.child === 'function' &&
           typeof obj.childs === 'function' &&
           typeof obj.show === 'function' &&
           typeof obj.hide === 'function';
}

/**
 * 型ガード関数: ILV1UIComponentBaseの実装を確認
 */
export function isILV1UIComponentBase(obj: any): obj is ILV1HtmlComponentBase {
    return isIUIComponentBase(obj) &&
           'addTypedEventListener' in obj &&
           typeof (obj as any).addTypedEventListener === 'function';
}

/**
 * 型ガード関数: ILV2UIComponentBaseの実装を確認
 */
export function isILV2UIComponentBase(obj: any): obj is ILV2HtmlComponentBase {
    return isIUIComponentBase(obj);
}