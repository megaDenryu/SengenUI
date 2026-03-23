# SengenUI ガイド

SengenUIを使ってUIコンポーネントを作るための統合ガイド。

## リファレンスへの案内

基本規約を踏まえた頻出パターンは [SengenUI頻出パターン集](./SengenUI頻出パターン集.md) を参照。

本ガイドでカバーしない詳細仕様は `_文書/リファレンス/` を参照：

| ドキュメント | 参照タイミング |
|---|---|
| [DOM要素階層設計](../リファレンス/DOM要素階層設計.md) | HTML/SVG/MathMLの名前空間をまたぐコンポーネントを作るとき |
| [MathMLコンポーネント](../リファレンス/MathMLコンポーネント.md) | 数式を表示するコンポーネントを作るとき |
| [型安全イベントシステム](../リファレンス/型安全イベントシステム.md) | イベントの型マッピングやリスナー削除の仕様を確認するとき |

---

## 第1条：絶対ルール

1. **素のDOM APIは禁止。** `document.createElement`, `document.querySelector`, `addEventListener` 等を直接使わない。SengenUIのAPIで完結させる。機能不足なら SengenUI自体を拡張する。
2. **jQueryは禁止。**
3. **LV2サブクラスの継承は禁止（Sealed原則）。** `LV2HtmlComponentBase` を継承した具象クラスを、さらに継承してはならない。親コンストラクタ内で子の `createComponentRoot()` が走り、未初期化フィールドへのアクセスでバグになるため。拡張はコンポジション（包含）で行う。

---

## 第2条：コンポーネント階層

| 層 | 基底クラス | 役割 |
|---|---|---|
| **LV1** | `LV1HtmlComponentBase` | HTMLタグ1つに対応（`DivC`, `SpanC`, `ButtonC` 等） |
| **LV2** | `LV2HtmlComponentBase` | LV1やLV2を組み合わせた複合コンポーネント |
| **SVG** | `SvgUIComponentBase` | SVG名前空間の要素（`CircleC`, `LineC`, `GroupC` 等） |
| **MathML** | `MathMLComponentBase` | MathML名前空間の要素（`MiC`, `MfracC` 等） |

---

## 第3条：LV1拡張クラス

`DivC` や `SpanC` 等のLV1コンポーネントを継承して、ドメイン固有のメソッドを持つ拡張クラスを作れる。

### メリット

1. **LV1の全メソッドが委譲なしで使える**: `setStyleCSS`, `addClass`, `childs`, `bind` 等がそのまま呼べる
2. **DOM要素が1つ**: LV2は `_componentRoot` 経由でラップするが、LV1拡張は素のHTML要素1つ。余計なdivが増えない
3. **ドメインメソッドとLV1メソッドをチェーンできる**: 戻り値を `: this` にすれば型が維持される

```typescript
class ポケモンアイコン extends DivC {
    private _種族id = '';
    constructor(種族id?: string) {
        super({ class: styles.アイコン });
        if (種族id) this.種族を設定する(種族id);
    }
    種族を設定する(種族id: string): this {
        this._種族id = 種族id;
        this.setStyleCSS({ backgroundImage: `url(/sprites/${種族id}.png)` });
        return this;
    }
}

// LV1メソッドとドメインメソッドがチェーン可能。型はポケモンアイコンのまま維持される
new ポケモンアイコン("pikachu")
    .種族を設定する("raichu")
    .setStyleCSS({ width: '48px' })
    .addClass(styles.selected);
```

### デメリット

- **継承に由来する一般的な問題は起こる**: SengenUI内部の実装変更に影響を受ける可能性がある。ただしLV1は構造が単純（HTML要素1つ）なので、実際にはリスクは低い
- **糖衣構文（`div()`, `span()` 等）からはインスタンスを生成できない**: `new` が必要

### 使いどころ

- **1つのHTML要素にドメイン固有の振る舞いを足したい**とき（アイコン、バッジ、HPバー等）
- **再利用実績があるか、今後の再利用が確実**なとき。1箇所でしか使わないならLV2やOrchestrator内のフィールドで十分

### LV2との使い分け

| 基準 | LV1拡張 | LV2 |
|---|---|---|
| DOM要素数 | 1つ | 複数（LV1/LV2の組み合わせ） |
| LV1メソッド | 直接使える | `_componentRoot` 経由（委譲が必要） |
| 内部構造の隠蔽 | 低い（LV1メソッドが全て公開） | 高い（`_componentRoot` でラップ） |
| 用途 | 単一要素の拡張 | 複合コンポーネント |

