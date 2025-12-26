import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { TypedEventListener, CanvasEventType } from "../SengenBase/EventTypes";

interface CanvasOptions {
    width?: number;
    height?: number;
    class?: string[] | string;
    id?: string;
}

/**
 * canvas要素に対応するLV1UIComponent
 */
export class CanvasC extends LV1HtmlComponentBase {
    constructor(options?: CanvasOptions) {
        super();
        
        if (options?.width) {
            this.setWidth(options.width);
        }
        
        if (options?.height) {
            this.setHeight(options.height);
        }
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('canvas');
        return new HtmlElementProxy(element);
    }

    /**
     * キャンバスの幅を設定します
     */
    public setWidth(width: number): this {
        (this._dom.element as HTMLCanvasElement).width = width;
        return this;
    }

    /**
     * キャンバスの高さを設定します
     */
    public setHeight(height: number): this {
        (this._dom.element as HTMLCanvasElement).height = height;
        return this;
    }

    public get width(): number {return (this._dom.element as HTMLCanvasElement).width;}
    public get height(): number {return (this._dom.element as HTMLCanvasElement).height;}
    
    /**
     * キャンバスの描画コンテキストを取得します
     */
    public getContext2D(): CanvasRenderingContext2D | null {
        return (this._dom.element as HTMLCanvasElement).getContext('2d');
    }
    
    /**
     * キャンバスのWebGLコンテキストを取得します
     */
    public getContextWebGL(): WebGLRenderingContext | null {
        return (this._dom.element as HTMLCanvasElement).getContext('webgl');
    }
    
    /**
     * キャンバスを画像URLとして取得します
     */
    public toDataURL(type: string = 'image/png', quality?: number): string {
        return (this._dom.element as HTMLCanvasElement).toDataURL(type, quality);
    }
      /**
     * キャンバスをクリアします（2Dコンテキスト用）
     */
    public clear(): this {
        const ctx = this.getContext2D();
        if (ctx) {
            ctx.clearRect(0, 0, (this._dom.element as HTMLCanvasElement).width, (this._dom.element as HTMLCanvasElement).height);
        }
        return this;
    }
      /**
     * 型安全なCanvas用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addCanvasEventListener<T extends CanvasEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.dom.element.addEventListener(event, listener as EventListener);
        return this;
    }
      /**
     * マウスが動いたときのイベントリスナーを追加します
     */
    public onMouseMove(callback: TypedEventListener<'mousemove'>): this {
        this.addCanvasEventListener('mousemove', callback);
        return this;
    }
    
    /**
     * マウスがクリックされたときのイベントリスナーを追加します
     */
    public onMouseDown(callback: TypedEventListener<'mousedown'>): this {
        this.addCanvasEventListener('mousedown', callback);
        return this;
    }
    
    /**
     * マウスがリリースされたときのイベントリスナーを追加します
     */
    public onMouseUp(callback: TypedEventListener<'mouseup'>): this {
        this.addCanvasEventListener('mouseup', callback);
        return this;
    }
    
    /**
     * マウスがキャンバスに入ったときのイベントリスナーを追加します
     */
    public onMouseEnter(callback: TypedEventListener<'mouseenter'>): this {
        this.addCanvasEventListener('mouseenter', callback);
        return this;
    }
    
    /**
     * マウスがキャンバスから出たときのイベントリスナーを追加します
     */
    public onMouseLeave(callback: TypedEventListener<'mouseleave'>): this {
        this.addCanvasEventListener('mouseleave', callback);
        return this;
    }
}
