# MathML Components

TypeScript UIComponentフレームワーク用のMathML要素コンポーネント実装です。

## 概要

このライブラリは、MathML（Mathematical Markup Language）を使用して数式を表現するためのTypeScriptコンポーネント群を提供します。既存のHTML/SVGコンポーネントシステムと同様に、メソッドチェーンによる宣言的なUIコンポーネント構築が可能です。

## アーキテクチャ

### 名前空間の分離

- **HTML要素**: `http://www.w3.org/1999/xhtml`（デフォルト）
- **SVG要素**: `http://www.w3.org/2000/svg`
- **MathML要素**: `http://www.w3.org/1998/Math/MathML`

### ゲートウェイ要素

- `MathC` (`<math>`): HTML名前空間からMathML名前空間への入口
- HTMLコンポーネントの子要素として`MathC`を配置することで、MathML要素を使用可能

### 基底クラス階層

```
MathMLElementBase (抽象基底クラス)
├── MathMLTokenBase (テキストコンテンツを持つ要素)
│   ├── MiC (変数・識別子)
│   ├── MnC (数値)
│   ├── MoC (演算子)
│   └── MtextC (テキスト)
│
├── MathMLContainerBase (子要素を持つ要素)
│   ├── MathC (math要素)
│   ├── MrowC (数式の行)
│   ├── MstyleC (スタイル適用)
│   ├── SemanticsC (意味論情報)
│   ├── MtableC (表)
│   ├── MtrC (表の行)
│   ├── MtdC (表のセル)
│   ├── MpaddedC (パディング調整)
│   ├── MphantomC (不可視要素)
│   ├── MfencedC (括弧)
│   ├── MencloseC (囲み図形)
│   └── MathMLLayoutBase (レイアウト要素)
│       ├── MfracC (分数)
│       ├── MsupC (上付き)
│       ├── MsubC (下付き)
│       ├── MsubsupC (上下付き)
│       ├── MsqrtC (平方根)
│       ├── MrootC (n乗根)
│       ├── MunderC (下側装飾)
│       ├── MoverC (上側装飾)
│       └── MunderoverC (上下装飾)
│
└── MspaceC (スペース)
```

## 基本的な使用方法

### シンプルな数式

```typescript
import { DivC } from "./HtmlComponents/DivC";
import { MathC } from "./MathMLComponents/MathC";
import { MiC } from "./MathMLComponents/MiC";
import { MoC } from "./MathMLComponents/MoC";
import { MnC } from "./MathMLComponents/MnC";

// x + 5 = 10
const equation = new DivC()
    .child(
        new MathC()
            .child(new MiC().setText("x"))
            .child(new MoC().setText("+"))
            .child(new MnC().setText("5"))
            .child(new MoC().setText("="))
            .child(new MnC().setText("10"))
    );
```

### 分数

```typescript
import { MathC } from "./MathMLComponents/MathC";
import { MfracC } from "./MathMLComponents/MfracC";
import { MnC } from "./MathMLComponents/MnC";

// 1/2
const fraction = new MathC()
    .child(
        new MfracC()
            .setNumeratorAndDenominator(
                new MnC().setText("1"),
                new MnC().setText("2")
            )
    );
```

### 上付き・下付き

```typescript
import { MathC } from "./MathMLComponents/MathC";
import { MsupC } from "./MathMLComponents/MsupC";
import { MsubC } from "./MathMLComponents/MsubC";
import { MiC } from "./MathMLComponents/MiC";
import { MnC } from "./MathMLComponents/MnC";

// x²
const squared = new MathC()
    .child(
        new MsupC()
            .setBaseAndSuperscript(
                new MiC().setText("x"),
                new MnC().setText("2")
            )
    );

// aₙ
const subscript = new MathC()
    .child(
        new MsubC()
            .setBaseAndSubscript(
                new MiC().setText("a"),
                new MiC().setText("n")
            )
    );
```

### 平方根・n乗根

```typescript
import { MathC } from "./MathMLComponents/MathC";
import { MsqrtC } from "./MathMLComponents/MsqrtC";
import { MrootC } from "./MathMLComponents/MrootC";
import { MnC } from "./MathMLComponents/MnC";

// √2
const sqrt = new MathC()
    .child(
        new MsqrtC()
            .child(new MnC().setText("2"))
    );

// ³√8
const cubeRoot = new MathC()
    .child(
        new MrootC()
            .setBaseAndIndex(
                new MnC().setText("8"),
                new MnC().setText("3")
            )
    );
```

### 総和・積分記号

```typescript
import { MathC } from "./MathMLComponents/MathC";
import { MunderoverC } from "./MathMLComponents/MunderoverC";
import { MoC } from "./MathMLComponents/MoC";
import { MiC } from "./MathMLComponents/MiC";
import { MnC } from "./MathMLComponents/MnC";
import { MrowC } from "./MathMLComponents/MrowC";

// Σ (i=1からn)
const summation = new MathC()
    .child(
        new MunderoverC()
            .setBaseUnderscriptAndOverscript(
                new MoC().setText("∑"),
                new MrowC()
                    .child(new MiC().setText("i"))
                    .child(new MoC().setText("="))
                    .child(new MnC().setText("1")),
                new MiC().setText("n")
            )
    );
```

### 行列

