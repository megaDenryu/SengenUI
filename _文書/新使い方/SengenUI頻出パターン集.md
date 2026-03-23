# SengenUI 頻出パターン集

本ガイドの基本規約（SengenUIガイド.md）を踏まえた上で、実際のアプリケーション開発で頻出するパターンを集約する。各パターンの設計背景や他フレームワークとの比較は `_文書/Q&A/` を参照。

---

## 第1章: 動的リスト管理

アイテムの追加・削除・並び替えが動的に起こるリスト。

### 使いどころ

- チャットメッセージ一覧、タスクリスト、キャンバス上の配置物など
- リストの要素数が動的に変わる全てのUI

### パターン: Map<ID, View>

IDをキーにしてViewの参照をMapで管理する。追加O(1)、削除O(1)、ID指定アクセスO(1)。背景: [なぜ暗黙的な自動管理ではなく明示的な手動管理を選ぶのか](../Q&A/なぜ暗黙的な自動管理ではなく明示的な手動管理を選ぶのか.md)

```typescript
export class タスクリストView extends LV2HtmlComponentBase {
    protected _componentRoot: DivC;
    private readonly _リストコンテナ: DivC;
    private readonly _項目マップ = new Map<タスクID, タスク行View>();

    constructor(private readonly _イベント: Iタスクリストイベント) {
        super();
        this._リストコンテナ = div({ class: styles.リスト });
        this._componentRoot = this.createComponentRoot();
    }

    protected createComponentRoot(): DivC {
        return (
            div({ class: styles.root }).childs([
                headerView({ on追加: () => this._イベント.on追加() }),
                this._リストコンテナ])
        );
    }

    追加する(タスク: タスク): void {
        const 行 = new タスク行View(タスク, {
            on削除: () => this._イベント.on削除(タスク.id),
            on完了: () => this._イベント.on完了(タスク.id),
        });
        this._項目マップ.set(タスク.id, 行);
        this._リストコンテナ.child(行);
    }

    削除する(id: タスクID): void {
        const 行 = this._項目マップ.get(id);
        if (!行) return;
        行.delete();
        this._項目マップ.delete(id);
    }

    並び替える(順序: タスクID[]): void {
        for (const [index, id] of 順序.entries()) {
            const 行 = this._項目マップ.get(id);
            if (行) this._リストコンテナ.moveChildToIndex(行, index);
        }
    }

    全件更新する(タスク一覧: タスク[]): void {
        const 新IDセット = new Set(タスク一覧.map(t => t.id));
        for (const [id, 行] of this._項目マップ) {
            if (!新IDセット.has(id)) {
                行.delete();
                this._項目マップ.delete(id);
            }
        }
        for (const タスク of タスク一覧) {
            const 既存 = this._項目マップ.get(タスク.id);
            if (既存) {
                既存.更新する(タスク);
            } else {
                this.追加する(タスク);
            }
        }
    }
}
```

---

## 第2章: ライフサイクルとクリーンアップ

コンポーネントがDOMから除去されるとき、保持しているリソース（タイマー、WebSocket、購読等）を解放する。

### 使いどころ

- タイマー（`setInterval`）を持つコンポーネント
- WebSocket接続を持つコンポーネント
- モデルセルへの購読を持つOrchestrator
- 子コンポーネントのdisposeを連鎖させる親

### パターン: I破棄可能インターフェース

```typescript
interface I破棄可能 {
    dispose(): void;
}
```

`implements I破棄可能` で型レベルで「disposeが必要」と表明する。呼び出し責任は親（Orchestrator）にある。背景: [なぜ暗黙的な自動管理ではなく明示的な手動管理を選ぶのか](../Q&A/なぜ暗黙的な自動管理ではなく明示的な手動管理を選ぶのか.md)

```typescript
export class リアルタイムチャートView extends LV2HtmlComponentBase implements I破棄可能 {
    protected _componentRoot: DivC;
    private readonly _タイマーID: number;

    constructor(private readonly _データソース: Iデータソース) {
        super();
        this._タイマーID = window.setInterval(() => this._更新する(), 1000);
        this._componentRoot = this.createComponentRoot();
    }

    dispose(): void {
        window.clearInterval(this._タイマーID);
    }
}
```

### 親での呼び出し

```typescript
// コンポーネント差し替え時: dispose → delete → new → child
チャートを切り替える(新データソース: Iデータソース): void {
    this._チャート.dispose();
    this._チャート.delete();
    this._チャート = new リアルタイムチャートView(新データソース);
    this._コンテナ.child(this._チャート);
}

// 自身のdispose: 子のdisposeを連鎖させる
dispose(): void {
    this._チャート.dispose();
}
```

