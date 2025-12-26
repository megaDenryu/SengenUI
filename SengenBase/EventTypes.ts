/**
 * HTML要素ごとの利用可能なイベントタイプの型定義
 */

// 全ての要素で共通に利用可能なイベント
export type CommonEventType = 
    | 'click'
    | 'dblclick'
    | 'mouseover'
    | 'mouseout'
    | 'mousedown'
    | 'mouseup'
    | 'mousemove'
    | 'mouseenter'
    | 'mouseleave'
    | 'contextmenu'
    | 'focus'
    | 'blur'
    | 'keydown'
    | 'keyup'
    | 'keypress'
    | 'input'
    | 'change'
    | 'select'
    | 'scroll'
    | 'submit'
    | 'reset'
    | 'load'
    | 'error'
    | 'dragstart'
    | 'drag'
    | 'dragend'
    | 'dragenter'
    | 'dragover'
    | 'dragleave'
    | 'drop';

// Button要素で利用可能なイベント
export type ButtonEventType = CommonEventType;

// Input要素で利用可能なイベント
export type InputEventType = CommonEventType | 'input' | 'change';

// TextArea要素で利用可能なイベント
export type TextAreaEventType = CommonEventType | 'input' | 'change' | 'select';

// Select要素で利用可能なイベント
export type SelectEventType = CommonEventType | 'change' | 'input';

// Form要素で利用可能なイベント
export type FormEventType = CommonEventType | 'submit' | 'reset';

// Image要素で利用可能なイベント
export type ImageEventType = CommonEventType | 'load' | 'error';

// Div要素で利用可能なイベント
export type DivEventType = CommonEventType | 'scroll';

// Audio要素で利用可能なイベント
export type AudioEventType = CommonEventType | 'play' | 'pause' | 'timeupdate' | 'ended' | 'volumechange' | 'loadeddata' | 'canplay';

// Anchor要素で利用可能なイベント
export type AnchorEventType = CommonEventType;

// Canvas要素で利用可能なイベント
export type CanvasEventType = CommonEventType;

// Iframe要素で利用可能なイベント
export type IframeEventType = CommonEventType | 'load';

// Label要素で利用可能なイベント
export type LabelEventType = CommonEventType;

// List要素(ul, ol, li)で利用可能なイベント
export type ListEventType = CommonEventType;

// Table要素で利用可能なイベント
export type TableEventType = CommonEventType;

// TD, TR要素で利用可能なイベント
export type TableCellEventType = CommonEventType;

// Span要素で利用可能なイベント
export type SpanEventType = CommonEventType;

// Paragraph要素で利用可能なイベント
export type ParagraphEventType = CommonEventType;

// Heading要素で利用可能なイベント
export type HeadingEventType = CommonEventType;

// SVG要素で利用可能なイベント (SVG特有のイベントを含む)
export type SvgEventType = CommonEventType;

// SVG Circle要素で利用可能なイベント
export type SvgCircleEventType = SvgEventType;

// SVG Rectangle要素で利用可能なイベント
export type SvgRectEventType = SvgEventType;

// SVG Line要素で利用可能なイベント
export type SvgLineEventType = SvgEventType;

// SVG Path要素で利用可能なイベント
export type SvgPathEventType = SvgEventType;

// SVG Group要素で利用可能なイベント
export type SvgGroupEventType = SvgEventType;

// 各イベントに対応するイベントオブジェクトの型マッピング
export interface EventHandlerMap {
    'click': MouseEvent;
    'dblclick': MouseEvent;
    'mouseover': MouseEvent;
    'mouseout': MouseEvent;
    'mousedown': MouseEvent;
    'mouseup': MouseEvent;
    'mousemove': MouseEvent;
    'focus': FocusEvent;
    'blur': FocusEvent;
    'keydown': KeyboardEvent;
    'keyup': KeyboardEvent;
    'keypress': KeyboardEvent;
    'input': Event;
    'change': Event;
    'select': Event;
    'submit': SubmitEvent;
    'reset': Event;
    'load': Event;
    'error': ErrorEvent;
    'scroll': Event;
    'play': Event;
    'pause': Event;
    'timeupdate': Event;
    'ended': Event;
    'volumechange': Event;
    'loadeddata': Event;
    'canplay': Event;
    'mouseenter': MouseEvent;
    'mouseleave': MouseEvent;
    'contextmenu': MouseEvent;
    'dragstart': DragEvent;
    'drag': DragEvent;
    'dragend': DragEvent;
    'dragenter': DragEvent;
    'dragover': DragEvent;
    'dragleave': DragEvent;
    'drop': DragEvent;
}

// 型安全なイベントリスナーコールバック型
export type TypedEventListener<T extends keyof EventHandlerMap> = (event: EventHandlerMap[T]) => void;

// 要素タイプとイベントタイプの組み合わせ用のユーティリティ型
export type ElementEventListener<E extends string, T extends keyof EventHandlerMap> = (event: EventHandlerMap[T]) => void;
