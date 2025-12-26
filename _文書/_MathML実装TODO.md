# MathML Component実装 進捗管理TODO

## Phase 1: 基盤整備

### 1.1 プロキシクラスの実装
- [x] `MathMLElementProxy.ts` - MathML要素用プロキシクラス
  - [x] 名前空間定義 (`http://www.w3.org/1998/Math/MathML`)
  - [x] 要素作成メソッド
  - [x] 属性設定メソッド
  - [x] 子要素追加・削除メソッド

### 1.2 基底クラスの実装
- [x] `MathMLElementBase.ts` - すべてのMathML要素の基底クラス
  - [x] プロキシの統合
  - [x] 共通メソッド（属性設定、スタイル、表示制御）
  - [x] `bind()`メソッド
  - [x] イベント管理（必要に応じて）

- [x] `MathMLContainerBase.ts` - コンテナ系の基底クラス
  - [x] 子要素管理機能
  - [x] `child()`, `childs()`メソッド

- [x] `MathMLLayoutBase.ts` - レイアウト系の基底クラス
  - [x] レイアウト固有の共通機能

- [x] `MathMLTokenBase.ts` - トークン系の基底クラス
  - [x] テキストコンテンツ設定機能

### 1.3 型定義の更新
- [x] `HtmlComponentBase.ts` の型定義更新
  - [x] `HtmlComponentChild`に`MathC`を追加
  
- [x] `MathMLElementBase.ts` に型定義追加
  - [x] `MathMLComponentChild = MathMLElementBase`

## Phase 2: コア要素の実装（最優先）

### 2.1 ルート要素
- [x] `MathC.ts` - `<math>`タグ
  - [x] `MathMLContainerBase`を継承
  - [x] HTML要素の子として追加可能
  - [x] display属性（block/inline）
  - [x] 数式全体のコンテナ機能

### 2.2 基本トークン要素
- [x] `MiC.ts` - `<mi>`タグ（識別子）
  - [x] `MathMLTokenBase`を継承
  - [x] テキストコンテンツ設定
  - [x] mathvariant属性（normal/bold/italic等）

- [x] `MnC.ts` - `<mn>`タグ（数値）
  - [x] `MathMLTokenBase`を継承
  - [x] テキストコンテンツ設定
  
- [x] `MoC.ts` - `<mo>`タグ（演算子）
  - [x] `MathMLTokenBase`を継承
  - [x] テキストコンテンツ設定
  - [x] form属性（prefix/infix/postfix）
  - [x] stretchy属性

### 2.3 基本コンテナ
- [x] `MrowC.ts` - `<mrow>`タグ（行）
  - [x] `MathMLContainerBase`を継承
  - [x] 複数の子要素を横並びに配置

## Phase 3: 基本レイアウト要素

### 3.1 分数
- [x] `MfracC.ts` - `<mfrac>`タグ
  - [x] `MathMLLayoutBase`を継承
  - [x] 分子・分母の2要素を受け入れ
  - [x] linethickness属性

### 3.2 上付き・下付き
- [x] `MsupC.ts` - `<msup>`タグ（上付き）
  - [x] `MathMLLayoutBase`を継承
  - [x] ベース・上付き文字の2要素を受け入れ

- [x] `MsubC.ts` - `<msub>`タグ（下付き）
  - [x] `MathMLLayoutBase`を継承
  - [x] ベース・下付き文字の2要素を受け入れ

- [x] `MsubsupC.ts` - `<msubsup>`タグ（上下付き）
  - [x] `MathMLLayoutBase`を継承
  - [x] ベース・下付き・上付きの3要素を受け入れ

### 3.3 根号
- [x] `MsqrtC.ts` - `<msqrt>`タグ（平方根）
  - [x] `MathMLLayoutBase`を継承
  - [x] 任意の数の子要素を受け入れ

- [x] `MrootC.ts` - `<mroot>`タグ（n乗根）
  - [x] `MathMLLayoutBase`を継承
  - [x] ベース・根指数の2要素を受け入れ

## Phase 4: 追加トークン要素

- [x] `MtextC.ts` - `<mtext>`タグ（テキスト）
  - [x] `MathMLTokenBase`を継承
  - [x] 通常のテキスト表示

