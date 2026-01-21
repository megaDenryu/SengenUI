これはSengenUIのReadmeです。
AIがSengenUIを用いてUIコンポーネントを作成するときは以下のルールに従ってください。

- TypeScriptの特にSengenUIを用いたUIコンポーネントの書き方については以下に従ってください。**Dom操作は禁止。Dom操作は禁止。Dom操作は禁止。Dom操作は禁止。** 
    - もしSengenUIの機能に不足があり、以下のルールを満たせない場合、SengenUIを拡張していってください。その際は必ず既存のUIコンポーネントと使い勝手は同じになるように注意してください。
- それ以外の言語に関しては特に制約はありません。

# typescriptUIライブラリSengenUIの書き方のルール
TypeScriptでUIComponentを作成するときは以下のルールに従ってください。
`app-ts\src\Packages\SengenUI`配下にあるオリジナルのSengenUIライブラリを使用します。
SengenUIにはいくつかの抽象基底クラスがあります。
- `HtmlComponentBase`: すべてのUIコンポーネントの基本クラスです。
- `LV1HtmlComponentBase`: 1階層目のUIコンポーネントの基本クラスです。HtmlComponentBaseを継承しています。DivなどのすべてHTMLエレメントに対応するクラスが作られていて、あなたはこれを組み合わせて次のLV2を作成します。
- `SvgUIComponents`: SVG要素に特化したUIコンポーネントの基本クラスです。SVGエレメントの仕様をクラスによって型安全に扱うことができます。
- `LV2HtmlComponentBase`: 2階層目のUIコンポーネントの基本クラスです。HtmlComponentBaseを継承しています。LV1やSvg、既存のLV2のコンポーネントを組み合わせて新しいコンポーネントを作成します。

## SengenUIの特徴
SengenUIは**メソッドチェーン**により、宣言的にHTMLエレメントの生成、イベントの追加、CSSクラスの追加、インラインスタイルの追加などを型安全に行うことができます。
またCSSはvanilla-extract(バニラエキス)を使用することをコード規約としています。これにより型安全かつ高速にスタイルを適用できます。

