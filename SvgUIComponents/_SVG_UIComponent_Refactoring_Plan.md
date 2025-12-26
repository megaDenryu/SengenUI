# SVG UIComponent完全リファクタリング計画書

**作成日**: 2025年11月18日  
**目的**: ブラウザDOM仕様に忠実な型安全なSVG UIComponentシステムの構築  
**方針**: 完全なリファクタリングで一気に実装  
**対象**: 既存69コンポーネント全て

---

## 1. 現状分析と既存コンポーネント

### 1.1 現在の問題点

#### ❌ 型安全性の欠如
すべてのSVG要素が同じ`SvgUIComponentBase`を継承しているため、以下の問題があります：
- 図形要素（`Circle`, `Rect`など）に`child()`メソッドが生えている
- コンテナ要素と描画要素の区別がない
- 型システムで不正な操作を防げない

#### ❌ DOM仕様との乖離
- MDNの公式分類を無視した実装
- フィルター、アニメーション、メタデータなど特殊要素の扱いが不明確
- HTMLの`UIComponentBase`と同等のメソッドが不足

### 1.2 既存コンポーネント一覧（69個）

| カテゴリ | 個数 | コンポーネント |
|---------|------|--------------|
| **基本図形** | 7 | Circle, Rectangle, Line, Ellipse, Path, Polygon, Polyline |
| **コンテナ** | 7 | Svg, Group, Defs, Symbol, Marker, Mask, Pattern |
| **テキスト** | 3 | Text, TSpan, TextPath |
| **グラデーション** | 4 | LinearGradient, RadialGradient, Stop, Pattern |
| **フィルター** | 23 | Filter, FeGaussianBlur, FeDropShadow, FeOffset, FeMorphology, FeFlood, FeComposite, FeColorMatrix, FeConvolveMatrix, FeTurbulence, FeImage, FeBlend, FeDiffuseLighting, FeSpecularLighting, FeDistantLight, FePointLight, FeSpotLight, FeDisplacementMap, FeComponentTransfer, FeFuncA, FeFuncR, FeFuncG, FeFuncB |
| **クリッピング** | 2 | ClipPath, Mask |
| **アニメーション** | 6 | Animate, AnimateTransform, AnimateMotion, AnimateColor, Set, MPath |
| **メタデータ** | 3 | Title, Desc, Metadata |
| **インタラクション** | 2 | A, Switch |
| **外部コンテンツ** | 3 | Image, ForeignObject, Use |
| **フォント（非推奨）** | 10 | Font, FontFace, Glyph, MissingGlyph, HKern, VKern, FontFaceSrc, FontFaceUri, FontFaceFormat, FontFaceName |
| **レガシー** | 2 | ColorProfile, Cursor |
| **合計** | **69** | |

---

## 2. 新しい型階層設計

### 2.1 MDN公式分類に基づく階層

```
SvgElementBase (abstract) - 全SVG要素の基底
│
├─ SvgContainerBase (abstract) - 子要素を持てる要素
│   ├─ SvgC, GroupC, DefsC, SymbolC, MarkerC, PatternC
│   ├─ AC, SwitchC, ClipPathC, TextC, ForeignObjectC (12個)
│
├─ SvgGraphicsBase (abstract) - 描画専用要素（子不可）
│   ├─ CircleC, EllipseC, LineC, PathC, PolygonC, PolylineC, RectangleC
│   ├─ ImageC, UseC (9個)
│
├─ SvgFilterContainerBase (abstract) - フィルター要素
│   ├─ FilterC
│   └─ SvgFilterPrimitiveBase (abstract)
│       └─ Fe*C (23個のフィルタープリミティブ)
│
├─ SvgGradientBase (abstract) - グラデーション定義
│   ├─ LinearGradientC, RadialGradientC, StopC (3個)
│
├─ SvgAnimationBase (abstract) - アニメーション要素
│   ├─ AnimateC, AnimateTransformC, AnimateMotionC
│   ├─ AnimateColorC, SetC, MPathC (6個)
│
├─ SvgMetadataBase (abstract) - メタデータ要素
│   ├─ TitleC, DescC, MetadataC (3個)
│
├─ SvgTextBase (abstract) - テキスト専用要素
│   ├─ TSpanC, TextPathC (2個)
│
├─ SvgFontBase (abstract) - フォント要素（非推奨）
│   └─ Font*C (10個)
│
└─ SvgLegacyBase (abstract) - レガシー要素
    └─ ColorProfileC, CursorC (2個)
```

### 2.2 各基底クラスの特性

| 基底クラス | `child()` | `setViewportPosition()` | イベント | 説明 |
|-----------|---------|----------------------|---------|------|
| `SvgContainerBase` | ✅ | ✅ | ✅ | 子要素を持てる |
| `SvgGraphicsBase` | ❌ | ❌ | ✅ | 描画専用 |
| `SvgFilterContainerBase` | ✅ | ✅ | ✅ | フィルター効果 |
| `SvgGradientBase` | ✅ | ❌ | ❌ | グラデーション定義 |
| `SvgAnimationBase` | ❌ | ❌ | ❌ | アニメーション |
| `SvgMetadataBase` | ❌ | ❌ | ❌ | メタデータ |
| `SvgTextBase` | ❌ | ❌ | ✅ | テキスト専用 |
| `SvgFontBase` | ✅ | ❌ | ❌ | フォント（非推奨） |
| `SvgLegacyBase` | ❌ | ❌ | ❌ | レガシー |

