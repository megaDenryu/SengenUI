# SengenUIの周辺ユーティリティ層をどう設計するか

## 疑問

ReactでもJSXはView構築だけで、状態管理（Redux等）やルーティング（React Router）は別ライブラリの責務。SengenUIも同様にView構築だけを担うなら、その周辺のイベント合成、データバインディング、コマンドパターン等はどういう層として設計すべきか。

## Reactエコシステムの構造的問題

```
React Core (rendering)
├── react-router         ← hooks依存
├── redux + react-redux  ← useSelector は hooks依存
├── framer-motion        ← レンダリングサイクル依存
├── react-hook-form      ← hooks依存
└── react-query          ← hooks依存
```

ほぼ全ての「外部」ライブラリがReactの内部モデル（hooks, 再レンダリング）に深く依存している。Reactなしでは存在できない。エコシステム全体がフレームワークに人質に取られている。

SengenUIはこの罠を避けなければならない。

---

## 層の設計

### 4層モデル

```
Layer 0: 標準TypeScript（言語機能のみ）
Layer 1: SengenUI Core（View構築）
Layer 2: DOM Interaction Utilities（DOM依存だがSengenUI非依存）
Layer 3: General TypeScript Utilities（DOM非依存）
Layer 4: Application Architecture（ドメイン固有）
```

### 各層の責務と依存関係

```
Layer 0: TypeScript
  何にも依存しない。言語標準。

Layer 1: SengenUI Core
  依存: DOM API
  責務: DOM要素のラップ、宣言的ツリー構築、型安全イベント登録
  具体: LV1/LV2、糖衣構文、childs/childIf/bind、addTypedEventListener

Layer 2: DOM Interaction Utilities
  依存: DOM API（SengenUIに依存しない）
  責務: 複数のDOM Eventを合成して高レベルの振る舞いに変換
  具体: MouseAbstraction、Behavior System、ジェスチャー認識

Layer 3: General TypeScript Utilities
  依存: なし（純粋TypeScript）
  責務: 状態管理、コマンドパターン、バリデーション等
  具体: ReactiveProperty/モデルセル、コマンドリポジトリ、バリデーションルール

Layer 4: Application Architecture
  依存: Layer 1-3 の必要なもの
  責務: ドメインロジック、Model-View配線
  具体: Orchestrator、Service、ドメイン集約
```

### 重要な原則: 上位は下位に依存してよいが、逆は禁止

- Layer 3（モデルセル）はLayer 1（SengenUI）に依存してはならない
- Layer 2（Behavior）はLayer 1のコンポーネント型を受け取れるが、内部実装に依存しない
- Layer 4（アプリ）だけが全層を束ねる

### Reactとの決定的な違い

Reactでは:
- `useSelector()`（状態管理）がReactのhooksに依存
- `useRouter()`（ルーティング）がReactのhooksに依存
- `useAnimation()`（アニメーション）がReactのレンダリングサイクルに依存

SengenUIでは:
- `モデルセル`（状態管理）はSengenUIに依存しない
- `コマンドリポジトリ`（Undo/Redo）はSengenUIに依存しない
- `DragHandlingBehavior`（ドラッグ）はDOM APIに依存するがSengenUIの内部実装に依存しない

つまりSengenUIが消えても、周辺ユーティリティは生き残れる。フレームワークに人質を取られない。

---

## イベントの宣言的な書き方

### 現状: 3つのレベルが既に存在する

**レベル1: 単純なDOMイベント（SengenUI Core）**

```typescript
button({ text: "送信" }).onClick(() => this._送信する())
input({ type: "text" }).onEnterKey(() => this._検索する())
```

これは既に宣言的。問題なし。

**レベル2: 複合ジェスチャー（Behavior System）**

```typescript
// ドラッグ・リサイズ等の複合操作をBehaviorとして合成
div({ class: styles.配置物 })
    .addBehavior(new DragHandlingBehavior({
        onDragStart: () => this._ドラッグ開始(),
        onDrag: (delta) => this._移動する(delta),
        onDragEnd: () => this._位置を確定する(),
    }))
    .addBehavior(new ResizeHandlingBehavior({
        方向: "右下",
        onResize: (size) => this._サイズ変更(size),
    }))
```

Behaviorパターンは既に宣言的。`addBehavior()` でメソッドチェーンに組み込める。CompositeBehaviorで複数のBehaviorをまとめて管理できる。

**レベル3: ジェスチャー認識（MouseAbstraction）**

```typescript
// MouseWife: ドラッグ操作の協調パターン
// 複数のオブジェクトがドラッグに連動する場合のコーディネータ
const wife = new MouseWife(this._要素);
wife.ドラッグに連動する(this._配置物A);
wife.ドラッグに連動する(this._配置物B);
```

### 改善の余地: 足りないパターン

**デバウンス/スロットル**

現状は手書き。ユーティリティ化する価値がある:

```typescript
// Layer 2: DOM Interaction Utility（SengenUI非依存）
class デバウンスイベント {
    private _timer: number | null = null;

    constructor(
        private readonly _待機ms: number,
        private readonly _コールバック: () => void,
    ) {}

    発火する(): void {
        if (this._timer !== null) clearTimeout(this._timer);
        this._timer = window.setTimeout(() => {
            this._timer = null;
            this._コールバック();
        }, this._待機ms);
    }

    キャンセルする(): void {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }
}

// 使用例: SengenUIコンポーネントに適用
const 検索デバウンス = new デバウンスイベント(300, () => this._検索する());
this._入力欄.addTypedEventListener("input", () => 検索デバウンス.発火する());
```

注目: `デバウンスイベント` 自体はDOMにすら依存しない（`setTimeout` だけ）。Layer 3に置ける。SengenUIのメソッドに組み込む必要がない。

