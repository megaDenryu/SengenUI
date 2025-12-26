import { BaseBehavior } from "./BaseBehavior";
import { IBehaviorOptions } from "./IBehavior";
import { HtmlComponentBase } from "../SengenBase/HtmlComponentBase";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";

export type ResizeDirection = 'left' | 'right';

/**
 * リサイズ状態の型定義
 */
type ResizeState = {
    readonly isResizing: boolean;
    readonly startX: number;
    readonly initialWidth: number;
    readonly initialX: number;
};

/**
 * リサイズ結果の型定義（内部計算用）
 */
type ResizeResult = {
    readonly width: number;
    readonly x?: number; // 左リサイズの場合のみ
};

/**
 * リサイズイベントデータの型定義
 */
type ResizeEventData = {
    readonly deltaX: number;
    readonly direction: ResizeDirection;
    readonly initialWidth: number;
    readonly initialX: number;
    readonly minWidth: number; // 計算時には必ず値が入っている
};

/**
 * 親コンポーネントの状態と更新関数の型定義
 */
type ParentComponentState = {
    position: { x: number; y: number };
    size: { width: number; height: number };
};

type ParentComponentUpdaters = {
    updatePosition: () => void;
    updateSize: () => void;
    onPositionChange: (x: number, y: number) => void;
};

/**
 * リサイズ機能のオプション（元のクロージャー方式ベース）
 */
export interface IResizeOptions extends IBehaviorOptions {
    /** リサイズ方向 */
    direction: ResizeDirection;
    /** 最小幅（オプショナル、デフォルト150） */
    minWidth?: number;
    /** 親コンポーネントの状態への参照 */
    parentState: ParentComponentState;
    /** 親コンポーネントの更新関数 */
    parentUpdaters: ParentComponentUpdaters;
}

/**
 * リサイズ計算ロジック（元のロジックを型安全に実装）
 */
class ResizeCalculator {
    /**
     * 左リサイズの計算
     */
    static calculateLeftResize(data: ResizeEventData): ResizeResult {
        const { deltaX, initialWidth, initialX, minWidth } = data;
        const newWidth = Math.max(minWidth, initialWidth - deltaX);
        const newX = initialX + (initialWidth - newWidth);
        
        return { width: newWidth, x: newX };
    }
    
    /**
     * 右リサイズの計算
     */
    static calculateRightResize(data: ResizeEventData): ResizeResult {
        const { deltaX, initialWidth, minWidth } = data;
        const newWidth = Math.max(minWidth, initialWidth + deltaX);
        
        return { width: newWidth };
    }
    
    /**
     * 方向に応じた計算の実行
     */
    static calculate(data: ResizeEventData): ResizeResult {
        switch (data.direction) {
            case 'left':
                return this.calculateLeftResize(data);
            case 'right':
                return this.calculateRightResize(data);
            default:
                // 型システムによりここは到達不可能
                throw new Error(`Unsupported direction: ${data.direction}`);
        }
    }
}

/**
 * リサイズ機能を提供するBehavior（元のクロージャー方式ベース）
 */
export class ResizeHandlingBehavior extends BaseBehavior {
    private _resizeState: ResizeState;
    private _resizeOptions: IResizeOptions;

    constructor(options: IResizeOptions) {
        super(options);
        this._resizeOptions = {
            ...options,
            minWidth: options.minWidth ?? 150 // デフォルト値
        };
        
        // 初期状態を設定
        this._resizeState = {
            isResizing: false,
            startX: 0,
            initialWidth: 0,
            initialX: 0
        };
    }

    protected onAttach(element: HtmlComponentBase): void {
        if (!(element instanceof LV1HtmlComponentBase)) {
            throw new Error('ResizeHandlingBehavior can only be attached to LV1UIComponentBase');
        }

        // 直接メソッドを登録
        element.addTypedEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);

        // カーソルスタイルを設定
        this.setCursorStyle(element);

        this.addCleanupHandler(() => {
            element.removeTypedEventListener('mousedown', this.handleMouseDown);
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
        });
    }

    protected onDetach(): void {
        this._resizeState = {
            isResizing: false,
            startX: 0,
            initialWidth: 0,
            initialX: 0
        };
    }

    /**
     * カーソルスタイルを設定
     */
    private setCursorStyle(element: HtmlComponentBase): void {
        const cursorMap: Record<ResizeDirection, string> = {
            'left': 'ew-resize',
            'right': 'ew-resize'
        };

        element.setStyleCSS({
            cursor: cursorMap[this._resizeOptions.direction]
        });
    }

    /**
     * MouseDownハンドラー
     */
    private handleMouseDown = (e: MouseEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        
        // 親コンポーネントの状態から初期値を取得
        this._resizeState = {
            isResizing: true,
            startX: e.clientX,
            initialWidth: this._resizeOptions.parentState.size.width,
            initialX: this._resizeOptions.parentState.position.x
        };
        
        this._state = 'active';
    };

    /**
     * MouseMoveハンドラー
     */
    private handleMouseMove = (e: MouseEvent): void => {
        if (!this._resizeState.isResizing) return;
        
        const deltaX = e.clientX - this._resizeState.startX;
        
        const eventData: ResizeEventData = {
            deltaX,
            direction: this._resizeOptions.direction,
            initialWidth: this._resizeState.initialWidth,
            initialX: this._resizeState.initialX,
            minWidth: this._resizeOptions.minWidth!  // 既にコンストラクタでデフォルト値設定済み
        };
        
        // 元のロジックを型安全に実行
        const result = ResizeCalculator.calculate(eventData);
        
        // 親コンポーネントの状態を直接更新
        this._resizeOptions.parentState.size.width = result.width;
        
        if (result.x !== undefined) {
            this._resizeOptions.parentState.position.x = result.x;
        }
        
        // DOMに変更を適用
        if (result.x !== undefined) {
            // 左リサイズの場合は位置も変更する
            this._resizeOptions.parentUpdaters.updatePosition();
            this._resizeOptions.parentUpdaters.onPositionChange(
                this._resizeOptions.parentState.position.x,
                this._resizeOptions.parentState.position.y
            );
        } else {
            // 右リサイズの場合はサイズのみ変更
            this._resizeOptions.parentUpdaters.updateSize();
        }
    };

    /**
     * MouseUpハンドラー
     */
    private handleMouseUp = (): void => {
        if (!this._resizeState.isResizing) return;
        
        this._resizeState = {
            ...this._resizeState,
            isResizing: false
        };
        
        this._state = 'attached';
    };

    /**
     * 現在のリサイズ状態を取得
     */
    public isResizing(): boolean {
        return this._resizeState.isResizing;
    }


}