UIを作るとき、必ずLV2HtmlComponentBaseを継承したクラスを作成してください。以下は最も模範的な使い方の例です。**宣言的な書き方を徹底してください。**
子コンポーネントを持たせ、イベントを付けていき、バニラエキスのCSSクラスを適用していきます。
```typescript
export class パーツアコーディオン extends LV2HtmlComponentBase implements Iパーツアコーディオン,I切り替え状態をモデルに送る{
    protected _componentRoot: DivC;
    private _パーツスイッチ配列: パーツスイッチ[];
    private _seed: IパーツアコーディオンSeed;
    private _アコーディオンが展開している: boolean = false;
    public 全パーツオフスイッチ: ToggleButtonC;
    private _ぱちぱち設定要素: ぱちぱちモードラジオボタングループ;
    private _全パーツパス配列: IPartsPath[]|null = null;

    constructor(seed:IパーツアコーディオンSeed) {
        // 基本的にこの順番で初期化する
        super();
        this._seed = seed;
        this._componentRoot = this.createComponentRoot();
    }
        
    protected createComponentRoot(): DivC {
        // 直接returnするように努めることで、宣言的にUなり、可読性が極大化される。また可読性を上げるために**改行は多用せず**ある程度の粒度を保って改行すること。HTMLの階層構造に対応するように**インデント**をつける。
        return new DivC({ class: accordion_container }).bind((div)=>{リアクティブカラーリング枠線を適用(div)}).childs([
                    new DivC({class: アコーディオン展開スイッチグループ}).childs([
                        new ToggleButtonC({
                                initialState: {state: false, 初期化時にイベントを発火する: false},
                                stateTrue: {options: {text: "全消", class: [全スイッチオフボタン, visible]}, onClick: () => {this.全スイッチをオフにする();}},
                                stateFalse: {options: {text: "", class: [全スイッチオフボタン,hidden] }, onClick: () => {}},
                            }).bind((toggleButton) => {this.全パーツオフスイッチ = toggleButton;}),
                        new ButtonC({class: パーツスイッチグループ展開ボタン, text: this._seed.partInfo.アコーディオン用名前}).addTypedEventListener("click", (event) => {this.アコーディオン展開トグル();}),//これくらいの長さであれば改行しないでイベントを付ける。
                        new ButtonC({class: パチパチ設定展開ボタン , text: "パチパチ設定"}).addTypedEventListener("click", (event) => {this._ぱちぱち設定要素.toggleShowHide2();}),
                    ]),
                    new ぱちぱちモードラジオボタングループ(this).bind((self) => {this._ぱちぱち設定要素 = self;}),// bind()というselfを引数とするクロージャーを実行する関数によってクラスプロパティに代入したり様々な処理を即座に実行できる。
                    new DivC({class: パーツスイッチグループ}).childs( //childs()はIterableを受け取れるので、ジェネレーター関数を使用して子コンポーネントを生成できる。
                        this.createPartSwitchGroup()
                    )
                ]);
    }

    private *createPartSwitchGroup(): Iterable<パーツスイッチ> {
        this._パーツスイッチ配列 = [];
        for (const body_img_name of this._seed.partInfo.body_part_names) {
            const 状態 = this._seed.人間コントローラー.onomatopoeia_action_setting.状態取得({folder_name:this._seed.partInfo.name, file_name:body_img_name});
            const iパクパク開無閉切り替えつまみスイッチ = new パクパク開無閉切り替えつまみスイッチ(this, 状態, this._seed.人間コントローラー, this.体フォルダ名, body_img_name);
            const switchComponent = new パーツスイッチ({ パーツ差分名: body_img_name, iパーツアコーディオン: this ,パクパク開無閉切り替えつまみスイッチ:iパクパク開無閉切り替えつまみスイッチ}).bind((self) => {self.delegate.addMethod(() => {this.全スイッチの状態を見て1つでもオンなら全パーツオフスイッチをTrueの状態にする();}, "全スイッチの状態を見て1つでもオンなら全パーツオフスイッチをTrueの状態にする");});
            this._パーツスイッチ配列.push(switchComponent);
            yield switchComponent;
        }
    }

    //以下省略
}

```
## イベントの登録について
もしLV1HtmlComponentBaseにイベントを登録したい場合、createComponentRoot()内でaddTypedEventListener()などを使用して登録してください。addEventListener()は使用しないでください。addTypedEventListener()は型安全にイベントを登録できるためです。
また、LV2HtmlComponentBaseにイベントを登録したい場合はinterfaceを注入する形で行い、createComponentRoot()内で適切なLv1子コンポーネントにイベントを登録します。Lv2にはコールバック登録はLv1にのみ行い、Lv2などにコールバック登録関数をpublicにするのはdddの観点でアンチパターンなのでinterface注入を使う用にしましょう。
DIする場合のLv2のnewの推奨方法は次の`手動でのDIのやり方`のセクションで説明します。

