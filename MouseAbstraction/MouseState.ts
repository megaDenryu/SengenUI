import { MousePosition, MouseEventData } from "./MouseEvent";

/**
 * マウス操作の状態を表す列挙型
 */
export const MouseState = {
    IDLE: 'idle',
    PRESSED: 'pressed',
    DRAGGING: 'dragging',
    RELEASED: 'released'
} as const;

export type MouseStateType = typeof MouseState[keyof typeof MouseState];



/**
 * マウス操作の一連の流れを表す履歴情報
 * マウス押下から解放までの操作を追跡し、速度や距離などを自動計算
 */
export interface I一次マウス操作情報履歴 {
    readonly 操作開始時のマウス位置: MousePosition;
    readonly 現在のマウス位置: MousePosition;
    readonly 操作開始時刻: number; //ミリ秒
    readonly 現在時刻: number; // ミリ秒
    readonly 現在の操作状態: MouseStateType;
}

export class 一次マウス操作情報履歴 implements I一次マウス操作情報履歴 {
    public readonly 操作開始時のマウス位置: MousePosition; //マウスダウンしたときにのみ初期化される。
    public readonly 現在のマウス位置: MousePosition;
    public readonly 操作開始時刻: number; //ミリ秒
    public readonly 現在時刻: number; // ミリ秒
    public readonly 現在の操作状態: MouseStateType;
    constructor(
        操作開始時のマウス位置: MousePosition,
        現在のマウス位置: MousePosition,
        操作開始時刻: number,
        現在時刻: number,
        現在の操作状態: MouseStateType
    ) {
        this.操作開始時のマウス位置 = 操作開始時のマウス位置;
        this.現在のマウス位置 = 現在のマウス位置;
        this.操作開始時刻 = 操作開始時刻;
        this.現在時刻 = 現在時刻;
        this.現在の操作状態 = 現在の操作状態;
    }

    public 二次情報(前の二次マウス操作情報履歴: 二次マウス操作情報履歴|null): 二次マウス操作情報履歴 {
        const deltaPositionFrom操作開始時位置 = {
            x: this.現在のマウス位置.x - this.操作開始時のマウス位置.x,
            y: this.現在のマウス位置.y - this.操作開始時のマウス位置.y
        };
        
        const totalDistance = Math.sqrt(deltaPositionFrom操作開始時位置.x * deltaPositionFrom操作開始時位置.x + deltaPositionFrom操作開始時位置.y * deltaPositionFrom操作開始時位置.y);
        const duration = this.現在時刻 - this.操作開始時刻;
        
        // 速度計算（ミリ秒を秒に変換）
        const timeInSeconds = duration / 1000;
        const averageSpeed = timeInSeconds > 0 ? totalDistance / timeInSeconds : 0;
        const averageSpeedX = timeInSeconds > 0 ? Math.abs(deltaPositionFrom操作開始時位置.x) / timeInSeconds : 0;
        const averageSpeedY = timeInSeconds > 0 ? Math.abs(deltaPositionFrom操作開始時位置.y) / timeInSeconds : 0;

        if (前の二次マウス操作情報履歴 == null) {
            return new 二次マウス操作情報履歴(
                this.操作開始時のマウス位置,
                this.現在のマウス位置,
                this.操作開始時刻,
                this.現在時刻,
                this.現在の操作状態,
                deltaPositionFrom操作開始時位置,
                totalDistance,
                duration,
                averageSpeed,
                averageSpeedX,
                averageSpeedY,
                {x: 0, y: 0},
                0
            );
        }

        const deltaPositionFrom前回位置 = {
            x: this.現在のマウス位置.x -前の二次マウス操作情報履歴.現在のマウス位置.x ,
            y: this.現在のマウス位置.y -前の二次マウス操作情報履歴.現在のマウス位置.y
        };
        const deltaDistanceFrom前回位置 = Math.sqrt(deltaPositionFrom前回位置.x * deltaPositionFrom前回位置.x + deltaPositionFrom前回位置.y * deltaPositionFrom前回位置.y);
        
        return new 二次マウス操作情報履歴(
            this.操作開始時のマウス位置,
            this.現在のマウス位置,
            this.操作開始時刻,
            this.現在時刻,
            this.現在の操作状態,
            deltaPositionFrom操作開始時位置,
            totalDistance,
            duration,
            averageSpeed,
            averageSpeedX,
            averageSpeedY,
            deltaPositionFrom前回位置,
            deltaDistanceFrom前回位置
        );
    }
}

export interface I二次マウス操作情報履歴 extends I一次マウス操作情報履歴 {
    
    readonly ドラッグ開始位置から現在位置までの差分: MousePosition;
    readonly ドラッグ開始位置から現在位置までの直線距離: number; // ピクセル
    readonly 操作の継続時間: number; // ミリ秒
    readonly 平均移動速度: number; // ピクセル/秒
    readonly X方向の平均速度: number; // ピクセル/秒
    readonly Y方向の平均速度: number; // ピクセル/秒
}

