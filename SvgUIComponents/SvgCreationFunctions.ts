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
export const filter = (options?: OptionsOf<typeof SvgLV1.FilterC>) => new SvgLV1.FilterC(options);