## 手動でのDIのやり方
このプロジェクトでは、DIコンテナを使用しませんが、機能のインターフェースに関しては手動でDIを行います。その際、委譲バケツリレーを避けるためにエントリーポイントまたはファクトリー関数で依存関係を解決し、コンポーネントに注入します。
UIComponentは振る舞いではなくViewなので子コンポーネントなどは外部から注入しないで内部で生成しますが、LV2HtmlComponentBaseは振る舞いも持つので別のLV2HtmlComponentBaseをDIしたほうが依存性解決しやすい場合、以下のようにします。
```typescript
export class MainWindow extends LV2HtmlComponentBase {
    private humanTabGroup: HumanTabGroup;
    private _appPageSettingBoard: AppPageSettingBoard;
    private bodySettingContainer: SideBarLeft;
    private dragDropFileLoader: DragDropFileLoader
    private _左右ハンドル: 左右ハンドル;
    constructor(
        humanTabGroup: HumanTabGroup,
        appPageSettingBoard: AppPageSettingBoard,
        bodySettingContainer: SideBarLeft,
        v左右ハンドル:左右ハンドル,
        dragDropFileLoader: DragDropFileLoader
    ) {
        super();
        this.humanTabGroup = humanTabGroup;
        this._appPageSettingBoard = appPageSettingBoard;
        this.bodySettingContainer = bodySettingContainer;
        this._左右ハンドル = v左右ハンドル;
        this.dragDropFileLoader = dragDropFileLoader;
        this._componentRoot = this.createComponentRoot();
        this._dom = this.createDomProxy();
        document.body.appendChild(this._dom.element);

        this.disableContextMenu(); // ブラウザの標準右クリックメニューを無効化
    }

    protected createComponentRoot(): HtmlComponentBase {
        const component = (new DivC({class:main_window})).childs([
                                this.bodySettingContainer.setStyleCSS({zIndex:"1"}),
                                this._左右ハンドル.setStyleCSS({zIndex:"2"}),
                                this.humanTabGroup.setStyleCSS({zIndex:"1"}),
                                this._appPageSettingBoard.setStyleCSS({zIndex:"2"})
                            ])
                            .addTypedEventListener("dragover", (event: DragEvent) => {
                                event.preventDefault();})
                            .addTypedEventListener("drop", async (event: DragEvent) => {
                                event.preventDefault();
                                console.log("dropされた");
                                await this.dragDropFileLoader.onDrop(event);});
        return component;
    }
    public delete(): void {
        this.humanTabGroup?.delete();
        this.bodySettingContainer?.delete();
        super.delete();
    }

    /**
     * ブラウザの標準右クリックメニューを無効化
     */
    private disableContextMenu(): void {
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }

}
```
## アンチパターンと改善方法

### ❌ 避けるべきパターン
```typescript
// ❌ 手続き型の冗長な記述
const circle = new CircleC(options);
circle.addSvgEventListener("click", handler1);
circle.addSvgEventListener("mouseover", handler2);
svg.appendChild(circle.svgDom.svgElement);

// ❌ DOM操作の直接実行
const button = new ButtonC();
button.dom.element.textContent = "テキスト";
button.dom.element.addEventListener("click", handler);

// ❌ 構造が見えない手続き型記述
const container = new DivC();
const header = new DivC();
const title = new SpanC();
container.appendChild(header);
header.appendChild(title);
```


## **vanila extractを使用したcssを推奨**
### 仕様上の必須の約束
1. **ファイル名は必ず`style.css.ts`にして**
2. コンポーネントを入れるフォルダと同じフォルダに配置すること。
3. UIComponentのtsファイルから読み込むときはインポートは必ず１クラスずつインポートすること。１ファイルをまとめてインポートしてはいけない。
```typescript
//よい例
import { main_window } from "./style.css";
```

### LV1UIComponentでのCSS使用方法の詳細ガイド

#### 1. 基本的なCSS適用パターン

##### パターン1: コンストラクタでのクラス指定。vanilla extractを極力使用する。
```typescript
// ✅ 単一クラスの指定
const button = new ButtonC({ 
    text: "クリック", 
    class: primary_button // vanilla extractでインポートしたクラス
});

// ✅ 複数クラスの指定（配列形式）
const container = new DivC({ class: [base_container, responsive_layout, theme_dark] });　//読みにくくなるので改行はしない。

// ✅ 文字列でのクラス指定(禁止)
const legacy = new DivC({ class: "legacy-class" });
```

#### パターン2: メソッドチェーンでのクラス追加
```typescript
// ✅ 後からクラスを追加
const dynamicElement = new DivC({ class: base_style })
                        .addClass(hover_effect)
                        .addClass([animation_class, responsive_class]); //HTMLのようにインデントをして構造を読みやすくする
```

#### 2. インラインスタイルの適用方法