---

## 第3章: 非同期状態（Loading / Success / Error）

APIコールやデータ読み込みの結果に応じてUIを切り替える。

### 使いどころ

- APIレスポンス待ち
- ファイル読み込み
- 保存処理のフィードバック

### パターン: Discriminated Union + data-attribute

```typescript
// 型で状態を厳密に定義。switchのexhaustive checkが効く
type 非同期状態<T> =
    | { readonly kind: "読込中" }
    | { readonly kind: "成功"; readonly データ: T }
    | { readonly kind: "失敗"; readonly エラー: Error };

// data-attribute状態定数
export const 読込状態 = {
    attribute: "data-loading-state",
    value: { 読込中: "loading", 成功: "success", 失敗: "error" }
} as const;
```

```typescript
// style.css.ts — globalStyleで各状態の見た目を定義
export const コンテナcss = style({ position: 'relative' });

globalStyle(`${コンテナcss}[${読込状態.attribute}="${読込状態.value.読込中}"] > .content`, {
    visibility: 'hidden',
});
globalStyle(`${コンテナcss}[${読込状態.attribute}="${読込状態.value.読込中}"] > .spinner`, {
    display: 'block',
});
globalStyle(`${コンテナcss}[${読込状態.attribute}="${読込状態.value.成功}"] > .spinner`, {
    display: 'none',
});
```

```typescript
// View部品: 状態を受け取ってdata-attributeを切り替えるだけ
状態を更新する<T>(状態: 非同期状態<T>, 描画する: (データ: T) => void): void {
    switch (状態.kind) {
        case "読込中":
            this._componentRoot.setAttribute(読込状態.attribute, 読込状態.value.読込中);
            break;
        case "成功":
            this._componentRoot.setAttribute(読込状態.attribute, 読込状態.value.成功);
            描画する(状態.データ);
            break;
        case "失敗":
            this._componentRoot.setAttribute(読込状態.attribute, 読込状態.value.失敗);
            this._エラーメッセージ.setTextContent(状態.エラー.message);
            break;
    }
}
```

---

## 第4章: フォーム管理

### 使いどころ

- 検索フォーム、登録フォーム、設定画面
- バリデーションが必要な入力

### パターン: DOMが真実。値の取得は `getValue()` で済む

```typescript
interface I検索フォームイベント {
    on検索: (クエリ: string) => void;
}

export class 検索フォームView extends LV2HtmlComponentBase {
    protected _componentRoot: DivC;
    private readonly _入力欄: InputC;

    constructor(private readonly _イベント: I検索フォームイベント) {
        super();
        this._入力欄 = input({ type: "text", placeholder: "検索..." });
        this._componentRoot = this.createComponentRoot();
    }

    protected createComponentRoot(): DivC {
        return (
            div({ class: styles.フォーム }).childs([
                this._入力欄
                    .onEnterKey(() => this._検索実行()),
                button({ text: "検索" })
                    .onClick(() => this._検索実行())])
        );
    }

    private _検索実行(): void {
        const 値 = this._入力欄.getValue().trim();
        if (値.length > 0) {
            this._イベント.on検索(値);
        }
    }

    クリアする(): void {
        this._入力欄.setValue("");
    }
}
```

### バリデーション: data-attributeで状態を表現

```typescript
export const 入力エラー状態 = {
    attribute: "data-validation",
    value: { 有効: "valid", 無効: "invalid" }
} as const;

private _バリデーション(): boolean {
    const 値 = this._入力欄.getValue();
    const 有効 = 値.length >= 3;
    this._入力欄.setAttribute(
        入力エラー状態.attribute,
        有効 ? 入力エラー状態.value.有効 : 入力エラー状態.value.無効
    );
    if (!有効) {
        this._エラー表示.setTextContent("3文字以上入力してください");
    }
    return 有効;
}
```

### 複数フィールド: 値オブジェクトとして取得

```typescript
interface Iユーザー登録フォームデータ {
    readonly 名前: string;
    readonly メールアドレス: string;
    readonly パスワード: string;
}

フォームデータを取得する(): Iユーザー登録フォームデータ {
    return {
        名前: this._名前.getValue(),
        メールアドレス: this._メール.getValue(),
        パスワード: this._パスワード.getValue(),
    };
}
```

---

## 第5章: アニメーションとトランジション

