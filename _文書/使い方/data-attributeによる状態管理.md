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

## 3. 状態の参照ジャンプを実現する

「`"selected"` という文字列をJSとCSSで手打ちするのはバグの元ではないか？」「定義元にジャンプしたい」という懸念については、**定数ファイル（Constants）を介在させる**ことで解決できます。

Vanilla Extractは `.css.ts` 内でTypeScriptの変数を扱えるため、JSの変数をキーとして使用できます。

### 書き方と使い方

Vanilla Extractでは、Computed Property names（`[]`で囲ったキー）が使えます。
**data-attribute用のスタイルはglobalStyleで定義する。Selectorでdata-attributeを定義する機能はVEでは提供されていないの実行時にエラーになる。しかもコンパイルではエラーを検出できないので注意**

#### 状態宣言
状態は以下のようにkey-value Objectの完全定数として定義すると散らばらなくてよい。
```typescript
// 状態.ts
export const カスタムセレクトボタン基本css_state = {
    attribute : "data-selected",
    value : {
        selected : "true",
        notSelected : "false"
    }
} as const;
```
#### css定義
状態.tsの定数オブジェクトを参照して
```ts
// style.css.ts
export const カスタムセレクトボタン基本css = style({
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2c3e50',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    userSelect: 'none',
    
    // ホバー状態
    ':hover': {
        backgroundColor: '#e3f2fd',
        borderColor: '#64b5f6',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
    },

    ':focus': {
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(52, 144, 220, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)'
    },
});
// data-attribute用のスタイル（globalStyleで定義しないといけない。Selectorで定義する機能はVEでは提供されていないのでエラーになる。）
globalStyle(`${カスタムセレクトボタン基本css}[${カスタムセレクトボタン基本css_state.attribute}="${カスタムセレクトボタン基本css_state.value.selected}"]`, {
    backgroundColor: '#e8f5e8',
    borderColor: '#28a745',
    color: '#155724',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
});

globalStyle(`${カスタムセレクトボタン基本css}[${カスタムセレクトボタン基本css_state.attribute}="${カスタムセレクトボタン基本css_state.value.selected}"]:hover`, {
    backgroundColor: '#d4edda',
    borderColor: '#1e7e34',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
});
```

#### コンポーネントでの状態変更
```ts
private 選択状態を更新(選択中: boolean): void {
        this._componentRoot.setAttribute(
            カスタムセレクトボタン基本css_state.attribute,
            選択中 ? カスタムセレクトボタン基本css_state.value.selected : カスタムセレクトボタン基本css_state.value.notSelected
        );
    }
```


### メリット

これで、VSCode上で `BoxState.Selected` を「定義へ移動」すれば定数ファイルに飛びますし、「シンボルの名前変更」を行えば、**コンポーネント(setter)とスタイル(selector)の両方が一括で書き換わります。**

これが、SengenUI + Vanilla Extractにおける**Type-Safeな状態管理**の最適解です。
