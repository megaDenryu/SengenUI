# SVG LV2コンポーネント設計ガイド

**作成日**: 2025年11月19日  
**目的**: HTML LV2コンポーネントと同様のメソッドチェーン方式を適用したSVG LV2コンポーネントのベストプラクティス確立  
**対象**: SVG LV2コンポーネント（複数のSVG LV1要素を組み合わせた再利用可能なコンポーネント）

---

## 1. SVG LV1とLV2の定義

### 1.1 SVG LV1コンポーネント（既存）

SVG LV1コンポーネントは、**単一のSVG要素**に対応するクラスです。各種`*Base`クラスとして実装されています。

**基底クラス階層**:
```
SvgElementBase (abstract) - 全SVG要素の基底
├─ SvgContainerBase - 子要素を持てる（例: SvgC, GroupC, DefsC）
├─ SvgGraphicsBase - 描画専用、子不可（例: CircleC, PathC, RectangleC）
├─ SvgFilterContainerBase - フィルター効果
├─ SvgGradientBase - グラデーション定義
├─ SvgAnimationBase - アニメーション
├─ SvgMetadataBase - メタデータ
├─ SvgTextBase - テキスト専用
├─ SvgFontBase - フォント（非推奨）
└─ SvgLegacyBase - レガシー
```

**特徴**:
- 単一のSVG DOM要素を表現
- メソッドチェーンで宣言的に記述可能
- `child()`, `addClass()`, `setStyleCSS()`, `setSvgAttribute()` などのメソッドを持つ
- 型安全性を保証（`SvgGraphicsBase`は`child()`を持たない）

### 1.2 SVG LV2コンポーネント（新規定義）

SVG LV2コンポーネントは、**複数のSVG LV1要素を組み合わせた再利用可能なコンポーネント**です。

**定義**:
- 複数のSVG LV1要素（CircleC, PathC, GroupCなど）を組み合わせて構成
- ビジネスロジックや状態管理を持つ
- HTML LV2コンポーネント（`LV2HtmlComponentBase`）と同等の設計思想
- メソッドチェーンによる宣言的な記述を徹底

---

## 2. SVG LV2コンポーネントの種類（場合分け）

SVG LV2コンポーネントは、その**構造と用途**に応じて以下の4つのカテゴリに分類されます。

### 2.1 カテゴリA: **アイコンコンポーネント**

**特徴**:
- 単一の`SvgC`をルートとして持つ
- 内部に複数の`PathC`や図形要素を含む
- サイズ、色の変更などのAPIを提供
- **HTML要素の子要素として追加可能**（最も重要な特性）

**用途**:
- UI内で使用するアイコン（ハート、星、メニューなど）
- ロゴ、バッジ、装飾要素
- ボタンやカード内に配置する小さな図形

**実装例**:
```typescript
export class HeartIcon extends SvgC {
    private _path: PathC;

    constructor(props: HeartIconProps = {}) {
        const size = props.size || 24;
        super({ width: size, height: size, viewBox: "0 0 24 24" });
        
        this._path = new PathC({
            d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67...",
            fill: props.color || "#FF69B4"
        });
        
        this.child(this._path);
    }

    public setColor(color: string): this {
        this._path.setFill(color);
        return this;
    }
}

// 使用例
const icon = new HeartIcon({ size: 32, color: "red" });
divContainer.child(icon); // ✅ HTML要素に直接追加可能
```

**継承すべき基底クラス**: `SvgC`（`extends SvgC`）

---

### 2.2 カテゴリB: **グループコンポーネント**

**特徴**:
- `GroupC`をルートとして持つ
- 複数の図形を論理的にグループ化
- SVG内でのみ使用（HTML要素の直接の子にはできない）
- 共通の変形（transform）やスタイルを適用

**用途**:
- 複数の図形をまとめて扱う（例: 複数の円からなる花の形）
- アニメーションの対象としてグループ化
- 共通の座標変換を適用したい図形の集合

