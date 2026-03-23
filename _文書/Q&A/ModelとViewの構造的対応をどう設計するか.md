# ModelとViewの構造的対応をどう設計するか

## 疑問

SengenUIはView層のフレームワークであり、状態管理の責務は負わない。しかし実際のアプリケーション開発では、ModelとViewが同じ構造を持つことが多い。

例えばVoiroStudioのキャラクターポーズスイッチでは:

```
Model: ExtendedMap<体フォルダ名, PartInfo2>  ↔  View: パーツアコーディオン[]
Model: PartInfo2.body_part_names             ↔  View: パーツスイッチ[]
Model: BodyUnitVariationState                ↔  View: パーツスイッチの各状態
```

このような構造的対応をどう設計すべきか。Model側にも「SengenModel」のようなフレームワークが必要か。

## 結論: SengenModelをフレームワークにすべきではない

Model-Viewの構造的対応はドメインごとに異なる。パーツスイッチでは1対1だが、他では1対多・多対1・集約・フィルタリングなど多様な対応がありえる。基底クラスで抽象化しようとすると、Reactと同じ轍を踏む — フレームワークがドメインの形を制約する。

しかし「パターン」と「軽量ユーティリティ」には価値がある。

---

## パターン1: 明示的な購読セル（モデルセル）

値が変わったら購読者に通知する、最小の仕組み。Signalに似ているが、**auto-trackingなし**。何に購読しているかがコード上で明示的に見える。

### なぜauto-trackingを採用しないか

SolidJSやSvelte 5のSignalは「computedやeffect内でsignalを読むだけで自動的に依存が追跡される」という仕組み。これは便利だが:

1. **見えない依存関係**: `computed(() => a() + b())` がaとbに依存していることは、関数本体を読まないと分からない。ReactのContextと同根
2. **実行タイミングの暗黙性**: effectがいつ再実行されるかは追跡グラフに依存する。デバッグ困難
3. **条件分岐で依存が動的に変わる**: `computed(() => flag() ? a() : b())` — flagによって依存が変わる。これが暗黙的に処理される

モデルセルは「何に購読しているか」が `購読する()` 呼び出しとして明示される。

### 実装

```typescript
interface I購読解除 {
    解除(): void;
}

class モデルセル<T> {
    private _値: T;
    private readonly _購読者 = new Set<(値: T, 前の値: T) => void>();

    constructor(初期値: T) {
        this._値 = 初期値;
    }

    get 値(): T { return this._値; }

    設定する(新しい値: T): void {
        const 前の値 = this._値;
        this._値 = 新しい値;
        for (const fn of this._購読者) {
            fn(新しい値, 前の値);
        }
    }

    購読する(fn: (値: T, 前の値: T) => void): I購読解除 {
        this._購読者.add(fn);
        return { 解除: () => this._購読者.delete(fn) };
    }
}
```

### 使用例: パーツの状態をViewに反映

```typescript
// Model側
class パーツモデル {
    readonly オンオフ = new モデルセル<OnOff>("off");
    readonly つまみ状態 = new モデルセル<"開" | "無" | "閉">("無");
}

// Orchestrator側で明示的に購読を配線
class パーツ設定Orchestrator extends LV2HtmlComponentBase implements I破棄可能 {
    private readonly _購読一覧: I購読解除[] = [];

    private _配線する(モデル: パーツモデル, view: パーツスイッチ): void {
        this._購読一覧.push(
            モデル.オンオフ.購読する((値) => {
                view.switchBody(値 === "on");
            }),
            モデル.つまみ状態.購読する((値) => {
                view.パチパクぴょこつまみ見た目を変更(値);
            }),
        );
    }

    dispose(): void {
        for (const 購読 of this._購読一覧) {
            購読.解除();
        }
    }
}
```

依存関係が全て `_配線する` メソッドのコード上に明示的に見える。「どのモデルの変更が、どのViewの何を更新するか」がgrep可能。

---

## パターン2: モデルView対応マップ

頻出パターン集 第1章の動的リスト管理（`Map<ID, View>`）を汎化し、Modelの集合 → Viewの集合の1対1マッピングを構造化する。

### 問題

ModelのコレクションとViewのコレクションを手動で同期するコードが散在する:

