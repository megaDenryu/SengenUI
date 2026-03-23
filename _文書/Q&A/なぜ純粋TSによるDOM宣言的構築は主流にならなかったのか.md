# なぜ純粋TSによるDOM宣言的構築は主流にならなかったのか

## 疑問

SengenUIのように、DOM要素を型付きクラスでラップし、メソッドチェーンで宣言的にUIツリーを構築するアプローチは、誰でも思いつきそうに見える。なぜ主流のフレームワーク（React, Vue, Svelte等）はJSXやテンプレートDSLといった独自構文を採用したのか。

## 似たアプローチは存在する（が無名）

- **VanJS** — `van.tags.div(van.tags.span("hello"))` — SengenUIにかなり近い。純粋JS、ビルド不要。しかしほぼ無名
- **Mithril.js / HyperScript** — `m("div", { class: "foo" }, [...])` / `h("div", ...)` — タグ名が文字列なので型安全でない
- **jQuery** — DOMラップ + メソッドチェーンの元祖。コンポーネントモデルがない

「誰も思いつかなかった」のではなく、**思いついた人はいたが主流にならなかった**。

## 主流にならなかった理由

### 1. Facebookのマーケティング力

React（2013年）はFacebookが社内で使い、大規模に推進した。JSXは発表時に猛烈に批判された（「HTMLとJSを混ぜるな」）。しかしFacebookのエンジニアリングリソースとカンファレンス発表で押し切った。技術的優位性ではなく、**組織の力で勝った**。

### 2. 「HTMLに見える」という罠

JSXが選ばれた最大の理由は「web開発者にHTMLとして馴染みがある」こと。

```jsx
<div className="container">
  <span>Hello</span>
</div>
```

これはHTMLに**見える**。しかし**HTMLではない**。`className` vs `class`、camelCaseのスタイル、イベントハンドラの命名規則、全てHTMLと微妙に違う。見た目の親しみやすさが偽の安心感を与え、実際にはHTMLの知識が通用しないギャップで混乱する。

対して `div({ class: styles.container })` は最初から「これはTypeScriptだ」と分かる。嘘がない。しかし「HTMLっぽくない」ので、HTML/CSSから来た人には取っつきにくく見える。

### 3. TypeScriptが支配的でなかった

Reactが普及した2014〜2016年、TypeScriptはまだニッチだった。SengenUI方式の真価は**型安全なメソッドチェーン**にある。`div()` が `DivC` を返し、そこに型付きメソッドがずらりと生えるところ。plain JavaScriptでは `div({ class: "foo" })` も `<div className="foo">` も表現力は大差ない。

TypeScriptが支配的になった2020年以降でもJSXの慣性が強すぎて、誰も前提を疑い直さなかった。

### 4. 「メソッドチェーン = jQuery = 古い」という偏見

2013〜2015年、JSコミュニティはjQueryスタイルのメソッドチェーンから関数型コンポジションへ向かっていた。Reactの「UIは状態の関数」がこのトレンドに乗った。メソッドチェーンはjQueryを連想させ、ダサいものと見なされた。

jQueryが悪かったのはメソッドチェーンではなく、型がないこと、DOMの直接操作が無秩序なこと、コンポーネントモデルがないこと。SengenUIはメソッドチェーンの利点（discoverability、IDE補完）だけを取り、欠点を排除している。

### 5. Virtual DOMの「革命」物語

Reactのマーケティングは「Virtual DOMは速い、直接DOM操作は遅い」という物語を広めた。これにより「DOMを直接ラップして操作するアプローチは低レベルで遅い」という誤った認識が広まった。

実際にはVirtual DOMのdiffは余計なコスト。必要な箇所だけ直接更新する方が速い。SolidJSがVirtual DOMなしで高速なことで、近年この神話は崩れつつある。

### 6. JSXの政治的起源

React作者のJordan WalkeはFacebook社内のPHP拡張 XHP（PHPにXML構文を足すもの）に影響を受けてJSXを作った。JSXは「JavaScript向けの最適設計」ではなく、「PHP向けのアイデアのJavaScript移植」。PHP文化圏の発想がそのままJSに持ち込まれた。

## 技術的な比較

| 観点 | JSX | SengenUI方式 |
|---|---|---|
| 言語 | 独自構文（コンパイラ必須） | 標準TypeScript |
| 型安全 | 後付け（IntrinsicElements） | 設計の根幹（メソッドが型付き） |
| IDE体験 | JSX専用プラグインが必要 | TypeScript LSPだけで完全動作 |
| 学習コスト | HTML + JSXの差分 + フレームワークの暗黙知 | TypeScriptが読めれば読める |
| 嘘の有無 | HTMLに見えるがHTMLではない | 最初からTypeScriptだと分かる |
| デバッグ | 仮想DOMの中間層が介在 | 変数にDOMラッパーが入っている。直接見える |

## 認めるべきトレードオフ

### 深いネストの可読性

閉じタグによる構造の視覚的対応はJSXの方が見やすい:

```jsx
<div>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  </header>
</div>
```

```typescript
div().child(
    header().child(
        nav().child(
            ul().child(
                li().child(
                    a({ href: "/" }).child(span({ text: "Home" })))))))
```

ただし、こんな深いネストはそもそもView関数に分解すべき。分解すれば両者とも問題にならない。そしてその「分解すべき」という設計圧力がかかる方がむしろ良い。

## 結論

SengenUI方式が主流でないのは技術的劣位ではなく、Facebookの影響力 + TypeScript普及前のタイミング + jQueryへの偏見 + Virtual DOM神話の複合的な歴史的偶然。技術的にはSengenUI方式の方が正直な設計。
