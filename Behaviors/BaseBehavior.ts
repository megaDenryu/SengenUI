import { IBehavior, IBehaviorOptions, BehaviorState } from "./IBehavior";
import { HtmlComponentBase } from "../SengenBase/HtmlComponentBase";

/**
 * Behaviorの共通実装を提供する抽象基底クラス
 * 状態管理とライフサイクル管理を標準化
 */
export abstract class BaseBehavior implements IBehavior {
    protected _element: HtmlComponentBase | null = null;
    protected _state: BehaviorState = 'detached';
    protected _options: IBehaviorOptions;
    protected _cleanupHandlers: (() => void)[] = [];

    constructor(options: IBehaviorOptions = {}) {
        this._options = {
            enabled: true,
            debug: false,
            ...options
        };
    }

    public bind(func: (self: this) => void): this {
        func(this);
        return this;
    }

    /**
     * 要素にアタッチ
     */
    public attach(element: HtmlComponentBase): void {
        if (this._state !== 'detached') {
            this.detach();
        }

        this._element = element;
        this._state = 'attached';

        if (this._options.enabled) {
            this.onAttach(element);
        }

        if (this._options.debug) {
            console.log(`${this.constructor.name} attached to element`);
        }
    }

    /**
     * デタッチ
     */
    public detach(): void {
        if (this._state === 'detached') return;

        this.onDetach();
        this.cleanup();
        
        this._element = null;
        this._state = 'detached';

        if (this._options.debug) {
            console.log(`${this.constructor.name} detached`);
        }
    }

    /**
     * クリーンアップ処理を追加
     */
    protected addCleanupHandler(handler: () => void): void {
        this._cleanupHandlers.push(handler);
    }

    /**
     * 全てのクリーンアップハンドラーを実行
     */
    private cleanup(): void {
        this._cleanupHandlers.forEach(handler => {
            try {
                handler();
            } catch (error) {
                console.error('Cleanup handler error:', error);
            }
        });
        this._cleanupHandlers = [];
    }

    /**
     * 有効/無効を切り替え
     */
    public setEnabled(enabled: boolean): void {
        if (this._options.enabled === enabled) return;
        
        this._options.enabled = enabled;
        
        if (this._state === 'attached') {
            if (enabled) {
                this.onAttach(this._element!);
            } else {
                this.onDetach();
            }
        }
    }

    /**
     * 現在の状態を取得
     */
    public getState(): BehaviorState {
        return this._state;
    }

    /**
     * 要素を取得
     */
    protected getElement(): HtmlComponentBase | null {
        return this._element;
    }

    /**
     * サブクラスで実装: アタッチ時の処理
     */
    protected abstract onAttach(element: HtmlComponentBase): void;

    /**
     * サブクラスで実装: デタッチ時の処理
     */
    protected abstract onDetach(): void;
}