- [x] `MspaceC.ts` - `<mspace>`タグ（スペース）
  - [x] `MathMLTokenBase`を継承
  - [x] width/height属性

## Phase 5: 高度なレイアウト要素

### 5.1 装飾記号
- [x] `MunderC.ts` - `<munder>`タグ（下部記号）
  - [x] `MathMLLayoutBase`を継承
  - [x] ベース・下部記号の2要素を受け入れ
  - [x] accentunder属性
  - [x] setBaseAndUnderscript()ヘルパーメソッド

- [x] `MoverC.ts` - `<mover>`タグ（上部記号）
  - [x] `MathMLLayoutBase`を継承
  - [x] ベース・上部記号の2要素を受け入れ
  - [x] accent属性
  - [x] setBaseAndOverscript()ヘルパーメソッド

- [x] `MunderoverC.ts` - `<munderover>`タグ（上下記号）
  - [x] `MathMLLayoutBase`を継承
  - [x] ベース・下部・上部記号の3要素を受け入れ
  - [x] accent/accentunder属性
  - [x] setBaseUnderscriptAndOverscript()ヘルパーメソッド

### 5.2 行列・表
- [x] `MtableC.ts` - `<mtable>`タグ（表）
  - [x] `MathMLContainerBase`を継承
  - [x] 行要素のみを子として受け入れ
  - [x] frame/rowlines/columnlines属性
  - [x] rowspacing/columnspacing属性

- [x] `MtrC.ts` - `<mtr>`タグ（表の行）
  - [x] `MathMLContainerBase`を継承
  - [x] セル要素のみを子として受け入れ
  - [x] rowalign/columnalign属性

- [x] `MtdC.ts` - `<mtd>`タグ（表のセル）
  - [x] `MathMLContainerBase`を継承
  - [x] 任意のMathML要素を受け入れ
  - [x] rowspan/colspan属性
  - [x] rowalign/columnalign属性

### 5.3 スタイル・意味情報
- [x] `MstyleC.ts` - `<mstyle>`タグ（スタイル設定）
  - [x] `MathMLContainerBase`を継承
  - [x] 子要素にスタイルを継承
  - [x] mathcolor/mathsize/mathvariant属性
  - [x] displaystyle/scriptlevel属性

- [x] `SemanticsC.ts` - `<semantics>`タグ（意味情報）
  - [x] `MathMLContainerBase`を継承
  - [x] 表示用と意味情報を分離

## Phase 6: その他の要素（必要に応じて）

- [x] `MpaddedC.ts` - `<mpadded>`タグ（余白調整）
  - [x] width/height/depth属性
  - [x] lspace/voffset属性
  
- [x] `MphantomC.ts` - `<mphantom>`タグ（非表示だが領域確保）
  - [x] 基本実装完了
  
- [x] `MfencedC.ts` - `<mfenced>`タグ（括弧）
  - [x] open/close/separators属性
  - [x] 非推奨の注意書き追加
  
- [x] `MencloseC.ts` - `<menclose>`タグ（囲み記号）
  - [x] notation属性（複数指定可能）
  - [x] 17種類のnotationタイプ定義
  
- [ ] `MactionC.ts` - `<maction>`タグ（アクション）
  - 実装不要（インタラクティブ機能は現時点で対応外）

## Phase 7: ドキュメント作成

- [x] `README.md` - 包括的なドキュメント
  - [x] アーキテクチャ説明（名前空間、基底クラス階層）
  - [x] 基本的な使い方（数式、分数、上下付き、根号、総和、行列）
  - [x] コンポーネント一覧表
  - [x] 共通メソッドリファレンス
  - [x] スタイリング方法
  - [x] 注意事項（DOM操作禁止、名前空間境界、親子関係）
  - [x] ブラウザサポート情報

## 実装の進め方

1. **Phase 1（基盤整備）を最初に完了させる**
2. **Phase 2（コア要素）を実装し、動作確認**
3. **Phase 3（基本レイアウト）を実装**
4. その後は必要に応じてPhase 4以降を実装

## 注意事項

- すべての要素でDOM操作禁止の原則を厳守
- メソッドチェーンによる宣言的な記述を徹底
- SVGコンポーネントと同様の設計パターンを踏襲
- 型安全性を最優先
