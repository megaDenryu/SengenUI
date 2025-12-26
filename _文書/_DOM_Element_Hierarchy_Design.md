# DOM Element階層とUIComponent設計書

## 1. DOM仕様におけるElement階層

### 1.1 基本階層構造

```
Node
└── Element (抽象基底クラス)
    ├── HTMLElement - HTML要素全般
    │   ├── HTMLDivElement
    │   ├── HTMLSpanElement
    │   ├── HTMLInputElement
    │   └── ... (その他多数のHTML要素)
    │
    ├── SVGElement - SVG要素全般
    │   ├── SVGSVGElement
    │   ├── SVGCircleElement
    │   ├── SVGRectElement
    │   └── ... (その他多数のSVG要素)
    │
    ├── MathMLElement - MathML要素（数式用）
    │   ├── MathMLMathElement
    │   ├── MathMLMiElement (識別子)
    │   ├── MathMLMnElement (数値)
    │   ├── MathMLMoElement (演算子)
    │   ├── MathMLMrowElement (行)
    │   ├── MathMLMsupElement (上付き)
    │   ├── MathMLMsubElement (下付き)
    │   ├── MathMLMfracElement (分数)
    │   └── ... (その他のMathML要素)
    │
    └── Element (直接インスタンス)
        └── XMLやカスタム要素など
```

## 2. DOM仕様における子要素の制約

### 2.1 HTML要素の子要素制約

#### HTML要素が受け入れ可能な子要素
- **HTMLElement**: 他のHTMLElement、SVGElement（`<svg>`タグのみ）、MathMLElement（`<math>`タグのみ）、テキストノード
- **特殊ケース**:
  - `<script>`, `<style>`, `<textarea>`: テキストノードのみ
  - `<img>`, `<input>`, `<br>`, `<hr>`: 子要素を持たない（void要素）

#### 重要な原則
HTMLコンテキストにおいて、SVG名前空間に入るには**必ず`<svg>`要素**を経由する必要があります。`<circle>`, `<rect>`などのSVG図形要素を直接HTML要素の子として配置することはできません。

### 2.2 SVG要素の子要素制約

#### SVG要素が受け入れ可能な子要素
- **SVGSVGElement** (`<svg>`): 他のSVG要素、`<foreignObject>`経由でHTML要素
- **SVGGElement** (`<g>`): 他のSVG図形要素、テキスト要素、グループ要素
- **SVG図形要素** (`<circle>`, `<rect>`等): アニメーション要素（`<animate>`, `<animateTransform>`）、記述要素（`<desc>`, `<title>`）
- **foreignObject**: HTMLElement全般（HTML名前空間に戻る）

#### 重要な原則
SVGコンテキストからHTMLコンテキストに戻るには**必ず`<foreignObject>`要素**を経由する必要があります。

### 2.3 MathML要素の子要素制約

#### MathML要素が受け入れ可能な子要素
- **MathMLMathElement** (`<math>`): 他のMathML要素、一部HTML要素（`<semantics>`内部）
- **MathMLMrowElement** (`<mrow>`): 他のMathML表現要素
- **MathMLMfracElement** (`<mfrac>`): 正確に2つのMathML要素（分子と分母）
- **MathMLMsupElement/MsubElement**: 正確に2つのMathML要素（ベースと上付き/下付き）
- **トークン要素** (`<mi>`, `<mn>`, `<mo>`): テキストノードのみ

#### 重要な原則
MathML名前空間に入るには**必ず`<math>`要素**を経由する必要があります。MathML要素を直接HTML要素の子として配置することはできません。

## 3. 現在のUIComponent設計の対応状況

### 3.1 HTML対応（完全実装済み）

```
HtmlComponentBase (基底クラス)
├── LV1HtmlComponentBase (単一HTML要素)
│   ├── DivC, SpanC, ButtonC, InputC...
│   └── すべての標準HTML要素に対応
└── LV2HtmlComponentBase (複合HTML要素)
    └── カスタムコンポーネント用基底クラス
```

**子要素型**: `HtmlComponentChild = HtmlComponentBase | SvgC`
- HTML要素は他のHTML要素と`SvgC`（`<svg>`タグ）のみを子として受け入れる

### 3.2 SVG対応（完全実装済み）

```
SvgElementBase (基底クラス)
├── SvgContainerBase (コンテナ系SVG要素)
│   ├── SvgC (<svg>タグ) - HTML要素の子になれる唯一のSVG要素
│   ├── GroupC (<g>タグ)
│   ├── DefsC, SymbolC, MarkerC...
│   └── ForeignObjectC - HTML要素を埋め込むための要素
├── SvgShapeBase (図形系SVG要素)
│   ├── CircleC, RectangleC, LineC, PathC...
│   └── 各種SVG図形要素
└── SvgAnimationBase (アニメーション要素)
    ├── AnimateC, AnimateTransformC...
    └── SVGアニメーション要素
```

**重要な設計**: 
- `SvgC`のみが`HtmlComponentChild`型に含まれる
- 他のSVG要素は全てSVG名前空間内でのみ有効
- `ForeignObjectC`を使用してSVGからHTMLへ埋め込み可能

### 3.3 MathML対応（未実装）

#### 必要な基底クラス構造