**実装例**:
```typescript
export class FlowerShape extends GroupC {
    private _centerCircle: CircleC;
    private _petalCircles: CircleC[] = [];

    constructor(props: FlowerShapeProps) {
        super();
        
        this._centerCircle = new CircleC({
            cx: props.x,
            cy: props.y,
            r: props.centerRadius,
            fill: props.centerColor
        });
        
        this.child(this._centerCircle);
        
        // 花びらを円周上に配置
        for (let i = 0; i < props.petalCount; i++) {
            const angle = (i * 360) / props.petalCount;
            const petal = new CircleC({
                cx: props.x + props.petalDistance * Math.cos(angle * Math.PI / 180),
                cy: props.y + props.petalDistance * Math.sin(angle * Math.PI / 180),
                r: props.petalRadius,
                fill: props.petalColor
            });
            this._petalCircles.push(petal);
            this.child(petal);
        }
    }

    public rotate(angle: number): this {
        this.setTransform(`rotate(${angle})`);
        return this;
    }
}

// 使用例
const svg = new SvgC({ width: 200, height: 200 });
const flower = new FlowerShape({ x: 100, y: 100, petalCount: 6 });
svg.child(flower); // ✅ SVG内に追加
// divContainer.child(flower); // ❌ NG: HTML要素には直接追加できない
```

**継承すべき基底クラス**: `GroupC`（`extends GroupC`）

---

### 2.3 カテゴリC: **フィルター/エフェクトコンポーネント**

**特徴**:
- `FilterC`や`LinearGradientC`などをルートとして持つ
- `<defs>`内で定義され、他の要素から参照される
- 視覚効果を再利用可能な形でカプセル化

**用途**:
- カスタムフィルター（ドロップシャドウ、ぼかし、モーフィング）
- 再利用可能なグラデーション定義
- 複雑なエフェクトの組み合わせ

**実装例**:
```typescript
export class GlowFilter extends FilterC {
    private _blur: FeGaussianBlurC;
    private _merge: FeMergeC;

    constructor(props: GlowFilterProps) {
        super({ id: props.id || "glow-filter" });
        
        this._blur = new FeGaussianBlurC({
            in: "SourceAlpha",
            stdDeviation: props.blurAmount || 3,
            result: "blur"
        });
        
        // フィルタープリミティブを組み合わせ
        this.child(this._blur)
            .child(new FeOffsetC({ in: "blur", dx: 0, dy: 0, result: "offsetBlur" }))
            .child(new FeFloodC({ floodColor: props.glowColor, result: "color" }))
            .child(new FeCompositeC({ in: "color", in2: "offsetBlur", operator: "in", result: "glow" }));
        
        // マージ処理
        this._merge = new FeMergeC();
        this._merge.childs([
            new FeMergeNodeC({ in: "glow" }),
            new FeMergeNodeC({ in: "SourceGraphic" })
        ]);
        this.child(this._merge);
    }

    public setGlowColor(color: string): this {
        // フィルター内の色を更新
        return this;
    }
}

// 使用例
const svg = new SvgC({ width: 200, height: 200 });
const defs = new DefsC();
const glowFilter = new GlowFilter({ id: "myGlow", glowColor: "#00ff00" });
defs.child(glowFilter);
svg.child(defs);

const circle = new CircleC({ cx: 100, cy: 100, r: 50 })
                    .setSvgAttribute("filter", "url(#myGlow)");
svg.child(circle);
```

**継承すべき基底クラス**: `FilterC`, `LinearGradientC`, `RadialGradientC` など

---

### 2.4 カテゴリD: **複合UIコンポーネント**

**特徴**:
- **HTML要素とSVG要素を組み合わせる**
- `LV2HtmlComponentBase`を継承し、内部に`SvgC`を持つ
- インタラクション、状態管理、ビジネスロジックを含む
- HTMLコンポーネントとしての振る舞いを持つ

**用途**:
- SVGを含むインタラクティブなウィジェット（グラフ、チャート、ダイアグラム）
- SVGとテキスト・ボタンを組み合わせたUI
- 動的に変化するビジュアライゼーション