---

## 3. 実装計画

### Phase 1: 基底クラスの実装（10個）

各基底クラスに必要な機能：

**`SvgElementBase`**: すべての共通機能
- イベント管理（`addSvgEventListener`等）
- 属性管理（`setSvgAttribute`等）
- スタイル管理（`setStyleCSS`等）
- クラス管理（`addClass`等）
- 変形（`setTransform`等）
- 描画属性（`setFill`, `setStroke`等）
- ユーティリティ（`bind`, `delete`等）

**`SvgContainerBase`**: コンテナ要素の機能
- 子要素管理（`child`, `childs`, `removeChild`等）
- 位置管理（`setViewportPosition`等）

**`SvgGraphicsBase`**: 描画要素の機能
- `child()`メソッドは意図的に実装しない

**その他の基底クラス**: 各カテゴリ特有の機能
- `SvgFilterContainerBase`: `result`, `in`属性管理
- `SvgGradientBase`: `Stop`要素追加
- `SvgAnimationBase`: `dur`, `repeatCount`属性管理
- etc.

### Phase 2: 具体クラスの実装（69個）

既存の実装パターンを踏襲しつつ、適切な基底クラスを継承：

**実装パターン例**:
```	typescript
export class CircleC extends SvgGraphicsBase {
    constructor(options?: CircleOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }
    
    protected createSvgDomProxy(): SvgDomProxy {
        return new SvgDomProxy(SvgElementCreater.createCircleElement());
    }
    
    // Circle専用メソッド
    public setCx(cx: number): this { /* ... */ }
    public setCy(cy: number): this { /* ... */ }
    public setR(r: number): this { /* ... */ }
}
```

### Phase 3: 既存コードの移行

**手順**:
1. すべてのインポート文を更新
2. `SvgUIComponentBase`の参照を適切な基底クラスに変更
3. `SvgUIComponentBase.ts`を削除

**影響範囲**: SVG要素を使用しているすべてのファイル

---

## 4. API対応表（完全版）

| メソッド | Element | Container | Graphics | Filter | Gradient | Animation | Metadata | Text | Font | Legacy |
|---------|---------|-----------|----------|--------|----------|-----------|----------|------|------|--------|
| `child()` | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `setViewportPosition()` | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `setStyleCSS()` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `addClass()` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `setTransform()` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| `addSvgEventListener()` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| `bind()` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 5. 完了条件

### 5.1 基底クラスの実装（10個）

- [x] `SvgElementBase.ts` - 全SVG要素の基底クラス
- [x] `SvgContainerBase.ts` - コンテナ要素の基底クラス
- [x] `SvgGraphicsBase.ts` - グラフィクス要素の基底クラス
- [x] `SvgFilterContainerBase.ts` - フィルターコンテナの基底クラス
- [x] `SvgFilterPrimitiveBase.ts` - フィルタープリミティブの基底クラス
- [x] `SvgGradientBase.ts` - グラデーション要素の基底クラス
- [x] `SvgAnimationBase.ts` - アニメーション要素の基底クラス
- [x] `SvgMetadataBase.ts` - メタデータ要素の基底クラス
- [x] `SvgTextBase.ts` - テキスト専用要素の基底クラス
- [x] `SvgFontBase.ts` - フォント要素の基底クラス（非推奨）
- [x] `SvgLegacyBase.ts` - レガシー要素の基底クラス

### 5.2 コンテナ要素の実装（12個）

- [x] `SvgC.ts` - `<svg>` 要素
- [x] `GroupC.ts` - `<g>` 要素
- [x] `DefsC.ts` - `<defs>` 要素
- [x] `SymbolC.ts` - `<symbol>` 要素
- [x] `MarkerC.ts` - `<marker>` 要素
- [x] `MaskC.ts` - `<mask>` 要素（クリッピング）
- [x] `PatternC.ts` - `<pattern>` 要素
- [x] `AC.ts` - `<a>` 要素（インタラクション）
- [x] `SwitchC.ts` - `<switch>` 要素（インタラクション）
- [x] `ClipPathC.ts` - `<clipPath>` 要素（クリッピング）
- [x] `TextC.ts` - `<text>` 要素（テキスト）
- [x] `ForeignObjectC.ts` - `<foreignObject>` 要素（外部コンテンツ）

### 5.3 グラフィクス要素の実装（9個）

- [x] `CircleC.ts` - `<circle>` 要素
- [x] `EllipseC.ts` - `<ellipse>` 要素
- [x] `LineC.ts` - `<line>` 要素
- [x] `PathC.ts` - `<path>` 要素
- [x] `PolygonC.ts` - `<polygon>` 要素
- [x] `PolylineC.ts` - `<polyline>` 要素
- [x] `RectangleC.ts` - `<rect>` 要素
- [x] `ImageC.ts` - `<image>` 要素（外部コンテンツ）
- [x] `UseC.ts` - `<use>` 要素（外部コンテンツ）

