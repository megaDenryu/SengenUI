import * as SvgLV1 from './index';

// --- Base helper for type inference ---
type OptionsOf<T extends new (...args: any[]) => any> = ConstructorParameters<T>[0];

/**
 * SVG Functional Creation Functions
 * Provides a functional API for creating SengenUI SVG components.
 */

export const svg = (options?: OptionsOf<typeof SvgLV1.SvgC>) => new SvgLV1.SvgC(options);
export const path = (options?: OptionsOf<typeof SvgLV1.PathC>) => new SvgLV1.PathC(options);
export const g = (options?: OptionsOf<typeof SvgLV1.GroupC>) => new SvgLV1.GroupC(options);
export const circle = (options?: OptionsOf<typeof SvgLV1.CircleC>) => new SvgLV1.CircleC(options);
export const rect = (options?: OptionsOf<typeof SvgLV1.RectangleC>) => new SvgLV1.RectangleC(options);
export const line = (options?: OptionsOf<typeof SvgLV1.LineC>) => new SvgLV1.LineC(options);
export const ellipse = (options?: OptionsOf<typeof SvgLV1.EllipseC>) => new SvgLV1.EllipseC(options);
export const text = (options?: OptionsOf<typeof SvgLV1.TextC>) => new SvgLV1.TextC(options);
export const tspan = (options?: OptionsOf<typeof SvgLV1.TSpanC>) => new SvgLV1.TSpanC(options);
export const defs = (options?: OptionsOf<typeof SvgLV1.DefsC>) => new SvgLV1.DefsC(options);
export const symbol = (options?: OptionsOf<typeof SvgLV1.SymbolC>) => new SvgLV1.SymbolC(options);
export const use = (options?: OptionsOf<typeof SvgLV1.UseC>) => new SvgLV1.UseC(options);
export const marker = (options?: OptionsOf<typeof SvgLV1.MarkerC>) => new SvgLV1.MarkerC(options);
export const mask = (options?: OptionsOf<typeof SvgLV1.MaskC>) => new SvgLV1.MaskC(options);
export const pattern = (options?: OptionsOf<typeof SvgLV1.PatternC>) => new SvgLV1.PatternC(options);
export const image = (options?: OptionsOf<typeof SvgLV1.ImageC>) => new SvgLV1.ImageC(options);
export const polygon = (options?: OptionsOf<typeof SvgLV1.PolygonC>) => new SvgLV1.PolygonC(options);
export const filter = (options?: OptionsOf<typeof SvgLV1.FilterC>) => new SvgLV1.FilterC(options);

// --- Icon Creation Utilities ---

export interface IconStyle {
    stroke?: string;
    fill?: string;
    strokeWidth?: number;
}

/**
 * Lucide-like SVGアイコンを宣言的に生成する糖衣構文。
 * paths配列にSVGパス文字列を渡すだけでアイコンが作れる。
 * Why: アイコンライブラリを大量定義 → named export → tree-shakingで未使用分を除去、という運用を支えるため
 */
export function icon(options: { size: number, color: string, paths: string[], viewBox?: string, style?: IconStyle }) {
    const { size, color, paths: pathList, viewBox = '0 0 24 24', style: iconStyle = {} } = options;
    return svg({ width: size, height: size, viewBox })
        .childs(pathList.map(d => path({
            d,
            stroke: color,
            fill: iconStyle.fill || 'none',
            strokeWidth: iconStyle.strokeWidth || 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
        })));
}

/**
 * 個別パスにテーマカラーを適用するヘルパー。
 * Why: アイコン定義で1パスだけスタイルを変えたい場合（例: fill付きパス混在）に使う
 */
export function themedPath(d: string, color: string, style: IconStyle = {}) {
    return path({
        d,
        stroke: color,
        fill: style.fill || 'none',
        strokeWidth: style.strokeWidth || 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    });
}
