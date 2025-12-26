import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { AudioEventType, TypedEventListener } from "../SengenBase/EventTypes";

interface AudioOptions {
    src?: string;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    class?: string[] | string;
    id?: string;
    volume?: number;
}

/**
 * audio（音声）要素に対応するLV1UIComponent
 */
export class AudioC extends LV1HtmlComponentBase {
    constructor(options?: AudioOptions) {
        super();
        
        if (options?.src) {
            this.setSrc(options.src);
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
        
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        
        if (options?.volume !== undefined) {
            this.setVolume(options.volume);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const element = document.createElement('audio');
        return new HtmlElementProxy(element);
    }
    
    /**
     * オーディオのソースURLを設定します
     */
    public setSrc(src: string): this {
        (this._dom.element as HTMLAudioElement).src = src;
        return this;
    }
    
    /**
     * オーディオの自動再生を設定します
     */
    public setAutoplay(autoplay: boolean): this {
        (this._dom.element as HTMLAudioElement).autoplay = autoplay;
        return this;
    }
    
    /**
     * オーディオのコントロールの表示を設定します
     */
    public setControls(controls: boolean): this {
        (this._dom.element as HTMLAudioElement).controls = controls;
        return this;
    }
    
    /**
     * オーディオのループ再生を設定します
     */
    public setLoop(loop: boolean): this {
        (this._dom.element as HTMLAudioElement).loop = loop;
        return this;
    }
    
    /**
     * オーディオのミュート状態を設定します
     */
    public setMuted(muted: boolean): this {
        (this._dom.element as HTMLAudioElement).muted = muted;
        return this;
    }
    
    /**
     * オーディオのプリロード方法を設定します
     */
    public setPreload(preload: 'auto' | 'metadata' | 'none'): this {
        (this._dom.element as HTMLAudioElement).preload = preload;
        return this;
    }
    
    /**
     * オーディオの音量を設定します（0.0〜1.0）
     */
    public setVolume(volume: number): this {
        (this._dom.element as HTMLAudioElement).volume = volume;
        return this;
    }
    
    /**
     * オーディオを再生します
     */
    public play(): Promise<void> {
        return (this._dom.element as HTMLAudioElement).play();
    }
    
    /**
     * オーディオを一時停止します
     */
    public pause(): void {
        (this._dom.element as HTMLAudioElement).pause();
    }

    /**
     * オーディオが終了してるかどうかを確認します
     */
    public isEnded(): boolean {
        return (this._dom.element as HTMLAudioElement).ended;
    }

    /**
     * オーディオの長さの時間をが何ミリ秒が取得します
     */
    public getTimeLengthByMilli(): number{
        return (this._dom.element as HTMLAudioElement).duration * 1000;
    }

    
    /**
     * オーディオの現在の再生時間を取得します
     */
    public getCurrentTime(): number {
        return (this._dom.element as HTMLAudioElement).currentTime;
    }

    /** 
     * @returns オーディオの現在の再生時間をミリ秒単位で取得します
     */
    public getCurrentTimeByMillisecond(): number {
        return this.getCurrentTime() * 1000;
    }

    /**
     * オーディオの再生時間を設定します
     */
    public setCurrentTime(time: number): this {
        (this._dom.element as HTMLAudioElement).currentTime = time;
        return this;
    }    /**
     * 型安全なAudio用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addAudioEventListener<T extends AudioEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.dom.element.addEventListener(event, listener as EventListener);
        return this;
    }    
    
    /**
     * オーディオの再生イベントリスナーを追加します
     */
    public onPlay(handler: TypedEventListener<'play'>): this {
        this.dom.element.addEventListener('play', handler as EventListener);
        return this;
    }
    
    /**
     * オーディオの一時停止イベントリスナーを追加します
     */
    public onPause(handler: TypedEventListener<'pause'>): this {
        this.dom.element.addEventListener('pause', handler as EventListener);
        return this;
    }
    
    /**
     * オーディオの終了イベントリスナーを追加します
     */
    public onEnded(handler: TypedEventListener<'ended'>): this {
        this.dom.element.addEventListener('ended', handler as EventListener);
        return this;
    }
    
    /**
     * オーディオの再生時間更新イベントリスナーを追加します
     */
    public onTimeUpdate(handler: TypedEventListener<'timeupdate'>): this {
        this.dom.element.addEventListener('timeupdate', handler as EventListener);
        return this;
    }
    
    /**
     * オーディオの音量変更イベントリスナーを追加します
     */
    public onVolumeChange(handler: TypedEventListener<'volumechange'>): this {
        this.dom.element.addEventListener('volumechange', handler as EventListener);
        return this;
    }
    
    /**
     * オーディオのデータロード完了イベントリスナーを追加します
     */
    public onLoadedData(handler: TypedEventListener<'loadeddata'>): this {
        this.dom.element.addEventListener('loadeddata', handler as EventListener);
        return this;
    }
    
    /**
     * オーディオの再生可能状態イベントリスナーを追加します
     */
    public onCanPlay(handler: TypedEventListener<'canplay'>): this {
        this.dom.element.addEventListener('canplay', handler as EventListener);
        return this;
    }
}
