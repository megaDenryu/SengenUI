import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { IframeEventType, TypedEventListener } from "../SengenBase/EventTypes";

interface IframeOptions {
    src?: string;
    width?: string | number;
    height?: string | number;
    class?: string[] | string;
    id?: string;
    frameBorder?: string;
    allowFullscreen?: boolean;
    sandbox?: string;
    loading?: 'eager' | 'lazy';
    srcdoc?: string;
    title?: string;
    allow?: string;
}

/**
 * iframe（インラインフレーム）要素に対応するLV1UIComponent
 */
export class IframeC extends LV1HtmlComponentBase {
    constructor(options?: IframeOptions) {
        super();
        
        if (options?.src) {
            this.setSrc(options.src);
        }
        
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
        
        if (options?.frameBorder) {
            this.setFrameBorder(options.frameBorder);
        }
        
        if (options?.allowFullscreen !== undefined) {
            this.setAllowFullscreen(options.allowFullscreen);
        }
        
        if (options?.sandbox) {
            this.setSandbox(options.sandbox);
        }
        
        if (options?.loading) {
            this.setLoading(options.loading);
        }
        
        if (options?.srcdoc) {
            this.setSrcdoc(options.srcdoc);
        }
        
        if (options?.title) {
            this.setTitle(options.title);
        }
        
        if (options?.allow) {
            this.setAllow(options.allow);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('iframe');
        return new HtmlElementProxy(element);
    }
    
    /**
     * iframeのソースURLを設定します
     */
    public setSrc(src: string): this {
        (this._dom.element as HTMLIFrameElement).src = src;
        return this;
    }
    
    /**
     * iframeの幅を設定します
     */
    public setWidth(width: string | number): this {
        (this._dom.element as HTMLIFrameElement).width = width.toString();
        return this;
    }
    
    /**
     * iframeの高さを設定します
     */
    public setHeight(height: string | number): this {
        (this._dom.element as HTMLIFrameElement).height = height.toString();
        return this;
    }
    
    /**
     * iframeのフレームボーダーを設定します
     */
    public setFrameBorder(frameBorder: string): this {
        (this._dom.element as HTMLIFrameElement).setAttribute('frameborder', frameBorder);
        return this;
    }
    
    /**
     * iframeのフルスクリーン表示を許可するかどうかを設定します
     */
    public setAllowFullscreen(allowFullscreen: boolean): this {
        (this._dom.element as HTMLIFrameElement).allowFullscreen = allowFullscreen;
        return this;
    }
    
    /**
     * iframeのサンドボックスオプションを設定します
     */
    public setSandbox(sandbox: string): this {
        (this._dom.element as HTMLIFrameElement).sandbox.value = sandbox;
        return this;
    }
    
    /**
     * iframeの読み込み方法を設定します
     */
    public setLoading(loading: 'eager' | 'lazy'): this {
        (this._dom.element as HTMLIFrameElement).loading = loading;
        return this;
    }
    
    /**
     * iframeのHTML文書コンテンツを設定します
     */
    public setSrcdoc(srcdoc: string): this {
        (this._dom.element as HTMLIFrameElement).srcdoc = srcdoc;
        return this;
    }
    
    /**
     * iframeのタイトルを設定します
     */
    public setTitle(title: string): this {
        (this._dom.element as HTMLIFrameElement).title = title;
        return this;
    }
    
    /**
     * iframeの機能ポリシーを設定します
     */
    public setAllow(allow: string): this {
        (this._dom.element as HTMLIFrameElement).allow = allow;
        return this;
    }
      /**
     * 型安全なIframe用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addIframeEventListener<T extends IframeEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    /**
     * iframeの読み込み完了時のイベントリスナーを設定します
     */
    public onLoad(handler: TypedEventListener<'load'>): this {
        this.addTypedEventListener('load', handler);
        return this;
    }
}
