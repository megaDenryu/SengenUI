import { HtmlElementProxy, HaveHtmlElementProxy } from "./DomProxy";

export interface IDragAble {
    dom: HtmlElementProxy;
    dragMover: DragMover;
}

/**
 * ドラッグ移動を行うクラス。position:absoluteを設定する必要はない。
 */
export class DragMover {
    private _iHasComponent: HaveHtmlElementProxy;
    private _dragging: boolean = false;
    private _startX: number;
    private _startY: number;
    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _enableDrag: boolean = true;

    constructor(iHasComponent: HaveHtmlElementProxy) {
        this._iHasComponent = iHasComponent;
        const el = this._iHasComponent.dom.element;
        el.addEventListener('mousedown', this.onMouseDown.bind(this));
        el.addEventListener('dragstart', this.onDragStart.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    private onMouseDown(e: MouseEvent) {
        e.stopPropagation();
        if (!this._enableDrag) return;
        this._dragging = true;
        this._startX = e.clientX;
        this._startY = e.clientY;

        // transformプロパティから既存のtranslate値を取得
        const style = window.getComputedStyle(this._iHasComponent.dom.element);
        const transform = style.transform;
        if (transform && transform !== 'none') {
            const match = transform.match(/matrix\(.*,\s*(.*),\s*(.*)\)/);
            if (match) {
                this._offsetX = parseFloat(match[1]);
                this._offsetY = parseFloat(match[2]);
            } else {
                this._offsetX = 0;
                this._offsetY = 0;
            }
        } else {
            this._offsetX = 0;
            this._offsetY = 0;
        }
    }

    private onMouseMove(e: MouseEvent) {
        e.stopPropagation();
        if (this._dragging && this._enableDrag) {
            const deltaX = e.clientX - this._startX;
            const deltaY = e.clientY - this._startY;
            const newX = this._offsetX + deltaX;
            const newY = this._offsetY + deltaY;
            this._iHasComponent.dom.element.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    }

    private onMouseUp() {
        this._dragging = false;
    }

    private onDragStart(e: DragEvent) {
        if (!this._enableDrag) {
            e.preventDefault();
        }
    }

    public get enableDrag() {
        return this._enableDrag;
    }

    public setEnableDrag(value: boolean) {
        this._enableDrag = value;
        if (!value && this._dragging) {
            this._dragging = false;
        }
        return this;
    }
}