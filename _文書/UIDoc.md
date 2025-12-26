# UIComponentの使い方
1. UIComponentBase: すべてのUIコンポーネントの抽象基底クラス。そしてUIコンポーネントはすべて次のLV1とLV2のどちらかになる。つまり
2. LV1UIComponentBase:HTMLエレメントに対応するコンポーネント、div要素ならDivC、span要素ならSpanCなどの、[エレメント名 + C]という名前のクラス名にする。CはComponentの頭文字。
3. Lv2UIComponentBase:複数のLV1UIComponentBaseとLv2UIComponentBaseをコンポジットすることで作られるコンポーネント。
4. SvgUIComponentBase: SVG要素に対応するコンポーネント。SVG名前空間を適切に扱い、SVG特有のイベントと属性を型安全に操作する。

# SvgUIComponentとLV1UIComponentのベストプラクティス

## SvgUIComponentの特徴と使い方

### 基本的な使い方
SvgUIComponentはSVG要素専用のコンポーネントシステムで、HTML要素とは異なりSVG名前空間での要素作成が必要です。

```typescript
// ✅ 推奨: 宣言的メソッドチェーン
const circle = new CircleC({
                    cx: 100, cy: 100, r: 50,
                    fill: "lightblue", stroke: "darkblue", strokeWidth: 2
                })
                    .addSvgEventListener("click", () => circle.setFill("red"))
                    .addSvgEventListener("mouseover", () => circle.setRadius(60))
                    .addSvgEventListener("mouseout", () => circle.setRadius(50));

// ✅ グループ化による構造化
const nodeGroup = new GroupC({ className: "graph-node" })
                    .addChild(new CircleC({ cx: 0, cy: 0, r: 25, fill: "lightcoral" }))
                    .addChild(new RectangleC({ x: -15, y: -15, width: 30, height: 30, fill: "transparent", stroke: "purple" }))
                    .moveTo(200, 150);
```

### SVGコンポーネントの設計原則
1. **型安全なイベント処理**: `addSvgEventListener`で型安全なSVGイベント処理
2. **メソッドチェーン**: すべてのメソッドが`this`を返し、流暢なAPIを提供
3. **宣言的構造**: グループ化と階層化でSVG構造を視覚的に理解しやすく記述
4. **名前空間の自動処理**: SVG要素作成時のnamespace URIを自動処理

```typescript
// ✅ 複雑なSVG構造の宣言的記述
const graphVisualization = new GroupC({ className: "graph-visualization" })
    .addChild(
        // エッジレイヤー（背景）
        new GroupC({ className: "edges" })
            .addChild(new LineC({ x1: 50, y1: 50, x2: 150, y2: 100, stroke: "gray", strokeWidth: 2 }))
            .addChild(new LineC({ x1: 150, y1: 100, x2: 250, y2: 50, stroke: "gray", strokeWidth: 2 }))
    )
    .addChild(
        // ノードレイヤー（前景）
        new GroupC({ className: "nodes" })
            .addChild(new CircleC({ cx: 50, cy: 50, r: 20, fill: "lightblue" }))
            .addChild(new CircleC({ cx: 150, cy: 100, r: 20, fill: "lightgreen" }))
            .addChild(new CircleC({ cx: 250, cy: 50, r: 20, fill: "lightcoral" }))
    );
```

## LV1UIComponentのベストプラクティス

### イベント処理の型安全性
LV1UIComponentは完全に型安全なイベント処理を提供します：

```typescript
// ✅ 型安全なイベントチェーン
const interactiveButton = new ButtonC({ text: "クリックして開始", class: "primary-button" })
    .onClick((event) => {
        // event は MouseEvent として型付けされる
        console.log("Button clicked at:", event.clientX, event.clientY);
    })
    .onMouseOver((event) => {
        // event は MouseEvent として型付けされる
        (event.target as HTMLElement).style.backgroundColor = "lightblue";
    })
    .onMouseOut((event) => {
        (event.target as HTMLElement).style.backgroundColor = "";
    });
```

### コンストラクタオプションの活用
LV1UIComponentは初期化時にオプションオブジェクトで設定を行い、その後メソッドチェーンで拡張する設計：

```typescript
// ✅ 推奨パターン: 初期化 + メソッドチェーン
const formSection = new DivC({ class: "form-section", id: "user-form" })
    .childs([
        new DivC({ class: "form-header" }).childs([
            new SpanC("ユーザー情報入力", "form-title"),
            new SpanC("必要な情報を入力してください", "form-description")
        ]),
        new DivC({ class: "form-body" }).childs([
            new ButtonC({ text: "送信", class: "submit-button" })
                .onClick(() => handleSubmit()),
            new ButtonC({ text: "キャンセル", class: "cancel-button" })
                .onClick(() => handleCancel())
        ])
    ]);
```