### 5.4 フィルター要素の実装（24個）

- [x] `FilterC.ts` - `<filter>` 要素（コンテナ）
- [x] `FeGaussianBlurC.ts` - `<feGaussianBlur>` 要素
- [x] `FeDropShadowC.ts` - `<feDropShadow>` 要素
- [x] `FeOffsetC.ts` - `<feOffset>` 要素
- [x] `FeMorphologyC.ts` - `<feMorphology>` 要素
- [x] `FeFloodC.ts` - `<feFlood>` 要素
- [x] `FeCompositeC.ts` - `<feComposite>` 要素
- [x] `FeColorMatrixC.ts` - `<feColorMatrix>` 要素
- [x] `FeConvolveMatrixC.ts` - `<feConvolveMatrix>` 要素
- [x] `FeTurbulenceC.ts` - `<feTurbulence>` 要素
- [x] `FeImageC.ts` - `<feImage>` 要素
- [x] `FeBlendC.ts` - `<feBlend>` 要素
- [x] `FeDiffuseLightingC.ts` - `<feDiffuseLighting>` 要素
- [x] `FeSpecularLightingC.ts` - `<feSpecularLighting>` 要素
- [x] `FeDistantLightC.ts` - `<feDistantLight>` 要素
- [x] `FePointLightC.ts` - `<fePointLight>` 要素
- [x] `FeSpotLightC.ts` - `<feSpotLight>` 要素
- [x] `FeDisplacementMapC.ts` - `<feDisplacementMap>` 要素
- [x] `FeComponentTransferC.ts` - `<feComponentTransfer>` 要素
- [x] `FeFuncAC.ts` - `<feFuncA>` 要素
- [x] `FeFuncRC.ts` - `<feFuncR>` 要素
- [x] `FeFuncGC.ts` - `<feFuncG>` 要素
- [x] `FeFuncBC.ts` - `<feFuncB>` 要素
- [ ] `FeMergeC.ts` - `<feMerge>` 要素
- [ ] `FeMergeNodeC.ts` - `<feMergeNode>` 要素

### 5.5 グラデーション要素の実装（3個）

- [x] `LinearGradientC.ts` - `<linearGradient>` 要素
- [x] `RadialGradientC.ts` - `<radialGradient>` 要素
- [x] `StopC.ts` - `<stop>` 要素

### 5.6 アニメーション要素の実装（6個）

- [x] `AnimateC.ts` - `<animate>` 要素
- [x] `AnimateTransformC.ts` - `<animateTransform>` 要素
- [x] `AnimateMotionC.ts` - `<animateMotion>` 要素
- [x] `AnimateColorC.ts` - `<animateColor>` 要素（非推奨）
- [x] `SetC.ts` - `<set>` 要素
- [x] `MPathC.ts` - `<mpath>` 要素

### 5.7 テキスト専用要素の実装（2個）

- [x] `TSpanC.ts` - `<tspan>` 要素
- [x] `TextPathC.ts` - `<textPath>` 要素

### 5.8 メタデータ要素の実装（3個）

- [x] `TitleC.ts` - `<title>` 要素
- [x] `DescC.ts` - `<desc>` 要素
- [x] `MetadataC.ts` - `<metadata>` 要素

### 5.9 フォント要素の実装（10個・非推奨）

- [x] `FontC.ts` - `<font>` 要素
- [x] `FontFaceC.ts` - `<font-face>` 要素
- [x] `GlyphC.ts` - `<glyph>` 要素
- [x] `MissingGlyphC.ts` - `<missing-glyph>` 要素
- [x] `HKernC.ts` - `<hkern>` 要素
- [x] `VKernC.ts` - `<vkern>` 要素
- [x] `FontFaceSrcC.ts` - `<font-face-src>` 要素
- [x] `FontFaceUriC.ts` - `<font-face-uri>` 要素
- [x] `FontFaceFormatC.ts` - `<font-face-format>` 要素
- [x] `FontFaceNameC.ts` - `<font-face-name>` 要素

### 5.10 レガシー要素の実装（2個）

- [x] `ColorProfileC.ts` - `<color-profile>` 要素
- [x] `CursorC.ts` - `<cursor>` 要素

### 5.11 移行作業

- [ ] すべてのインポート文を更新
- [ ] `SvgUIComponentBase`の参照を適切な基底クラスに変更
- [ ] `SvgUIComponentBase.ts`を削除
- [ ] ビルドエラーが0件
- [ ] ドキュメントが更新されている

**合計**: 基底クラス11個 + 具体クラス69個 = **80個のファイル**

---

## 6. 参考資料

- [MDN SVG Element Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)
- `app-ts\src\UiComponent\Base\SvgUIComponents\_Component計画書.md`
- `app-ts\src\UiComponent\Base\UIDoc.md`

---

**以上で完全リファクタリング計画書（全69コンポーネント対応版）を終わります。**