---

## 第4条：View / Orchestrator / View部品

コンポーネントの構築には3つの手段がある。

| 手段 | 形式 | 責務 | 状態 | 使いどころ |
|---|---|---|---|---|
| **View関数** | 純粋関数 | UIツリーの構築と返却 | 持たない | 静的なUI構造 |
| **LV2 Orchestrator** | LV2クラス | 状態管理・イベント配線 | 持つ（自身の状態） | 画面・パネル単位の統括 |
| **LV2 View部品** | LV2クラス | 外部データの表示・更新 | 持たない（データは外部から受ける） | 再利用可能なカード・リスト項目等 |

### View関数

- クラスを使わない。通常のTypeScript関数。
- 副作用を持たない（DOM操作、API呼び出し、タイマー等禁止）。
- 引数で受け取り、UIツリーを返すだけ。イベントハンドラはPropsとして注入。

```typescript
function headerView({ ideaInput, onRun }: HeaderProps) {
  return (
    div({ class: styles.header }).childs([
        ideaInput,
        button({ text: "実行" }).onClick(onRun)])
  );
}
```

### LV2 Orchestrator

- 画面やパネル単位の状態管理・イベント配線を行う「配線係」。
- View関数やView部品を組み合わせてUIツリーを構築する。
- ロジックが膨らんだらサービスクラスに抽出する（後述）。

```typescript
export class MyApp extends LV2HtmlComponentBase {
  protected _componentRoot: HtmlComponentBase;

  constructor() {
      super();
      this._componentRoot = this.createComponentRoot();
  }

  protected createComponentRoot(): HtmlComponentBase {
    return (
      div({ class: styles.root }).childs([
          headerView({ onRun: () => this.doSomething() }),
          contentView(this.contentArea)])
    );
  }
}
```

### LV2 View部品

- 自身は状態を持たず、外部からデータを受けて表示を更新する複合コンポーネント。
- `更新する(データ)` のようなメソッドでDOM再構築なしに表示を書き換える。
- Orchestratorがデータを流し込む。

```typescript
export class スロットカード extends LV2HtmlComponentBase {
    protected _componentRoot: DivC;
    private readonly _名前: SpanC;
    // ... 各セルの参照

    constructor(イベント: Iスロットカードイベント) {
        super();
        this._名前 = span();
        this._componentRoot = this._UIを構築する(イベント);
    }

    更新する(設定: ポケモンビルド設定): void {
        this._名前.setTextContent(設定.名前);
        // ... 各セルの値を書き換え（DOM再構築なし）
    }
}
```

### 3つの使い分け判断フロー

1. **状態を持たず、構築時に確定するUI** → View関数
2. **外部からデータを受けて表示更新が必要な部品** → LV2 View部品
3. **状態管理・イベント配線・子コンポーネント統括** → LV2 Orchestrator
4. **1つのHTML要素にドメインメソッドを足すだけ** → LV1拡張クラス（第3条）

### Orchestratorの肥大化を防ぐ：サービス分離

Orchestratorはコールバックのバケツリレーを減らせて有用だが、状態管理・ロジック・イベントハンドリングが全て1クラスに集まると肥大化する。
**Orchestratorは「配線係」に徹し、ロジックはサービスクラスに抜き出す。**

```
CanvasView (Orchestrator = 配線係)
  ├── CanvasGraphModel          ← 状態（配置物リスト等のデータ）
  ├── キャンバスグラフ操作サービス  ← グラフ操作ロジック
  ├── VoiceRecognitionService   ← 音声認識ロジック
  └── キャンバスコマンドリポジトリ  ← Undo/Redo
```

**判断基準:** Orchestratorに「このメソッド群、View構築と関係ないロジックだな」と感じる塊ができたら、サービスクラスとして抽出する。サービスはコンストラクタ注入でOrchestratorに渡す。

```typescript
export class EditorView extends LV2HtmlComponentBase {
    // Orchestratorはサービスを受け取って配線するだけ
    constructor(
        private model: EditorModel,
        private graphService: グラフ操作サービス,
        private commandRepo: コマンドリポジトリ
    ) {
        super();
        this._componentRoot = this.createComponentRoot();
    }

    protected createComponentRoot(): DivC {
        return (
            div({ class: styles.editor }).childs([
                headerView({
                    onSave: () => this.graphService.保存(this.model),
                    onUndo: () => this.commandRepo.undo()
                }),
                canvasView(this.model)])
        );
    }
    // EditorView自体にはロジックメソッドを書かない
}
```