export class 二次マウス操作情報履歴 extends 一次マウス操作情報履歴 implements I二次マウス操作情報履歴 {
    public readonly ドラッグ開始位置から現在位置までの差分: MousePosition;
    public readonly ドラッグ開始位置から現在位置までの直線距離: number; // ピクセル
    public readonly 操作の継続時間: number; // ミリ秒
    public readonly 平均移動速度: number; // ピクセル/秒
    public readonly X方向の平均速度: number; // ピクセル/秒
    public readonly Y方向の平均速度: number; // ピクセル/秒
    public readonly 直前のマウス位置から現在位置までの差分: MousePosition;
    public readonly 直前のマウス位置から現在位置までの直線距離: number; // ピクセル
    constructor(
        操作開始時のマウス位置: MousePosition,
        現在のマウス位置: MousePosition,
        操作開始時刻: number,
        現在時刻: number,
        現在の操作状態: MouseStateType,
        開始位置から現在位置までの差分: MousePosition,
        開始位置から現在位置までの直線距離: number,
        操作の継続時間: number,
        平均移動速度: number,
        X方向の平均速度: number,
        Y方向の平均速度: number,
        直前のマウス位置から現在位置までの差分: MousePosition,
        直前のマウス位置から現在位置までの直線距離: number
    ) {
        super(操作開始時のマウス位置, 現在のマウス位置, 操作開始時刻, 現在時刻, 現在の操作状態);
        this.ドラッグ開始位置から現在位置までの差分 = 開始位置から現在位置までの差分;
        this.ドラッグ開始位置から現在位置までの直線距離 = 開始位置から現在位置までの直線距離;
        this.操作の継続時間 = 操作の継続時間;
        this.平均移動速度 = 平均移動速度;
        this.X方向の平均速度 = X方向の平均速度;
        this.Y方向の平均速度 = Y方向の平均速度;
        this.直前のマウス位置から現在位置までの差分 = 直前のマウス位置から現在位置までの差分;
        this.直前のマウス位置から現在位置までの直線距離 = 直前のマウス位置から現在位置までの直線距離;
    }
}

/**
 * マウス操作の閾値設定
 */
export interface IMouse閾値 {
    ドラッグ開始と判定する最小移動距離: number; //Px
    クリックと判定する最大時間: number; // ミリ秒
    ダブルクリックと判定する最大間隔: number; // ミリ秒
}

/**
 * デフォルトの閾値設定
 */
export const DEFAULT_MOUSE_THRESHOLDS: IMouse閾値 = {
    ドラッグ開始と判定する最小移動距離: 3,
    クリックと判定する最大時間: 300,
    ダブルクリックと判定する最大間隔: 300
};

/**
 * マウス状態管理クラス（シングルトン）
 */
export class MouseStateManager {
    private static _instance: MouseStateManager | null = null;
    
    private _currentOperationHistory: 二次マウス操作情報履歴 | null = null;
    private _lastClickTime = 0;
    private _clickCount = 0;
    private _thresholds: IMouse閾値;

    public constructor(thresholds: Partial<IMouse閾値> = {}) {
        this._thresholds = { ...DEFAULT_MOUSE_THRESHOLDS, ...thresholds };
    }

    public static instance(thresholds?: Partial<IMouse閾値>): MouseStateManager {
        if (!MouseStateManager._instance) {
            MouseStateManager._instance = new MouseStateManager(thresholds);
        }
        return MouseStateManager._instance;
    }

    /**
     * マウス押下を処理し、新しい操作履歴を開始
     */
    public マウスダウン時のマウス情報(event: MouseEvent): 二次マウス操作情報履歴 {
        const eventData = new MouseEventData(event);
        const now = eventData.timestamp;
        
        this._currentOperationHistory = new 一次マウス操作情報履歴(
            eventData.position,
            eventData.position,
            now,
            now,
            MouseState.PRESSED
        ).二次情報(this._currentOperationHistory);

        return this._currentOperationHistory;
    }

    /**
     * マウス移動を処理し、操作履歴を更新
     * 移動距離が闾値を超えた場合はドラッグ状態に変更
     */
    public マウス移動時のマウス情報(event: MouseEvent): 二次マウス操作情報履歴 | null {
        const eventData = new MouseEventData(event);
        if (!this._currentOperationHistory) return null;

        const distance = eventData.getDistance(this._currentOperationHistory.操作開始時のマウス位置);
        const isDragging = distance >= this._thresholds.ドラッグ開始と判定する最小移動距離;

        this._currentOperationHistory = new 一次マウス操作情報履歴(
            this._currentOperationHistory.操作開始時のマウス位置,
            eventData.position,
            this._currentOperationHistory.操作開始時刻,
            eventData.timestamp,
            isDragging ? MouseState.DRAGGING : this._currentOperationHistory.現在の操作状態
        ).二次情報(this._currentOperationHistory);

        return this._currentOperationHistory;
    }

    /**
     * マウス解放を処理し、最終的な操作履歴を返す
     * この時点で操作の全データ（速度、距離など）が確定
     */
    public マウスアップ時のマウス情報(event: MouseEvent): 二次マウス操作情報履歴 | null {
        const eventData = new MouseEventData(event);
        if (!this._currentOperationHistory) return null;

        const finalOperationHistory = new 一次マウス操作情報履歴(
            this._currentOperationHistory.操作開始時のマウス位置,
            eventData.position,
            this._currentOperationHistory.操作開始時刻,
            eventData.timestamp,
            MouseState.RELEASED
        ).二次情報(this._currentOperationHistory);

        this._currentOperationHistory = null;
        return finalOperationHistory;
    }


    /**
     * 操作がクリックかどうかを判定
     * 時間と距離の両方が闾値以下の場合にクリックと判定
     */
    public isClick(operationHistory: 二次マウス操作情報履歴): boolean {
        return operationHistory.操作の継続時間 <= this._thresholds.クリックと判定する最大時間 && 
               operationHistory.ドラッグ開始位置から現在位置までの直線距離 < this._thresholds.ドラッグ開始と判定する最小移動距離;
    }

    /**
     * 操作がドラッグかどうかを判定
     * 状態がDRAGGINGの場合にドラッグと判定
     */
    public isDrag(operationHistory: 二次マウス操作情報履歴): boolean {
        return operationHistory.現在の操作状態 === MouseState.DRAGGING;
    }
}