**実装例**:
```typescript
export class InteractiveChart extends LV2HtmlComponentBase {
    protected _componentRoot: DivC;
    private _svg: SvgC;
    private _dataPoints: CircleC[] = [];
    private _titleLabel: SpanC;

    constructor(props: InteractiveChartProps) {
        super();
        this._componentRoot = this.createComponentRoot();
    }

    protected createComponentRoot(): DivC {
        return new DivC({ class: chart_container }).childs([
            // HTMLラベル
            new SpanC({ text: "データチャート", class: chart_title })
                .bind(span => { this._titleLabel = span; }),
            
            // SVGチャート本体
            new SvgC({ width: 400, height: 300, class: chart_svg })
                .bind(svg => { this._svg = svg; })
                .childs(this.createDataPoints()),
            
            // HTMLコントロール
            new DivC({ class: chart_controls }).childs([
                new ButtonC({ text: "更新" })
                    .addTypedEventListener("click", () => this.updateData()),
                new ButtonC({ text: "リセット" })
                    .addTypedEventListener("click", () => this.resetData())
            ])
        ]);
    }

    private *createDataPoints(): Iterable<CircleC> {
        for (let i = 0; i < 10; i++) {
            const circle = new CircleC({
                cx: i * 40 + 20,
                cy: 150,
                r: 5,
                fill: "#4285f4"
            }).addSvgEventListener("click", () => this.onPointClick(i));
            
            this._dataPoints.push(circle);
            yield circle;
        }
    }

    private updateData(): void {
        this._dataPoints.forEach((circle, i) => {
            const newY = 150 - Math.random() * 100;
            circle.setSvgAttribute("cy", newY.toString());
        });
    }

    private onPointClick(index: number): void {
        console.log(`Point ${index} clicked`);
    }

    public override delete(): void {
        this._dataPoints.forEach(p => p.delete());
        this._svg?.delete();
        super.delete();
    }
}

// 使用例
const chart = new InteractiveChart({ data: [1, 2, 3] });
document.body.appendChild(chart.dom.element);
```

**継承すべき基底クラス**: `LV2HtmlComponentBase`（`extends LV2HtmlComponentBase`）

---

## 3. 各カテゴリの対応表

| カテゴリ | 継承元 | ルート要素 | HTML子要素可 | 用途 | 例 |
|---------|--------|-----------|-------------|------|-----|
| **A: アイコン** | `SvgC` | `<svg>` | ✅ Yes | アイコン、ロゴ | HeartIcon, StarIcon |
| **B: グループ** | `GroupC` | `<g>` | ❌ No | 図形のグループ化 | FlowerShape, DiagramNode |
| **C: エフェクト** | `FilterC`等 | `<filter>`等 | ❌ No | フィルター、グラデ | GlowFilter, CustomGradient |
| **D: 複合UI** | `LV2HtmlComponentBase` | `<div>` | ✅ Yes | SVG+HTML統合 | InteractiveChart, GraphEditor |

---

## 4. 実装パターンとベストプラクティス

### 4.1 共通ルール（全カテゴリ）

#### ✅ メソッドチェーンを徹底する

```typescript
// ✅ Good: 宣言的でメソッドチェーン
export class MyIcon extends SvgC {
    constructor() {
        super({ width: 24, height: 24, viewBox: "0 0 24 24" });
        
        this.child(new PathC({ d: "...", fill: "#000" }))
            .child(new CircleC({ cx: 12, cy: 12, r: 2, fill: "#fff" }))
            .addClass(icon_style);
    }
}

// ❌ Bad: 手続き型
export class MyIconBad extends SvgC {
    constructor() {
        super({ width: 24, height: 24 });
        
        const path = new PathC({ d: "..." });
        path.setFill("#000");
        this.child(path);
        
        const circle = new CircleC();
        circle.setSvgAttribute("cx", "12");
        circle.setSvgAttribute("cy", "12");
        this.child(circle);
    }
}
```

