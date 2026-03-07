import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { AudioEventType, TypedEventListener } from "../SengenBase/EventTypes";

interface VideoOptions {
    src?: string;
    poster?: string;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    width?: number;
    height?: number;
    class?: string[] | string;
    id?: string;
    volume?: number;
    playsInline?: boolean;
}

/**
 * video（動画）要素に対応するLV1UIComponent
 */
export class VideoC extends LV1HtmlComponentBase {
    constructor(options?: VideoOptions) {
        super();
        
        if (options?.src) {
            this.setSrc(options.src);
        }
        
        if (options?.poster) {
            this.setPoster(options.poster);
        }
        
        if (options?.autoplay !== undefined) {
            this.setAutoplay(options.autoplay);
        }
        
        if (options?.controls !== undefined) {
            this.setControls(options.controls);
        }
        
        if (options?.loop !== undefined) {
            this.setLoop(options.loop);
        }
        
        if (options?.muted !== undefined) {
            this.setMuted(options.muted);
        }
        
        if (options?.preload) {
            this.setPreload(options.preload);
        }
        
        if (options?.width !== undefined) {
            this.setWidth(options.width);
        }
        
        if (options?.height !== undefined) {
            this.setHeight(options.height);
        }
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        
        if (options?.volume !== undefined) {
            this.setVolume(options.volume);
        }

        if (options?.playsInline !== undefined) {
            this.setPlaysInline(options.playsInline);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('video');
        return new HtmlElementProxy(element);
    }
    
    /**
     * ビデオのソースURLを設定します
     */
    public setSrc(src: string): this {
        (this._dom.element as HTMLVideoElement).src = src;
        return this;
    }

    /**
     * ポスター画像（サムネイル）を設定します
     */
    public setPoster(poster: string): this {
        (this._dom.element as HTMLVideoElement).poster = poster;
        return this;
    }
    
    /**
     * ビデオの自動再生を設定します
     */
    public setAutoplay(autoplay: boolean): this {
        (this._dom.element as HTMLVideoElement).autoplay = autoplay;
        return this;
    }
    
    /**
     * ビデオのコントロールの表示を設定します
     */
    public setControls(controls: boolean): this {
        (this._dom.element as HTMLVideoElement).controls = controls;
        return this;
    }
    
    /**
     * ビデオのループ再生を設定します
     */
    public setLoop(loop: boolean): this {
        (this._dom.element as HTMLVideoElement).loop = loop;
        return this;
    }
    
    /**
     * ビデオのミュート状態を設定します
     */
    public setMuted(muted: boolean): this {
        (this._dom.element as HTMLVideoElement).muted = muted;
        return this;
    }
    
    /**
     * ビデオのプリロード方法を設定します
     */
    public setPreload(preload: 'auto' | 'metadata' | 'none'): this {
        (this._dom.element as HTMLVideoElement).preload = preload;
        return this;
    }

    /**
     * ビデオの幅を設定します
     */
    public setWidth(width: number): this {
        (this._dom.element as HTMLVideoElement).width = width;
        return this;
    }

    /**
     * ビデオの高さを設定します
     */
    public setHeight(height: number): this {
        (this._dom.element as HTMLVideoElement).height = height;
        return this;
    }

    /**
     * インライン再生（playsinline）を設定します
     */
    public setPlaysInline(playsInline: boolean): this {
        (this._dom.element as HTMLVideoElement).playsInline = playsInline;
        return this;
    }
    
    /**
     * ビデオの音量を設定します（0.0〜1.0）
     */
    public setVolume(volume: number): this {
        (this._dom.element as HTMLVideoElement).volume = volume;
        return this;
    }
    
    /**
     * ビデオを再生します
     */
    public play(): Promise<void> {
        return (this._dom.element as HTMLVideoElement).play();
    }
    
    /**
     * ビデオを一時停止します
     */
    public pause(): void {
        (this._dom.element as HTMLVideoElement).pause();
    }

    /**
     * ビデオが終了しているかどうかを確認します
     */
    public isEnded(): boolean {
        return (this._dom.element as HTMLVideoElement).ended;
    }

    /**
     * 動画の長さ（秒）を取得します
     */
    public getDuration(): number {
        return (this._dom.element as HTMLVideoElement).duration;
    }

    /**
     * 動画の長さ（ミリ秒）を取得します
     */
    public getTimeLengthByMilli(): number {
        return this.getDuration() * 1000;
    }
    
    /**
     * ビデオの現在の再生時間（秒）を取得します
     */
    public getCurrentTime(): number {
        return (this._dom.element as HTMLVideoElement).currentTime;
    }

    /** 
     * ビデオの現在の再生時間（ミリ秒）を取得します
     */
    public getCurrentTimeByMillisecond(): number {
        return this.getCurrentTime() * 1000;
    }

    /**
     * ビデオの再生時間を設定します
     */
    public setCurrentTime(time: number): this {
        (this._dom.element as HTMLVideoElement).currentTime = time;
        return this;
    }

    /**
     * 型安全なVideo用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addVideoEventListener<T extends AudioEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.dom.element.addEventListener(event, listener as EventListener);
        return this;
    }    
    
    /**
     * ビデオの再生イベントリスナーを追加します
     */
    public onPlay(handler: TypedEventListener<'play'>): this {
        this.dom.element.addEventListener('play', handler as EventListener);
        return this;
    }
    
    /**
     * ビデオの一時停止イベントリスナーを追加します
     */
    public onPause(handler: TypedEventListener<'pause'>): this {
        this.dom.element.addEventListener('pause', handler as EventListener);
        return this;
    }
    
    /**
     * ビデオの終了イベントリスナーを追加します
     */
    public onEnded(handler: TypedEventListener<'ended'>): this {
        this.dom.element.addEventListener('ended', handler as EventListener);
        return this;
    }
    
    /**
     * ビデオの再生時間更新イベントリスナーを追加します
     */
    public onTimeUpdate(handler: TypedEventListener<'timeupdate'>): this {
        this.dom.element.addEventListener('timeupdate', handler as EventListener);
        return this;
    }
    
    /**
     * ビデオの音量変更イベントリスナーを追加します
     */
    public onVolumeChange(handler: TypedEventListener<'volumechange'>): this {
        this.dom.element.addEventListener('volumechange', handler as EventListener);
        return this;
    }
    
    /**
     * ビデオのデータロード完了イベントリスナーを追加します
     */
    public onLoadedData(handler: TypedEventListener<'loadeddata'>): this {
        this.dom.element.addEventListener('loadeddata', handler as EventListener);
        return this;
    }
    
    /**
     * ビデオの再生可能状態イベントリスナーを追加します
     */
    public onCanPlay(handler: TypedEventListener<'canplay'>): this {
        this.dom.element.addEventListener('canplay', handler as EventListener);
        return this;
    }
}