```typescript
// 現状: 手動同期。追加・削除・更新の3つを毎回手書き
ポーズ切り替え(v体フォルダオンオフ辞書: BodyUnitValue): void {
    for (const [パーツ差分名, パーツ状態] of Object.entries(v体フォルダオンオフ辞書.parts)) {
        const vパーツスイッチ = this._パーツスイッチMap.get(パーツ差分名);
        vパーツスイッチ?.switchBody(パーツ状態.bodyUnitVariationOnOff === "on");
        vパーツスイッチ?.パチパクぴょこつまみ見た目を変更(パーツ状態.OnomatopeiaOpenClose || "無");
    }
}
```

### 構造化

```typescript
/**
 * Model → Viewの1対1マッピングを管理する汎用ユーティリティ。
 * 追加・削除・更新の同期ロジックを一箇所に集約する。
 */
class モデルView対応マップ<TKey, TModel, TView extends HtmlComponentBase> {
    private readonly _マップ = new Map<TKey, { model: TModel; view: TView }>();

    constructor(
        private readonly _コンテナ: DivC,
        private readonly _viewを生成: (model: TModel, key: TKey) => TView,
        private readonly _viewを更新: (view: TView, model: TModel) => void,
    ) {}

    同期する(モデル一覧: Map<TKey, TModel>): void {
        // 削除されたものを除去
        for (const [key, entry] of this._マップ) {
            if (!モデル一覧.has(key)) {
                entry.view.delete();
                this._マップ.delete(key);
            }
        }
        // 追加 or 更新
        for (const [key, model] of モデル一覧) {
            const 既存 = this._マップ.get(key);
            if (既存) {
                this._viewを更新(既存.view, model);
                既存.model = model;
            } else {
                const view = this._viewを生成(model, key);
                this._マップ.set(key, { model, view });
                this._コンテナ.child(view);
            }
        }
    }

    viewを取得(key: TKey): TView | undefined {
        return this._マップ.get(key)?.view;
    }
}
```

### 使用例

```typescript
// パーツアコーディオン内での使用
this._パーツ対応 = new モデルView対応マップ<パーツ差分名, BodyUnitVariationState, パーツスイッチ>(
    this._スイッチコンテナ,
    (state, name) => new パーツスイッチ({
        パーツ差分名: name,
        onパーツ切り替え: (n, onOff) => this._controller.changeBodyPart(this.体フォルダ名, n, onOff),
        onつまみ変更: (n, 状態) => this._controller.オノマトペ開閉状態を設定(this.体フォルダ名, n, 状態),
    }),
    (view, state) => {
        view.switchBody(state.bodyUnitVariationOnOff === "on");
        view.パチパクぴょこつまみ見た目を変更(state.OnomatopeiaOpenClose ?? "無");
    },
);

// ポーズ切り替え時: 1行で済む
ポーズ切り替え(body: BodyUnitValue): void {
    this._パーツ対応.同期する(new Map(Object.entries(body.parts)));
}
```

### これはReactのreconcilerと何が違うか

形は似ているが本質的に異なる:

| 観点 | React reconciler | モデルView対応マップ |
|---|---|---|
| 実行タイミング | 再レンダリング時に暗黙的 | `同期する()` を呼んだ時だけ |
| 同一性判定 | `key` prop（間違えても型エラーにならない） | 型付きMapのキー |
| 生成・更新ロジック | JSXから暗黙的に推定 | `_viewを生成` / `_viewを更新` で明示的に指定 |
| 差分の範囲 | 仮想DOMツリー全体 | このMapのエントリのみ |

---

## パターン3: 構造的対応のアーキテクチャ判断

### Model-View対応の3つの形態

#### 形態A: 1対1の構造的ミラーリング（パーツスイッチの場合）

```
Model: PartInfo2               → View: パーツアコーディオン
  └── BodyUnitVariationState   → View: パーツスイッチ
```

Modelの各ノードにViewのノードが1対1で対応。モデルView対応マップが有効。

#### 形態B: 集約（複数Modelから1つのViewを導出）

```
Model: HumanBodyModel.body_parts_info ─┐
Model: OnomatopoeiaActionSetting ──────┤→ View: サイドバー全体
Model: 全ポーズ辞書 ──────────────────┘
```

