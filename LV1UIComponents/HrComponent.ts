import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";

interface HrOptions {
    class?: string[] | string;
    id?: string;
    width?: string;
    size?: number;
    color?: string;
}

/**
 * hr（水平線）要素に対応するLV1UIComponent
 */
export class HrC extends LV1HtmlComponentBase {
    constructor(options?: HrOptions) {
        super();
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        
        if (options?.width) {
            this.setWidth(options.width);
        }
        
        if (options?.size) {
            this.setSize(options.size);
        }
        
        if (options?.color) {
            this.setColor(options.color);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('hr');
        return new HtmlElementProxy(element);
    }
    
    /**
     * 水平線の幅を設定します
     */
    public setWidth(width: string): this {
        this._dom.element.style.width = width;
        return this;
    }
    
    /**
     * 水平線の高さ（厚さ）を設定します
     */
    public setSize(size: number): this {
        this._dom.element.style.height = `${size}px`;
        return this;
    }
    
    /**
     * 水平線の色を設定します
     */
    public setColor(color: string): this {
        this._dom.element.style.borderColor = color;
        return this;
    }
}