```
MathMLElementBase (基底クラス)
├── MathMLContainerBase (コンテナ系MathML要素)
│   ├── MathC (<math>タグ) - HTML要素の子になれる唯一のMathML要素
│   ├── MrowC (<mrow>タグ) - 数式の行
│   ├── MstyleC (<mstyle>タグ) - スタイル設定
│   └── SemanticsC (<semantics>タグ) - 意味情報
│
├── MathMLLayoutBase (レイアウト系MathML要素)
│   ├── MfracC (<mfrac>タグ) - 分数
│   ├── MsqrtC (<msqrt>タグ) - 平方根
│   ├── MrootC (<mroot>タグ) - n乗根
│   ├── MsupC (<msup>タグ) - 上付き
│   ├── MsubC (<msub>タグ) - 下付き
│   ├── MsubsupC (<msubsup>タグ) - 上下付き
│   ├── MunderC (<munder>タグ) - 下部記号
│   ├── MoverC (<mover>タグ) - 上部記号
│   ├── MunderoverC (<munderover>タグ) - 上下記号
│   ├── MtableC (<mtable>タグ) - 行列・表
│   ├── MtrC (<mtr>タグ) - 表の行
│   └── MtdC (<mtd>タグ) - 表のセル
│
└── MathMLTokenBase (トークン系MathML要素)
    ├── MiC (<mi>タグ) - 識別子（変数名など）
    ├── MnC (<mn>タグ) - 数値
    ├── MoC (<mo>タグ) - 演算子
    ├── MtextC (<mtext>タグ) - テキスト
    └── MspaceC (<mspace>タグ) - スペース
```

## 4. 子要素型の設計

### 4.1 現在の型定義

```typescript
// HtmlComponentBase.ts
export type HtmlComponentChild = HtmlComponentBase | SvgC;

// SvgContainerBase.ts
export type SvgComponentChild = SvgElementBase;
```

### 4.2 MathML追加後の型定義（提案）

```typescript
// HtmlComponentBase.ts
export type HtmlComponentChild = HtmlComponentBase | SvgC | MathC;

// MathMLElementBase.ts（新規）
export type MathMLComponentChild = MathMLElementBase;

// SvgContainerBase.ts（変更なし）
export type SvgComponentChild = SvgElementBase;

// ForeignObjectC.ts（変更なし）
// ForeignObjectはHTMLElementを直接受け入れるため型制約は緩い
```

## 5. 名前空間の境界要素

DOM仕様では、異なる名前空間間を行き来するための「ゲートウェイ要素」が明確に定義されています。

### 5.1 HTML → SVG
**ゲートウェイ**: `<svg>`要素のみ
- `SvgC`クラスが対応
- `HtmlComponentChild`型に含まれる唯一のSVG要素

### 5.2 HTML → MathML
**ゲートウェイ**: `<math>`要素のみ
- `MathC`クラスで実装予定
- `HtmlComponentChild`型に追加予定

### 5.3 SVG → HTML
**ゲートウェイ**: `<foreignObject>`要素のみ
- `ForeignObjectC`クラスが対応済み
- SVG内にHTML要素を埋め込む

### 5.4 MathML → HTML
**ゲートウェイ**: `<semantics>`要素内の`<annotation-xml encoding="application/xhtml+xml">`
- 実用上ほとんど使用されないため、初期実装では対応不要

## 6. 設計原則の厳守

### 6.1 DOM操作禁止の原則
すべてのUIComponentは直接DOM操作を行わず、必ずプロキシクラス経由でDOM操作を行います。

### 6.2 型安全性の原則
各要素が受け入れ可能な子要素は型システムによって厳密に制約されます。

### 6.3 名前空間の明示性
異なる名前空間への移行は、必ず専用のゲートウェイ要素（`SvgC`, `MathC`, `ForeignObjectC`）を経由します。

## 7. MathML実装の優先順位

### 7.1 Phase 1: コア要素（最優先）
- `MathC` - ルート要素
- `MiC`, `MnC`, `MoC` - 基本トークン
- `MrowC` - 行コンテナ

### 7.2 Phase 2: 基本レイアウト
- `MfracC` - 分数
- `MsupC`, `MsubC` - 上付き・下付き
- `MsqrtC` - 平方根

### 7.3 Phase 3: 高度なレイアウト
- `MtableC`, `MtrC`, `MtdC` - 行列・表
- `MunderC`, `MoverC` - 装飾記号
- `MrootC` - n乗根

## 8. プロキシクラスの設計

### 8.1 既存のプロキシクラス
- `HtmlElementProxy` - HTML要素用
- `SvgElementProxy` - SVG要素用

### 8.2 新規プロキシクラス（必要）
- `MathMLElementProxy` - MathML要素用
  - 名前空間: `http://www.w3.org/1998/Math/MathML`
  - 要素作成メソッド
  - 属性設定メソッド

## 9. まとめ

### 9.1 DOM仕様の制約
- HTML、SVG、MathMLは異なる名前空間に属する
- 名前空間の境界を越えるには専用のゲートウェイ要素が必要
- 各要素が受け入れ可能な子要素は仕様で厳密に定義されている

### 9.2 UIComponent設計の対応
- HTML対応: 完全実装済み
- SVG対応: 完全実装済み、`SvgC`がゲートウェイ
- MathML対応: 未実装、`MathC`をゲートウェイとして実装予定

### 9.3 型安全性の確保
子要素型の設計により、コンパイル時に不正な要素の組み合わせを検出可能。DOM仕様に準拠した型安全なUIコンポーネントシステムを実現。
