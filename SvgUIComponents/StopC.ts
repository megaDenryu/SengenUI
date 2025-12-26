import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgGradientBase } from "./BaseClasses/SvgGradientBase";

export interface StopOptions {
    offset: number | string;
    stopColor?: string;
    stopOpacity?: number;
    className?: string | string[];
    id?: string;
}

/**
 * SVG Stop要素のコンポーネント
 * グラデーションの色停止点を定義するためのSVG要素をラップします
 */
export class StopC extends SvgGradientBase {
    constructor(options?: StopOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            this.setOffset(options.offset);
            if (options.stopColor) this.setStopColor(options.stopColor);
            if (options.stopOpacity !== undefined) this.setStopOpacity(options.stopOpacity);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const stop = SvgElementCreater.createStopElement();
        return new SvgElementProxy(stop);
    }

    /**
     * オフセット位置を設定（0-1または0%-100%）
     */
    public setOffset(offset: number | string): this {
        this.setSvgAttribute("offset", offset);
        return this;
    }

    /**
     * オフセット位置を取得
     */
    public getOffset(): string {
        return this.getSvgAttribute("offset") || "0";
    }

    /**
     * 数値としてオフセットを取得（0-1）
     */
    public getOffsetAsNumber(): number {
        const offset = this.getOffset();
        if (offset.includes('%')) {
            return parseFloat(offset) / 100;
        }
        return parseFloat(offset);
    }

    /**
     * 停止色を設定
     */
    public setStopColor(color: string): this {
        this.setSvgAttribute("stop-color", color);
        return this;
    }

    /**
     * 停止色を取得
     */
    public getStopColor(): string {
        return this.getSvgAttribute("stop-color") || "#000000";
    }

    /**
     * 停止点の不透明度を設定
     */
    public setStopOpacity(opacity: number): this {
        this.setSvgAttribute("stop-opacity", opacity);
        return this;
    }

    /**
     * 停止点の不透明度を取得
     */
    public getStopOpacity(): number {
        return parseFloat(this.getSvgAttribute("stop-opacity") || "1");
    }

    /**
     * 色と不透明度を同時に設定
     */
    public setColorAndOpacity(color: string, opacity?: number): this {
        this.setStopColor(color);
        if (opacity !== undefined) {
            this.setStopOpacity(opacity);
        }
        return this;
    }

    /**
     * 色と不透明度を取得
     */
    public getColorAndOpacity(): { color: string, opacity: number } {
        return {
            color: this.getStopColor(),
            opacity: this.getStopOpacity()
        };
    }

    /**
     * オフセットをパーセンテージ形式で設定
     */
    public setOffsetPercent(percent: number): this {
        this.setOffset(`${percent}%`);
        return this;
    }

    /**
     * オフセットを小数形式で設定
     */
    public setOffsetDecimal(decimal: number): this {
        this.setOffset(decimal);
        return this;
    }

    /**
     * 透明な停止点を作成
     */
    public setTransparent(): this {
        this.setStopOpacity(0);
        return this;
    }

    /**
     * 完全不透明な停止点を作成
     */
    public setOpaque(): this {
        this.setStopOpacity(1);
        return this;
    }

    /**
     * 半透明な停止点を作成
     */
    public setSemiTransparent(opacity: number = 0.5): this {
        this.setStopOpacity(opacity);
        return this;
    }

    /**
     * RGB値から色を設定
     */
    public setRGB(r: number, g: number, b: number): this {
        const color = `rgb(${r}, ${g}, ${b})`;
        this.setStopColor(color);
        return this;
    }

    /**
     * RGBA値から色と不透明度を設定
     */
    public setRGBA(r: number, g: number, b: number, a: number): this {
        const color = `rgb(${r}, ${g}, ${b})`;
        this.setStopColor(color);
        this.setStopOpacity(a);
        return this;
    }

    /**
     * HSL値から色を設定
     */
    public setHSL(h: number, s: number, l: number): this {
        const color = `hsl(${h}, ${s}%, ${l}%)`;
        this.setStopColor(color);
        return this;
    }

