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

/**
 * 条件付き子要素 — childIf / childIfs に渡す。
 *
 * 重要 (破壊変更 2026-05-15、PokemonBattleAI 由来):
 *   True / False は「子要素を返す関数 (lazy)」必須。
 *
 * # なぜ関数渡しか
 *
 * 旧 API では `True: HtmlComponentChild` (値渡し) だった。しかし JavaScript の
 * オブジェクトリテラル評価仕様により、`{ If: cond, True: 何らかの式 }` を書いた瞬間に
 * `True` 側の式は If の値に関係なく必ず評価される。
 *
 * 「子要素を生成するだけ」の式 (例: span({...})) なら副作用が無いので問題なかったが、
 * **生成中に例外を投げる関数** (例: 引数検証で throw する factory) や **状態変更を伴う式**
 * を True 側に書くと、If=false でも例外が走って UI 全体が落ちる。
 *
 * 実際の事故例 (PokemonBattleAI):
 *   childIfs([
 *     { If: Boolean(列.バッジ一覧), True: ... },
 *     { If: Boolean(!列.バッジ一覧 && 列.サブテキスト),
 *       True: タイプバッジ(列.サブテキスト ?? "", "小") },  // ← 列.サブテキスト=undefined のとき
 *   ])                                                      //    タイプバッジ("") が例外を投げる
 *
 * このバグは 2 段構えで顕在化した:
 *   (1) タイプバッジが「未知タイプを即例外」に変わった (silent fallthrough 禁止の規約準拠)
 *   (2) childIfs の True 側 eager 評価で、If=false でもタイプバッジが呼ばれる
 *
 * (1) は規約上正しい改修。残るのは (2) の API 設計の歪み。関数渡し必須にすれば
 * 条件が真のときだけ式が評価される直感的な挙動に直る。
 *
 * # 既存呼び出しの移行
 *
 * 旧: `{ If: cond, True: span({...}) }`
 * 新: `{ If: cond, True: () => span({...}) }`
 *
 * `True: ` の後ろに `() => ` を機械的に追加する単純な書き換え。
 */
export interface IFChild {
    If: boolean,
    /** 条件が真のときに評価される子要素ファクトリ。undefined を返すと子は追加しない */
    True: () => HtmlComponentChild | undefined,
    /** 条件が偽のときに評価される子要素ファクトリ。省略可。undefined を返すと子は追加しない */
    False?: () => HtmlComponentChild | undefined
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
    setViewportPositionByTransform(position: ビューポート座標値, options?: { preservePositionProperty?: boolean; additionalTransform?: string }): this;
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
    tap(callback: (self: this) => void): this;
    tapIf(ifTap: IFBind<this>): this;
    /** @deprecated tap() を使用してください */
    bind(callback: (self: this) => void): this;
    /** @deprecated tapIf() を使用してください */
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