#### ✅ `bind()` メソッドで参照を保存

```typescript
export class MyComponent extends SvgC {
    private _mainPath: PathC;
    private _highlight: CircleC;

    constructor() {
        super({ width: 100, height: 100 });
        
        this.childs([
            new PathC({ d: "..." })
                .bind(path => { this._mainPath = path; }), // ✅ 参照を保存
            new CircleC({ cx: 50, cy: 50, r: 5 })
                .bind(circle => { this._highlight = circle; })
        ]);
    }

    public highlightOn(): void {
        this._highlight.setFill("#ff0000"); // 保存した参照を使用
    }
}
```

#### ✅ ジェネレーター関数で動的に子要素生成

```typescript
export class DotsPattern extends GroupC {
    private _dots: CircleC[] = [];

    constructor(props: DotsPatternProps) {
        super();
        this.childs(this.createDots(props));
    }

    private *createDots(props: DotsPatternProps): Iterable<CircleC> {
        for (let i = 0; i < props.count; i++) {
            const dot = new CircleC({
                cx: i * props.spacing,
                cy: 50,
                r: props.radius,
                fill: props.color
            });
            this._dots.push(dot);
            yield dot; // ✅ ジェネレーターで宣言的に生成
        }
    }
}
```

#### ✅ インデントでDOM構造を可視化

```typescript
export class ComplexIcon extends SvgC {
    constructor() {
        super({ width: 100, height: 100 });
        
        this.childs([
            new DefsC().childs([
                new LinearGradientC({ id: "grad1" }).childs([
                    new StopC({ offset: "0%", stopColor: "#ff0000" }),
                    new StopC({ offset: "100%", stopColor: "#0000ff" })
                ])
            ]),
            new GroupC({ class: main_group }).childs([
                new RectangleC({ x: 0, y: 0, width: 100, height: 100 })
                    .setSvgAttribute("fill", "url(#grad1)"),
                new CircleC({ cx: 50, cy: 50, r: 30 })
                    .setFill("#ffffff")
            ])
        ]); // ✅ インデントでDOM階層が見える
    }
}
```

---

### 4.2 カテゴリA（アイコン）の実装パターン

#### パターン1: シンプルなアイコン

```typescript
export class CheckIcon extends SvgC {
    private _path: PathC;

    constructor(props: IconProps = {}) {
        const size = props.size || 24;
        super({ width: size, height: size, viewBox: "0 0 24 24" });
        
        this._path = new PathC({
            d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
            fill: props.color || "currentColor"
        });
        
        this.child(this._path);
    }

    public setColor(color: string): this {
        this._path.setFill(color);
        return this;
    }

    public setSize(size: number): this {
        this.setSvgAttribute("width", size.toString())
            .setSvgAttribute("height", size.toString());
        return this;
    }
}
```

#### パターン2: 複数パスを持つアイコン

```typescript
export class MenuIcon extends SvgC {
    private _lines: PathC[] = [];

    constructor(props: IconProps = {}) {
        const size = props.size || 24;
        super({ width: size, height: size, viewBox: "0 0 24 24" });
        
        const lineData = [
            "M3 6h18",
            "M3 12h18",
            "M3 18h18"
        ];
        
        this.childs(
            lineData.map(d => new PathC({ d, stroke: props.color || "#000", strokeWidth: 2 })
                .bind(path => { this._lines.push(path); }))
        );
    }

    public animateToX(): void {
        // アニメーション実装例
        this._lines[0].setTransform("rotate(45deg)");
        this._lines[1].setStyleCSS({ opacity: "0" });
        this._lines[2].setTransform("rotate(-45deg)");
    }
}
```

---

### 4.3 カテゴリB（グループ）の実装パターン