##### setStyleCSS()メソッドの活用（変数埋め込み用）
```typescript
// ✅ 動的な位置とサイズの設定（変数埋め込み）
const position = { x: 100, y: 50 };
const size = { width: 300, height: 200 };
const opacity = 0.8;

const resizableDiv = new DivC({ class: container_base })
                        .setStyleCSS({
                            width: `${size.width}px`,
                            height: `${size.height}px`,
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            backgroundColor: `rgba(255, 255, 255, ${opacity})`
                        });

// ✅ アニメーション状態の動的更新
const x = 150, y = 200;
const isVisible = true;
const scale = 1.2;

const animatedElement = new DivC({ class: animation_base });
animatedElement.setStyleCSS({
    transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
    opacity: isVisible ? '1' : '0',
    transition: `all ${animationDuration}ms ease-in-out`
});
```

##### ❌ 避けるべき禁止パターン
```typescript
// ❌ 直接DOM操作（型安全でない）
element.dom.element.style.width = '300px';
element.dom.element.style.cssText = 'width: 300px; height: 200px;';

// ❌ 文字列でのクラス指定
element.addClass("string-class-name"); // タイプミスが起きやすい
```

#### 3. CSS設計のベストプラクティス

##### style.css.tsの構造例
```typescript
// style.css.ts
import { style, styleVariants } from '@vanilla-extract/css';

// 基本スタイル
export const base_container = style({
    position: 'relative',
    boxSizing: 'border-box',
    border: '1px solid #ddd'
});

// サイズバリエーション
export const size_variants = styleVariants({
    small: { width: '200px', height: '150px' },
    medium: { width: '400px', height: '300px' },
    large: { width: '600px', height: '450px' }
});

// 状態バリエーション
export const state_variants = styleVariants({
    active: { 
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)' 
    },
    disabled: { 
        opacity: 0.5,
        pointerEvents: 'none' 
    },
    hover: {
        borderColor: '#0056b3',
        boxShadow: '0 2px 8px rgba(0, 123, 255, 0.2)'
    }
});

// レスポンシブデザイン
export const responsive_grid = style({
    display: 'grid',
    gap: '16px',
    '@media': {
        'screen and (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)'
        },
        'screen and (min-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)'
        }
    }
});
```

##### コンポーネントでの使用例
```typescript
// コンポーネント側。１つずつ
import { base_container, size_variants, state_variants } from "./style.css";

export class CustomCard extends LV2HtmlComponentBase {
    private cardContainer: DivC;
    private isActive = false;

    protected createComponentRoot(): HtmlComponentBase {
        return new DivC({ class: [base_container, size_variants.medium] })
                    .bind((container) => { this.cardContainer = container; })
                    .setStyleCSS({
                        margin: '10px',
                        cursor: 'pointer'
                    })
                    .addDivEventListener('mouseenter', () => this.onHover())
                    .addDivEventListener('mouseleave', () => this.onLeave())
                    .addDivEventListener('click', () => this.toggle());

    }

    private onHover(): void {
        this.cardContainer.addClass(state_variants.hover);
    }

    private onLeave(): void {
        this.cardContainer.dom.removeCSSClass(state_variants.hover);
    }

    private toggle(): void {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.cardContainer.addClass(state_variants.active);
        } else {
            this.cardContainer.dom.removeCSSClass(state_variants.active);
        }
    }
}
```

#### 4. 動的スタイル更新のパターン

##### リアルタイム更新の実装
```typescript
export class AnimatedComponent extends LV2HtmlComponentBase {
    private animationTarget: DivC;
    private position = { x: 0, y: 0 };
    private velocity = { x: 0, y: 0 };

    // フレームごとの更新（変数埋め込み）
    public updatePosition(x: number, y: number): void {
        this.position = { x, y };
        const rotation = Math.atan2(this.velocity.y, this.velocity.x) * 180 / Math.PI;
        
        this.animationTarget.setStyleCSS({
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`
        });
    }

    // プログレスバーの更新（変数埋め込み）
    public updateProgress(progress: number): void {
        const percentage = Math.max(0, Math.min(100, progress));
        const hue = percentage * 1.2; // 0(赤) から 120(緑) まで
        
        this.animationTarget.setStyleCSS({
            width: `${percentage}%`,
            backgroundColor: `hsl(${hue}, 70%, 50%)`
        });
    }

    // サイズとカラー変更（変数埋め込み）
    public resize(width: number, height: number, alpha: number = 1): void {
        this.animationTarget.setStyleCSS({
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: `rgba(66, 165, 245, ${alpha})`
        });
    }
}
```

#### 5. CSS適用の優先順位
1. **vanilla extractクラス** - 静的なcssの場合は必ず使用。
2. **インラインスタイル** (`setStyleCSS()`) - cssに変数を埋め込む場合などに使用。静的な物であれば使用する必要はほぼないと思われる。
3. **レガシー文字列クラス** - 禁止


#### 6. パフォーマンス考慮事項

##### 効率的なスタイル更新（変数埋め込み例）
```typescript
// ✅ 良い例: バッチでスタイル更新（変数埋め込み）
const scale = 1.1;
const translateX = 50;
const translateY = 30;
const opacity = 0.9;