data-attribute + CSS transition の組み合わせ。背景: [なぜ暗黙的な自動管理ではなく明示的な手動管理を選ぶのか](../Q&A/なぜ暗黙的な自動管理ではなく明示的な手動管理を選ぶのか.md)

### 使いどころ

- パネルの開閉
- リスト項目の追加・削除
- モーダルの表示・非表示

### パターン: data-attributeを変えるだけでアニメーション

```typescript
// 状態.ts
export const パネル表示状態 = {
    attribute: "data-panel-visibility",
    value: { 表示: "visible", 非表示: "hidden" }
} as const;
```

```typescript
// style.css.ts
export const パネルcss = style({
    transition: 'opacity 0.2s ease, transform 0.2s ease',
});

globalStyle(
    `${パネルcss}[${パネル表示状態.attribute}="${パネル表示状態.value.表示}"]`,
    { opacity: 1, transform: 'translateY(0)' }
);

globalStyle(
    `${パネルcss}[${パネル表示状態.attribute}="${パネル表示状態.value.非表示}"]`,
    { opacity: 0, transform: 'translateY(-8px)', pointerEvents: 'none' }
);
```

```typescript
// 使用側: 属性を変えるだけ
表示する(): void {
    this._パネル.setAttribute(パネル表示状態.attribute, パネル表示状態.value.表示);
}
非表示にする(): void {
    this._パネル.setAttribute(パネル表示状態.attribute, パネル表示状態.value.非表示);
}
```

### 退場アニメーション後にDOM除去

```typescript
退場して除去する(): void {
    this._パネル.setAttribute(パネル表示状態.attribute, パネル表示状態.value.非表示);
    // Why: 即座にdelete()するとアニメーションが見えない
    this._パネル.addTypedEventListener("transitionend", () => {
        this._パネル.delete();
    }, { once: true });
}
```

### リスト項目の登場アニメーション

```typescript
追加する(タスク: タスク): void {
    const 行 = new タスク行View(タスク, this._イベント);
    this._リストコンテナ.child(行);
    // Why: 同一フレーム内で属性を変えてもトランジションが発火しない
    requestAnimationFrame(() => {
        行.setAttribute(項目表示状態.attribute, 項目表示状態.value.表示);
    });
}
```

---

## 第6章: コンポーネントの動的切り替え

同じスロットに状態に応じて異なるコンポーネントを表示する。

### 判断基準

| 基準 | show/hide | 置換 |
|---|---|---|
| 切り替え頻度 | 高い（タブ切り替え等） | 低い（ページ遷移等） |
| 状態保持 | 必要（入力値、スクロール位置） | 不要 |
| メモリ使用 | 両方分 | 片方分 |
| 初期コスト | 両方の構築が必要 | 切り替え時に構築 |

### パターンA: show/hide（状態を保持したいとき）

```typescript
モードを切り替える(モード: "編集" | "プレビュー"): void {
    if (モード === "編集") {
        this._編集パネル.show();
        this._プレビューパネル.hide();
    } else {
        this._編集パネル.hide();
        this._プレビューパネル.show();
    }
}
```

### パターンB: 置換（状態を破棄してよいとき）

```typescript
モードを切り替える(モード: "編集" | "プレビュー"): void {
    if (this._現在のパネル && isI破棄可能(this._現在のパネル)) {
        this._現在のパネル.dispose();
    }
    this._スロット.clearChildren();

    this._現在のパネル = モード === "編集"
        ? new 編集パネルView(this._モデル)
        : new プレビューパネルView(this._モデル);
    this._スロット.child(this._現在のパネル);
}
```

---

## 第7章: 状態管理

状態管理はSengenUI非依存のユーティリティで行う。背景: [宣言的状態管理とは何か](../Q&A/宣言的状態管理とは何か.md) / [SengenUIの周辺ユーティリティ層をどう設計するか](../Q&A/SengenUIの周辺ユーティリティ層をどう設計するか.md)

### ツール選択フロー

```
状態を管理したい
│
├─ 単一の値。変わったら通知したい
│   → モデルセル<T>
│
├─ 別の状態から計算で導出される
│   → 派生セル<T>
│
├─ 状態遷移のパターンが3つ以上ある
│   │
│   ├─ 「不可能な状態」を型で排除したい
│   │   → 状態マシン（Discriminated Union）
│   │
│   └─ 遷移ロジックをテストしたい
│       → Reducer関数
│           └─ 変更通知も必要 → ReducerStore
│
├─ Undo/Redoが必要
│   → コマンドリポジトリ
│
└─ 単純なon/offやフラグ
    → モデルセルで十分
```

