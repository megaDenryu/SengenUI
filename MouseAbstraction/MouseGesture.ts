import { MouseEventData, MousePosition } from "./MouseEvent";
import { MouseStateManager, I二次マウス操作情報履歴, IMouse閾値, 二次マウス操作情報履歴 } from "./MouseState";

/**
 * マウスジェスチャーのタイプ
 */
export const GestureType = {
    CLICK: 'click',
    DOUBLE_CLICK: 'doubleClick',
    DRAG: 'drag',
    LONG_PRESS: 'longPress',
    SWIPE: 'swipe'
} as const;

export type GestureTypeType = typeof GestureType[keyof typeof GestureType];

/**
 * ジェスチャーの結果データ
 */
export interface IGestureResult {
    readonly type: GestureTypeType;
    readonly startPosition: MousePosition;
    readonly endPosition: MousePosition;
    readonly delta: MousePosition;
    readonly duration: number;
    readonly distance: number;
    /** このジェスチャーの詳細な操作履歴（速度、距離などを含む） */
    readonly operationHistory: I二次マウス操作情報履歴;
}

/**
 * ジェスチャーイベントのコールバック型定義
 */
export interface IGestureCallbacks {
    /** ジェスチャー開始時のコールバック（マウス押下時） */
    onGestureStart?: (operationHistory: I二次マウス操作情報履歴) => void;
    /** ジェスチャー更新時のコールバック（マウス移動時） */
    onGestureUpdate?: (operationHistory: I二次マウス操作情報履歴) => void;
    /** ジェスチャー終了時のコールバック（マウス解放時） */
    onGestureEnd?: (result: IGestureResult) => void;
    /** クリックジェスチャー特定時のコールバック */
    onClick?: (result: IGestureResult) => void;
    /** ダブルクリックジェスチャー特定時のコールバック */
    onDoubleClick?: (result: IGestureResult) => void;
    /** ドラッグジェスチャー特定時のコールバック */
    onDrag?: (result: IGestureResult) => void;
    /** ドラッグ開始時のコールバック */
    onDragStart?: (operationHistory: I二次マウス操作情報履歴) => void;
    /** ドラッグ中のコールバック */
    onDragMove?: (operationHistory: I二次マウス操作情報履歴) => void;
    /** ドラッグ終了時のコールバック */
    onDragEnd?: (result: IGestureResult) => void;
}

/**
 * マウスジェスチャー認識クラス
 */
export class MouseGestureRecognizer {
    private _stateManager: MouseStateManager;
    private _callbacks: IGestureCallbacks;
    private _element: HTMLElement | null = null;
    private _isAttached = false;
    private _lastClickTime = 0;

    constructor(
        callbacks: IGestureCallbacks = {},
        thresholds: Partial<IMouse閾値> = {}
    ) {
        this._stateManager = MouseStateManager.instance(thresholds);
        this._callbacks = callbacks;
    }

    /**
     * 要素にジェスチャー認識を追加
     */
    public attach(element: HTMLElement): void {
        if (this._isAttached) {
            this.detach();
        }

        this._element = element;
        this._isAttached = true;

        element.addEventListener('mousedown', this.マウス押下時にジェスチャー開始処理を実行);
        document.addEventListener('mousemove', this.マウス移動時にジェスチャー更新処理を実行);
        document.addEventListener('mouseup', this.マウス解放時にジェスチャー終了処理を実行);
    }

    /**
     * ジェスチャー認識を解除
     */
    public detach(): void {
        if (!this._isAttached || !this._element) return;

        this._element.removeEventListener('mousedown', this.マウス押下時にジェスチャー開始処理を実行);
        document.removeEventListener('mousemove', this.マウス移動時にジェスチャー更新処理を実行);
        document.removeEventListener('mouseup', this.マウス解放時にジェスチャー終了処理を実行);

        this._element = null;
        this._isAttached = false;
    }

    /**
     * マウス押下イベントを受信したときに実行される処理
     * 【実行内容】
     * 1. ブラウザのデフォルト動作を防止
     * 2. マウスイベントデータを抽象化クラスでラップ
     * 3. 状態管理クラスに新しいジェスチャーセッション開始を通知
     * 4. 利用者が登録したジェスチャー開始コールバックを呼び出し
     */
    private マウス押下時にジェスチャー開始処理を実行 = (event: MouseEvent): void => {
        event.preventDefault();
        const session = this._stateManager.マウスダウン時のマウス情報(event);
        
        this._callbacks.onGestureStart?.(session);
    };

