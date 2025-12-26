import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, ImageEventType } from "../SengenBase/EventTypes";

interface ImgOptions {
    src?: string;
    alt?: string;
    class?: string[] | string;
    id?: string;
    width?: number;
    height?: number;
}

export class ImgC extends LV1HtmlComponentBase {
    constructor(options?: ImgOptions) {
        super(); 

        if (options?.src) {
            this.setSrc(options.src);
        }
        if (options?.alt) {
            this.setAlt(options.alt);
        }
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        if (options?.width) {
            this.setWidth(options.width);
        }
        if (options?.height) {
            this.setHeight(options.height);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const img = document.createElement('img');
        return new HtmlElementProxy(img);
    }

    public setSrc(src: string): this {
        (this.dom.element as HTMLImageElement).src = src;
        return this;
    }

    public setAlt(alt: string): this {
        (this.dom.element as HTMLImageElement).alt = alt;
        return this;
    }

    public setWidth(width: number): this {
        (this.dom.element as HTMLImageElement).width = width;
        return this;
    }

    public setHeight(height: number): this {
        (this.dom.element as HTMLImageElement).height = height;
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

    /**
     * 型安全なImage用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addImageEventListener<T extends ImageEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    // Type-safe event handlers for Image-specific events
    public onImageLoad(callback: TypedEventListener<'load'>): this {
        this.addTypedEventListener('load', callback);
        return this;
    }

    public onImageError(callback: TypedEventListener<'error'>): this {
        this.addTypedEventListener('error', callback);
        return this;
    }

    /**
     * @deprecated Use onImageLoad() instead for type safety
     * @removed This method is removed, use onImageLoad() for better type safety and method chaining support
     */
    // public onLoad(callback: (event: Event) => void): void {
    //     this.dom.element.addEventListener('load', callback);
    // }

    /**
     * @deprecated Use onImageError() instead for type safety
     * @removed This method is removed, use onImageError() for better type safety and method chaining support
     */
    // public onError(callback: (event: Event) => void): void {
    //     this.dom.element.addEventListener('error', callback);
    // }
}