### Orchestrator親子関係のパターン

Orchestrator（LV2）同士が親子関係を持つ場合の通信パターン。

**親→子（下方向）:** 親が `bind()` で子の参照を持ち、後から指示を出す。

```typescript
protected createComponentRoot(): DivC {
    return (
        div({ class: styles.app }).childs([
            headerView({ onRun: () => this._editor.実行() }),
            new EditorView(this.model)
                .bind(editor => { this._editor = editor; })])
    );
}
```

**子→親（上方向）:** 3つのパターンがあり、状況で使い分ける。

| 状況 | パターン | 例 |
|---|---|---|
| 子が親に「何か起きた」と通知するだけ | **インターフェース注入** | `自動リサイズ付箋用コンテキストメニュー依存関係` |
| 親子や兄弟が同じ状態を共有する | **共有サービス** | `配置物選択機能集約` |
| 子の生成パターンが多い / 親が太りすぎる | **Factory** | `CanvasItemFactory` |

シンプルな順（インターフェース注入→共有サービス→Factory）に検討し、一番単純なもので済ませる。

### Orchestrator肥大化の分解指針

以下のサインが出たらOrchestratorを分解する：

1. **ロジックの塊がView構築と無関係** — サービスクラスとして抽出。Orchestratorからはコンストラクタ注入で使う。
2. **子Orchestratorの生成パターンが複数ある** — Factoryクラスとして抽出。依存関係の配線をFactoryに任せる。
3. **1つのOrchestratorが複数の独立した画面領域を管理している** — 領域ごとに子Orchestratorに分割。親は配線と配置だけ行う。
4. **コールバックが3段以上のバケツリレーになっている** — 共有サービスを導入して中間層を飛ばす。

### ファイル構成

```
MyComponent/
├── MyComponent.ts       # View関数群 + Orchestratorクラス
└── style.css.ts         # Vanilla Extract スタイル定義
```

ファイル内の配置順序：

```typescript
// =============================================================================
// 純粋関数コンポーネント群（UIツリーを返すだけ）
// =============================================================================

function headerView(...) { ... }
function sidebarView(...) { ... }

// =============================================================================
// Orchestrator（状態管理とイベントハンドリング）
// =============================================================================

export class MyApp extends LV2HtmlComponentBase { ... }
```

---

## 第5条：LV1糖衣構文の使用義務

LV1コンポーネントは `new DivC()` ではなく、常にLV1糖衣構文を使用する。View関数内でもOrchestrator内でも同様。`bind()` との組み合わせも問題なくできる。

```typescript
// 正しい
div({ class: styles.container })
span({ text: 'Hello' })
button({ text: '送信' }).onClick(onSubmit)
div({ class: styles.root }).bind(self => { this._root = self; })

// 違反
new DivC({ class: styles.container })
```

---

## 第6条：子要素の追加規則

### 複数の子要素は `childs([...])`

```typescript
div({ class: styles.area }).childs([
    span({ text: 'A' }),
    span({ text: 'B' })])
```

`childs()` はIterableを受け取れるので、ジェネレーター関数も使える：

```typescript
div({ class: styles.list }).childs(
    this.createItems()  // function* createItems(): Iterable<ButtonC>
)
```

### 単一の子要素は `child()`

```typescript
div({ class: styles.wrapper }).child(
    textarea({ class: styles.input }))
```

### 複数の `child()` チェーンは禁止

```typescript
// 違反
div().child(span({ text: 'A' })).child(span({ text: 'B' }))
```

### イベントハンドラはチェーンで同一行に

```typescript
button({ text: '送信' }).onClick(onSubmit)
```

ハンドラが長い場合は例外的に改行可。

---

## 第7条：条件付き子要素 — `childIf` / `childIfs`

UIツリーの構築時に条件分岐が必要な場合、`childIf` / `childIfs` を使って宣言的に記述する。
JSXのようにternaryを直接埋め込めないメソッドチェーン構文において、条件分岐を構造を壊さずに表現するための仕組み。

### `childIf` — 単一の条件付き子要素

```typescript
interface IFChild {
    If: boolean,
    True: HtmlComponentChild,
    False?: HtmlComponentChild  // 省略可（= 何も追加しない）
}
```

```typescript
// サーバーモードが利用可能な場合のみボタンを追加
div({ class: modeSelector })
    .child(button({ text: "ローカル", class: modeButtonActive }))
    .childIf({
        If: this._events.onIsServerModeAvailable(),
        True: button({ text: "サーバー", class: modeButton })
            .onClick(() => this.switchMode("server"))
    })
```

