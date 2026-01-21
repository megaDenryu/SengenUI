# data-attribute と Vanilla Extract の連携テクニック（高度な運用）

SengenUIで `data-attribute` を活用する際、単に文字列で管理するのではなく、TypeScriptの強みを活かして**「安全で、ナビゲーション可能（Jump to Definition可能）な」**状態管理を行うテクニックをまとめます。

## 背景： 文字列ベース管理の脆弱性

`data-state="active"` のようなコードは、以下の問題があります。

1. **Typoのリスク**: JSで `"active"`, CSSで `"actve"` と書いてしまってもエラーが出ない。
2. **検索性の低さ**: `"active"` でgrepすると関係ない箇所のヒットが多すぎて追えない。
3. **リファクタリングの辛さ**: 状態名を `"active"` から `"focus"` に変えたい時、手動で全置換が必要。

## 解決策： Shared Constants Pattern

状態定義（State Definition）を一つのTruth（真実の源）として別ファイルに切り出し、ComponentとCSSの両方からimportする手法です。

Vanilla Extractが **TypeScriptファイル (`.ts`) であること** を最大限に利用します。

### 構成例

ファイル構成を以下のようにします。

```text
MyComponent/
  ├── MyComponent.ts      (Logic)
  ├── styles.css.ts       (Style)
  └── constants.ts        (Definitions)
```

### 1. 定数定義 (constants.ts)

属性名（Attribute Key）と、属性値（Attribute Value）の両方を定数化します。

```typescript
// constants.ts

// 属性のキー自体も定数化しておくと、後で "data-status" に変えたくなった時に楽
export const ATTR = {
    STATE: "data-state",
    MODE: "data-mode"
} as const;

// 状態の値
export const STATE = {
    IDLE: "idle",
    HOVER: "hover",
    SELECTED: "selected",
    DRAGGING: "dragging"
} as const;
```

### 2. スタイル定義 (styles.css.ts)

ES6の **Computed Property Name** ( `[ATTR.STATE]` ) と Template Literal を組み合わせてセレクタを作ります。

```typescript
// styles.css.ts
import { style } from '@vanilla-extract/css';
import { ATTR, STATE } from './constants';

export const root = style({
    // ...base styles
    
    selectors: {
        // Build結果は [data-state="selected"] のようなCSSになる
        [`&[${ATTR.STATE}="${STATE.SELECTED}"]`]: {
            borderColor: 'blue',
            zIndex: 10
        },
        
        // テンプレートリテラルで書くことで可読性を維持
        [`&[${ATTR.STATE}="${STATE.DRAGGING}"]`]: {
            borderColor: 'green',
            opacity: 0.8
        }
    }
});
```

### 3. コンポーネント実装 (MyComponent.ts)

```typescript
// MyComponent.ts
import { DivC } from "SengenUI";
import * as styles from "./styles.css";
import { ATTR, STATE } from "./constants"; // 同じ定数をimport

export class MyComponent {
    private el: DivC;

    constructor() {
        this.el = new DivC({ class: styles.root });
    }

    public onSelect() {
        // 定数を使うことで、もしつづりを間違えていればコンパイルエラーになる
        this.el.setAttribute(ATTR.STATE, STATE.SELECTED);
    }

    public onReset() {
        this.el.setAttribute(ATTR.STATE, STATE.IDLE);
    }
}
```

## さらなる応用： Helper関数の作成

毎回 `[&[${ATTR}...` を書くのが面倒な場合、セレクタ生成用の簡易ヘルパーを作ることも可能です。

```typescript
// selectorUtils.ts (例)
export const dataAttr = (key: string, value: string) => `&[${key}="${value}"]`;
```

```typescript
// styles.css.ts
import { dataAttr } from 'utils';

export const root = style({
    selectors: {
        [dataAttr(ATTR.STATE, STATE.SELECTED)]: {
            // ...
        }
    }
});
```

これはお好みで導入してください。まずは **「定数ファイルを共有する」** だけで、堅牢性は劇的に向上します。