### モデルセル — 単一値の保持と変更通知

```typescript
interface I購読解除 {
    解除(): void;
}

class モデルセル<T> {
    private _値: T;
    private readonly _購読者 = new Set<(値: T, 前の値: T) => void>();

    constructor(初期値: T) { this._値 = 初期値; }

    get 値(): T { return this._値; }

    設定する(新しい値: T): void {
        const 前の値 = this._値;
        this._値 = 新しい値;
        for (const fn of this._購読者) fn(新しい値, 前の値);
    }

    購読する(fn: (値: T, 前の値: T) => void): I購読解除 {
        this._購読者.add(fn);
        return { 解除: () => this._購読者.delete(fn) };
    }
}
```

### 派生セル — 他のセルから計算で導出される値

ソースとなるセルを明示的に列挙する。

```typescript
class 派生セル<T> {
    private readonly _内部セル: モデルセル<T>;
    private readonly _購読解除一覧: I購読解除[] = [];

    constructor(
        private readonly _計算する: () => T,
        ソース一覧: モデルセル<unknown>[],
    ) {
        this._内部セル = new モデルセル<T>(this._計算する());
        for (const ソース of ソース一覧) {
            this._購読解除一覧.push(
                ソース.購読する(() => this._内部セル.設定する(this._計算する()))
            );
        }
    }

    get 値(): T { return this._内部セル.値; }
    購読する(fn: (値: T) => void): I購読解除 { return this._内部セル.購読する(fn); }
    dispose(): void { for (const 購読 of this._購読解除一覧) 購読.解除(); }
}
```

使用例:

```typescript
const 商品一覧 = new モデルセル<カート内商品[]>([]);
const 税率 = new モデルセル<number>(0.1);

const 合計金額 = new 派生セル(
    () => 商品一覧.値.reduce((sum, item) => sum + item.価格 * item.数量, 0),
    [商品一覧],
);

const 税込金額 = new 派生セル(
    () => 合計金額.値 * (1 + 税率.値),
    [合計金額, 税率],
);
```

### Reducer — 状態遷移を純粋関数に閉じ込める

```typescript
type カート操作 =
    | { readonly kind: "商品追加"; readonly 商品: 商品 }
    | { readonly kind: "商品削除"; readonly 商品ID: 商品ID }
    | { readonly kind: "数量変更"; readonly 商品ID: 商品ID; readonly 数量: number }
    | { readonly kind: "クリア" };

interface カート状態 {
    readonly 商品一覧: ReadonlyArray<カート内商品>;
    readonly 合計金額: number;
}

// 純粋関数。UIなしでテスト可能
function カートリデューサー(状態: カート状態, 操作: カート操作): カート状態 {
    switch (操作.kind) {
        case "商品追加": {
            const 新一覧 = [...状態.商品一覧, { 商品: 操作.商品, 数量: 1 }];
            return { 商品一覧: 新一覧, 合計金額: 合計を計算する(新一覧) };
        }
        case "商品削除": {
            const 新一覧 = 状態.商品一覧.filter(item => item.商品.id !== 操作.商品ID);
            return { 商品一覧: 新一覧, 合計金額: 合計を計算する(新一覧) };
        }
        case "数量変更": {
            const 新一覧 = 状態.商品一覧.map(item =>
                item.商品.id === 操作.商品ID ? { ...item, 数量: 操作.数量 } : item
            );
            return { 商品一覧: 新一覧, 合計金額: 合計を計算する(新一覧) };
        }
        case "クリア":
            return { 商品一覧: [], 合計金額: 0 };
    }
}
```

### ReducerStore — Reducer + モデルセルの合成

```typescript
class ReducerStore<TState, TAction> {
    private readonly _状態: モデルセル<TState>;

    constructor(
        初期状態: TState,
        private readonly _reducer: (状態: TState, アクション: TAction) => TState,
    ) {
        this._状態 = new モデルセル<TState>(初期状態);
    }

    get 状態(): TState { return this._状態.値; }

    dispatch(アクション: TAction): void {
        this._状態.設定する(this._reducer(this._状態.値, アクション));
    }

    購読する(fn: (状態: TState) => void): I購読解除 {
        return this._状態.購読する(fn);
    }
}
```

### 状態マシン — 不可能な状態を型で排除する