### `childIfs` — 条件付きと通常の子要素を混在

`childIfs` は `IFChild`、通常のコンポーネント、配列を1つのメソッドで受け取れる。
条件付きの要素と無条件の要素を同じ配列に並べられるのが強み。

```typescript
div({ class: styles.form }).childIfs([
    {
        If: Boolean(sectionTitle),
        True: div({ text: sectionTitle, class: styles.title })
    },
    div({ class: styles.body }).child(inputComponent),
    {
        If: Boolean(helpText),
        True: span({ text: helpText, class: styles.help })
    }
])
```

### `childs` + ternary ではなく `childIfs` を使う理由

```typescript
// 避けるべき: null混入やネストが汚くなる
div().childs([
    condition ? componentA : null,
    componentB,
    condition2 ? componentC : undefined
])

// 推奨: 型安全で意図が明確
div().childIfs([
    { If: condition, True: componentA },
    componentB,
    { If: condition2, True: componentC }
])
```

### IF系メソッド一覧

`childIf` 以外にも、メソッドチェーン中で条件分岐を行うためのIFメソッドが多数用意されている。
すべて `{ If: boolean, True: ..., False?: ... }` の統一的なインターフェースで動作する。

| カテゴリ | メソッド | 用途 |
|---|---|---|
| **子要素** | `childIf`, `childIfs`, `removeChildIf`, `insertChildAtIf`, `clearChildrenIf`, `moveChildToIndexIf` | 条件付きの子要素操作 |
| **スタイル/クラス** | `setStyleCSSIf`, `addClassIf`, `removeClassIf` | 条件付きのCSS操作 |
| **属性** | `setAttributeIf` | 条件付きの属性設定（data-attribute状態管理に最適） |
| **座標** | `setViewportPositionIf`, `setDocumentPositionIf`, `setOffsetPositionIf` | 条件付きの位置設定 |
| **表示** | `showIf`, `hideIf` | 条件付きの表示/非表示切り替え |
| **汎用** | `bindIf`, `setTooltipIf`, `deleteIf`, `addBehaviorIf` | その他の条件付き操作 |

#### `setAttributeIf` — data-attribute状態管理との組み合わせ

第12条のdata-attribute状態管理パターンと組み合わせて使う。

```typescript
import { セレクトボタン状態 } from './状態';

// 構築時に初期状態を条件で設定
div({ class: styles.item })
    .setAttributeIf({
        If: isSelected,
        True: { attr: セレクトボタン状態.attribute, value: セレクトボタン状態.value.selected },
        False: { attr: セレクトボタン状態.attribute, value: セレクトボタン状態.value.notSelected }
    })
```

---

## 第8条：`return (...)` パターン

View関数のreturn文では必ず `return (...)` パターンを使用する。
Prettierはこのパターンを破壊するため**使用禁止**。ESLint + @stylistic/eslint-plugin を使用する。

```typescript
// 正しい
function myView() {
  return (
    div({ class: styles.root }).childs([
        span({ text: 'Hello' }),
        span({ text: 'World' })])
  );
}

// 違反: returnの直後に要素を書く
function myView() {
  return div({ class: styles.root }).childs([...]);
}
```

### インデント規則

```typescript
return (                                  // return (
  div({ class: styles.root }).childs([    // +2: ルート要素
      childA(),                           // +4: 子要素
      childB()])                          // +4: 子要素 + 閉じ])
);                                        // 閉じ);
```

- `.childs([` の配列要素は親要素から+4スペースインデント
- 閉じの `])` は最後の要素と同じ行
- `)` と `;` は独立行

---

## 第9条：Propsインターフェース

複数のPropsを受け取るView関数は、専用のインターフェースを定義する。

```typescript
interface HeaderProps {
  ideaInput: InputC;
  onRun: () => void;
}
function headerView({ ideaInput, onRun }: HeaderProps) { ... }
```

引数が1〜2個で意味が明確な場合はインターフェース不要：

```typescript
function explorerView(fileList: DivC) { ... }
```

---

## 第10条：`bind()` と参照取得

Orchestrator内で子コンポーネントの参照が必要な場合、`bind()` を使って宣言的構造を壊さずに取得する。

```typescript
protected createComponentRoot(): DivC {
    return (
        div({ class: styles.root }).childs([
            button({ text: "送信" })
                .bind(btn => { this._submitButton = btn; })
                .onClick(() => this.handleSubmit()),
            span({ text: "準備完了" })
                .bind(span => { this._status = span; })])
    );
}
```

