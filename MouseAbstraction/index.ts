/**
 * マウス抽象化モジュールのエクスポート
 * 
 * 使用例：
 * ```typescript
 * import { MouseGestureRecognizer, GestureType } from '@/Extend/MouseAbstraction';
 * 
 * const recognizer = new MouseGestureRecognizer({
 *     onDrag: (result) => {
 *         console.log(`ドラッグ: ${result.delta.x}, ${result.delta.y}`);
 *     },
 *     onClick: (result) => {
 *         console.log('クリック');
 *     }
 * });
 * 
 * recognizer.attach(element);
 * ```
 */

export { MouseEventData } from './MouseEvent';
export type { MousePosition, MouseButton, IMouseEventData } from './MouseEvent';

export { MouseStateManager, MouseState, DEFAULT_MOUSE_THRESHOLDS } from './MouseState';
export type { MouseStateType, I二次マウス操作情報履歴 as IMouseOperationHistory, IMouse閾値 as IMouseThresholds } from './MouseState';

export { MouseGestureRecognizer, GestureType } from './MouseGesture';
export type { GestureTypeType, IGestureResult, IGestureCallbacks } from './MouseGesture';