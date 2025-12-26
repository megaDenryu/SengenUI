import { SvgElementProxy, HaveSvgElementProxy } from "../../SengenBase/SvgDomProxy";
import { SvgEventType, TypedEventListener } from "../../SengenBase/EventTypes";
import { HtmlAndSvgInterface } from "../../SengenBase/IUIComponent";

/**
 * すべてのSVG要素の基底クラス
 * SVG要素に共通する機能を提供します
 * - イベント管理
 * - 属性管理
 * - スタイル管理
 * - クラス管理
 * - 変形（transform）
 * - 描画属性（fill, stroke等）
 */
export abstract class SvgElementBase implements HaveSvgElementProxy, HtmlAndSvgInterface {
    protected _svgDom: SvgElementProxy;

    constructor() {
    }

    /**
     * SvgDomProxyインスタンスを取得
     */
    public get dom(): SvgElementProxy {
        return this._svgDom;
    }

    /**
     * サブクラスでSvgDomProxyインスタンスを生成して返すための抽象メソッド
     */
    protected abstract createSvgDomProxy(): SvgElementProxy;

    /**
     * DomProxyの作成（UIComponentBaseとの互換性のため）
     */
    protected createDomProxy(): SvgElementProxy {
        return this.createSvgDomProxy();
    }

    // ==================== イベント管理 ====================

    /**
     * 型安全なSVGイベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addSvgEventListener<T extends SvgEventType>(
        event: T,
        listener: TypedEventListener<T>
    ): this {
        this._svgDom.element.addEventListener(event, listener as EventListener);
        return this;
    }

    /**
     * 型安全なSVGイベントリスナーを削除します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public removeSvgEventListener<T extends SvgEventType>(
        event: T,
        listener: TypedEventListener<T>
    ): this {
        this._svgDom.element.removeEventListener(event, listener as EventListener);
        return this;
    }

    // === SVG共通イベントメソッド ===

    public onSvgClick(callback: TypedEventListener<'click'>): this {
        return this.addSvgEventListener('click', callback);
    }

    public onSvgMouseOver(callback: TypedEventListener<'mouseover'>): this {
        return this.addSvgEventListener('mouseover', callback);
    }

    public onSvgMouseOut(callback: TypedEventListener<'mouseout'>): this {
        return this.addSvgEventListener('mouseout', callback);
    }

    public onSvgMouseDown(callback: TypedEventListener<'mousedown'>): this {
        return this.addSvgEventListener('mousedown', callback);
    }

    public onSvgMouseUp(callback: TypedEventListener<'mouseup'>): this {
        return this.addSvgEventListener('mouseup', callback);
    }

    public onSvgMouseMove(callback: TypedEventListener<'mousemove'>): this {
        return this.addSvgEventListener('mousemove', callback);
    }

    public onSvgMouseEnter(callback: TypedEventListener<'mouseenter'>): this {
        return this.addSvgEventListener('mouseenter', callback);
    }

    public onSvgMouseLeave(callback: TypedEventListener<'mouseleave'>): this {
        return this.addSvgEventListener('mouseleave', callback);
    }

    public onSvgDragStart(callback: TypedEventListener<'dragstart'>): this {
        return this.addSvgEventListener('dragstart', callback);
    }

    public onSvgDrag(callback: TypedEventListener<'drag'>): this {
        return this.addSvgEventListener('drag', callback);
    }

    public onSvgDragEnd(callback: TypedEventListener<'dragend'>): this {
        return this.addSvgEventListener('dragend', callback);
    }

    // ==================== 属性管理 ====================

    /**
     * SVG属性を設定
     */
    public setSvgAttribute(name: string, value: string | number): this {
        this._svgDom.setSvgAttribute(name, value);
        return this;
    }

    /**
     * SVG属性を取得
     */
    public getSvgAttribute(name: string): string | null {
        return this._svgDom.getSvgAttribute(name);
    }

    // ==================== 変形（Transform） ====================

    /**
     * transform属性を設定
     */
    public setTransform(transform: string): this {
        this._svgDom.setTransform(transform);
        return this;
    }

    /**
     * 移動変形を設定
     */
    public setTranslate(x: number, y: number): this {
        this._svgDom.setTranslate(x, y);
        return this;
    }

    /**
     * 回転変形を設定
     */
    public setRotate(angle: number, cx?: number, cy?: number): this {
        this._svgDom.setRotate(angle, cx, cy);
        return this;
    }

    /**
     * スケール変形を設定
     */
    public setScale(sx: number, sy?: number): this {
        this._svgDom.setScale(sx, sy);
        return this;
    }

    // ==================== 描画属性 ====================

    /**
     * fill属性を設定
     */
    public setFill(color: string): this {
        this._svgDom.setFill(color);
        return this;
    }

    /**
     * stroke属性を設定
     */
    public setStroke(color: string, width?: number): this {
        this._svgDom.setStroke(color, width);
        return this;
    }

    /**
     * 不透明度を設定
     */
    public setOpacity(opacity: number): this {
        this._svgDom.setOpacity(opacity);
        return this;
    }

    // ==================== クラス管理 ====================

    /**
     * SVGクラスを追加
     */
    public addSvgClass(className: string | string[]): this {
        this._svgDom.addCSSClass(className);
        return this;
    }

    /**
     * SVGクラスを削除
     */
    public removeSvgClass(className: string | string[]): this {
        this._svgDom.removeCSSClass(className);
        return this;
    }

    /**
     * CSSクラスを追加（IUIComponent互換）
     */
    public addClass(className: string | string[]): this {
        return this.addSvgClass(className);
    }

    /**
     * CSSクラスを削除（IUIComponent互換）
     */
    public removeClass(className: string | string[]): this {
        return this.removeSvgClass(className);
    }

    // ==================== 表示制御 ====================

    /**
     * SVG要素を表示
     */
    public show(): this {
        this._svgDom.setSvgAttribute('display', 'block');
        return this;
    }

    /**
     * SVG要素を非表示
     */
    public hide(): this {
        this._svgDom.setSvgAttribute('display', 'none');
        return this;
    }

    /**
     * 表示/非表示を切り替え
     */
    public toggleShowHide(): this {
        const currentDisplay = this._svgDom.getSvgAttribute('display');
        if (currentDisplay === 'none') {
            this.show();
        } else {
            this.hide();
        }
        return this;
    }

    // ==================== その他 ====================


    /**
     * コンポーネントを削除
     */
    public delete(): void {
        this._svgDom.delete();
    }

    /**
     * 自己参照を受け取るクロージャーを実行
     * メソッドチェーン中に追加の処理を行う際に使用
     */
    public bind(callback: (self: this) => void): this {
        callback(this);
        return this;
    }
}