---

## 第11条：イベント登録

1. LV1には `addTypedEventListener()` またはコンビニエンスメソッド（`.onClick()` 等）で登録する。`addEventListener()` は禁止。
2. LV2への外部からのコールバック登録はインターフェース注入で行う。LV2にpublicなコールバック登録メソッドを生やすのはアンチパターン。

```typescript
// LV2の振る舞いはインターフェース注入で解決する
interface I操作ハンドラ {
    on保存: () => void;
    on削除: () => void;
}

export class EditorView extends LV2HtmlComponentBase {
    constructor(private handler: I操作ハンドラ) {
        super();
        this._componentRoot = this.createComponentRoot();
    }

    protected createComponentRoot(): DivC {
        return (
            div({ class: styles.editor }).childs([
                button({ text: "保存" }).onClick(() => this.handler.on保存()),
                button({ text: "削除" }).onClick(() => this.handler.on削除())])
        );
    }
}
```

---

## 第12条：スタイリング — Vanilla Extract

### 必須ルール

1. CSSには **Vanilla Extract** を使用する。
2. ファイル名は必ず `style.css.ts`。コンポーネントと同じフォルダに配置する。
3. インポートは1クラスずつ: `import { container } from "./style.css";`

### CSS適用の優先順位

1. **Vanilla Extractクラス** — 静的CSSは必ずこれ
2. **`setStyleCSS()`** — 動的な値（座標、サイズ等の変数埋め込み）にのみ使用
3. **文字列クラス** — 禁止

### バッチ更新

`setStyleCSS()` はまとめて1回で呼ぶ。個別呼び出しはリフロー発生の原因。

```typescript
// 正しい: 1回でまとめる
element.setStyleCSS({
    width: `${w}px`,
    height: `${h}px`,
    transform: `translate(${x}px, ${y}px)`
});

// 違反: 個別に呼ぶ
element.setStyleCSS({ width: `${w}px` });
element.setStyleCSS({ height: `${h}px` });
```

---

## 第13条：data-attribute による状態管理

コンポーネントの見た目の状態は、CSSクラスの付け外しではなく **data属性** で管理する。

### 状態定数の定義

```typescript
// 状態.ts — 定数オブジェクトで定義し、参照ジャンプ可能にする
export const セレクトボタン状態 = {
    attribute: "data-selected",
    value: {
        selected: "true",
        notSelected: "false"
    }
} as const;
```

### CSS定義（globalStyle必須）

**注意:** Vanilla Extractの `selectors` ではdata-attributeセレクタが実行時エラーになる。必ず `globalStyle` を使う（コンパイルでは検出されないので特に注意）。

```typescript
// style.css.ts
import { style, globalStyle } from '@vanilla-extract/css';
import { セレクトボタン状態 } from './状態';

export const セレクトボタンcss = style({
    padding: '12px 16px',
    border: '2px solid #e9ecef',
    cursor: 'pointer',
});

// data-attribute のスタイルは globalStyle で定義する
globalStyle(
    `${セレクトボタンcss}[${セレクトボタン状態.attribute}="${セレクトボタン状態.value.selected}"]`,
    { backgroundColor: '#e8f5e8', borderColor: '#28a745' }
);
```

### コンポーネントでの状態変更

```typescript
// setAttribute — 排他的な状態（モード切替等）
this._root.setAttribute(セレクトボタン状態.attribute, セレクトボタン状態.value.selected);

// toggleAttribute — 真偽値の状態（ローディング等）
this._root.toggleAttribute("data-loading", isLoading);
```

定数オブジェクトを経由することで、VSCodeの「定義へ移動」「シンボルの名前変更」がJS・CSS両方に効く。

---

## 第14条：キャンバスアプリケーション固有ルール

Miro風エディタ等、キャンバス上に配置物を並べるUIを作る場合の追加規約。

### z-indexの定数管理

マジックナンバー禁止。意味的な高さを定数クラスまたはオブジェクトで定義する。

```typescript
export class 配置物zIndex {
    static readonly キャンバス = {
        描画キャンバス: "1",
        配置物コンテナ: "3",
        コンテキストメニューコンテナ: "4",
    };
}
```

### ゴーストパターン（pointer-events制御）

- 配置用コンテナには `pointer-events: none`（クリック透過）
- 操作対象の子要素のみ `pointer-events: auto`（クリック受容）

### スタッキングコンテキストの管理

