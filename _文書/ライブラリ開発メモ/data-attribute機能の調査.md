`data-attribute`（データ属性）を使う理由は、OOPをやめるためではありません。むしろ、**「ドメイン（OOP）」と「見た目（CSS）」の結合度を下げ、あなたのSengenUI + Vanilla Extract環境での開発効率を劇的に上げるため**です。

一言で言うと、**「JS側でCSSクラスの付け外し（文字列操作）をしたくないから」**です。

具体的なメリットを3つの観点で解説します。

---

### 1. Vanilla Extract との相性が抜群（ハッシュ化問題の回避）

SengenUIでは `vanilla-extract` を推奨されていますね。これが最大の理由です。
`vanilla-extract` はビルド時にCSSクラス名をハッシュ化（例: `_1x9d8f`）します。

#### クラスの付け外しでやる場合（辛い点）

JS側で「選択状態」を表現しようとすると、ハッシュ化されたクラスオブジェクトをimportして、条件分岐で `addClass` / `removeClass` しなければなりません。

```typescript
// ❌ 辛いパターン
import { node_base, node_selected, node_dragging } from "./style.css";

// 状態が変わるたびに、クラスの「差分管理」をJSがしないといけない
updateVisual() {
    this.div.addClass(node_base);
    
    if (this.isSelected) {
        this.div.addClass(node_selected); // 追加
    } else {
        this.div.dom.removeCSSClass(node_selected); // 削除漏れが起きやすい
    }

    if (this.isDragging) {
        this.div.addClass(node_dragging);
    }
}

```

状態が増える（ホバー、接続中、エラー時...）と、この `if/else` の組み合わせは爆発します。

#### Data Attribute でやる場合（推奨）

JSは「今の状態名」を属性にセットするだけ。**見た目の定義はCSSファイルに閉じ込められます。**

```typescript
// ✅ SengenUI 推奨パターン
// JS側：論理的な状態名だけを知っていればいい
updateVisual() {
    // DOMに <div data-state="selected"> と書き込むだけ
    this.div.setAttribute("data-state", this.isSelected ? "selected" : "idle");
}

```

```typescript
// style.css.ts (Vanilla Extract)
import { style } from '@vanilla-extract/css';

export const node = style({
    background: 'white',
    // CSS側で「属性」をトリガーにしてスタイルを変える
    selectors: {
        '&[data-state="selected"]': {
            borderColor: 'blue',
            zIndex: 200
        },
        '&[data-state="dragging"]': {
            opacity: 0.8,
            cursor: 'grabbing',
            zIndex: 300
        }
    }
});

```

これにより、**「JSは状態を通知するだけ」「CSSはその状態にどう反応するか決めるだけ」**という責務分離（SoC）が完成します。

### 2. 「スタイリングのロジック」をCSSへ追放できる

Miroのようなツールでは、「選択されている」かつ「ドラッグ中」ではないが「ホバーされている」といった**複合状態**が発生します。

これをOOP（JS）の中で `setStyleCSS` で解決しようとすると、JSコードがデザインロジックで汚染されます。

```typescript
// ❌ JSがデザインを知りすぎている
if (selected && !dragging) {
   this.div.setStyleCSS({ border: '2px solid blue' });
} else if (dragging) {
   this.div.setStyleCSS({ border: '2px dashed red' });
}

```

データ属性を使えば、この優先順位付けはCSS（セレクタの詳細度や記述順）に任せることができます。JSはただ事実（Fact）を属性として吐き出すだけで済みます。

### 3. デバッグの可読性（DOMが仕様書になる）

開発中、Chrome DevToolsを開いたときの違いは歴然です。

* **クラスベース:** `<div class="_1u28d _92kd8 _10dk2">`
* これでは、今この要素がどういう状態なのか、人間には判読不可能です。


* **データ属性:** `<div class="_1u28d" data-status="selected" data-mode="connecting">`
* **DOMを見るだけで「今、アプリがどういう状態判定になっているか」が一目瞭然**です。バグ調査の速度が段違いです。



---

### SengenUIへの実装提案

`LV1HtmlComponentBase` に属性操作のヘルパーが無いようでしたら、以下のように拡張・使用することを推奨します（憲法に従い `setAttribute` をラップします）。

**1. ライブラリ拡張 (LV1HtmlComponentBase.ts)**

```typescript
// 既存のメソッドに加え、メソッドチェーン用の属性セッターを追加
public setAttribute(key: string, value: string): this {
    this.dom.element.setAttribute(key, value);
    return this;
}

// 真偽値でトグルする便利メソッド
public toggleAttribute(key: string, isSet: boolean, valueIfTrue: string = "true"): this {
    if (isSet) {
        this.dom.element.setAttribute(key, valueIfTrue);
    } else {
        this.dom.element.removeAttribute(key);
    }
    return this;
}

```

**2. 実装イメージ (NoteComponent.ts)**

OOPとしてのクラス（状態持ち）は維持しつつ、変更検知時にDOMへ反映させます。

```typescript
export class StickyNote extends LV2HtmlComponentBase {
    // OOP的な状態管理
    private _state: 'idle' | 'selected' | 'dragging' = 'idle';

    // セッター経由でDOM属性を同期
    public set state(v: 'idle' | 'selected' | 'dragging') {
        this._state = v;
        // JSは「状態が変わった」ことだけをDOMに伝える
        this._rootDiv.setAttribute("data-state", v);
    }

    protected createComponentRoot(): HtmlComponentBase {
        return new DivC({ class: note_style })
            .bind(div => this._rootDiv = div)
            // ...
    }
}

```

**3. CSS (style.css.ts)**

```typescript
export const note_style = style({
    // 基本スタイル
    transition: 'transform 0.2s',
    selectors: {
        '&[data-state="selected"]': {
            boxShadow: '0 0 0 4px #3b82f6', // 選択時の青枠
            zIndex: 'var(--z-node-selected)' // 前回の定数管理と連携
        },
        '&[data-state="dragging"]': {
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 'var(--z-node-dragging)',
            cursor: 'grabbing'
        }
    }
});

```

### まとめ

* OOP（クラス）の状態管理は**そのまま続けてください**。正解です。
* ただし、その状態によって「見た目（CSS）」を変える手段として、`addClass` や `setStyleCSS` を使うのではなく、**「データ属性（`data-state`等）を書き換える」**という手法に切り替えてください。
* そうすることで、**複雑なCSS設計を `style.css.ts` に封じ込め、TypeScriptコードを「ビジネスロジック」に集中させる**ことができます。