```typescript
import { MathC } from "./MathMLComponents/MathC";
import { MtableC } from "./MathMLComponents/MtableC";
import { MtrC } from "./MathMLComponents/MtrC";
import { MtdC } from "./MathMLComponents/MtdC";
import { MnC } from "./MathMLComponents/MnC";

// 2x2 行列
const matrix = new MathC()
    .child(
        new MtableC()
            .child(
                new MtrC()
                    .child(new MtdC().child(new MnC().setText("1")))
                    .child(new MtdC().child(new MnC().setText("2")))
            )
            .child(
                new MtrC()
                    .child(new MtdC().child(new MnC().setText("3")))
                    .child(new MtdC().child(new MnC().setText("4")))
            )
    );
```

## コンポーネント一覧

### コア要素

| コンポーネント | 要素 | 説明 |
|-------------|------|------|
| `MathC` | `<math>` | MathML名前空間のルート要素 |
| `MiC` | `<mi>` | 変数・識別子 |
| `MnC` | `<mn>` | 数値 |
| `MoC` | `<mo>` | 演算子 |
| `MrowC` | `<mrow>` | 数式の行（グループ化） |

### レイアウト要素

| コンポーネント | 要素 | 説明 |
|-------------|------|------|
| `MfracC` | `<mfrac>` | 分数 |
| `MsupC` | `<msup>` | 上付き |
| `MsubC` | `<msub>` | 下付き |
| `MsubsupC` | `<msubsup>` | 上下付き |
| `MsqrtC` | `<msqrt>` | 平方根 |
| `MrootC` | `<mroot>` | n乗根 |
| `MunderC` | `<munder>` | 下側装飾 |
| `MoverC` | `<mover>` | 上側装飾 |
| `MunderoverC` | `<munderover>` | 上下装飾 |

### 表要素

| コンポーネント | 要素 | 説明 |
|-------------|------|------|
| `MtableC` | `<mtable>` | 表・行列 |
| `MtrC` | `<mtr>` | 表の行 |
| `MtdC` | `<mtd>` | 表のセル |

### トークン要素

| コンポーネント | 要素 | 説明 |
|-------------|------|------|
| `MtextC` | `<mtext>` | テキスト |
| `MspaceC` | `<mspace>` | スペース |

### スタイル・意味論要素

| コンポーネント | 要素 | 説明 |
|-------------|------|------|
| `MstyleC` | `<mstyle>` | スタイル適用 |
| `SemanticsC` | `<semantics>` | 意味論情報 |

### オプション要素

| コンポーネント | 要素 | 説明 |
|-------------|------|------|
| `MpaddedC` | `<mpadded>` | パディング・サイズ調整 |
| `MphantomC` | `<mphantom>` | 不可視要素（スペース占有） |
| `MfencedC` | `<mfenced>` | 括弧（非推奨） |
| `MencloseC` | `<menclose>` | 図形による囲み |

## 共通メソッド

### MathMLElementBase（全要素共通）

```typescript
// 色の設定
.setMathColor("red")
.setMathColor("#FF0000")

// サイズの設定
.setMathSize("2em")
.setMathSize(16)

// フォントバリアントの設定
.setMathVariant("bold")
.setMathVariant("italic")

// ディスプレイスタイルの設定
.setDisplayStyle(true)

// CSSクラスの追加
.addClass("custom-class")
.addClass(["class1", "class2"])

// インラインスタイルの設定
.setStyleCSS(styleObject)

// データバインディング
.bind(signal, handler)
```

### MathMLContainerBase（コンテナ要素）

```typescript
// 子要素の追加
.child(component)
.childs([component1, component2])

// 子要素の削除
.removeChild(component)

// 子要素の挿入
.insertChildAt(index, component)

// 子要素のクリア
.clearChildren()

// 子要素の移動
.moveChildToIndex(component, newIndex)
```

### MathMLTokenBase（トークン要素）

```typescript
// テキストの設定
.setText("content")

// テキストの取得
.getText()

// テキストのクリア
.clearText()
```

## スタイリング

MathML要素にはVanilla-extractによる型安全なCSSスタイリングが適用可能です。

```typescript
import { style } from "@vanilla-extract/css";

const mathStyle = style({
    fontSize: "1.5em",
    color: "blue"
});

const styledMath = new MathC()
    .addClass(mathStyle)
    .child(new MiC().setText("x"));
```

## 注意事項

### 直接的なDOM操作の禁止

このフレームワークではDOM要素への直接アクセスは禁止されています。全ての操作はプロキシクラス経由で行う必要があります。

```typescript
// ❌ 禁止
element._mathmlDom.element.setAttribute("color", "red");

// ✅ 正しい
element.setMathColor("red");
```

### 名前空間の境界

MathML要素はHTML要素の子として直接配置できません。必ず`MathC`要素を経由する必要があります。

```typescript
// ❌ 禁止
new DivC().child(new MiC().setText("x"));

// ✅ 正しい
new DivC().child(
    new MathC().child(new MiC().setText("x"))
);
```

### 要素の親子関係

一部の要素は特定の子要素のみを受け入れます。

- `MtableC`: `MtrC`のみ
- `MtrC`: `MtdC`のみ
- レイアウト要素（`MfracC`, `MsupC`等）: 決められた数の子要素のみ

## ブラウザサポート

MathMLは主要なモダンブラウザでサポートされています：

- Chrome/Edge 109+
- Firefox（全バージョン）
- Safari 14.1+

古いブラウザではポリフィルが必要な場合があります。

## 参考資料

- [MDN Web Docs - MathML](https://developer.mozilla.org/en-US/docs/Web/MathML)
- [W3C MathML 3.0 Specification](https://www.w3.org/TR/MathML3/)