**ロングプレス**

```typescript
// Layer 2: DOM Interaction Utility
class ロングプレス検知 implements I破棄可能 {
    private _timer: number | null = null;

    constructor(
        private readonly _要素: HTMLElement,
        private readonly _待機ms: number,
        private readonly _onロングプレス: (event: PointerEvent) => void,
    ) {
        this._要素.addEventListener("pointerdown", this._開始);
        this._要素.addEventListener("pointerup", this._キャンセル);
        this._要素.addEventListener("pointerleave", this._キャンセル);
    }

    private _開始 = (e: PointerEvent): void => {
        this._timer = window.setTimeout(() => this._onロングプレス(e), this._待機ms);
    };

    private _キャンセル = (): void => {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    };

    dispose(): void {
        this._キャンセル();
        this._要素.removeEventListener("pointerdown", this._開始);
        this._要素.removeEventListener("pointerup", this._キャンセル);
        this._要素.removeEventListener("pointerleave", this._キャンセル);
    }
}
```

注目: `ロングプレス検知` はDOM APIに依存するがSengenUIに依存しない。`HTMLElement` を受け取るのでSengenUI以外のコンテキストでも使える。

### イベントユーティリティをSengenUIに組み込むべきか？

**組み込まない**方が良い理由:

1. SengenUI CoreのAPI表面が膨張する
2. デバウンスやロングプレスの「正しい」パラメータはドメインによって異なる
3. Layer 2/3に置けばSengenUIのバージョンに依存しない

ただしSengenUIの `addBehavior()` メソッドは残す価値がある。これはBehaviorをアタッチする「接続口」であり、Behavior自体の実装をSengenUIに持ち込まない。

---

## データバインディング

### SengenUIはバインディングフレームワークを提供すべきか

**提供すべきでない。** バインディングの複雑さはドメインごとに異なるため。

ただし、SengenUI自体が既に提供している `bind()` メソッドは「参照取得のためのバインディング」であり、これはView構築の一部として正当。

データバインディング（Model → View同期）は前のQ&A（ModelとViewの構造的対応）で述べた `モデルセル` と `モデルView対応マップ` がLayer 3のユーティリティとして担う。

### 他フレームワークのバインディングの問題

**Angular: 双方向バインディング `[(ngModel)]`**

```html
<input [(ngModel)]="userName">
```

便利だが「どこでuserNameが変わったか」の追跡が困難。双方向バインディングはデータフローの方向を曖昧にする。

**Svelte: `bind:value`**

```svelte
<input bind:value={name}>
```

Angularと同じ問題。さらにコンパイラが暗黙的にsetter注入する。

**SengenUIのアプローチ: 明示的な単方向フロー**

```typescript
// Model → View: 明示的な購読
モデル.名前.購読する((新しい名前) => {
    this._名前表示.setTextContent(新しい名前);
});

// View → Model: 明示的なイベントハンドラ
this._名前入力.onEnterKey(() => {
    モデル.名前.設定する(this._名前入力.getValue());
});
```

双方向バインディングに見えるが、2つの単方向フローが**別々のコード行として明示されている**。データの流れがコード上で追跡可能。

---

## 現在のコードベースでの各ユーティリティの層分類

| ユーティリティ | 現在の場所 | あるべき層 | SengenUI依存 |
|---|---|---|---|
| EventTypes | `SengenUI/SengenBase/` | Layer 1（Core） | Core自体 |
| `addTypedEventListener` | `SengenUI/SengenBase/` | Layer 1（Core） | Core自体 |
| `bind()` | `SengenUI/SengenBase/` | Layer 1（Core） | Core自体 |
| Behavior System | `SengenUI/Behaviors/` | Layer 2（DOM Interaction） | 受け取るがなくても動く |
| MouseAbstraction | `SengenUI/MouseAbstraction/` | Layer 2（DOM Interaction） | 依存しない |
| ReactiveProperty | `TypeScriptBenriKakuchou/` | Layer 3（General TS） | 依存しない |
| コマンドリポジトリ | `BoomYack/キャンバス操作/` | Layer 3（General TS） | 依存しない |
| DragHandler | `BoomYack/配置物/` | Layer 4（Application） | Layer 2を使用 |
| Orchestrator | 各コンポーネント | Layer 4（Application） | Layer 1を使用 |

### 注目すべき点

MouseAbstractionとBehavior Systemは現在 `SengenUI/` パッケージ内にあるが、実際にはSengenUIの内部実装に依存していない。**Layer 2として分離可能**。分離するかどうかは運用判断だが、概念的にはSengenUI Coreとは別物として認識すべき。

---

## まとめ: 層の判断基準

新しいユーティリティを作るとき:

1. **DOMに依存するか？**
   - No → Layer 3（General TS Utility）
   - Yes → 次の質問へ

2. **SengenUIのコンポーネント型に依存するか？**
   - No → Layer 2（DOM Interaction Utility）
   - Yes → 次の質問へ

3. **SengenUIの内部実装（_componentRoot, createComponentRoot等）に依存するか？**
   - No → Layer 2（SengenUIの公開型のみ使用）
   - Yes → Layer 1に取り込む提案をSengenUI開発者に出す

4. **ドメイン固有のロジックを含むか？**
   - Yes → Layer 4（Application）
   - No → Layer 2 or 3

### 原則

SengenUIのCoreは小さく保つ。周辺ユーティリティはSengenUIに依存しないように設計する。こうすることで:
- 各ユーティリティが独立してテスト可能
- SengenUIのバージョンアップに振り回されない
- 別プロジェクトへの転用が容易
- Reactエコシステムのような「フレームワーク人質」問題を回避
