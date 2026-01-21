
import { HtmlComponentBase } from "./HtmlComponentBase";
import { CommonEventType, TypedEventListener } from "./EventTypes";
import { HtmlElementProxy } from "./DomProxy";
import { ILV1HtmlComponentBase } from "./HtmlComponentBaseInterfaces";

/**
 * LV1 UIコンポーネントの基底クラス。
 * 単一のHTML要素を直接ラップすることを目的とします。
 */
export abstract class LV1HtmlComponentBase extends HtmlComponentBase implements ILV1HtmlComponentBase {
    protected _dom: HtmlElementProxy;
    public get dom(): HtmlElementProxy { return this._dom; }//フレームワークを実装するために仕方なくpublicになってるだけなので基底クラス以外がdomを直接参照することは禁止。重大な犯罪行為。重大なバグの元。使うやつは頭が悪い。
    constructor() {
        super();
        this._dom = this.createDomProxy(); // サブクラスで実装されるcreateDomProxyを呼び出す
    }

    /**
     * サブクラスでDomProxyインスタンスを生成して返すための抽象メソッド。
     */
    protected abstract createDomProxy(): HtmlElementProxy;

    public setAttribute(key: string, value: string): this {
        this.dom.element.setAttribute(key, value);
        return this;
    }

    public toggleAttribute(key: string, isSet: boolean, valueIfTrue: string = "true"): this {
        if (isSet) {
            this.dom.element.setAttribute(key, valueIfTrue);
        } else {
            this.dom.element.removeAttribute(key);
        }
        return this;
    }

    /**
     * LV1コンポーネントは通常、子コンポーネントを論理的に持たず、
     * そのDOM構造内に直接HTML要素やテキストを持つことを想定しています。
     * appendChild を呼び出すと UIComponentBase の実装が使われますが、
     * LV1の設計思想としては、内部構造は自身の責務で完結させるか、
     * setTextContentやsetHtmlContentのようなメソッドで操作することが推奨されます。
     */

    /**
     * 型安全なイベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addTypedEventListener<T extends CommonEventType>(
        event: T,
        listener: TypedEventListener<T>
    ): this {
        this.dom.element.addEventListener(event, listener as EventListener);
        return this;
    }

    /**
     * 型安全なイベントリスナーを削除します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public removeTypedEventListener<T extends CommonEventType>(
        event: T,
        listener: TypedEventListener<T>
    ): this {
        this.dom.element.removeEventListener(event, listener as EventListener);
        return this;
    }// === 共通イベントメソッド ===

    public onClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }

    public onMouseOver(callback: TypedEventListener<'mouseover'>): this {
        this.addTypedEventListener('mouseover', callback);
        return this;
    }

    public onMouseOut(callback: TypedEventListener<'mouseout'>): this {
        this.addTypedEventListener('mouseout', callback);
        return this;
    }

    public onMouseDown(callback: TypedEventListener<'mousedown'>): this {
        this.addTypedEventListener('mousedown', callback);
        return this;
    }

    public onMouseMove(callback: TypedEventListener<'mousemove'>): this {
        this.addTypedEventListener('mousemove', callback);
        return this;
    }

    public onMouseUp(callback: TypedEventListener<'mouseup'>): this {
        this.addTypedEventListener('mouseup', callback);
        return this;
    }

    public onFocus(callback: TypedEventListener<'focus'>): this {
        this.addTypedEventListener('focus', callback);
        return this;
    }

    public onBlur(callback: TypedEventListener<'blur'>): this {
        this.addTypedEventListener('blur', callback);
        return this;
    }

    public onKeyDown(callback: TypedEventListener<'keydown'>): this {
        this.addTypedEventListener('keydown', callback);
        return this;
    }

    public onKeyUp(callback: TypedEventListener<'keyup'>): this {
        this.addTypedEventListener('keyup', callback);
        return this;
    }

    public onKeyPress(callback: TypedEventListener<'keypress'>): this {
        this.addTypedEventListener('keypress', callback);
        return this;
    }

    public onInput(callback: TypedEventListener<'input'>): this {
        this.addTypedEventListener('input', callback);
        return this;
    }

    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    public onSelect(callback: TypedEventListener<'select'>): this {
        this.addTypedEventListener('select', callback);
        return this;
    }

    public onScroll(callback: TypedEventListener<'scroll'>): this {
        this.addTypedEventListener('scroll', callback);
        return this;
    }
}