### DOM構造の視覚的記述
childsメソッドとchildメソッドでHTML構造を視覚的に記述：

```typescript
// ✅ HTMLライクな構造記述
const navigationMenu = new DivC({ class: "navigation" })
    .childs([
        new DivC({ class: "nav-header" }).child(
            new SpanC("メニュー", "nav-title")),
        new DivC({ class: "nav-body" }).childs([
            new DivC({ class: "nav-item" }).child(
                new ButtonC({ text: "ホーム" }).onClick(() => navigateTo("home"))
                ),
            new DivC({ class: "nav-item" }).child(
                new ButtonC({ text: "設定" }).onClick(() => navigateTo("settings"))
                ),
            new DivC({ class: "nav-item" }).child(
                new ButtonC({ text: "ヘルプ" }).onClick(() => navigateTo("help")))
        ])
    ]);
```

## 共通のアンチパターンと改善方法

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

### ✅ 推奨パターン
```typescript
// ✅ 宣言的メソッドチェーン
const circle = new CircleC(options)
    .addSvgEventListener("click", handler1)
    .addSvgEventListener("mouseover", handler2);
svg.appendChild(circle.svgDom.svgElement);

// ✅ コンポーネントAPIの活用
const button = new ButtonC({ text: "テキスト" })
    .onClick(handler);

// ✅ 構造が一目でわかる宣言的記述
const container = new DivC({ class: "container" })
    .child(
        new DivC({ class: "header" })
            .child(new SpanC("タイトル", "title"))
    );
```

## bind()メソッドの効果的な活用

LV2UIComponentでのフィールドバインディング：

```typescript
// ✅ bind()でコンポーネント参照を取得しながら構造を構築
export class CustomFormComponent extends LV2UIComponentBase {
    private submitButton: ButtonC;
    private statusDisplay: SpanC;
    
    protected createDomProxy(): DomProxy {
        const rootDiv = new DivC(undefined, ["custom-form"])
            .childs([
                new DivC(undefined, ["form-controls"]).childs([
                    new ButtonC({ text: "送信" })
                        .bind((btn) => { this.submitButton = btn; })
                        .onClick(() => this.handleSubmit()),
                    new SpanC("準備完了", "status")
                        .bind((span) => { this.statusDisplay = span; })
                ])
            ]);
        return rootDiv.dom;
    }
    
    private handleSubmit(): void {
        this.statusDisplay.setTextContent("送信中...");
        this.submitButton.setDisabled(true);
    }
}
```

## パフォーマンスとメモリ管理

### 適切なコンポーネント削除
```typescript
// ✅ コンポーネントの適切な削除
const temporaryComponent = new DivC({ class: "temp" });
// 使用後
temporaryComponent.delete(); // DOMから削除してリソース解放
```

### イベントリスナーの管理
```typescript
// ✅ 型安全なイベントリスナーの追加と削除
const button = new ButtonC({ text: "一時的なボタン" });
const clickHandler = () => console.log("clicked");

button.onClick(clickHandler);
// 必要に応じて削除
button.removeTypedEventListener("click", clickHandler);
```

これらのパターンにより、型安全で保守性が高く、読みやすいUIコンポーネントコードを作成できます。

# UIComponentBaseの作り方
this._domを作るためにcreateDomProxy()の内部でDomProxyの作成手順を定義する。この定義方法について解説する。
LV1とLV2どちらも明示的にthis._dom = this.createDomProxy()を明示的に手動で呼ぶこと。this._domはreadonlyだが、domの構成自体にクラスのLV1またはLV2のフィールド情報を使いたいことが頻発するのでUIComponentBaseのコンストラクターの中には含んでいない。（含むとthis.createDomProxy()がsuper()のなかで呼ばれるとthis.fieldが使えないため）
# LV1UIComponentの作成状況
form、table、tbody、tr、td、canvasなどはまだ

# SVGUIComponentの作成状況
CircleC、RectangleC、LineC、GroupCが実装済み。PathC、EllipseC、PolygonC、TextCなどが今後必要。

# SVGとHTMLの統合パターン

## SVGコンテナの埋め込み
HTMLコンポーネント内にSVGコンポーネントを埋め込む場合：