```typescript
type 通信状態<T> =
    | { readonly kind: "待機中" }
    | { readonly kind: "通信中"; readonly 中断する: () => void }
    | { readonly kind: "成功"; readonly データ: T }
    | { readonly kind: "失敗"; readonly エラー: Error; readonly 再試行: () => void };

function 通信を開始する<T>(
    リクエスト: () => Promise<T>,
    on状態変更: (状態: 通信状態<T>) => void,
): void {
    const controller = new AbortController();
    on状態変更({ kind: "通信中", 中断する: () => controller.abort() });

    リクエスト()
        .then(データ => on状態変更({ kind: "成功", データ }))
        .catch(エラー => on状態変更({
            kind: "失敗",
            エラー: エラー instanceof Error ? エラー : new Error(String(エラー)),
            再試行: () => 通信を開始する(リクエスト, on状態変更),
        }));
}
```

---

## 第8章: Model-View配線

状態とViewをOrchestratorが配線する。背景: [ModelとViewの構造的対応をどう設計するか](../Q&A/ModelとViewの構造的対応をどう設計するか.md)

### パターン: 購読を1箇所に集約する

```typescript
export class ポーズ編集Orchestrator extends LV2HtmlComponentBase implements I破棄可能 {
    protected _componentRoot: DivC;
    private readonly _購読一覧: I購読解除[] = [];

    constructor(
        private readonly _状態: ポーズ編集状態,
        private readonly _サービス: ポーズ操作サービス,
    ) {
        super();
        this._componentRoot = this.createComponentRoot();
        this._購読を配線する();
    }

    /** 状態 → View の全購読をここに集約 */
    private _購読を配線する(): void {
        for (const [名前, パーツ] of this._状態.パーツ群) {
            const view = this._パーツViewマップ.get(名前);
            if (!view) continue;

            this._購読一覧.push(
                パーツ.オンオフ.購読する((値) => view.switchBody(値 === "on")),
                パーツ.つまみ.購読する((値) => view.つまみ見た目を変更(値)),
            );
        }

        this._購読一覧.push(
            this._状態.変更あり.購読する((あり) => {
                this._保存ボタン.setAttributeIf({
                    If: あり,
                    True: { attr: "data-has-changes", value: "true" },
                    False: { attr: "data-has-changes", value: "false" },
                });
            }),
        );
    }

    /** View → 状態 のイベント接続はcreateComponentRoot内 */
    protected createComponentRoot(): DivC {
        return (
            div({ class: styles.root }).childs([
                button({ text: "保存" })
                    .bind(btn => { this._保存ボタン = btn; })
                    .onClick(() => this._サービス.ポーズを保存する(this._状態.現在のポーズ名.値)),
                this._パーツ一覧を構築する()])
        );
    }

    private _パーツ一覧を構築する(): DivC {
        const コンテナ = div({ class: styles.パーツ一覧 });
        this._パーツViewマップ = new Map();
        for (const [名前] of this._状態.パーツ群) {
            const view = new パーツスイッチ({
                パーツ差分名: 名前,
                onパーツ切り替え: (n, onOff) => this._サービス.パーツを切り替える(n, onOff),
            });
            this._パーツViewマップ.set(名前, view);
            コンテナ.child(view);
        }
        return コンテナ;
    }

    dispose(): void {
        for (const 購読 of this._購読一覧) 購読.解除();
    }
}
```

### データの流れ

```
ユーザー操作 → View(イベント) → サービス(ロジック) → モデルセル(状態変更)
                                                          │
                                        購読で通知 ←───────┘
                                          │
                                          └→ View(表示更新)
```

- **下り（状態→View）**: モデルセルの購読。`_購読を配線する()` に集約
- **上り（View→状態）**: イベントハンドラ。`createComponentRoot()` 内でサービスのメソッドを呼ぶ

### Model-View対応の形態

| 形態 | 説明 | 配線方法 |
|---|---|---|
| 1:1 | モデル1つにView1つ | モデルセルの購読 |
| N:1 | 複数モデルから1つのViewを構成 | 複数のモデルセルを購読し、同じViewを更新 |
| 1:N | 1つのモデルを複数のViewに反映 | 1つのモデルセルに複数の購読を登録 |
| コレクション | モデル集合 ↔ View集合 | Map<ID, View> + 全件更新パターン（第1章） |

### テスト: 状態とロジックはDOMなしで単体テスト可能

```typescript
const 状態 = new ポーズ編集状態(["頭", "体", "腕"]);
const サービス = new ポーズ操作サービス(状態, mockSender);

サービス.パーツを切り替える("頭", "on");
assert(状態.パーツ群.get("頭")!.オンオフ.値 === "on");
assert(状態.変更あり.値 === true);
```
