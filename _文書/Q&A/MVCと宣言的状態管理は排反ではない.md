# MVCと宣言的状態管理は排反ではない

## 疑問

Reactコミュニティでは「MVCは古い、宣言的状態管理が正しい」という主張がある。しかしこれらは排反なものに見えない。単にオブジェクト指向か関数型かというパラダイムの違いであり、使いどころが異なるだけではないか。

## 結論: 排反ではない。直交する2つの軸

MVCと宣言的状態管理は**異なる問題を解いている**。

- **MVC**: 「責務をどう分離するか」— コードの構造の問題
- **宣言的状態管理**: 「状態遷移をどう記述するか」— 状態の表現方法の問題

MVCのModel内部でReducerを使うことは普通にできる。Controllerがdispatchを呼び、Modelがreduceし、Viewが結果を表示する。何の矛盾もない。

```
MVC = 責務分離のアーキテクチャパターン
宣言的状態管理 = 状態遷移の記述スタイル

→ 異なる軸。組み合わせ可能
```

## 「MVCをやめた」のではなく「名前を変えた」

Reactの典型的なアーキテクチャ:

```
Container Component (= Controller)
├── useState / useReducer (= Model)
└── JSX return (= View)
```

これはMVCそのもの。全てが1つの関数に押し込まれているだけで、責務としてはModel（状態）、View（JSX）、Controller（イベントハンドラ）が存在する。

Reduxを使う場合:

```
Action → Reducer → Store (= Model)
Component の dispatch (= Controller)
Component の JSX (= View)
```

これもMVCの変種。Reducerが純粋関数であること（宣言的状態管理）と、責務がModel/View/Controllerに分かれていること（MVC）は両立している。

Reactが「MVCをやめた」と主張したのは、**MVCという構造を否定したのではなく、「テンプレートとコードを分離するファイル単位のMVC」を否定した**にすぎない。Angular 1.jsのようにHTML/JS/CSSを別ファイルに分けるスタイルへのアンチテーゼであって、責務分離の概念自体を否定したわけではない。

## 実際の軸は4つある

UIアプリケーション設計で選択すべき軸を整理する:

### 軸1: 責務分離パターン（構造の問題）

| パターン | Model | View | 配線 |
|---|---|---|---|
| MVC | データ + ロジック | 表示 | Controller |
| MVVM | データ + ロジック | 表示 + バインディング | ViewModel |
| Flux/Redux | Store + Reducer | Component | dispatch |
| SengenUI方式 | 状態クラス + サービス | View関数 + View部品 | Orchestrator |

どれも「状態」「表示」「その間を繋ぐもの」が存在する。名前が違うだけ。

### 軸2: 状態遷移の記述スタイル（状態の問題）

| スタイル | やること |
|---|---|
| 命令的 | `this.count += 1; this.updateView();` |
| Reducer | `(state, action) => newState` |
| 状態マシン | 有効な遷移を型で制約 |
| リアクティブ | Signal/Observable で自動伝播 |

これは軸1とは独立。MVCのModelにReducerを使ってもよいし、Flux StoreにObservableを使ってもよい。

### 軸3: View更新の方式（描画の問題）

| 方式 | やること |
|---|---|
| 再レンダリング | 状態変更 → View全体を再構築 → diff → 差分適用 |
| 明示的更新 | 状態変更 → 特定のViewメソッドを呼ぶ |
| リアクティブバインディング | 状態変更 → 購読しているViewが自動更新 |

SengenUIでは「明示的更新」と「リアクティブバインディング（モデルセル購読）」を組み合わせる。

### 軸4: オブジェクト指向 vs 関数型（パラダイムの問題）

| パラダイム | 状態の扱い | 適しているもの |
|---|---|---|
| OOP | オブジェクトが状態を持ち、メソッドで変更する | 長寿命のオブジェクト、複雑な内部状態、ライフサイクル管理 |
| FP | 状態を持たず、入力→出力の変換 | 状態遷移ロジック、データ変換、View構築 |

これも排反ではない。**同じアプリケーション内で両方使う**のが自然:
- View構築（純粋関数）→ FP
- Orchestrator（状態保持 + イベント配線）→ OOP
- Reducer（状態遷移ロジック）→ FP
- サービス（副作用 + ビジネスロジック）→ OOP

---

## ケーススタディ: いつ何を組み合わせるか

### ケース1: 単純なフォーム画面

**責務分離**: Orchestrator + View関数で十分。サービスは不要。
**状態遷移**: モデルセルで各フィールドの値を保持。Reducerは過剰。
**View更新**: イベントハンドラでモデルセルを更新 → 購読でViewに反映。
**パラダイム**: View関数はFP、OrchestratorはOOP。

```typescript
// Model（モデルセル）
class 検索フォーム状態 {
    readonly クエリ = new モデルセル<string>("");
    readonly 結果 = new モデルセル<非同期状態<検索結果[]>>({ kind: "待機中" });
}

// View（純粋関数 = FP）
function 検索結果View(コンテナ: DivC) { ... }

// Orchestrator（OOP: 状態とViewを配線）
class 検索画面Orchestrator extends LV2HtmlComponentBase {
    constructor(private _状態: 検索フォーム状態) { ... }
}
```

### ケース2: キャンバスエディタ（配置物の追加・移動・削除・Undo）

**責務分離**: Orchestrator + サービス + コマンドリポジトリ。ロジックはサービスに抽出。
**状態遷移**: コマンドパターン（Undo/Redo）。配置物の追加・移動・削除はコマンドとして表現。
**View更新**: Orchestratorが配置物のMap<ID, View>を管理。コマンド実行後に明示的更新。
**パラダイム**: コマンドの execute/undo はFP的（純粋な状態遷移）、配置物ViewはOOP。

