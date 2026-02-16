
import { Px長さ, コンテキスト, 要素座標 } from "./css長さ単位";
import { HaveSvgElementProxy } from "./SvgDomProxy";
import { HaveMathMLElementProxy } from "./MathMLDomProxy";

export class ElementCreater {
    /**
     * HTMLElement: 単一のHTML要素を表し、その要素に対して操作を行うためのオブジェクト。
     * HTMLCollection: 複数のHTMLElementをまとめた動的コレクションで、リアルタイムにDOMツリーの変化を反映する。
     * Document: Webページ全体を表すオブジェクトで、DOMツリーのエントリーポイント。
     * 
     * これらを文字列から生成するためのクラス。
     */

    static domParser = new DOMParser();

    /**
     * htmlの文字列からそれと同じHTMLElementを生成する。ただし、htmlの文字列は1つの要素であること。（1つの要素の中に複数の子要素がネストされている構造が許される）
     * 複数エレメントを含むhtml文字列をまとめて作りたい場合は createElementsFromHTMLSting() を使うこと。
     * 良い例:
     * <div class="output_text">
     *      <p>おはよう</p>
     * </div>'
     * この場合output_textのdiv要素全体が返される。
     * 
     * ダメな例:
     * <div class="output_text1"><p>おはよう</p>'</div>
     * <div class="output_text2"><p>コンバンワ</p>'</div>
     */
    static createElementFromHTMLString(html: string, className: string | null = null, id: string | null = null): HTMLElement {
        const parsedDocument = ElementCreater.domParser.parseFromString(html, 'text/html');
        const firstChild = parsedDocument.body.firstChild;
        if (firstChild && firstChild instanceof HTMLElement) {
            return this.setClassNameAndId(firstChild, className, id);
        } else {
            throw new Error('Parsed element is not an HTMLElement or is null.');
        }
    }

    /**
     * 複数のエレメントを含むhtml文字列からそれと同じHTMLElementを生成する。
     * @param {string} html
     * @return {HTMLCollection} getElementsByClassName()で取得できるようなものと同じ型。
     */
    static createElementsFromHTMLString(html: string): HTMLCollection {
        const parsedDocument = ElementCreater.domParser.parseFromString(html, 'text/html');
        const children = parsedDocument.body.children;
        if (children && children instanceof HTMLCollection) {
            return children; // HTMLCollectionとして返す
        } else {
            throw new Error('Parsed elements are not an HTMLCollection.');
        }
    }

    /**
     * htmlの文字列からそれと同じDocumentを生成する。
     * @param {string} html
     * @return {Document}
     */
    static createNewDocumentFromHTMLString(html: string): Document {
        return ElementCreater.domParser.parseFromString(html, 'text/html');
    }

    /**
     * リストを受け取ってHTMLSelectElementを返す関数。
     * @param {Array<string>} options - セレクトボックスのオプションとして使用する文字列の配列。
     * @param {number | null} [size = null] - セレクトボックスのサイズ。nullの場合は指定しない。
     * @param {string | null} [selectedValue = null] - 初期値として選択するオプションの値。nullの場合は指定しない。
     * @return {HTMLSelectElement} - 生成されたHTMLSelectElement。
     */
    static createSelectElement(options: string[], size: number | null = null, selectedValue: string | null = null): HTMLSelectElement {
        let selectElement = document.createElement('select');
    
        options.forEach(optionText => {
            const optionElement = document.createElement('option');
            optionElement.value = optionText;
            optionElement.textContent = optionText;
            if (selectedValue !== null && optionText === selectedValue) {
                optionElement.selected = true;
            }
            selectElement.appendChild(optionElement);
        });
    
        if (size != null) {
            selectElement.size = size;
        }
        return selectElement;
    }

