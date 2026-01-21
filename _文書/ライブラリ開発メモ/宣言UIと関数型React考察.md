# 宣言UIと関数型Reactの考察

## 目的
この文書は「なぜReactは関数型プログラミングへ移行したのか」「どのように移行したのか」「実装上の注意点」を整理し、SengenUIの宣言的コンポーネント設計や状態管理にどう応用できるかを示します。SengenUIの既存方針（LV1/LV2コンポーネント、TypeSafeイベント、vanilla-extractスタイル）に沿った実践的な提案を含みます。

## 1) Reactが関数型へ移行した「なぜ」
- 再現性と予測可能性: 関数コンポーネントは入力（props, state）から出力（UI）を返す純粋関数に近い形にでき、テストしやすく副作用を分離しやすい。
- ロジックの再利用性: Hooksにより状態管理や副作用ロジックを関数として抽出・再利用できるようになった。
- パフォーマンス/レンダリング制御: 仮想DOMとFiberアーキテクチャにより、レンダリングのスケジューリングや中断が現実的になり、純粋関数的レンダリングと相性が良い。
- APIの単純化: クラスライフサイクルが分散していたのに対し、Hooksはライフサイクルをフック化して副作用管理を統一した。

## 2) Reactは「どうやって」関数型にシフトしたか
- 関数コンポーネントの導入（JSX関数としてUIを返す）
- Hooksの導入（useState, useEffect, useMemo, useCallback など）により、状態・副作用・メモ化を関数スコープで扱えるようにした
- Fiber（再レンダリングのスケジューリング）と仮想DOMで、レンダリングを純粋関数として扱う利点を最大化

## 3) 実装上の注意点（関数型的UIを作るときに気を付けること）
- レンダー中の副作用を避ける: 描画関数は副作用を起こさない設計にし、副作用は専用フック/ライフサイクルで行う。
- クロージャの扱い: 古い状態を閉じ込める「stale closure」に注意。依存配列や明示的な参照（Ref）管理を行う。
- メモ化の乱用に注意: `useMemo`/`useCallback`相当の乱用は複雑化の元。まずはシンプルに、ボトルネックで最適化する。
- 参照等価性と再レンダリング: オブジェクト/配列を直接渡すと参照変化で再描画が増える。必要なら不変更新や浅い等価比較を採る。
- リソースの明示的解放: 購読やタイマーなどは必ずクリーンアップを提供する。

## 4) SengenUIで「関数型的」に振る舞うには（方針）
SengenUIは既に宣言的・メソッドチェーン型のコンポーネントAPIを持っています。ここではその枠組みのまま関数型の利点を取り込む方針を示します。

- 不変（readonly）的なプロップス設計
  - コンポーネントに渡す設定（seed / props）は不変オブジェクトにしてコピーや再生成を最小化する。
  - `readonly`型で表現し、更新は新しいオブジェクトを返す（関数的更新）。

- 副作用とライフサイクルの明確化
  - `LV2HtmlComponentBase`に小さなライフサイクルインターフェースを追加して副作用登録（onMount/onUnmount/onUpdate）を宣言的に行えるようにする。
  - 副作用は専用のBehaviorクラス（Behaviors/）に委譲し、コンポーネント本体は宣言的構造のみを保持する。

- 可変状態は内部に閉じる
  - 表示に必要なローカルなミュータブル状態はコンポーネント内部でカプセル化し、外部には公開しない。
  - 外部状態は明示的なStore経由で扱う（後述）。

- 表現を純粋関数に近づける
  - コンポーネント作成を「宣言的ビルダー（builder）」として扱い、同じseedで常に同じコンポーネント構成を返すことを心掛ける。

## 5) 状態管理（Reactのライブラリ相当） — SengenUIでの選択肢
Reactの主要な状態管理の選択肢（簡潔に）：
- Context + useReducer（小〜中規模）
- Redux: イミュータブルなreducer + デバッグ性（時刻旅行）
- Zustand: 軽量、セレクティブ購読、ミュータブルだけど使いやすい
- Recoil: セレクタ/依存グラフ型の派生状態

SengenUIへの実装提案（現実的で最小構成）:

1) コア要件
 - 型安全であること（TypeScript）
 - セレクタによる部分購読（不要再描画を避ける）
 - イミュータブル更新か、または明示的ミュータブルだが差分通知を提供
 - コンポーネントからは「購読（subscribe）」だけで状態変化を受け取れる