```typescript
export class NetworkNode extends GroupC {
    private _circle: CircleC;
    private _label: TextC;
    private _connections: LineC[] = [];

    constructor(props: NetworkNodeProps) {
        super();
        
        this._circle = new CircleC({
            cx: props.x,
            cy: props.y,
            r: props.radius,
            fill: props.color,
            stroke: "#000",
            strokeWidth: 2
        }).addSvgEventListener("click", () => props.onClick?.());
        
        this._label = new TextC({
            x: props.x,
            y: props.y,
            textContent: props.label,
            textAnchor: "middle",
            dominantBaseline: "middle"
        });
        
        this.child(this._circle)
            .child(this._label);
    }

    public connectTo(targetNode: NetworkNode): this {
        const line = new LineC({
            x1: this._circle.getSvgAttribute("cx"),
            y1: this._circle.getSvgAttribute("cy"),
            x2: targetNode._circle.getSvgAttribute("cx"),
            y2: targetNode._circle.getSvgAttribute("cy"),
            stroke: "#999",
            strokeWidth: 1
        });
        this._connections.push(line);
        this.child(line);
        return this;
    }

    public highlight(): this {
        this._circle.setStroke("#ff0000").setSvgAttribute("stroke-width", "4");
        return this;
    }
}
```

---

### 4.4 カテゴリC（エフェクト）の実装パターン

```typescript
export class NeonGlowFilter extends FilterC {
    constructor(props: NeonGlowFilterProps) {
        super({ id: props.id || "neon-glow" });
        
        this.childs([
            new FeGaussianBlurC({ in: "SourceGraphic", stdDeviation: 4, result: "blur1" }),
            new FeColorMatrixC({ in: "blur1", type: "matrix", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7", result: "glow1" }),
            new FeGaussianBlurC({ in: "glow1", stdDeviation: 3, result: "glow2" }),
            new FeCompositeC({ in: "SourceGraphic", in2: "glow2", operator: "over" })
        ]);
    }
}

// 使用例
const svg = new SvgC({ width: 200, height: 200 });
const defs = new DefsC();
defs.child(new NeonGlowFilter({ id: "neon" }));
svg.child(defs);

const text = new TextC({ x: 100, y: 100, textContent: "NEON" })
                .setSvgAttribute("filter", "url(#neon)");
svg.child(text);
```

---

### 4.5 カテゴリD（複合UI）の実装パターン

```typescript
export class SvgDrawingBoard extends LV2HtmlComponentBase {
    protected _componentRoot: DivC;
    private _svg: SvgC;
    private _drawingGroup: GroupC;
    private _currentPath: PathC | null = null;
    private _colorPicker: InputC;
    private _clearButton: ButtonC;

    constructor() {
        super();
        this._componentRoot = this.createComponentRoot();
    }

    protected createComponentRoot(): DivC {
        return new DivC({ class: drawing_board_container }).childs([
            // ツールバー（HTML）
            new DivC({ class: toolbar }).childs([
                new LabelC({ text: "色:" }),
                new InputC({ type: "color", value: "#000000" })
                    .bind(input => { this._colorPicker = input; }),
                new ButtonC({ text: "クリア" })
                    .bind(btn => { this._clearButton = btn; })
                    .addTypedEventListener("click", () => this.clearDrawing())
            ]),
            
            // 描画エリア（SVG）
            new SvgC({ width: 800, height: 600, class: drawing_canvas })
                .bind(svg => { this._svg = svg; })
                .childs([
                    new RectangleC({ x: 0, y: 0, width: 800, height: 600, fill: "#ffffff" }),
                    new GroupC()
                        .bind(group => { this._drawingGroup = group; })
                ])
                .addSvgEventListener("mousedown", (e) => this.startDrawing(e))
                .addSvgEventListener("mousemove", (e) => this.draw(e))
                .addSvgEventListener("mouseup", () => this.endDrawing())
        ]);
    }

    private startDrawing(e: MouseEvent): void {
        const color = this._colorPicker.dom.element.value;
        this._currentPath = new PathC({
            d: `M ${e.offsetX} ${e.offsetY}`,
            stroke: color,
            strokeWidth: 2,
            fill: "none"
        });
        this._drawingGroup.child(this._currentPath);
    }

    private draw(e: MouseEvent): void {
        if (!this._currentPath) return;
        const currentD = this._currentPath.getSvgAttribute("d");
        this._currentPath.setSvgAttribute("d", `${currentD} L ${e.offsetX} ${e.offsetY}`);
    }

    private endDrawing(): void {
        this._currentPath = null;
    }

    private clearDrawing(): void {
        // すべての子要素を削除
        this._drawingGroup.svgDom.svgElement.innerHTML = "";
    }

    public override delete(): void {
        this._svg?.delete();
        super.delete();
    }
}
```

