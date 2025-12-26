

# SVGコンポーネント完全計画書

## 🎉 実装完了サマリー
- **基本図形要素**: ✅ 4/4完了
- **テキスト要素**: ✅ 3/3完了  
- **構造・グループ化要素**: ✅ 5/5完了
- **外部コンテンツ**: ✅ 2/2完了
- **グラデーション・パターン**: ✅ 4/4完了
- **フィルター・エフェクト**: ✅ 23/23完了
- **クリッピング・マスキング**: ✅ 2/2完了
- **アニメーション要素**: ✅ 6/6完了
- **メタデータ・記述要素**: ✅ 3/3完了
- **インタラクション要素**: ✅ 2/2完了
- **フォント関連**: 🎉 10/10完了
- **その他**: 🎉 2/2完了

## 🎉 主要カテゴリ完了状況 
**🎉 完全実装達成！（69コンポーネント完了）**
**✅ 全カテゴリ完了（主要58個 + フォント10個 + その他1個）**

## 実装済みコンポーネント ✅
- [x] **CircleC** (`<circle>`) - 円
- [x] **RectangleC** (`<rect>`) - 矩形・長方形  
- [x] **LineC** (`<line>`) - 直線
- [x] **GroupC** (`<g>`) - グループ化要素
- [x] **SvgC** (`<svg>`) - SVGコンテナ
- [x] **FontC** (`<font>`) - フォント定義
- [x] **FontFaceC** (`<font-face>`) - フォントフェース
- [x] **GlyphC** (`<glyph>`) - グリフ
- [x] **MissingGlyphC** (`<missing-glyph>`) - 欠損グリフ
- [x] **HKernC** (`<hkern>`) - 水平カーニング
- [x] **VKernC** (`<vkern>`) - 垂直カーニング
- [x] **FontFaceSrcC** (`<font-face-src>`) - フォントソース
- [x] **FontFaceUriC** (`<font-face-uri>`) - フォントURI
- [x] **FontFaceFormatC** (`<font-face-format>`) - フォント形式
- [x] **FontFaceNameC** (`<font-face-name>`) - フォント名
- [x] **ColorProfileC** (`<color-profile>`) - カラープロファイル
- [x] **CursorC** (`<cursor>`) - カーソル定義

## 基本図形要素
- [x] **EllipseC** (`<ellipse>`) - 楕円
- [x] **PathC** (`<path>`) - パス（ベジェ曲線、複雑な図形）
- [x] **PolygonC** (`<polygon>`) - 多角形（閉じた図形）
- [x] **PolylineC** (`<polyline>`) - 連続線（開いた図形）

## テキスト要素
- [x] **TextC** (`<text>`) - テキスト
- [x] **TSpanC** (`<tspan>`) - テキストスパン
- [x] **TextPathC** (`<textPath>`) - パス上のテキスト

## 構造・グループ化要素
- [x] **SvgC** (`<svg>`) - SVGコンテナ
- [x] **DefsC** (`<defs>`) - 定義要素
- [x] **SymbolC** (`<symbol>`) - シンボル定義
- [x] **UseC** (`<use>`) - 要素の再利用
- [x] **MarkerC** (`<marker>`) - マーカー定義

## 外部コンテンツ
- [x] **ImageC** (`<image>`) - 画像
- [x] **ForeignObjectC** (`<foreignObject>`) - HTML要素埋め込み

## グラデーション・パターン
- [x] **LinearGradientC** (`<linearGradient>`) - 線形グラデーション
- [x] **RadialGradientC** (`<radialGradient>`) - 円形グラデーション
- [x] **StopC** (`<stop>`) - グラデーション色停止点
- [x] **PatternC** (`<pattern>`) - パターン定義

## フィルター・エフェクト
- [x] **FilterC** (`<filter>`) - フィルター定義
- [x] **FeGaussianBlurC** (`<feGaussianBlur>`) - ガウシアンブラー
- [x] **FeDropShadowC** (`<feDropShadow>`) - ドロップシャドウ
- [x] **FeOffsetC** (`<feOffset>`) - オフセット
- [x] **FeMorphologyC** (`<feMorphology>`) - モルフォロジー
- [x] **FeFloodC** (`<feFlood>`) - 色塗りつぶし
- [x] **FeCompositeC** (`<feComposite>`) - 合成
- [x] **FeColorMatrixC** (`<feColorMatrix>`) - 色変換行列
- [x] **FeConvolveMatrixC** (`<feConvolveMatrix>`) - 畳み込み行列
- [x] **FeTurbulenceC** (`<feTurbulence>`) - ノイズ生成
- [x] **FeImageC** (`<feImage>`) - 画像フィルター
- [x] **FeBlendC** (`<feBlend>`) - ブレンド合成
- [x] **FeDiffuseLightingC** (`<feDiffuseLighting>`) - 拡散照明
- [x] **FeSpecularLightingC** (`<feSpecularLighting>`) - 鏡面照明
- [x] **FeDistantLightC** (`<feDistantLight>`) - 遠方光源
- [x] **FePointLightC** (`<fePointLight>`) - 点光源
- [x] **FeSpotLightC** (`<feSpotLight>`) - スポット光源
- [x] **FeDisplacementMapC** (`<feDisplacementMap>`) - 変位マップ
- [x] **FeComponentTransferC** (`<feComponentTransfer>`) - 成分転送
- [x] **FeFuncAC** (`<feFuncA>`) - アルファ関数
- [x] **FeFuncRC** (`<feFuncR>`) - 赤関数
- [x] **FeFuncGC** (`<feFuncG>`) - 緑関数
- [x] **FeFuncBC** (`<feFuncB>`) - 青関数

