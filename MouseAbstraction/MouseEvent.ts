import { Px2DVector } from "../SengenBase/位置関係";


/**
 * マウスの基本状態を表す型定義
 */
export type MousePosition = {
    readonly x: number;
    readonly y: number;
};

export type MouseButton = 'left' | 'right' | 'middle';

/**
 * マウスの基本イベントデータ
 */
export interface IMouseEventData {
    readonly position: MousePosition;
    readonly button: MouseButton;
    readonly timestamp: number;
    readonly originalEvent: MouseEvent;
}

/**
 * マウスイベントの抽象化クラス
 */
export class MouseEventData implements IMouseEventData {
    public readonly position: MousePosition;
    public get pos2DVector(): Px2DVector {return Px2DVector.fromXYpair(this.position);}
    public readonly button: MouseButton;
    public readonly timestamp: number;
    public readonly originalEvent: MouseEvent;

    constructor(event: MouseEvent) {
        this.position = { x: event.clientX, y: event.clientY };
        this.button = this.getButtonType(event.button);
        this.timestamp = Date.now();
        this.originalEvent = event;
    }

    private getButtonType(buttonCode: number): MouseButton {
        switch (buttonCode) {
            case 0: return 'left';
            case 1: return 'middle';
            case 2: return 'right';
            default: return 'left';
        }
    }

    /**
     * 他の位置との差分を計算
     */
    public getDelta(other: MousePosition): MousePosition {
        return {
            x: this.position.x - other.x,
            y: this.position.y - other.y
        };
    }

    /**
     * 他の位置との距離を計算
     */
    public getDistance(other: MousePosition): number {
        const delta = this.getDelta(other);
        return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    }
}