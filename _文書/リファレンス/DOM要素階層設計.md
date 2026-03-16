# DOM要素階層設計

> 本文書は `使い方/_DOM_Element_Hierarchy_Design.md` から移設したリファレンスです。

SengenUIが扱うDOM要素の名前空間とUIComponent階層の対応関係、および名前空間間の橋渡し（ゲートウェイ要素）を定義する。

## DOM要素の名前空間

```
Node
 └── Element
      ├── HTMLElement  ─── HtmlElementProxy  ─── LV1 / LV2
      ├── SVGElement   ─── SvgDomProxy       ─── SvgUIComponent
      └── MathMLElement─── MathMLDomProxy    ─── MathMLComponent
```

## ゲートウェイ要素（名前空間の境界）

| 遷移 | ゲートウェイ要素 | SengenUIクラス |
|---|---|---|
| HTML → SVG | `<svg>` | `SvgC` |
| HTML → MathML | `<math>` | `MathC`（計画中） |
| SVG → HTML | `<foreignObject>` | `ForeignObjectC` |

## 子要素の型制約

- `HtmlComponentChild`: LV1 / LV2 / SvgC / MathC
- `SvgComponentChild`: SVG系コンポーネント + ForeignObjectC
- `MathMLComponentChild`: MathML系コンポーネントのみ

各名前空間のコンポーネントは、対応する子要素型のみを受け入れる。
