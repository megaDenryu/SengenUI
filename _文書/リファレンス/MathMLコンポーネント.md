# MathMLコンポーネント リファレンス

> 本文書は `使い方/_MathMlREADME.md` から移設したリファレンスです。

## アーキテクチャ

MathMLコンポーネントはMathML名前空間に属し、HTML/SVGとは独立した要素階層を持つ。
HTMLからは `<math>` 要素（MathC）をゲートウェイとして埋め込む。

## 基本的な使い方

```typescript
// 分数: x/2
new MathC().child(
    new MfracC()
        .numerator(new MiC("x"))
        .denominator(new MnC("2"))
)

// 上付き文字: x^2
new MathC().child(
    new MsupC()
        .base(new MiC("x"))
        .superscript(new MnC("2"))
)
```

## コンポーネント一覧

### トークン要素（末端）
- `MiC` — 識別子（変数名など）
- `MnC` — 数値
- `MoC` — 演算子
- `MtextC` — テキスト
- `MsC` — 文字列リテラル
- `MspaceC` — 空白

### レイアウト要素（構造）
- `MrowC` — 水平グループ
- `MfracC` — 分数
- `MsqrtC` — 平方根
- `MrootC` — n乗根
- `MsupC` / `MsubC` / `MsubsupC` — 上付き・下付き
- `MoverC` / `MunderC` / `MunderoverC` — 上・下装飾
- `MtableC` / `MtrC` / `MtdC` — 行列・表
- `MfencedC` — 括弧付きグループ

### 共通メソッド
- `.color(c)` `.size(s)` `.style(s)` — スタイリング
- `.bind(callback)` — 参照取得
- `.child()` / `.childs()` — 子要素追加

## ブラウザ対応
- Chrome 109+, Firefox 全バージョン, Safari 14.1+