    /**
     * リストを受け取ってHTMLSelectElementを返す関数。
     * @param {Array<{ text: string, dataset: Record<string, string> }>} options - セレクトボックスのオプションとして使用するオブジェクトの配列。
     * @param {number | null} [size = null] - セレクトボックスのサイズ。nullの場合は指定しない。
     * @param {string | null} [selectedValue = null] - 初期値として選択するオプションの値。nullの場合は指定しない。
     * @return {HTMLSelectElement} - 生成されたHTMLSelectElement。
     */
    static createSelectElementWithDataset(
        options: { text: string, dataset: Record<string, string> }[],
        size: number | null = null,
        selectedValue: string | null = null
    ): HTMLSelectElement {
        let selectElement = document.createElement('select');

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.text;
            optionElement.textContent = option.text;

            // datasetを設定
            Object.keys(option.dataset).forEach(key => {
                optionElement.dataset[key] = option.dataset[key];
            });

            if (selectedValue !== null && option.text === selectedValue) {
                optionElement.selected = true;
            }
            selectElement.appendChild(optionElement);
        });

        if (size != null) {
            selectElement.size = size;
        }
        return selectElement;
    }

    static createButtonElement(text: string, onClick: () => void): HTMLButtonElement {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = text;
        buttonElement.onclick = onClick;
        return buttonElement;
    }

    static setClassNameAndId(element: HTMLElement, className: string | null = null, id: string | null = null): HTMLElement {
        if (className) { element.className = className; }
        if (id) { element.id = id; }
        return element;
    }

    static createSliderInputElement(min: number, max: number, step: number, value: number): HTMLInputElement {
        const sliderElement = document.createElement('input');
        sliderElement.type = 'range';
        sliderElement.min = min.toString();
        sliderElement.max = max.toString();
        sliderElement.step = step.toString();
        sliderElement.value = value.toString();
        return sliderElement;
    }

    static createDivElement(className: string | null = null, id: string | null = null): HTMLElement {
        const divElement = document.createElement('div');
        return this.setClassNameAndId(divElement, className, id);
    }
}



/**
 * Element基底のProxy
 * HTML/SVG/MathML全ての要素に共通する機能を提供
 */
export abstract class ElementProxy<T extends Element> {
    protected _element: T;

    constructor(element: T) {
        this._element = element;
    }

    get element(): T {
        return this._element;
    }

    // ========================================
    // Element共通機能: クラス操作
    // ========================================

    get ClassNames(): string[] {
        return Array.from(this._element.classList);
    }

    static actualClassNames(element: Element): string[] {
        return Array.from(element.classList);
    }

    /**
     * @param classNames : Vanill extractの空白で区切られたクラス名にも対応した
     */
    addCSSClass(classNames: string[] | string): void {
        const classes = Array.isArray(classNames) 
            ? classNames 
            : classNames.split(' ').filter(Boolean);
        
        this._element.classList.add(...classes);
    }

    /**
     * @param classNames  : Vanill extractの空文字が入ってるクラス名にも対応した
     */
    removeCSSClass(classNames: string[] | string): void {
        const classes = Array.isArray(classNames)
            ? classNames
            : classNames.split(' ').filter(Boolean);
        
        this._element.classList.remove(...classes);
    }

    setCSSClass(classNames: string[] | string): void {
        if (typeof classNames === 'string') {
            this._element.className = classNames;
        } else {
            this._element.className = classNames.join(' ');
        }
    }

    // ========================================
    // Element共通機能: 子要素管理（型安全な実装は各サブクラスで）
    // ========================================

    

    /**
     * すべての子要素を削除
     */
    clearChildren(): void {
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
    }

    

    deleteSelfFromParent(): void {
        if (this._element.parentElement) {
            this._element.parentElement.removeChild(this._element);
        } else {
            console.warn('Element has no parent to delete from.');
        }
    }

    

    // ========================================
    // Element共通機能: 削除
    // ========================================

    /**
     * コンポーネントを削除する
     */
    public delete(): void {
        this._element.remove();
    }

    // ========================================
    // Element共通機能: レイアウト情報
    // ========================================

    public get自身の画面内での座標(): 要素座標 {
        const rect = this._element.getBoundingClientRect();
        return {
            x: new Px長さ(rect.left),
            y: new Px長さ(rect.top)
        };
    }
}

export interface HaveHtmlElementProxy {
    readonly dom: HtmlElementProxy;
    delete(): void
}

/**
 * HTMLElement用Proxy
 * HTML要素固有の機能を提供
 */
export class HtmlElementProxy extends ElementProxy<HTMLElement> {
    constructor(HTMLElementInput: HTMLElement, addClassName: string[] = [], vertexViewContent: any | null = null) {
        super(HTMLElementInput);
        this.addCSSClass(addClassName);
    }

    // ========================================
    // HTMLElement固有機能: 子要素管理（型安全）
    // ========================================

    addChild(child: HaveHtmlElementProxy|HaveSvgElementProxy|HaveMathMLElementProxy): void {
        this._element.appendChild(child.dom.element);
    }

    addChilds(childs: HaveHtmlElementProxy[]): void {
        for (const child of childs) {
            this.addChild(child);
        }
    }