    /**
     * マウス移動イベントを受信したときに実行される処理
     * 【実行内容】
     * 1. マウスイベントデータを抽象化クラスでラップ
     * 2. 状態管理クラスに現在位置更新を通知し、新しいセッション状態を取得
     * 3. セッションが存在しない場合は処理を中断
     * 4. 利用者が登録したジェスチャー更新コールバックを呼び出し
     * 5. ドラッグ状態に変化した場合、ドラッグ専用コールバックを呼び出し
     */
    private マウス移動時にジェスチャー更新処理を実行 = (event: MouseEvent): void => {
        const operationHistory = this._stateManager.マウス移動時のマウス情報(event);
        
        if (!operationHistory) return;

        this._callbacks.onGestureUpdate?.(operationHistory);

        // ドラッグ状態に変化した場合の専用処理
        if (operationHistory.現在の操作状態 === 'dragging') {
            this._callbacks.onDrag?.(this.createGestureResult(operationHistory, GestureType.DRAG));
            this._callbacks.onDragMove?.(operationHistory);
        }
    };

    /**
     * マウス解放イベントを受信したときに実行される処理
     * 【実行内容】
     * 1. マウスイベントデータを抽象化クラスでラップ
     * 2. 状態管理クラスにジェスチャー終了を通知し、最終セッション状態を取得
     * 3. セッションが存在しない場合は処理を中断
     * 4. セッション情報からジェスチャータイプを判定し、結果オブジェクトを作成
     * 5. 利用者が登録したジェスチャー終了コールバックを呼び出し
     * 6. ジェスチャータイプ別の専用コールバックを呼び出し（クリック、ドラッグ等）
     */
    private マウス解放時にジェスチャー終了処理を実行 = (event: MouseEvent): void => {
        const operationHistory = this._stateManager.マウスアップ時のマウス情報(event);
        
        if (!operationHistory) return;

        const result = this.createGestureResult(operationHistory, this.determineGestureType(operationHistory));
        
        this._callbacks.onGestureEnd?.(result);

        // 判定されたジェスチャータイプに応じた専用処理の実行
        switch (result.type) {
            case GestureType.CLICK:
                this._callbacks.onClick?.(result);
                this.クリック連続判定処理を実行(result);
                break;
            case GestureType.DRAG:
                this._callbacks.onDragEnd?.(result);
                break;
        }
    };

    /**
     * ジェスチャータイプを判定
     */
    private determineGestureType(operationHistory: 二次マウス操作情報履歴): GestureTypeType {
        if (this._stateManager.isClick(operationHistory)) {
            return GestureType.CLICK;
        } else if (this._stateManager.isDrag(operationHistory)) {
            return GestureType.DRAG;
        }
        return GestureType.CLICK; // デフォルト
    }

    /**
     * ジェスチャー結果オブジェクトを作成
     * 操作履歴から必要なデータを抽出して結果オブジェクトを作成
     */
    private createGestureResult(operationHistory: I二次マウス操作情報履歴, type: GestureTypeType): IGestureResult {
        return {
            type,
            startPosition: operationHistory.操作開始時のマウス位置,
            endPosition: operationHistory.現在のマウス位置,
            delta: operationHistory.ドラッグ開始位置から現在位置までの差分,
            duration: operationHistory.操作の継続時間,
            distance: operationHistory.ドラッグ開始位置から現在位置までの直線距離,
            operationHistory
        };
    }

    /**
     * クリック連続判定処理を実行する
     * 【実行内容】
     * 1. 現在のクリック時刻を取得
     * 2. 前回のクリック時刻との間隔を計算
     * 3. 300ms以内の場合はダブルクリックと判定
     * 4. ダブルクリックの場合、専用の結果オブジェクトを作成して利用者コールバックを呼び出し
     * 5. 今回のクリック時刻を記録し、次回の判定に備える
     */
    private クリック連続判定処理を実行(result: IGestureResult): void {
        const now = result.operationHistory.現在時刻;
        const timeSinceLastClick = now - this._lastClickTime;
        
        if (timeSinceLastClick < 300) { // 300ms以内の連続クリックをダブルクリックと判定
            const doubleClickResult = { ...result, type: GestureType.DOUBLE_CLICK };
            this._callbacks.onDoubleClick?.(doubleClickResult);
        }
        
        this._lastClickTime = now;
    }

    /**
     * コールバックを更新
     */
    public updateCallbacks(callbacks: Partial<IGestureCallbacks>): void {
        this._callbacks = { ...this._callbacks, ...callbacks };
    }
}