import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export interface ColorInputOptions {
    value?: string;            // HEX形式の色（例: "#FF5733"）
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
}

export interface RGBColor {
    r: number;  // 0-255
    g: number;  // 0-255
    b: number;  // 0-255
}

export interface HSLColor {
    h: number;  // 0-360
    s: number;  // 0-100
    l: number;  // 0-100
}

/**
 * カラーピッカー専用コンポーネント
 * color タイプに対応
 */
export class ColorInputC extends LV1HtmlComponentBase {
    constructor(options: ColorInputOptions = {}) {
        super();
        
        if (options.value) {
            this.setValue(options.value);
        }
        if (options.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options.id) {
            this.dom.element.id = options.id;
        }
        if (options.disabled) {
            this.setDisabled(options.disabled);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        input.type = 'color';
        return new HtmlElementProxy(input);
    }

    /**
     * 色をHEX形式で設定（例: "#FF5733"）
     */
    public setValue(hex: string): this {
        // #を付けていない場合は自動追加
        const formattedHex = hex.startsWith('#') ? hex : `#${hex}`;
        (this.dom.element as HTMLInputElement).value = formattedHex;
        return this;
    }

    /**
     * 色をHEX形式で取得（例: "#ff5733"）
     */
    public getValue(): string {
        return (this.dom.element as HTMLInputElement).value;
    }

    /**
     * 色をRGB形式で設定
     */
    public setValueAsRGB(rgb: RGBColor): this {
        const hex = this.rgbToHex(rgb);
        this.setValue(hex);
        return this;
    }

    /**
     * 色をRGB形式で取得
     */
    public getValueAsRGB(): RGBColor {
        const hex = this.getValue();
        return this.hexToRgb(hex);
    }

    /**
     * 色をHSL形式で設定
     */
    public setValueAsHSL(hsl: HSLColor): this {
        const rgb = this.hslToRgb(hsl);
        const hex = this.rgbToHex(rgb);
        this.setValue(hex);
        return this;
    }

    /**
     * 色をHSL形式で取得
     */
    public getValueAsHSL(): HSLColor {
        const rgb = this.getValueAsRGB();
        return this.rgbToHsl(rgb);
    }

    /**
     * RGBをHEXに変換
     */
    private rgbToHex(rgb: RGBColor): string {
        const r = Math.max(0, Math.min(255, Math.round(rgb.r)));
        const g = Math.max(0, Math.min(255, Math.round(rgb.g)));
        const b = Math.max(0, Math.min(255, Math.round(rgb.b)));
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    /**
     * HEXをRGBに変換
     */
    private hexToRgb(hex: string): RGBColor {
        const cleanHex = hex.replace('#', '');
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        
        return { r, g, b };
    }

    /**
     * RGBをHSLに変換
     */
    private rgbToHsl(rgb: RGBColor): HSLColor {
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        
        let h = 0;
        let s = 0;
        
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    /**
     * HSLをRGBに変換
     */
    private hslToRgb(hsl: HSLColor): RGBColor {
        const h = hsl.h / 360;
        const s = hsl.s / 100;
        const l = hsl.l / 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    public setDisabled(disabled: boolean): this {
        (this.dom.element as HTMLInputElement).disabled = disabled;
        return this;
    }

    public addClass(className: string | string[]): this {
        this.dom.addCSSClass(className);
        return this;
    }

    public removeClass(className: string | string[]): this {
        this.dom.removeCSSClass(className);
        return this;
    }

    public focus(): this {
        (this.dom.element as HTMLInputElement).focus();
        return this;
    }

    // === カラーピッカー固有のイベントメソッド ===

    /**
     * 色が変更された時のイベント
     */
    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    /**
     * 色が変更された時のイベント（リアルタイム）
     */
    public onInput(callback: TypedEventListener<'input'>): this {
        this.addTypedEventListener('input', callback);
        return this;
    }

    /**
     * 色変更時のコールバック（型安全版・HEX）
     */
    public onColorChange(callback: (hex: string) => void): this {
        this.addTypedEventListener('change', () => {
            callback(this.getValue());
        });
        return this;
    }

    /**
     * 色変更時のコールバック（型安全版・RGB）
     */
    public onColorChangeAsRGB(callback: (rgb: RGBColor) => void): this {
        this.addTypedEventListener('change', () => {
            callback(this.getValueAsRGB());
        });
        return this;
    }

    /**
     * 色変更時のコールバック（型安全版・HSL）
     */
    public onColorChangeAsHSL(callback: (hsl: HSLColor) => void): this {
        this.addTypedEventListener('change', () => {
            callback(this.getValueAsHSL());
        });
        return this;
    }

    /**
     * 型安全なカラー入力用イベントリスナーを追加
     */
    public addColorInputEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}
