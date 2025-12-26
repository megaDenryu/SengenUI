# 型安全なイベントハンドリングシステム - 移行ガイド

## 概要

LV1UIComponentBaseクラスとその派生コンポーネントに型安全なイベントハンドリングシステムを導入しました。これにより、TypeScriptの型システムを活用してイベントハンドリングの安全性と開発者体験が向上します。

## 主な変更点

### 1. 新しい型定義システム

`EventTypes.ts`ファイルに包括的なイベント型定義を追加：
- `CommonEventType`: 全要素で利用可能な共通イベント
- 要素別イベント型: `ButtonEventType`, `InputEventType`, `SelectEventType`など
- `TypedEventListener<T>`: 型安全なイベントリスナー型

### 2. LV1UIComponentBaseの拡張

基底クラスに型安全なイベントメソッドを追加：
- `addTypedEventListener<T>(type: T, listener: TypedEventListener<T>)`
- `removeTypedEventListener<T>(type: T, listener: TypedEventListener<T>)`
- 共通イベント用のコンビニエンスメソッド: `onClick()`, `onFocus()`, `onKeyDown()`など

### 3. 各UIコンポーネントの専用メソッド

各コンポーネントに要素固有のイベントメソッドを追加：

#### ButtonComponent
```typescript
button.onButtonClick((event: MouseEvent) => {
    // TypeScriptがeventの型を正確に推論
    console.log('Button clicked!', event.clientX, event.clientY);
});
```

#### InputComponent  
```typescript
input.onInputChange((event: Event) => {
    // input特有のchangeイベント
});

input.onEnterKey((event: KeyboardEvent) => {
    // Enterキー専用のコンビニエンスメソッド
});
```

#### TextAreaComponent
```typescript
textarea.onTextAreaInput((event: Event) => {
    // TextArea特有のinputイベント
});

textarea.onTextAreaSelect((event: Event) => {
    // テキスト選択イベント
});
```

#### SelectComponent
```typescript
select.onSelectChange((event: Event) => {
    // Select特有のchangeイベント
});
```

#### ImgComponent
```typescript
img.onImageLoad((event: Event) => {
    // 画像読み込み完了イベント
});

img.onImageError((event: ErrorEvent) => {
    // 画像読み込みエラーイベント
});
```

## 移行手順

### ステップ1: 古いイベントハンドリングから新しいメソッドへの移行

**Before（非推奨）:**
```typescript
button.addEventListener('click', (event) => {
    // eventの型が不明確
    console.log('clicked');
});

input.onChange((event) => {
    // 型安全性なし
});
```

**After（推奨）:**
```typescript
button.onClick((event: MouseEvent) => {
    // 型安全なイベントハンドリング
    console.log('clicked at', event.clientX, event.clientY);
});

// または要素固有のメソッドを使用
input.onInputChange((event: Event) => {
    // Input特有のchangeイベント
});
```

### ステップ2: 共通イベントの活用

基底クラスの共通イベントメソッドを活用：

```typescript
// 全てのコンポーネントで利用可能
component.onClick((event: MouseEvent) => { /* */ });
component.onFocus((event: FocusEvent) => { /* */ });
component.onKeyDown((event: KeyboardEvent) => { /* */ });
component.onInput((event: Event) => { /* */ });
component.onChange((event: Event) => { /* */ });
```

### ステップ3: 型安全なジェネリックメソッドの使用

高度な用途には型安全なジェネリックメソッドを使用：

```typescript
// 型安全なイベントリスナーの追加
component.addTypedEventListener('mouseover', (event: MouseEvent) => {
    // TypeScriptが正確な型を推論
    console.log('Mouse over at', event.pageX, event.pageY);
});

// 型安全なイベントリスナーの削除
component.removeTypedEventListener('mouseover', mouseOverHandler);
```

## 実践例

### InputAreaコンポーネントでの実装例

```typescript
export class InputArea extends UIContainer {
    private setupEventHandlers(): void {
        // 型安全なイベントハンドリング
        this.chatInput.onClick((event: MouseEvent) => {
            console.log('Input clicked');
        });

        this.chatInput.onKeyDown((event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'Enter') {
                this.sendMessage();
            }
        });

        this.sendButton.onClick((event: MouseEvent) => {
            this.sendMessage();
        });

        // Input特有のイベント
        this.chatInput.onInputChange((event: Event) => {
            this.validateInput();
        });
    }
}
```

## 開発者体験の向上

### 1. IntelliSense支援
- IDE上でイベントタイプとイベントオブジェクトのプロパティが正確に表示
- タイプミスやプロパティ名の間違いをコンパイル時に検出

### 2. 型安全性
- イベントオブジェクトの型が正確に推論される
- 存在しないプロパティへのアクセスをコンパイル時に防止

### 3. コードの可読性
- イベントの用途が名前から明確
- 要素固有のイベントメソッドにより意図が明確

## 注意事項

### 1. 後方互換性
- 古い`addEventListener`メソッドは`@deprecated`としてマークされているが、まだ動作します
- 段階的な移行が可能

### 2. パフォーマンス
- 新しいシステムはTypeScriptのコンパイル時型チェックのみで、実行時のオーバーヘッドはありません

### 3. エラーハンドリング
- `ErrorEvent`型のイベントには適切な型定義が提供されています

## 次のステップ

1. 既存のコンポーネントを段階的に新しいイベントシステムに移行
2. 新しく作成するコンポーネントでは型安全なイベントメソッドを使用
3. チーム内でのコーディング規約に型安全なイベントハンドリングを含める

このシステムにより、より安全で保守性の高いイベントハンドリングコードの作成が可能になります。