    /**
     * HSLA値から色と不透明度を設定
     */
    public setHSLA(h: number, s: number, l: number, a: number): this {
        const color = `hsl(${h}, ${s}%, ${l}%)`;
        this.setStopColor(color);
        this.setStopOpacity(a);
        return this;
    }

    /**
     * 16進数カラーコードから色を設定
     */
    public setHex(hex: string): this {
        if (!hex.startsWith('#')) {
            hex = '#' + hex;
        }
        this.setStopColor(hex);
        return this;
    }

    /**
     * 名前付きカラーから色を設定
     */
    public setNamedColor(colorName: string): this {
        this.setStopColor(colorName);
        return this;
    }

    /**
     * グラデーション内での位置に基づいて色を補間
     */
    public interpolateColor(startColor: string, endColor: string, position: number): this {
        // 簡単な線形補間（実際にはより複雑な色空間変換が必要）
        const start = this.parseColor(startColor);
        const end = this.parseColor(endColor);
        
        if (start && end) {
            const r = Math.round(start.r + (end.r - start.r) * position);
            const g = Math.round(start.g + (end.g - start.g) * position);
            const b = Math.round(start.b + (end.b - start.b) * position);
            this.setRGB(r, g, b);
        }
        
        return this;
    }

    /**
     * 色文字列をRGB値に解析（簡易版）
     */
    private parseColor(color: string): { r: number, g: number, b: number } | null {
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            if (hex.length === 3) {
                return {
                    r: parseInt(hex[0] + hex[0], 16),
                    g: parseInt(hex[1] + hex[1], 16),
                    b: parseInt(hex[2] + hex[2], 16)
                };
            } else if (hex.length === 6) {
                return {
                    r: parseInt(hex.slice(0, 2), 16),
                    g: parseInt(hex.slice(2, 4), 16),
                    b: parseInt(hex.slice(4, 6), 16)
                };
            }
        }
        return null;
    }

    /**
     * 現在の停止点の設定を取得
     */
    public getStopInfo(): {
        offset: string;
        offsetNumber: number;
        color: string;
        opacity: number;
    } {
        return {
            offset: this.getOffset(),
            offsetNumber: this.getOffsetAsNumber(),
            color: this.getStopColor(),
            opacity: this.getStopOpacity()
        };
    }

    /**
     * 停止点が有効かチェック
     */
    public isValid(): boolean {
        const offset = this.getOffsetAsNumber();
        const opacity = this.getStopOpacity();
        return offset >= 0 && offset <= 1 && opacity >= 0 && opacity <= 1;
    }

    /**
     * 他の停止点と比較（オフセット順）
     */
    public compareTo(other: StopC): number {
        const thisOffset = this.getOffsetAsNumber();
        const otherOffset = other.getOffsetAsNumber();
        return thisOffset - otherOffset;
    }

    /**
     * 停止点をコピー
     */
    public clone(): StopC {
        return new StopC({
            offset: this.getOffset(),
            stopColor: this.getStopColor(),
            stopOpacity: this.getStopOpacity()
        });
    }

    /**
     * CSS変数から色を設定
     */
    public setCSSVariable(variableName: string): this {
        this.setStopColor(`var(--${variableName})`);
        return this;
    }

    /**
     * currentColor を設定
     */
    public setCurrentColor(): this {
        this.setStopColor("currentColor");
        return this;
    }

    /**
     * inherit を設定
     */
    public setInheritColor(): this {
        this.setStopColor("inherit");
        return this;
    }

    /**
     * 静的ファクトリーメソッド - 基本的な停止点
     */
    public static create(offset: number | string, color: string, opacity?: number): StopC {
        return new StopC({
            offset,
            stopColor: color,
            stopOpacity: opacity
        });
    }

    /**
     * 静的ファクトリーメソッド - 透明な停止点
     */
    public static createTransparent(offset: number | string, color: string = "#000000"): StopC {
        return new StopC({
            offset,
            stopColor: color,
            stopOpacity: 0
        });
    }

    /**
     * 静的ファクトリーメソッド - 半透明な停止点
     */
    public static createSemiTransparent(offset: number | string, color: string, opacity: number = 0.5): StopC {
        return new StopC({
            offset,
            stopColor: color,
            stopOpacity: opacity
        });
    }
}