---

## 5. アンチパターン集

### ❌ パターン1: DOM直接操作

```typescript
// ❌ Bad
export class BadIcon extends SvgC {
    constructor() {
        super({ width: 24, height: 24 });
        
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z");
        this.svgDom.svgElement.appendChild(pathElement); // ❌ DOM直接操作
    }
}

// ✅ Good
export class GoodIcon extends SvgC {
    constructor() {
        super({ width: 24, height: 24 });
        
        this.child(new PathC({ d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" })); // ✅ メソッドチェーン
    }
}
```

### ❌ パターン2: 手続き型の冗長な記述

```typescript
// ❌ Bad
export class BadChart extends LV2HtmlComponentBase {
    protected createComponentRoot(): DivC {
        const container = new DivC();
        const svg = new SvgC({ width: 400, height: 300 });
        const group = new GroupC();
        
        for (let i = 0; i < 10; i++) {
            const circle = new CircleC({ cx: i * 40, cy: 150, r: 5 });
            group.child(circle);
        }
        
        svg.child(group);
        container.child(svg);
        return container;
    }
}

// ✅ Good
export class GoodChart extends LV2HtmlComponentBase {
    protected createComponentRoot(): DivC {
        return new DivC().childs([
            new SvgC({ width: 400, height: 300 }).childs([
                new GroupC().childs(
                    Array.from({ length: 10 }, (_, i) => 
                        new CircleC({ cx: i * 40, cy: 150, r: 5 })
                    )
                )
            ])
        ]);
    }
}
```

### ❌ パターン3: GroupCをHTML要素に追加

```typescript
// ❌ Bad: GroupCは<g>要素なのでHTMLの子にできない
const group = new GroupC().childs([
    new CircleC({ cx: 50, cy: 50, r: 20 })
]);
divContainer.child(group); // ❌ NG

// ✅ Good: SvgCでラップする
const svg = new SvgC({ width: 100, height: 100 });
const group = new GroupC().childs([
    new CircleC({ cx: 50, cy: 50, r: 20 })
]);
svg.child(group);
divContainer.child(svg); // ✅ OK
```

---

## 6. まとめ

### SVG LV2コンポーネント設計の原則

1. **メソッドチェーンを徹底** - 宣言的で読みやすいコード
2. **適切な基底クラスを選択** - 用途に応じて`SvgC`, `GroupC`, `FilterC`, `LV2HtmlComponentBase`を使い分け
3. **DOM操作を禁止** - すべてUIComponentのメソッドで操作
4. **`bind()`で参照保存** - 後から操作が必要な要素は参照を保持
5. **ジェネレーター活用** - 動的な子要素生成は`*createXxx()`パターン
6. **インデントで構造可視化** - HTML階層構造に対応したインデント

### カテゴリ別チェックリスト

| カテゴリ | 継承元 | HTML子可 | チェック項目 |
|---------|--------|---------|------------|
| A: アイコン | `SvgC` | ✅ | `viewBox`設定、サイズ変更API、色変更API |
| B: グループ | `GroupC` | ❌ | 変形API、論理的なグループ化、イベント処理 |
| C: エフェクト | `FilterC`等 | ❌ | `id`設定、フィルター効果の組み合わせ |
| D: 複合UI | `LV2HtmlComponentBase` | ✅ | HTMLとSVGの統合、状態管理、イベント処理 |

---

**以上で、SVG LV2コンポーネント設計ガイドを終わります。**