```typescript
// ✅ HTMLコンテナ内でSVGコンポーネントシステムを使用
const graphContainer = new DivC({ class: "graph-container" })
    .bind((container) => {
        // SVGコンテナを作成
        const svg = SvgElementCreater.createSvgContainerElement(800, 600);
        container.dom.element.appendChild(svg);
        
        // SVGコンポーネントを作成してSVGに追加
        const nodeGraph = new GroupC({ className: "node-graph" })
            .addChild(new CircleC({ cx: 100, cy: 100, r: 30, fill: "lightblue" }))
            .addChild(new LineC({ x1: 100, y1: 100, x2: 200, y2: 150, stroke: "gray" }))
            .addChild(new CircleC({ cx: 200, cy: 150, r: 30, fill: "lightgreen" }));
        
        svg.appendChild(nodeGraph.svgDom.svgElement);
    });
```
# Lv2UIComponentBase のthis.createDomProxy()の作り方
```typescript
protected createDomProxy(): DomProxy {
        const rootDiv = (new DivC(undefined, ["toggle-format-state-display", this._color.get()])).bind((diplay)=>{}).childs(
                            [
                                (new Button()).bind((span) => {this.stateTextElement = span;}).child(
                                    (new DivC(undefined, ["toggle-format-state-display1", this._color.get()])).bind((diplay)=>{this.display1 = display}).child(
                                        (new SpanC(this._state.get(), "state")).bind((span) => {this.stateTextElement = span;})
                                    )
                                ),
                                (new Input()).bind((span) => {this.stateTextElement = span;}).child(
                                    (new DivC(undefined, ["toggle-format-state-display2", this._color.get()])).bind((diplay)=>{this.display2 = display}).child(
                                        (new SpanC(this._state.get(), "state")).bind((span) => {this.stateTextElement = span;})
                                    )
                                )
                            ]
                        );
        return rootDiv.dom;
    }
```
のように、UIComponentBaseに実装されているchild()やchilds()をメソッドチェーンでつなげてHTMLと同じ構造でコンポーネントで階層化していくことができる。これによってコンポーネントのdom構造が一目でわかるようになっている。
また、bind()を使ってLV2UIComponentのフィールドにビルドメソッドチェーンの中で作ったコンポーネントインスタンスを割り当てることができます。これによってコンポーネント・Domを作成しながら、それをコンポーネントクラスのフィールドにバインドしたり、イベントリスナーをつけたりするのを一体で行うことができ、可読性が良くなります。
イベントリスナーを設定したりする関数は、それぞれのコンポーネントクラスごとに違うのでそれに従ってください。


# **vanila extractを使用したcssを推奨**
## 仕様上の必須の約束
1. **ファイル名は必ず`style.css.ts`にして**
2. コンポーネントを入れるフォルダと同じフォルダに配置すること。
3. UIComponentのtsファイルから読み込むときはインポートは必ず１クラスずつインポートすること。１ファイルをまとめてインポートしてはいけない。
```typescript
//よい例
import { main_window } from "./style.css";
```

## LV1UIComponentでのCSS使用方法の詳細ガイド

### 1. 基本的なCSS適用パターン

#### パターン1: コンストラクタでのクラス指定。vanilla extractを極力使用する。
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

### 2. インラインスタイルの適用方法

#### setStyleCSS()メソッドの活用（変数埋め込み用）
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

#### ❌ 避けるべき禁止パターン
```typescript
// ❌ 直接DOM操作（型安全でない）
element.dom.element.style.width = '300px';
element.dom.element.style.cssText = 'width: 300px; height: 200px;';

// ❌ 文字列でのクラス指定
element.addClass("string-class-name"); // タイプミスが起きやすい
```

### 3. CSS設計のベストプラクティス

#### style.css.tsの構造例
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

#### コンポーネントでの使用例
```typescript
// コンポーネント側。１つずつ
import { base_container, size_variants, state_variants } from "./style.css";

export class CustomCard extends LV2UIComponentBase {
    private cardContainer: DivC;
    private isActive = false;

    protected createComponentRoot(): UIComponentBase {
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

### 4. 動的スタイル更新のパターン

#### リアルタイム更新の実装
```typescript
export class AnimatedComponent extends LV2UIComponentBase {
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

### 5. CSS適用の優先順位
1. **vanilla extractクラス** - 静的なcssの場合は必ず使用。
2. **インラインスタイル** (`setStyleCSS()`) - cssに変数を埋め込む場合などに使用。静的な物であれば使用する必要はほぼないと思われる。
3. **レガシー文字列クラス** - 禁止


### 6. パフォーマンス考慮事項

#### 効率的なスタイル更新（変数埋め込み例）
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

#### クラス管理の最適化
```typescript
// ✅ 状態管理クラスの活用
export class StateManager {
    private element: DivC;
    private currentState: string[] = [];

    public applyState(newState: string[]): void {
        // 既存状態をクリア
        if (this.currentState.length > 0) {
            this.element.dom.removeCSSClass(this.currentState);
        }
        
        // 新状態を適用
        this.element.addClass(newState);
        this.currentState = newState;
    }
}
```

この詳細ガイドにより、LV1UIComponentでのCSS使用が明確になり、型安全で保守性の高いスタイリングが実現できます。