2) 推奨アーキテクチャ（段階的導入）
 - Stage A — 小さなObservable Store
   - API: `createStore<T>(initial:T)` -> `{ get, set, subscribe, select }`
   - `select(selector)` は内部で前回値と浅比較を行い、変化時のみコールバック発火
   - 実装はシンプルなPub/Subか、軽量なRxJSラッパーで良い

 - Stage B — Reducer/Action を追加
   - 大規模化したら `dispatch(action)` と `reducer` を導入して更新を直列化・ログ可能にする（Redux風）

 - Stage C — セレクタ/メモ化とデバッグ
   - セレクタのメモ化、ミドルウェア（ロギング、履歴、タイムトラベル）を追加

3) SengenUIへの組込み方法
 - `LV2HtmlComponentBase` の `bind` / `onDelete` フックで `store.subscribe` を登録/解除する
 - 変化通知はAction的データで行い、TypeSafeEventと統合してUI以外の部分にも伝搬させる
 - UI更新はなるべく `setStyleCSS()` や既存のメソッドチェーンAPIで行う（直接DOM操作は禁止）

### シンプルなStore API（擬似TypeScript）
```ts
export type Unsubscribe = () => void;
export function createStore<T>(initial: T) {
  let state = initial;
  const subs = new Set<(s:T)=>void>();
  return {
    get: () => state as T,
    set: (updater: (s:T)=>T) => { state = updater(state); subs.forEach(fn=>fn(state)); },
    subscribe: (fn:(s:T)=>void):Unsubscribe => { subs.add(fn); return ()=>subs.delete(fn); },
    select: <R>(selector:(s:T)=>R, cb:(r:R)=>void)=>{
      let prev = selector(state);
      const sub = (s:T)=>{ const v=selector(s); if (v!==prev) { prev=v; cb(v); } };
      subs.add(sub);
      return ()=>subs.delete(sub);
    }
  }
}
```

このAPIはまずはStage A向けのもので、SengenUIの型安全イベント系と相性が良いです。

## 6) イベント管理（宣言的に扱うための設計指針）
- 型安全イベントの中心化: SengenUIに既にある `EventTypes.ts` や `TypeSafeEvent` の方針を拡張して、UIイベントとアプリイベントを同じ型システムで扱う。
- イベントはデータ（Action）として扱う: イベントを「オブジェクト（type + payload）」として扱うと、ログ・リプレイ・検証が容易になる。
- 宣言的結合: コンポーネントは `onX: (payload)=>void` のようなコールバック注入ではなく、`bindToStore` / `bindToAction` のような宣言的接続を使って購読を行う。
- メモリ管理: `bind` / `bindToStore` を使う場合は `delete()` や `onUnmount` で必ず購読解除を行う。

## 7) 具体的なSengenUI導入ステップ（実務プラン）
1. `createStore` の最小実装を `SengenBase` 配下に追加（Stage A）
2. `LV2HtmlComponentBase` に `onMount/onUnmount/onUpdate` ライフサイクルフックを追加
3. TypeSafe Event と Store の結合サンプルを1〜2個作る（パネルの開閉、テーマ切替など）
4. 必要に応じて Reducer/Dispatch 層（Stage B）へ移行

## 最後に（まとめ）
関数型の思想は「副作用の分離」「不変性」「小さく純粋な再利用可能な部品」を通じて、UIをより予測可能で保守しやすくします。SengenUIは既に宣言的ビルダーと型安全なイベント基盤を持っているため、上記の小さな拡張（ストア、ライフサイクルフック、Behaviorへの責務移譲）を行うだけで、React的な関数型のメリットを享受できます。

## 8) 具体的なコード例 — SengenUIコンポーネントとの統合
以下はSengenUIのスタイルに沿った、実践的な統合例です。まずは最小の `createStore` を使ったパターン（Stage A）を想定します。

