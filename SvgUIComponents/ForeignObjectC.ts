import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";

export interface ForeignObjectOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    transform?: string;
    opacity?: number;
    className?: string | string[];
    id?: string;
}

/**
 * SVG ForeignObject要素のコンポーネント
 * HTML要素をSVG内に埋め込むためのSVG要素をラップします
 */
export class ForeignObjectC extends SvgContainerBase {
    private _htmlContent: HTMLElement | null = null;

    constructor(options?: ForeignObjectOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.transform) this.setTransform(options.transform);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const foreignObject = SvgElementCreater.createForeignObjectElement();
        return new SvgElementProxy(foreignObject);
    }

    /**
     * X座標を設定
     */
    public setX(x: number): this {
        this.setSvgAttribute("x", x);
        return this;
    }

    /**
     * X座標を取得
     */
    public getX(): number {
        return parseFloat(this.getSvgAttribute("x") || "0");
    }

    /**
     * Y座標を設定
     */
    public setY(y: number): this {
        this.setSvgAttribute("y", y);
        return this;
    }

    /**
     * Y座標を取得
     */
    public getY(): number {
        return parseFloat(this.getSvgAttribute("y") || "0");
    }

    /**
     * 幅を設定
     */
    public setWidth(width: number): this {
        this.setSvgAttribute("width", width);
        return this;
    }

    /**
     * 幅を取得
     */
    public getWidth(): number {
        return parseFloat(this.getSvgAttribute("width") || "0");
    }

    /**
     * 高さを設定
     */
    public setHeight(height: number): this {
        this.setSvgAttribute("height", height);
        return this;
    }

    /**
     * 高さを取得
     */
    public getHeight(): number {
        return parseFloat(this.getSvgAttribute("height") || "0");
    }

    /**
     * 位置を設定
     */
    public setPosition(x: number, y: number): this {
        this.setX(x);
        this.setY(y);
        return this;
    }

    /**
     * 位置を取得
     */
    public getPosition(): { x: number, y: number } {
        return {
            x: this.getX(),
            y: this.getY()
        };
    }

    /**
     * サイズを設定
     */
    public setSize(width: number, height: number): this {
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    /**
     * サイズを取得
     */
    public getSize(): { width: number, height: number } {
        return {
            width: this.getWidth(),
            height: this.getHeight()
        };
    }

    /**
     * 位置とサイズを一度に設定
     */
    public setBounds(x: number, y: number, width: number, height: number): this {
        this.setPosition(x, y);
        this.setSize(width, height);
        return this;
    }

    /**
     * 位置とサイズを取得
     */
    public getBounds(): { x: number, y: number, width: number, height: number } {
        return {
            ...this.getPosition(),
            ...this.getSize()
        };
    }

    /**
     * HTML要素を設定
     */
    public setHTMLElement(element: HTMLElement): this {
        // 既存のコンテンツをクリア
        this.clearHTML();
        
        this._htmlContent = element;
        this._svgDom.element.appendChild(element);
        return this;
    }

    /**
     * HTML要素を取得
     */
    public getHTMLElement(): HTMLElement | null {
        return this._htmlContent;
    }

    /**
     * HTMLコンテンツをクリア
     */
    public clearHTML(): this {
        if (this._htmlContent && this._htmlContent.parentNode) {
            this._htmlContent.parentNode.removeChild(this._htmlContent);
        }
        this._htmlContent = null;
        return this;
    }

    /**
     * HTML文字列からコンテンツを設定
     */
    public setHTMLString(htmlString: string): this {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        this.setHTMLElement(div);
        return this;
    }

    /**
     * テキストコンテンツを設定
     */
    public setTextContent(text: string): this {
        const div = document.createElement('div');
        div.textContent = text;
        this.setHTMLElement(div);
        return this;
    }

    /**
     * ボタンを作成
     */
    public createButton(text: string, onClick?: () => void): this {
        const button = document.createElement('button');
        button.textContent = text;
        if (onClick) {
            button.addEventListener('click', onClick);
        }
        this.setHTMLElement(button);
        return this;
    }

    /**
     * 入力フィールドを作成
     */
    public createInput(type: string = 'text', placeholder?: string): this {
        const input = document.createElement('input');
        input.type = type;
        if (placeholder) {
            input.placeholder = placeholder;
        }
        this.setHTMLElement(input);
        return this;
    }

    /**
     * テキストエリアを作成
     */
    public createTextArea(placeholder?: string): this {
        const textarea = document.createElement('textarea');
        if (placeholder) {
            textarea.placeholder = placeholder;
        }
        this.setHTMLElement(textarea);
        return this;
    }

    /**
     * 選択ボックスを作成
     */
    public createSelect(options: { value: string, text: string }[]): this {
        const select = document.createElement('select');
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });
        this.setHTMLElement(select);
        return this;
    }

    /**
     * 画像を作成
     */
    public createImage(src: string, alt?: string): this {
        const img = document.createElement('img');
        img.src = src;
        if (alt) {
            img.alt = alt;
        }
        this.setHTMLElement(img);
        return this;
    }

    /**
     * ビデオを作成
     */
    public createVideo(src: string, controls: boolean = true): this {
        const video = document.createElement('video');
        video.src = src;
        video.controls = controls;
        this.setHTMLElement(video);
        return this;
    }

    /**
     * キャンバスを作成
     */
    public createCanvas(width: number, height: number): this {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.setHTMLElement(canvas);
        return this;
    }

    /**
     * iframeを作成
     */
    public createIframe(src: string): this {
        const iframe = document.createElement('iframe');
        iframe.src = src;
        this.setHTMLElement(iframe);
        return this;
    }

    /**
     * CSSスタイルを設定
     */
    public setCSS(styles: { [key: string]: string }): this {
        if (this._htmlContent) {
            Object.assign(this._htmlContent.style, styles);
        }
        return this;
    }

    /**
     * CSSクラスを追加
     */
    public addCSSClass(className: string): this {
        if (this._htmlContent) {
            this._htmlContent.classList.add(className);
        }
        return this;
    }

    /**
     * CSSクラスを削除
     */
    public removeCSSClass(className: string): this {
        if (this._htmlContent) {
            this._htmlContent.classList.remove(className);
        }
        return this;
    }

    /**
     * HTML属性を設定
     */
    public setHTMLAttribute(name: string, value: string): this {
        if (this._htmlContent) {
            this._htmlContent.setAttribute(name, value);
        }
        return this;
    }

    /**
     * HTML属性を取得
     */
    public getHTMLAttribute(name: string): string | null {
        return this._htmlContent?.getAttribute(name) || null;
    }

    /**
     * イベントリスナーを追加
     */
    public addHTMLEventListener(event: string, listener: EventListener): this {
        if (this._htmlContent) {
            this._htmlContent.addEventListener(event, listener);
        }
        return this;
    }

    /**
     * イベントリスナーを削除
     */
    public removeHTMLEventListener(event: string, listener: EventListener): this {
        if (this._htmlContent) {
            this._htmlContent.removeEventListener(event, listener);
        }
        return this;
    }

    /**
     * HTMLコンテンツのDOMツリーを検索
     */
    public querySelector(selector: string): HTMLElement | null {
        return this._htmlContent?.querySelector(selector) || null;
    }

    /**
     * HTMLコンテンツのDOMツリーを複数検索
     */
    public querySelectorAll(selector: string): NodeListOf<Element> | null {
        return this._htmlContent?.querySelectorAll(selector) || null;
    }

    /**
     * 中央に配置
     */
    public centerAt(centerX: number, centerY: number): this {
        const width = this.getWidth();
        const height = this.getHeight();
        this.setX(centerX - width / 2);
        this.setY(centerY - height / 2);
        return this;
    }

    /**
     * 相対位置移動
     */
    public moveBy(dx: number, dy: number): this {
        this.setX(this.getX() + dx);
        this.setY(this.getY() + dy);
        return this;
    }

    /**
     * 絶対位置移動
     */
    public moveTo(x: number, y: number): this {
        this.setPosition(x, y);
        return this;
    }

    /**
     * サイズを比例的に変更
     */
    public scale(factor: number): this {
        const currentWidth = this.getWidth();
        const currentHeight = this.getHeight();
        this.setSize(currentWidth * factor, currentHeight * factor);
        return this;
    }

    /**
     * HTMLコンテンツの表示/非表示
     */
    public setHTMLVisible(visible: boolean): this {
        if (this._htmlContent) {
            this._htmlContent.style.display = visible ? '' : 'none';
        }
        return this;
    }

    /**
     * HTMLコンテンツの表示状態を取得
     */
    public isHTMLVisible(): boolean {
        return this._htmlContent?.style.display !== 'none';
    }

    /**
     * HTMLコンテンツにフォーカスを設定
     */
    public focusHTML(): this {
        if (this._htmlContent && typeof (this._htmlContent as any).focus === 'function') {
            (this._htmlContent as any).focus();
        }
        return this;
    }

    /**
     * HTMLコンテンツのフォーカスを解除
     */
    public blurHTML(): this {
        if (this._htmlContent && typeof (this._htmlContent as any).blur === 'function') {
            (this._htmlContent as any).blur();
        }
        return this;
    }

    /**
     * HTMLコンテンツの境界ボックスを取得
     */
    public getHTMLBoundingRect(): DOMRect | null {
        return this._htmlContent?.getBoundingClientRect() || null;
    }
}