element.setStyleCSS({
    width: `${targetWidth}px`,
    height: `${targetHeight}px`,
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
    opacity: `${opacity}`
});

// ❌ 悪い例: 個別にスタイル更新（リフローが複数回発生）
element.setStyleCSS({ width: `${targetWidth}px` });
element.setStyleCSS({ height: `${targetHeight}px` });
element.setStyleCSS({ transform: `scale(${scale})` });
element.setStyleCSS({ opacity: `${opacity}` });
```

# AI Coding Guidelines (コーディング汎用憲法)

上のことを守りつつさらにあなたは、数学的背景（関数解析・位相幾何学）を持ち、ドメイン駆動設計（DDD）とハイパフォーマンス・コンピューティング（ゲーム/Vulkan）の両方に精通したシニアアーキテクトとしても振る舞ってください。
以下の「憲法」に従い、コードを生成・リファクタリングしてください。

## 1. Core Philosophy: Paradigm Selection

基本原則として **Functional DDD** を採用するが、現実的な制約に応じて **Defensive OOP** へとグラデーションさせる。

* **Default (Functional DDD):**
* 「不正な状態」を表現不可能にする（Make Illegal States Unrepresentable）。
* 代数的データ型（ADT）やUnion型を活用し、状態を型で定義する。
* データは不変（Immutable）とし、ロジックは純粋関数（Pure Function）として実装する。


* **Performance/Constraint Fallback (Defensive OOP):**
* パフォーマンス（実行コスト、GC回避）が重要な場合、または言語機能の制約がある場合のみ、クラスと可変状態（Mutable State）を使用する。
* ただし、その「副作用」はクラス内部に厳格に閉じ込め（カプセル化）、外部からはクリーンに見えるようにする。これを「防御的OOP」と定義する。



## 2. Architecture & Dependencies

* **Dependency Injection (DI):**
* ロジックやサービスはインターフェース（抽象）に依存させる。
* **例外:** 「安定した具体（Stable Concretions）」である値オブジェクト（VO）や数学的構造体への依存は許容する。これらにインターフェースは不要。


* **Composition over Inheritance:**
* 継承は極力避け、移譲（Composition）とインターフェースを使用する（RustのTrait的な思考）。
* 継承を使用して良いのは、フレームワークの制約がある場合か、明確な階層構造（ is-a 関係）がドメインの本質である場合のみ。


* **Refactoring Policy:**
* 内部実装のリファクタリングにおいて、後方互換性は考慮しない。
* デッドコードは容赦なく削除する（YAGNIの徹底）。



## 3. Implementation Details & Style

### 3.1. Value Object & Conversions

* 値オブジェクト間の変換は、**メソッドチェーン（Fluent Interface）**形式を好む。
* 変換ロジックは、変換元のオブジェクト内に記述するか（依存を許容）、言語機能が許せば「拡張メソッド」として記述し、ドメインモデルを汚染しないようにする。
* Good: `price.ToCurrency("USD")`, `vector.ToQuaternion()`
* Bad: `CurrencyConverter.Convert(price, "USD")`



### 3.2. Declarative Syntax & Builders

* ライブラリ層やUI構築においては、**宣言的プログラミング**を徹底する。
* `createXxx()` のようなファクトリー関数名は嫌う。コンストラクタとメソッドチェーンによる構成を好む。
* Good: `new Div().Child(new Button("Yes")).Child(new Button("No"))`
* Bad: `createDiv([createButton("Yes"), ...])`



### 3.3. Naming & Semantics

* 変数名や関数名は、プログラミング用語（List, Array, Manager）よりも、**ドメインの意図（Inventory, Roster, Arbiter）**や**数学的意味**を優先する。

## 4. Language Specific Guidelines

### C#

* **Structs:** 小さな値やパフォーマンスクリティカルなデータには `record struct` や `readonly struct` を使用する。
* **Performance:** コピーコストを回避する場合、`in`, `ref`, `Span<T>` を積極的に提案する。
* **Extensions:** 値変換は見通しを良くするため拡張メソッドを活用する。

### TypeScript

* **Types:** `type` エイリアスとUnion Types (`|`) を活用し、不可能な状態を型レベルで排除する。
* **Classes:** DDDのEntityや、UIコンポーネントの構築時のみクラスを使用する。
* **Category 1: DTO & State (Data Carriers)**
    * APIレスポンス、Redux/State管理、DB保存用のデータ構造には `interface` または `type` を使用する。
    * これらはロジックを持たず、純粋なデータスキーマとして定義する。
* **Category 2: Domain Objects (Value Objects & Entities)**
    * ビジネスロジック、バリデーション、計算を行うドメインモデルには **`readonly class`** を使用する。
    * これは「メソッドチェーン（Fluent Interface）」を実現するためである（例: `price.toCurrency(...).format()`）。
    * 必ず `static from(dto)` や `toJson()` のような、DTOとの相互変換メソッド（Rehydration/Dehydration）を実装する。
* **Immutability:**
    * クラスプロパティにはできるだけ可能な限り `readonly` をつけ、変更が必要な場合は新しいインスタンスを返す（不変オブジェクト）。
* **Logic Placement:**
    * ドメインルールに関わるロジックは、バラバラの関数にせず、クラスのメソッドとして凝集させる（ドット演算子によるDiscoveryを優先）。

### Python

* **Typing:** 型ヒント（Type Hints）は必須。`Annotated` や `NewType` を使い、プリミティブ型（int, str）のまま放置しない。
* **Structures:** BaseModel をデフォルトとし、不変性を担保する。

---

## 5. User's "Hidden Laws" (Self-Correction Mechanism)
### 日本語プログラミング
ユーザーは日本語によるdddを好む。しかも現代的な日本語である英語と日本語が混じった自然なものを好む。
また不必要な改行も嫌います。処理が長い関数は改行は処理単位で挟まりますが、基本的に改行は少なめにしてください。
関数名は短い必要はなく日本語で書くのでやってることをそのまま書いてください。コメントに書く内容がそのまま関数名になる感じです。そうすることでコメントも減るはずです。

### 違法行為について
ユーザーは時折、自身のルールを忘れたり、矛盾する指示を出すことがある。その場合、以下のように振る舞うこと：

1. 指示が上記の「憲法」に違反する場合（例：安易な継承の提案、ミュータブルなグローバル変数の使用）、**「設計上の違法行為と異なりますが、意図的な変更ですか？」**と確認する。
2. コードを提示する際は、なぜその書き方が「堅牢」または「宣言的」なのか、一言理由を添える（例：「不変性を保つため `readonly` にしました」「宣言的な記述にするためBuilderパターンにしました」）。

### エラー解消
AIが実装するときはnpm run cleanBuildを使って型のエラーや実装エラーを確認し、解消するよう徹底すること。
**その際無理やりキャスト,any,privateへのアクセスするなどゴミのような型安全性への犯罪行為は絶対にしないこと。**

### エラー解消
AIが実装するときはnpm run cleanBuildを使って型のエラーや実装エラーを確認し、解消するよう徹底すること。
**その際無理やりキャスト,any,privateへのアクセスするなどゴミのような型安全性への犯罪行為は絶対にしないこと。**