### 8.1 createStore の利用例（store.ts）
```ts
// SengenBase/store.ts (例)
export type Unsubscribe = () => void;
export function createStore<T>(initial: T) {
  let state = initial;
  const subs = new Set<(s:T)=>void>();
  return {
    get: () => state as T,
    set: (updater: (s:T)=>T) => { state = updater(state); subs.forEach(fn=>fn(state)); },
    subscribe: (fn:(s:T)=>void):Unsubscribe => { subs.add(fn); return ()=>subs.delete(fn); },
    select: <R>(selector:(s:T)=>R, cb:(r:R)=>void)=>{
      let prev = selector(state);
      const sub = (s:T)=>{ const v=selector(s); if (v!==prev) { prev=v; cb(v); } };
      subs.add(sub);
      return ()=>subs.delete(sub);
    }
  }
}
```

### 8.2 カウンターコンポーネントの例
```ts
// stores/counter.ts
import { createStore } from './SengenBase/store';
export const counterStore = createStore({ count: 0 });
export const increment = () => counterStore.set(s => ({ ...s, count: s.count + 1 }));
export const decrement = () => counterStore.set(s => ({ ...s, count: s.count - 1 }));

// components/CounterPanel.ts
import { LV2HtmlComponentBase } from '../SengenBase/LV2HtmlComponentBase';
import { DivC, SpanC, ButtonC } from '../LV1UIComponents';
import { counterStore, increment, decrement } from '../stores/counter';

export class CounterPanel extends LV2HtmlComponentBase {
  private _label!: SpanC;
  private _unsubscribe?: () => void;

  constructor() {
    super();
    this._componentRoot = this.createComponentRoot();
    // 購読はコンストラクタ直後か mount フックで行う
    this._unsubscribe = counterStore.select(s => s.count, (c) => {
      // 型安全なUI更新
      this._label.setText(String(c));
    });
  }

  protected createComponentRoot() {
    return new DivC({ class: [] }).childs([
      new SpanC({ text: '0' }).bind(s => { this._label = s; }),
      new ButtonC({ text: '+' }).addDivEventListener('click', () => increment()),
      new ButtonC({ text: '-' }).addDivEventListener('click', () => decrement()),
    ]);
  }

  public delete(): void {
    // 購読解除を忘れない
    this._unsubscribe?.();
    super.delete();
  }
}
```

説明: `select` により `count` の変化だけを監視しているため、state 内の他のプロパティが変わってもこのコンポーネントは更新されません（不要再描画の抑制）。

### 8.3 部分購読で複数コンポーネントを効率的に更新する例
```ts
// stores/todo.ts
export const todoStore = createStore({ items: [] as string[] });
export const addTodo = (text:string) => todoStore.set(s => ({ ...s, items: [...s.items, text] }));

// components/TodoCount.ts
export class TodoCount extends LV2HtmlComponentBase {
  private _label!: SpanC;
  private _unsub?: () => void;
  constructor() { super(); this._componentRoot = this.createComponentRoot();
    this._unsub = todoStore.select(s => s.items.length, (len)=>{ this._label.setText(String(len)); });
  }
  protected createComponentRoot(){ return new DivC({}).childs([ new SpanC({text:'0'}).bind(s=>this._label=s) ]); }
  public delete(){ this._unsub?.(); super.delete(); }
}
```

### 8.4 Reducer/Action パターンへ移行する（Stage B の入り口）
小規模の関数 `set` を `dispatch(action)` + `reducer` に置き換えることで、更新の直列化・ログ・undo 実装が容易になります。SengenUIでは TypeSafeEvent と統合して action を流すと追跡しやすくなります。

### 8.5 ライフサイクルの扱い（onMount/onUnmount の提案）
- 現状：コンストラクタで `subscribe`、`delete()` で解除するパターンが主流
- 提案：`LV2HtmlComponentBase` に `onMount()` / `onUnmount()` を追加すると、購読登録や外部リソースの確実なクリーンアップが宣言的に書けます。

例:
```ts
protected onMount(): void {
  this._unsubscribe = counterStore.select(s=>s.count, c => this._label.setText(String(c)));
}

protected onUnmount(): void {
  this._unsubscribe?.();
}
```

## 9) 実践上の注意（短く）
- store の初期化場所（アプリ入口かモジュール単位か）を設計しておく。
- selector は副作用を持たない純粋関数にする。
- コンポーネントは可能な限り UI 表現のみに専念し、データ操作は store や Behavior に委譲する。

以上の具体例により、SengenUI コンポーネントと状態管理の結合イメージが得られるはずです。必要なら `SengenBase` 配下に `store.ts` を作成し、実際の移植作業を進めます。

