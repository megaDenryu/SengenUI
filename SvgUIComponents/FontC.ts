import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgElementBase } from "./BaseClasses/SvgElementBase";
import { SvgFontBase } from "./BaseClasses/SvgFontBase";

export interface FontOptions {
    className?: string | string[];
    id?: string;
    horizAdvX?: number;
    horizOriginX?: number;
    horizOriginY?: number;
    vertAdvY?: number;
    vertOriginX?: number;
    vertOriginY?: number;
}

/**
 * SVGフォント要素 <font>
 * 非推奨だが互換性のために提供（現代のブラウザではWebフォントの使用を推奨）
 * 
 * @example
 * ```typescript
 * const font = new FontC({
 *     id: "customFont",
 *     horizAdvX: 1000
 * })
 *     .child(new FontFaceC({ fontFamily: "MyFont" }))
 *     .child(new GlyphC({ unicode: "A", d: "M10,90 L50,10 L90,90 Z" }));
 * ```
 */
export class FontC extends SvgFontBase {
    constructor(options?: FontOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        this.applyOptions(options);
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const font = SvgElementCreater.createFontElement();
        return new SvgElementProxy(font);
    }

    private applyOptions(options?: FontOptions): void {
        if (!options) return;

        if (options.className) {
            this.addSvgClass(options.className);
        }
        if (options.id) {
            this.setSvgAttribute('id', options.id);
        }
        if (options.horizAdvX !== undefined) {
            this.setHorizAdvX(options.horizAdvX);
        }
        if (options.horizOriginX !== undefined) {
            this.setHorizOriginX(options.horizOriginX);
        }
        if (options.horizOriginY !== undefined) {
            this.setHorizOriginY(options.horizOriginY);
        }
        if (options.vertAdvY !== undefined) {
            this.setVertAdvY(options.vertAdvY);
        }
        if (options.vertOriginX !== undefined) {
            this.setVertOriginX(options.vertOriginX);
        }
        if (options.vertOriginY !== undefined) {
            this.setVertOriginY(options.vertOriginY);
        }
    }

    // === Child Management ===

    /**
     * 子要素を追加（フォントフェース、グリフなど）
     */
    public child(child: SvgElementBase): this {
        this._children.push(child);
        this._svgDom.element.appendChild(child.dom.element);
        return this;
    }

    /**
     * 複数の子要素を追加
     */
    public children(children: SvgElementBase[]): this {
        children.forEach(child => this.child(child));
        return this;
    }

    // === Core Font Methods ===

    /**
     * 水平方向の前進幅を設定
     */
    public setHorizAdvX(value: number): this {
        this._svgDom.setSvgAttribute('horiz-adv-x', value);
        return this;
    }

    /**
     * 水平方向の原点X座標を設定
     */
    public setHorizOriginX(value: number): this {
        this._svgDom.setSvgAttribute('horiz-origin-x', value);
        return this;
    }

    /**
     * 水平方向の原点Y座標を設定
     */
    public setHorizOriginY(value: number): this {
        this._svgDom.setSvgAttribute('horiz-origin-y', value);
        return this;
    }

    /**
     * 垂直方向の前進幅を設定
     */
    public setVertAdvY(value: number): this {
        this._svgDom.setSvgAttribute('vert-adv-y', value);
        return this;
    }

    /**
     * 垂直方向の原点X座標を設定
     */
    public setVertOriginX(value: number): this {
        this._svgDom.setSvgAttribute('vert-origin-x', value);
        return this;
    }

    /**
     * 垂直方向の原点Y座標を設定
     */
    public setVertOriginY(value: number): this {
        this._svgDom.setSvgAttribute('vert-origin-y', value);
        return this;
    }

    // === Preset Methods ===

    /**
     * 基本的なフォント設定
     */
    public presetBasicFont(horizAdvX: number = 1000): this {
        return this.setHorizAdvX(horizAdvX);
    }

    /**
     * 垂直書きフォントの設定
     */
    public presetVerticalFont(vertAdvY: number = 1000): this {
        return this.setVertAdvY(vertAdvY)
            .setVertOriginX(500);
    }

    /**
     * デバッグ用フォント設定
     */
    public presetDebugFont(): this {
        return this.setHorizAdvX(1000)
            .setHorizOriginX(0)
            .setHorizOriginY(0);
    }
}
