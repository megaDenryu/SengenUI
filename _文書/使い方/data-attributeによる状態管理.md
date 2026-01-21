# data-attribute による状態管理とスタイリング

SengenUIでは、コンポーネントの「見た目の状態（State）」を管理するために、CSSクラスの付け外し（`addClass`/`removeClass`）ではなく、**HTMLのデータ属性（`data-*`）** を使用することを推奨しています。

これにより、JavaScript（状態の管理）とCSS（状態に応じた見た目の定義）をきれいに分離できます。

## 1. 基本的な使い方

`LV1HtmlComponentBase` に追加された以下のメソッドを使用します。

### 状態をセットする (`setAttribute`)

排他的な状態（例: モード切替、ステータス）に適しています。

```typescript
// Component.ts
this.div.setAttribute("data-state", "selected");
this.div.setAttribute("data-state", "idle");
```

### フラグを切り替える (`toggleAttribute`)

真偽値の状態（例: 有効/無効、ドラッグ中かどうか）に適しています。
`true` の場合のみ属性が付与され、`false` の場合は属性ごと削除されます。

```typescript
// Component.ts
// 第2引数が true なら data-loading="true" が付く
// false なら data-loading 属性が消える
this.div.toggleAttribute("data-loading", isLoading);
```

## 2. Vanilla Extract でのスタイル定義

CSS側では、属性セレクタを使ってスタイルを定義します。
Vanilla Extractの `style` 関数内でネストされたセレクタとして記述します。

```typescript
// style.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  background: 'white',
  border: '1px solid gray',
  
  // 状態に応じたスタイル定義
  selectors: {
    // data-state="selected" の場合
    '&[data-state="selected"]': {
        borderColor: 'blue',
        backgroundColor: '#e0f2fe',
    },
    // data-loading 属性が存在する場合
    '&[data-loading="true"]': {
        opacity: 0.5,
        cursor: 'wait',
    }
  }
});
```

## 3. 状態の参照ジャンプ（リファクタリング対応）を実現する

「`"selected"` という文字列をJSとCSSで手打ちするのはバグの元ではないか？」「定義元にジャンプしたい」という懸念については、**定数ファイル（Constants）を介在させる**ことで解決できます。

Vanilla Extractは `.css.ts` 内でTypeScriptの変数を扱えるため、JSの変数をキーとして使用できます。

### Step 1: 状態の定数定義

```typescript
// ComponentStates.ts
export const BoxState = {
    Idle: "idle",
    Selected: "selected",
    Error: "error"
} as const;

export const BoxAttr = {
    State: "data-state"
} as const;
```

### Step 2: Componentでの利用 (Write)

```typescript
// Component.ts
import { BoxState, BoxAttr } from "./ComponentStates";

// ...
this.div.setAttribute(BoxAttr.State, BoxState.Selected);
```

### Step 3: CSSでの利用 (Read)

Vanilla Extractでは、Computed Property names（`[]`で囲ったキー）が使えます。

```typescript
// style.css.ts
import { style } from '@vanilla-extract/css';
import { BoxState, BoxAttr } from "./ComponentStates";

export const box = style({
  selectors: {
    // 定数を使ってセレクタを生成
    [`&[${BoxAttr.State}="${BoxState.Selected}"]`]: {
      borderColor: 'blue'
    },
    [`&[${BoxAttr.State}="${BoxState.Error}"]`]: {
      borderColor: 'red'
    }
  }
});
```

### メリット

これで、VSCode上で `BoxState.Selected` を「定義へ移動」すれば定数ファイルに飛びますし、「シンボルの名前変更」を行えば、**コンポーネント(setter)とスタイル(selector)の両方が一括で書き換わります。**

これが、SengenUI + Vanilla Extractにおける**Type-Safeな状態管理**の最適解です。