    /**
     * 子要素の順序を変更
     */
    moveChildToIndex(child: HaveHtmlElementProxy|HaveSvgElementProxy|HaveMathMLElementProxy, newIndex: number): void {
        const childElement = child.dom.element;
        const children = Array.from(this._element.children);
        const currentIndex = children.indexOf(childElement);
        
        if (currentIndex === -1) {
            throw new Error("Child not found in parent");
        }
        
        if (newIndex < 0 || newIndex >= children.length) {
            throw new Error(`Invalid index: ${newIndex}`);
        }
        
        if (currentIndex === newIndex) {
            return;
        }
        
        this._element.removeChild(childElement);
        
        if (newIndex === children.length - 1) {
            this._element.appendChild(childElement);
        } else {
            const targetIndex = newIndex > currentIndex ? newIndex : newIndex;
            const nextSibling = this._element.children[targetIndex];
            if (nextSibling) {
                this._element.insertBefore(childElement, nextSibling);
            } else {
                this._element.appendChild(childElement);
            }
        }
    }

    /**
     * 子要素を指定位置に挿入
     */
    insertChildAt(index: number, child: HaveHtmlElementProxy|HaveSvgElementProxy|HaveMathMLElementProxy): void {
        const children = this._element.children;
        if (index < 0 || index > children.length) {
            throw new Error(`Invalid index: ${index}`);
        }
        if (index === children.length) {
            this._element.appendChild(child.dom.element);
        } else {
            this._element.insertBefore(child.dom.element, children[index]);
        }
    }

    deleteChild(child: HaveHtmlElementProxy|HaveSvgElementProxy|HaveMathMLElementProxy): void {
        if (this._element.contains(child.dom.element)) {
            this._element.removeChild(child.dom.element);
        } else {
            console.warn('Child element not found in parent.');
        }
    }

    // ========================================
    // HTMLElement固有機能: スタイル
    // ========================================

    setStyle(styles: Partial<CSSStyleDeclaration>): void {
        Object.assign(this._element.style, styles);
    }

    setAsChildComponent() {
        this.addCSSClass(["positionRelative"]);
        this.removeCSSClass(["positionAbsolute"]);
        return this;
    }

    setAsParentComponent() {
        this.addCSSClass(["positionAbsolute"]);
        this.removeCSSClass(["positionRelative"]);
        return this;
    }

    get isShow(): boolean {
        const style = window.getComputedStyle(this._element);
        return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0' &&
            document.body.contains(this._element)
        );
    }
    
    show(): void {
        this._element.style.display = 'block';
        this._element.style.visibility = 'visible';
        this._element.style.opacity = '1';
    }
    
    hide(): void {
        this._element.style.display = 'none';
        this._element.style.visibility = 'hidden';
        this._element.style.opacity = '0';
    }

    setZIndex(zIndex: number): void {
        this._element.style.zIndex = zIndex.toString();
    }

    // ========================================
    // HTMLElement固有機能: レイアウト計算
    // ========================================

    getHeight(): number {
        let totalHeight = 0;
        const childElements = this._element.children;
        for (let i = 0; i < childElements.length; i++) {
            const child = childElements[i] as HTMLElement;
            totalHeight += this.getElementHeight(child);
            console.log(child, ":" ,this.getElementHeight(child));
        }
        console.log(this._element,' : totalHeight:', totalHeight);
        return totalHeight;
    }

    private getElementHeight(element: HTMLElement, withCalculateMargine: boolean = true): number {
        let height = 0;
        if (withCalculateMargine) {
            const rect = element.getBoundingClientRect();
            height = rect.height;
        } else {
            height = element.offsetHeight;
        }
        if (!document.body.contains(this._element)) {
            console.warn('Element is not in the DOM:', this._element);
        }
        const childElements = element.children;
        for (let i = 0; i < childElements.length; i++) {
            const child = childElements[i] as HTMLElement;
            height += this.getElementHeight(child, withCalculateMargine);
        }
        return height;
    }

    public get親要素のコンテキスト():コンテキスト {
        const parentElement = this._element.parentElement;
        
        if (!parentElement) {
            return {
                width: new Px長さ(window.innerWidth),
                height: new Px長さ(window.innerHeight)
            };
        }

        return {
            width: new Px長さ(parentElement.clientWidth),
            height: new Px長さ(parentElement.clientHeight)
        };
    }

    public get親要素の画面内での座標(): 要素座標 {
        const parentElement = this._element.parentElement;
        if (!parentElement) {
            return { x: new Px長さ(0), y: new Px長さ(0) };
        }
        const rect = parentElement.getBoundingClientRect();
        return {
            x: new Px長さ(rect.left),
            y: new Px長さ(rect.top)
        };
    }

    public get自身のコンテキスト():コンテキスト {
        return {
            width: new Px長さ(this._element.clientWidth),
            height: new Px長さ(this._element.clientHeight)
        };
    }

    // 既存コードとの互換性のため、elementプロパティを提供
    get element(): HTMLElement {
        return this._element;
    }
}