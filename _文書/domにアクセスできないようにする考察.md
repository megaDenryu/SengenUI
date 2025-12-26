UIComponentBase の `dom` を外部から隠したい件、まずは TypeScript の仕組みを整理しつつ、現実的なガード方法を案内します。

## 進め方
1. TypeScript の公開／非公開制御の限界を確認
2. 取りうる対策パターン（protected 化や “友達” アクセサ）を比較
3. 推奨アプローチを具体例付きで提案

## 整理しておきたい事実
- TypeScript は構造的型システムなので、「インターフェース経由のときだけアクセス可能」といった“呼び出し経路”ベースの制限は提供していません。
- `public`/`protected`/`private` はクラスのソーススコープで判定され、インターフェース経由かどうかは無関係です。
- つまり、`public` にした以上は利用者が直接 `component.dom` を書けてしまうのが現実です。

## 取りうるガードパターン

### 1. `protected` 化＋内部アクセサの導入（友達パターン）
- `UIComponentBase` の `dom` を `protected` に落とし、フレームワーク内部だけが知る“鍵”を使ってアクセスする。
- 具体的には、モジュール内にだけ閉じた `const accessKey: unique symbol = Symbol()` を用意し、
  ```ts
  const domAccessKey: unique symbol = Symbol('domAccessKey');

  export abstract class UIComponentBase {
      protected abstract get dom(): DomProxy;
      protected get [domAccessKey](): DomProxy { return this.dom; }
  }

  export function getDomProxyForFramework(component: UIComponentBase): DomProxy {
      return component[domAccessKey];
  }
  ```
  のようにすれば、鍵（`domAccessKey`）そのものを外部に公開しない限り、アプリ側からは `dom` に触れません。
- フレームワーク内部では `getDomProxyForFramework` を利用して従来通り `DomProxy` を扱えます。

### 2. 内部専用インターフェースをエクスポートしない
- アプリ利用者には `UIComponentPublic`（`dom` を持たない型）だけを見せ、
  フレームワーク内部では `UIComponentInternal extends UIComponentPublic` に `dom` を追加する。
- ユーザーコードが直接 `UIComponentInternal` を import できないようにモジュールを分ける運用が必要です。

### 3. `private`/`protected` + ビルド時検出
- `public` を諦めて `protected` にした上で、フレームワーク側の抽象クラスや mixin による実装で完結させる。
- もしどうしても外部型との整合に `public` が必要なら、上記 1 の“鍵付きアクセサ”が一番確実です。

## 推奨
個人的には **パターン1（unique symbol を使った友達パターン）** が一番バランスが良いです。  
- API surface は `public` から `protected` に落とせるので利用者が `component.dom` を書いた時点で即ビルドエラー。
- フレームワーク内部では `Symbol` で守られたアクセサを共有でき、運用負荷も高くありません。
- もし TypeScript の構造的型チェックをすり抜けようとするユーザーがいても、`domAccessKey` が手元にない限りアクセスできません。

導入の際は `UIComponentBase` の `dom` を `protected` に変更し、内部ユーティリティ関数（あるいは `DomProxyAccessor` のようなクラス）で `Symbol` を噛ませるだけで OK です。