複数のModel情報を束ねて1つのViewを構成する。この場合はOrchestratorが「どのModelの変更がViewのどの部分に影響するか」を明示的に配線する。モデルセルが有効。

#### 形態C: 投影（1つのModelから複数のViewを導出）

```
Model: BodyUnitVariationState ──→ View: パーツスイッチ（サイドバー）
                               └→ View: パーツ画像（キャンバス上）
```

同じModelデータが異なるViewに投影される。このパターンではモデルセルの購読が特に有効 — 1つのモデルセルに複数のViewが購読する。

### 判断フロー

1. **Model:View が 1:1** → モデルView対応マップで構造をそのまま写す
2. **Model:View が N:1（集約）** → Orchestratorがモデルセルを複数購読し、1つのViewに配線
3. **Model:View が 1:N（投影）** → 1つのモデルセルに複数のViewが購読
4. **対応が動的に変わる** → Orchestratorが購読の付け替えを明示的に管理

### いずれの場合も共通するルール

- **ModelはViewを知らない。** Modelがimportして良いのはドメイン型だけ。ViewのimportはSengenUIガイド違反
- **ViewはModelの型を知ってよいが、Modelのインスタンスを直接操作しない。** Viewが受け取るのはデータ（値オブジェクト or プリミティブ）とコールバック。Modelのメソッドを直接呼ぶのはOrchestrator/Controllerの責務
- **同期の起点は常に明示的。** auto-trackingによる暗黙的な伝播は使わない

---

## 「SengenModel」ではなく「SengenComponent」は必要か

### 疑問の背景

パーツスイッチの例では:
- `パーツモデル`（Model）
- `パーツスイッチ`（View）
- `パーツ画像コンポーネント`（View）

が同じ `パーツ差分名` 型パラメータで構造化されている。これらを束ねる「パーツComponent」のようなものがあれば、Model/View群をまとめて扱える。

### 結論: 必要ない。代わりにドメイン集約を使う

「SengenComponent」を作ると、UIフレームワークがドメインの形を規定するようになり、本末転倒。代わりに**DDDの集約パターン**で同じことを達成する。

```typescript
/**
 * パーツ集約: あるパーツに関するModel/View群をまとめる
 * SengenUIの基底クラスではなく、純粋なドメインの集約として定義
 */
class パーツ集約 {
    constructor(
        readonly パーツ名: パーツ差分名,
        readonly モデル: パーツモデル,
        readonly スイッチView: パーツスイッチ,
        readonly 画像View: パーツ画像View,
    ) {}
}
```

これはSengenUIとは無関係な、ドメインの構造を反映した純粋なTypeScriptクラス。SengenUIのコンポーネントを**含む**が、SengenUIを**継承しない**。

こうすることで:
- SengenUIは純粋にView層のフレームワークのまま
- ドメインの構造はドメイン層で定義される
- 型パラメータによる構造的対応は、ジェネリクスで自然に表現できる

```typescript
class キャラクターパーツ管理 {
    private readonly _パーツ集約マップ = new Map<パーツ差分名, パーツ集約>();

    ポーズを適用する(ポーズ: PoseInfo): void {
        for (const [名前, 状態] of Object.entries(ポーズ)) {
            const 集約 = this._パーツ集約マップ.get(名前);
            if (!集約) continue;
            // Modelを更新 → モデルセル経由でViewに自動反映
            集約.モデル.オンオフ.設定する(状態.bodyUnitVariationOnOff);
            集約.モデル.つまみ状態.設定する(状態.OnomatopeiaOpenClose ?? "無");
        }
    }
}
```

### 境界線のまとめ

| 層 | 責務 | SengenUI関与 |
|---|---|---|
| **ドメイン集約** | Model/View群の束ね | 関与しない（純粋TS） |
| **モデルセル** | 値の変更通知 | 関与しない（汎用ユーティリティ） |
| **モデルView対応マップ** | 1対1コレクション同期 | View操作に依存する部分のみ |
| **SengenUI** | DOM要素の宣言的構築 | ここだけ |

SengenUIの守備範囲を広げるのではなく、SengenUIの外側にドメインの構造を置く。