- ノード同士はできる限り兄弟要素（フラット構造）にする
- 特定グループでz-indexを完結させたい場合は `isolation: isolate` を使用

---

## 第15条：コンテンツスロットのレイアウト契約

LV2コンポーネントが「ここに外部のコンポーネントを注入してよい」というスロット（コンテンツ領域）を公開する場合、そのスロットが子に対して何を保証するかを明示しなければならない。

### 問題

親コンポーネントのスロットが `display: block`（デフォルト）なのか `display: flex` なのかによって、注入される子の `flex: 1` や `height: 100%` の動作が変わる。これが暗黙だと、親の内部実装を変更しただけで子のレイアウトが崩壊する。

### ルール

1. **スロット提供側（親）**: スロットの `display` 方式と、子にサイズがどう伝達されるか（flex親として高さを与えるのか、子が自分で決めるのか）をコメントまたはインターフェースで宣言する。

```typescript
// このスロットは display:flex の親として振る舞う。
// 注入されるコンポーネントには flex:1 が自動付与される。
// 子は width/height を自分で指定する必要はない。
```

2. **スロット利用側（子）**: 親の宣言された契約のみに依存する。親の内部DOM構造（ネストの深さ、兄弟要素の有無等）に依存してはならない。

3. **子は自己完結を目指す**: 可能な限り、子コンポーネントのルート要素は親の `display` 方式に依存しないレイアウトを持つ。やむを得ず `flex: 1` や `height: 100%` に依存する場合は、親の契約を確認した上で使用する。

### 違反例

```typescript
// 親が display:block のスロットに、height:100% の子を入れる
// → 親に明示的な高さがないため子の高さが0になる
div({ class: styles.コンテンツ })  // display: block（暗黙）
    .child(myComponent)           // height: 100% を期待 → 崩壊
```

---

## 第16条：SVGとHTMLの統合

HTMLコンポーネント内にSVGを埋め込む場合は `SvgC`（`<svg>`要素）をゲートウェイとして使う。
SVGにもLV1と同様の糖衣構文（`svg()`, `path()`, `g()`, `circle()`, `rect()`, `line()` 等）が用意されている。

```typescript
import { svg, g, circle, line } from "SengenUI/index";

const graphContainer = (
    div({ class: styles.graph }).child(
        svg({ width: 800, height: 600 }).childs([
            g({ className: "edges" }).childs([
                line({ x1: 50, y1: 50, x2: 150, y2: 100, stroke: "gray" })
            ]),
            g({ className: "nodes" }).childs([
                circle({ cx: 50, cy: 50, r: 20, fill: "lightblue" })
            ])
        ])
    )
);
```

SVGコンポーネントも宣言的メソッドチェーンで記述する。手続き的な `appendChild` は**存在しない**。

---

## 第17条：SVGアイコンシステム

文字列中の絵文字は禁止（コーディング憲法 第8条）。アイコンには SengenUI の `icon()` 糖衣構文を使ったSVGアイコンを使用する。

### `icon()` — Lucide-likeアイコン生成

SengenUIに組み込まれたアイコン生成関数。SVGパス文字列の配列からアイコンを宣言的に作る。

```typescript
import { icon } from "SengenUI/index";

export const micIcon = (size = 14, color = 'currentColor') =>
    icon({ size, color, paths: [
        'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z',
        'M19 10v2a7 7 0 0 1-14 0v-2',
        'M12 19v3',
        'M8 22h8'
    ] });

// パスごとにスタイルを変えたい場合（例: fill付き）
export const playIcon = (size = 20, color = 'currentColor') =>
    icon({ size, color, paths: ['m5 3 14 9-14 9V3z'], style: { fill: 'currentColor' } });
```

### アイコンライブラリの運用

アイコン定義は `OneONetUIComponents/Svg/Icons.ts` に集約し、named exportする。

```typescript
// 使う側: 必要なアイコンだけimport
import { micIcon, trashIcon } from "OneONetUIComponents/Svg/Icons";

div({ class: styles.toolbar }).childs([
    micIcon(16, "white"),
    trashIcon(16, "red")
])
```

**Tree-shaking:** 各アイコンはnamed export関数のため、Vite/Rollupのプロダクションビルドで未使用アイコンは自動除去される。大量にアイコンを定義しておいて、使うものだけimportする運用が可能。

### アイコンの追加方法

新しいアイコンが必要な場合は `Icons.ts` にnamed export関数を追加する。パス文字列は [Lucide Icons](https://lucide.dev/) 等から取得できる。
