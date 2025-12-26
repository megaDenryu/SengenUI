import { BaseBehavior } from "./BaseBehavior";
import { IBehaviorOptions } from "./IBehavior";
import { HtmlComponentBase } from "../SengenBase/HtmlComponentBase";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";

/**
 * ドラッグ機能のオプション
 */
export interface IDragOptions extends IBehaviorOptions {
    /** ドラッグを無効にする要素のセレクター */
    excludeSelectors?: string[];
    /** ドラッグ範囲の制限 */
    bounds?: { left?: number; top?: number; right?: number; bottom?: number };
    /** ドラッグ開始時のコールバック */
    onDragStart?: (position: { x: number; y: number }) => void;
    /** ドラッグ中のコールバック */
    onDrag?: (position: { x: number; y: number }) => void;
    /** ドラッグ終了時のコールバック */
    onDragEnd?: (position: { x: number; y: number }) => void;
}

/**
 * ドラッグ機能を提供するBehavior
 */
export class DragHandlingBehavior extends BaseBehavior {
    private _isDragging = false;
    private _dragStartX = 0;
    private _dragStartY = 0;
    private _initialX = 0;
    private _initialY = 0;
    private _currentX = 0;
    private _currentY = 0;
    private _dragOptions: IDragOptions;

    constructor(options: IDragOptions = {}) {
        super(options);
        this._dragOptions = {
            excludeSelectors: [],
            ...options
        };
    }

    protected onAttach(element: HtmlComponentBase): void {
        if (!(element instanceof LV1HtmlComponentBase)) {
            throw new Error('DragHandlingBehavior can only be attached to LV1UIComponentBase');
        }

        const handleMouseDown = this.handleMouseDown.bind(this);
        const handleMouseMove = this.handleMouseMove.bind(this);
        const handleMouseUp = this.handleMouseUp.bind(this);

        element.addTypedEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        this.addCleanupHandler(() => {
            element.removeTypedEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        });
    }

    protected onDetach(): void {
        this._isDragging = false;
    }

    private handleMouseDown(e: MouseEvent): void {
        // 除外セレクターのチェック
        const target = e.target as HTMLElement;
        if (this._dragOptions.excludeSelectors?.some(selector => 
            target.textContent === selector || target.closest(selector)
        )) {
            return;
        }

        e.preventDefault();
        this._isDragging = true;
        this._dragStartX = e.clientX;
        this._dragStartY = e.clientY;

        // 現在の位置を取得
        const element = this.getElement()!;
        const rect = element.dom.element.getBoundingClientRect();
        this._initialX = rect.left;
        this._initialY = rect.top;
        this._currentX = this._initialX;
        this._currentY = this._initialY;

        this._dragOptions.onDragStart?.({ x: this._currentX, y: this._currentY });
        this._state = 'active';
    }

    private handleMouseMove(e: MouseEvent): void {
        if (!this._isDragging) return;

        const deltaX = e.clientX - this._dragStartX;
        const deltaY = e.clientY - this._dragStartY;

        let newX = this._initialX + deltaX;
        let newY = this._initialY + deltaY;

        // 境界制限の適用
        if (this._dragOptions.bounds) {
            const bounds = this._dragOptions.bounds;
            if (bounds.left !== undefined) newX = Math.max(bounds.left, newX);
            if (bounds.top !== undefined) newY = Math.max(bounds.top, newY);
            if (bounds.right !== undefined) newX = Math.min(bounds.right, newX);
            if (bounds.bottom !== undefined) newY = Math.min(bounds.bottom, newY);
        }

        this._currentX = newX;
        this._currentY = newY;

        // 位置を更新
        const element = this.getElement()!;
        element.setStyleCSS({
            left: `${newX}px`,
            top: `${newY}px`
        });

        this._dragOptions.onDrag?.({ x: newX, y: newY });
    }

    private handleMouseUp(): void {
        if (!this._isDragging) return;

        this._isDragging = false;
        this._state = 'attached';
        
        this._dragOptions.onDragEnd?.({ x: this._currentX, y: this._currentY });
    }

    /**
     * 現在のドラッグ状態を取得
     */
    public isDragging(): boolean {
        return this._isDragging;
    }

    /**
     * 現在の位置を取得
     */
    public getPosition(): { x: number; y: number } {
        return { x: this._currentX, y: this._currentY };
    }

    /**
     * ドラッグオプションを更新
     */
    public updateOptions(options: Partial<IDragOptions>): void {
        this._dragOptions = { ...this._dragOptions, ...options };
    }
}