## クリッピング・マスキング
- [x] **ClipPathC** (`<clipPath>`) - クリッピングパス
- [x] **MaskC** (`<mask>`) - マスク

## アニメーション要素
- [x] **AnimateC** (`<animate>`) - 属性アニメーション
- [x] **AnimateTransformC** (`<animateTransform>`) - 変形アニメーション
- [x] **AnimateMotionC** (`<animateMotion>`) - パスアニメーション
- [x] **AnimateColorC** (`<animateColor>`) - 色アニメーション（非推奨だが互換性）
- [x] **SetC** (`<set>`) - 値設定アニメーション
- [x] **MPathC** (`<mpath>`) - モーションパス

## メタデータ・記述要素
- [x] **TitleC** (`<title>`) - タイトル
- [x] **DescC** (`<desc>`) - 説明
- [x] **MetadataC** (`<metadata>`) - メタデータ

## インタラクション要素
- [x] **AC** (`<a>`) - リンク
- [x] **SwitchC** (`<switch>`) - 条件分岐表示

## フォント関連（SVGフォント）
- [x] **FontC** (`<font>`) - フォント定義
- [x] **FontFaceC** (`<font-face>`) - フォントフェース
- [x] **GlyphC** (`<glyph>`) - グリフ
- [x] **MissingGlyphC** (`<missing-glyph>`) - 欠損グリフ
- [x] **HKernC** (`<hkern>`) - 水平カーニング
- [x] **VKernC** (`<vkern>`) - 垂直カーニング
- [x] **FontFaceSrcC** (`<font-face-src>`) - フォントソース
- [x] **FontFaceUriC** (`<font-face-uri>`) - フォントURI
- [x] **FontFaceFormatC** (`<font-face-format>`) - フォント形式
- [x] **FontFaceNameC** (`<font-face-name>`) - フォント名

## カラープロファイル
- [x] **ColorProfileC** (`<color-profile>`) - カラープロファイル

## カーソル
- [x] **CursorC** (`<cursor>`) - カーソル定義

## 実装方針

### 命名規則
- クラス名: `[要素名]C` (例: `CircleC`, `TextC`, `FeGaussianBlurC`)
- ファイル名: `[要素名]C.ts` (例: `CircleC.ts`, `TextC.ts`, `FeGaussianBlurC.ts`)

### 共通インターフェース
```typescript
interface BaseSvgOptions {
    className?: string | string[];
    id?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    transform?: string;
}
```

### メソッドチェーン設計原則
1. **コンストラクタでオプション受け取り**: 初期値設定
2. **メソッドチェーンでカスタマイズ**: 流暢なAPI
3. **型安全なイベント処理**: SVG固有のイベント
4. **bind()メソッド対応**: LV2コンポーネントでの参照取得

### 実装パターン例
```typescript
export class [ElementName]C extends SvgUIComponentBase {
    constructor(options?: [ElementName]Options) {
        super();
        this._svgDom = this.createSvgDomProxy();
        // オプション適用
    }

    protected createSvgDomProxy(): SvgDomProxy {
        const element = SvgElementCreater.create[ElementName]Element(/* params */);
        return new SvgDomProxy(element);
    }

    // 要素固有のメソッド
    public set[SpecificProperty](value: type): this {
        this._svgDom.setSvgAttribute('property', value);
        return this;
    }
}
```

## 完全実装の目標
- **主要カテゴリ完了**: ✅ 58個のコンポーネント（全主要カテゴリ）
- **フォント関連（オプション）**: ✅ 10/10完了（SVGフォント、非推奨だが互換性のため）
- **その他（オプション）**: 2個のコンポーネント（カラープロファイル、カーソル）
- **UIDoc.mdの設計思想**: メソッドチェーン、宣言的UI、型安全性
- **完全なオプション対応**: 各要素の全属性をサポート
- **イベント処理**: SVG固有のイベントを型安全に処理
- **LV2統合対応**: bind()メソッドでの参照取得
詳細は `app-ts\src\UiComponent\Base\UIDoc.md`を参照すること



この計画書では以下を遵守した：

1. **SVGの全要素を網羅**: 基本図形からフィルター、アニメーションまで約80個
2. **完全実装を前提**: 優先度ではなく網羅性を重視
3. **既存の設計思想を継承**: UIDoc.mdのメソッドチェーン、宣言的UI
4. **実装パターンを明確化**: 統一されたコーディング規約

