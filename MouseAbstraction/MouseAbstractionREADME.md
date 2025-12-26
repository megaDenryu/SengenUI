# Mouse Abstraction Module

マウス操作を抽象化し、再利用可能なジェスチャー認識システムを提供します。

## 概要

このモジュールは、マウスイベントを抽象化し、クリック、ドラッグ、リサイズなどの一般的な操作を簡単に実装できるようにします。

## アーキテクチャ

### コアコンポーネント

1. **MouseEvent.ts** - マウスイベントの基本データ型
2. **MouseState.ts** - マウス状態の管理
3. **MouseGesture.ts** - ジェスチャー認識エンジン

### 使用例

- **ResizeExample.ts** - リサイズ機能の実装例
- **DragExample.ts** - ドラッグ機能の実装例

## 使用方法

### 基本的なジェスチャー認識

```typescript
import { MouseGestureRecognizer } from '@/Extend/MouseAbstraction';

const recognizer = new MouseGestureRecognizer({
    onClick: (result) => {
        console.log('クリックされました', result.startPosition);
    },
    onDrag: (result) => {
        console.log('ドラッグ中', result.delta);
    },
    onDoubleClick: (result) => {
        console.log('ダブルクリック');
    }
});

// 要素にアタッチ
recognizer.attach(document.getElementById('target'));
```

### ドラッグ機能の実装

```typescript
import { MouseDragBehavior } from '@/Extend/MouseAbstraction/examples/DragExample';

const dragBehavior = new MouseDragBehavior({
    element: document.getElementById('draggable'),
    constrainToParent: true,
    onDragStart: (x, y) => console.log(`ドラッグ開始: (${x}, ${y})`),
    onDrag: (x, y, deltaX, deltaY) => {
        console.log(`位置: (${x}, ${y}), 差分: (${deltaX}, ${deltaY})`);
    },
    onDragEnd: (x, y) => console.log(`ドラッグ終了: (${x}, ${y})`)
});

dragBehavior.enable();
```

### リサイズ機能の実装

```typescript
import { MouseResizeBehavior } from '@/Extend/MouseAbstraction/examples/ResizeExample';

const resizeBehavior = new MouseResizeBehavior({
    element: document.getElementById('resizable'),
    direction: 'bottom-right',
    minWidth: 100,
    minHeight: 50,
    onResize: (width, height, x, y) => {
        console.log(`サイズ: ${width}x${height}`, x && y ? `位置: (${x}, ${y})` : '');
    }
});

resizeBehavior.enable();
```

## 設計の利点

### 1. **抽象化のメリット**
- マウスイベントの生の処理から解放
- ジェスチャー認識ロジックの再利用
- 状態管理の簡素化

### 2. **柔軟性**
- コンポーネント構造に依存しない
- コールバックベースで柔軟な組み合わせ
- 闾値設定でカスタマイズ可能

### 3. **メンテナンス性**
- ジェスチャーロジックの中央集約
- デバッグしやすい状態管理
- テストしやすい設計

## パフォーマンス特性

- **メモリ効率**: クロージャー生成を防止
- **イベント処理**: 適切なイベントリスナーの管理
- **GCフレンドリー**: 適切なクリーンアップ処理

## 今後の改善事項

1. **originalEventの伝達**: 除外セレクター機能の完全実装
2. **タッチイベント対応**: モバイルデバイスへの対応
3. **パフォーマンス最適化**: requestAnimationFrameの活用
4. **ジェスチャー拡張**: スワイプ、ピンチなどの追加

## 元のBehaviorシステムとの比較

| 項目 | 従来のBehavior | Mouse Abstraction |
|------|----------------|------------------|
| 抽象化レベル | コンポーネントレベル | マウスイベントレベル |
| 再利用性 | 低 | 高 |
| 依存性 | コンポーネント構造に依存 | 独立 |
| メンテナンス | 複雑 | シンプル |
| 柔軟性 | 低 | 高 |

このアプローチにより、マウス操作の抽象化が実現され、より再利用可能でメンテナンスしやすいコードを書けるようになります。