```typescript
// Command（FP的: 実行と逆実行を純粋に定義）
class 配置物追加コマンド implements Iコマンド {
    execute(): void { this._モデル.追加する(this._配置物); }
    undo(): void { this._モデル.削除する(this._配置物.id); }
}

// Service（OOP: コマンドの発行とリポジトリ管理）
class キャンバス操作サービス {
    追加する(配置物: 配置物データ): void {
        const cmd = new 配置物追加コマンド(this._モデル, 配置物);
        this._コマンドリポジトリ.実行する(cmd);
    }
}

// Orchestrator（OOP: Map<ID, View>で配置物を管理）
class キャンバスOrchestrator extends LV2HtmlComponentBase { ... }
```

### ケース3: リアルタイムチャット

**責務分離**: Orchestrator + メッセージストア + WebSocketサービス。
**状態遷移**: ReducerStore。メッセージの追加・既読・削除をアクションとして定義。
**View更新**: ReducerStoreの購読 → メッセージリストの差分更新（Map<ID, View>）。
**パラダイム**: Reducer（FP）、WebSocketサービス（OOP: 接続状態を管理）。

```typescript
// 状態遷移（FP: Reducer）
type チャットアクション =
    | { kind: "メッセージ受信"; メッセージ: メッセージ }
    | { kind: "既読"; メッセージID: メッセージID }
    | { kind: "削除"; メッセージID: メッセージID };

function チャットリデューサー(状態: チャット状態, アクション: チャットアクション): チャット状態 { ... }

// Store（ReducerStore: Reducer + モデルセル）
const store = new ReducerStore(初期状態, チャットリデューサー);

// サービス（OOP: WebSocket接続を管理）
class チャットWebSocketサービス implements I破棄可能 {
    constructor(private _store: ReducerStore<チャット状態, チャットアクション>) {
        this._ws = new WebSocket(url);
        this._ws.onmessage = (e) => {
            this._store.dispatch({ kind: "メッセージ受信", メッセージ: JSON.parse(e.data) });
        };
    }
    dispose(): void { this._ws.close(); }
}
```

### ケース4: 設定画面（階層的な設定項目のツリー）

**責務分離**: MVC的。設定モデル（ツリー構造）+ 設定View（ツリー表示）+ Controller（保存操作）。
**状態遷移**: 命令的で十分。`設定.値を変更する("テーマ", "ダーク")` のような単純な操作。Reducerは過剰。
**View更新**: モデルセル購読。設定値が変わったらViewに反映。
**パラダイム**: モデルはOOP（ツリー構造を表現）、View関数はFP。

```typescript
// Model（OOP: ツリー構造 + バリデーション）
class 設定ノード {
    readonly 値 = new モデルセル<設定値>(this._デフォルト);
    readonly 子ノード: ReadonlyMap<string, 設定ノード>;

    値を変更する(新しい値: 設定値): void {
        if (this._バリデーション(新しい値)) {
            this.値.設定する(新しい値);
        }
    }
}
```

### ケース5: ポーズスイッチ（Model-Viewが1:1で構造的に対応）

**責務分離**: 集約パターン。パーツモデル + パーツスイッチView + パーツ画像Viewを束ねる。
**状態遷移**: モデルセル。パーツのon/off、つまみ状態が変わったら通知。
**View更新**: モデルセルの購読。構造的対応はMap<パーツ名, 集約>で管理。
**パラダイム**: OOP（集約クラス）。

```typescript
// 集約: Model/View群を束ねる（純粋TSクラス、SengenUI非依存）
class パーツ集約 {
    constructor(
        readonly パーツ名: パーツ差分名,
        readonly モデル: パーツ状態,
        readonly スイッチView: パーツスイッチ,
        readonly 画像View: パーツ画像View,
    ) {}
}
```

---

## 判断フロー

```
UIを設計する
│
├─ 責務分離（軸1）
│   └─ 常にOrchestratorパターン（SengenUIガイド 第4条）を基本とする
│      └─ ロジックが肥大化したらサービスに抽出
│
├─ 状態遷移（軸2）
│   ├─ 単純な値の変更 → モデルセル + 命令的更新
│   ├─ 遷移パターンが複数 + テストしたい → Reducer
│   ├─ 不可能な状態を排除したい → 状態マシン（DU）
│   └─ Undo/Redo → コマンドパターン
│
├─ View更新（軸3）
│   ├─ 状態変更が少ない → 明示的メソッド呼び出し
│   └─ 複数箇所が同じ状態に反応する → モデルセル購読
│
└─ パラダイム（軸4）
    ├─ 状態遷移ロジック、View構築、データ変換 → FP（純粋関数）
    └─ ライフサイクル管理、イベント配線、外部リソース管理 → OOP（クラス）
```

## なぜReactコミュニティはMVCを否定したのか

1. **Angular 1.jsの双方向バインディングMVVMがカオスだった。** データがどこから変更されるか追跡困難。これをMVCの問題だと誤って一般化した
2. **「UIは状態の関数」というスローガンが強力だった。** Model/Controllerの概念を意識的に隠し、全てをコンポーネント関数に押し込む方が「シンプル」に見えた
3. **実際にはMVCを否定していない。** useState=Model, JSX=View, イベントハンドラ=Controller。名前を変えて同じことをしている

排反に見えたのは、Reactが**MVCという構造を否定したのではなく、ファイル単位の分離を否定した**だけだから。責務分離としてのMVCは今でも有効で、宣言的状態管理と自由に組み合わせられる。
