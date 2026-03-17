import { MouseStateManager } from "./MouseState";
import { 二次マウス操作情報履歴 } from "./MouseState";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { Drag中値, Drag開始値, Drag終了値, Iドラッグに連動可能, ドラッグ状態 } from "./MouseWife";

/**
 * PointerEvents版のMouseWife。PC（マウス）とスマホ（タッチ）の両方で動作する。
 *
 * MouseWifeとの違い:
 * - mousedown/move/up → pointerdown/move/up
 * - touch-action: none を自動設定（ブラウザのデフォルトタッチジェスチャを抑制）
 * - ピンチズーム検出（2本指の距離変化をコールバック通知）
 *
 * MouseWifeと同じインターフェース（Iドラッグに連動可能）を使うので、差し替えが容易。
 */
export class PointerWife {
    ドラッグ状態: ドラッグ状態 = ドラッグ状態.ドラッグ終了;
    ドラッグ連動者リスト: Iドラッグに連動可能[] = [];
    dragHandle: LV1HtmlComponentBase;

    // ピンチズーム用
    private _activePointers: Map<number, PointerEvent> = new Map();
    private _前回ピンチ距離: number | null = null;
    private _onPinch: ((変化率: number, 中心X: number, 中心Y: number) => void) | null = null;
    private _isピンチ中: boolean = false;

    constructor(dragHandle: LV1HtmlComponentBase) {
        this.dragHandle = dragHandle;
        dragHandle.setStyleCSS({ cursor: 'grab', touchAction: 'none' })
                .onPointerDown(this.onドラッグ開始.bind(this));
        dragHandle.addTypedEventListener('contextmenu', this.on右クリック.bind(this));
        document.addEventListener('pointermove', this.onドラッグ中.bind(this));
        document.addEventListener('pointerup', this.onドラッグ終了.bind(this));

        // Why: キャプチャフェーズで登録し、子要素のstopPropagationより先にポインタを追跡する
        document.addEventListener('pointerdown', this.onPointerDownForPinch.bind(this), true);
        document.addEventListener('pointermove', this.onPointerMoveForPinch.bind(this), { capture: true, passive: false });
        document.addEventListener('pointerup', this.onPointerUpForPinch.bind(this), true);
        document.addEventListener('pointercancel', this.onPointerUpForPinch.bind(this), true);
    }

    public ドラッグ連動登録(ドラッグに連動可能: Iドラッグに連動可能): this {
        this.ドラッグ連動者リスト.push(ドラッグに連動可能);
        return this;
    }

    public onPinchZoom(callback: (変化率: number, 中心X: number, 中心Y: number) => void): this {
        this._onPinch = callback;
        return this;
    }

    // --- ドラッグ処理（MouseWifeと同じ動作パターン） ---

    onドラッグ開始(e: PointerEvent): void {
        if (this.ドラッグ状態 !== ドラッグ状態.ドラッグ終了) {return;}
        if (this._isピンチ中) {return;}
        this.ドラッグ状態 = ドラッグ状態.ドラッグ開始;
        const operationHistory = MouseStateManager.instance().マウスダウン時のマウス情報(e);
        this.dragHandle.setStyleCSS({cursor: 'grabbing'});
        for (const 連動者 of this.ドラッグ連動者リスト) {
            イベント既定動作と伝搬を停止(e);
            連動者.onドラッグ開始(new Drag開始値(operationHistory));
        }
    }

    onドラッグ中(e: PointerEvent): void {
        if (this.ドラッグ状態 === ドラッグ状態.ドラッグ終了) {return;}
        if (this._isピンチ中) {return;}
        this.ドラッグ状態 = ドラッグ状態.ドラッグ中;
        const operationHistory = MouseStateManager.instance().マウス移動時のマウス情報(e);
        if (operationHistory == null) { return; }
        for (const 連動者 of this.ドラッグ連動者リスト) {
            イベント既定動作と伝搬を停止(e);
            連動者.onドラッグ中(new Drag中値(operationHistory));
        }
    }

    onドラッグ終了(e: PointerEvent): void {
        this.dragHandle.setStyleCSS({cursor: 'grab'});
        if (this.ドラッグ状態 === ドラッグ状態.ドラッグ終了) { return; }

        const previousState = this.ドラッグ状態;
        this.ドラッグ状態 = ドラッグ状態.ドラッグ終了;
        const operationHistory = MouseStateManager.instance().マウスアップ時のマウス情報(e);
        if (operationHistory == null) { return; }

        for (const 連動者 of this.ドラッグ連動者リスト) {
            イベント既定動作と伝搬を停止(e);
            連動者.onドラッグ終了(new Drag終了値(operationHistory));
        }
    }

    on右クリック(e: MouseEvent): void {
        e.stopPropagation();
        for (const 連動者 of this.ドラッグ連動者リスト) {
            if (連動者.on右クリック) {
                連動者.on右クリック(e);
            }
        }
    }

    // --- ピンチズーム検出（キャプチャフェーズ） ---

    private onPointerDownForPinch(e: PointerEvent): void {
        this._activePointers.set(e.pointerId, e);
        if (this._activePointers.size >= 2) {
            // Why: 2本指検出時にドラッグを強制終了して干渉を防ぐ
            this._isピンチ中 = true;
            if (this.ドラッグ状態 !== ドラッグ状態.ドラッグ終了) {
                this.ドラッグ状態 = ドラッグ状態.ドラッグ終了;
                this.dragHandle.setStyleCSS({cursor: 'grab'});
            }
        }
    }

    private onPointerMoveForPinch(e: PointerEvent): void {
        if (!this._activePointers.has(e.pointerId)) return;
        this._activePointers.set(e.pointerId, e);

        if (this._activePointers.size >= 2 && this._onPinch) {
            e.preventDefault();
            const pointers = [...this._activePointers.values()];
            const 距離 = Math.hypot(
                pointers[0].clientX - pointers[1].clientX,
                pointers[0].clientY - pointers[1].clientY
            );
            if (this._前回ピンチ距離 !== null) {
                const 変化率 = 距離 / this._前回ピンチ距離;
                const 中心X = (pointers[0].clientX + pointers[1].clientX) / 2;
                const 中心Y = (pointers[0].clientY + pointers[1].clientY) / 2;
                this._onPinch(変化率, 中心X, 中心Y);
            }
            this._前回ピンチ距離 = 距離;
        }
    }

    private onPointerUpForPinch(e: PointerEvent): void {
        this._activePointers.delete(e.pointerId);
        if (this._activePointers.size < 2) {
            this._前回ピンチ距離 = null;
            this._isピンチ中 = false;
        }
    }
}


function イベント既定動作と伝搬を停止(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
}
