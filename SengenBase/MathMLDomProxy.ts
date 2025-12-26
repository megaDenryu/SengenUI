import { ElementProxy } from "./DomProxy";

/**
 * MathML要素専用のElementCreater
 * MathML要素はnamespace URIが必要
 */
export class MathMLElementCreater {
    private static readonly MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";

    /**
     * MathML要素を作成します
     * @param tagName MathMLタグ名 (math, mi, mn, mo, mrow等)
     * @param attributes 属性のオブジェクト
     */
    static createMathMLElement<T extends MathMLElement = MathMLElement>(
        tagName: string, 
        attributes: Record<string, string | number> = {}
    ): T {
        const element = document.createElementNS(this.MATHML_NAMESPACE, tagName) as T;
        
        // 属性を設定
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value.toString());
        });
        
        return element;
    }

    /**
     * MathML Math要素を作成（ルート要素）
     */
    static createMathElement(
        display: "block" | "inline" = "inline",
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("math", {
            display,
            ...additionalAttributes
        });
    }

    /**
     * MathML Mi要素を作成（識別子）
     */
    static createMiElement(
        text: string = "",
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        const element = this.createMathMLElement("mi", additionalAttributes);
        if (text) {
            element.textContent = text;
        }
        return element;
    }

    /**
     * MathML Mn要素を作成（数値）
     */
    static createMnElement(
        text: string = "",
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        const element = this.createMathMLElement("mn", additionalAttributes);
        if (text) {
            element.textContent = text;
        }
        return element;
    }

    /**
     * MathML Mo要素を作成（演算子）
     */
    static createMoElement(
        text: string = "",
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        const element = this.createMathMLElement("mo", additionalAttributes);
        if (text) {
            element.textContent = text;
        }
        return element;
    }

    /**
     * MathML Mrow要素を作成（行）
     */
    static createMrowElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mrow", additionalAttributes);
    }

    /**
     * MathML Mfrac要素を作成（分数）
     */
    static createMfracElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mfrac", additionalAttributes);
    }

    /**
     * MathML Msup要素を作成（上付き）
     */
    static createMsupElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("msup", additionalAttributes);
    }

    /**
     * MathML Msub要素を作成（下付き）
     */
    static createMsubElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("msub", additionalAttributes);
    }

    /**
     * MathML Msubsup要素を作成（上下付き）
     */
    static createMsubsupElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("msubsup", additionalAttributes);
    }

    /**
     * MathML Msqrt要素を作成（平方根）
     */
    static createMsqrtElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("msqrt", additionalAttributes);
    }

    /**
     * MathML Mroot要素を作成（n乗根）
     */
    static createMrootElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mroot", additionalAttributes);
    }

    /**
     * MathML Mtext要素を作成（テキスト）
     */
    static createMtextElement(
        text: string = "",
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        const element = this.createMathMLElement("mtext", additionalAttributes);
        if (text) {
            element.textContent = text;
        }
        return element;
    }

    /**
     * MathML Mspace要素を作成（スペース）
     */
    static createMspaceElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mspace", additionalAttributes);
    }

    /**
     * MathML Munder要素を作成（下部記号）
     */
    static createMunderElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("munder", additionalAttributes);
    }

    /**
     * MathML Mover要素を作成（上部記号）
     */
    static createMoverElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mover", additionalAttributes);
    }

    /**
     * MathML Munderover要素を作成（上下記号）
     */
    static createMunderoverElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("munderover", additionalAttributes);
    }

    /**
     * MathML Mtable要素を作成（表）
     */
    static createMtableElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mtable", additionalAttributes);
    }

    /**
     * MathML Mtr要素を作成（表の行）
     */
    static createMtrElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mtr", additionalAttributes);
    }

    /**
     * MathML Mtd要素を作成（表のセル）
     */
    static createMtdElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mtd", additionalAttributes);
    }

    /**
     * MathML Mstyle要素を作成（スタイル設定）
     */
    static createMstyleElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mstyle", additionalAttributes);
    }

    /**
     * MathML Semantics要素を作成（意味情報）
     */
    static createSemanticsElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("semantics", additionalAttributes);
    }

    /**
     * MathML Mpadded要素を作成（余白調整）
     */
    static createMpaddedElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mpadded", additionalAttributes);
    }

    /**
     * MathML Mphantom要素を作成（非表示だが領域確保）
     */
    static createMphantomElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mphantom", additionalAttributes);
    }

    /**
     * MathML Mfenced要素を作成（括弧）
     */
    static createMfencedElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("mfenced", additionalAttributes);
    }

    /**
     * MathML Menclose要素を作成（囲み記号）
     */
    static createMencloseElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("menclose", additionalAttributes);
    }

    /**
     * MathML Maction要素を作成（アクション）
     */
    static createMactionElement(
        additionalAttributes: Record<string, string | number> = {}
    ): MathMLElement {
        return this.createMathMLElement("maction", additionalAttributes);
    }
}

/**
 * MathMLElement用Proxy
 * MathML要素固有の機能を提供
 */
export class MathMLElementProxy extends ElementProxy<MathMLElement> {
    constructor(mathmlElement: MathMLElement, addClassName: string[] = []) {
        super(mathmlElement);
        this.addCSSClass(addClassName);
    }

    // ========================================
    // MathMLElement固有機能: 子要素管理（型安全）
    // ========================================

    addChild(child: HaveMathMLElementProxy): void {
        this._element.appendChild(child.dom.element);
    }

    addChilds(childs: HaveMathMLElementProxy[]): void {
        for (const child of childs) {
            this.addChild(child);
        }
    }

    /**
     * 子要素を指定位置に挿入
     */
    insertChildAt(index: number, child: HaveMathMLElementProxy): void {
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

    deleteChild(child: HaveMathMLElementProxy): void {
        if (this._element.contains(child.dom.element)) {
            this._element.removeChild(child.dom.element);
        } else {
            console.warn('Child element not found in parent.');
        }
    }

    /**
     * すべての子要素を削除
     */
    clearChildren(): void {
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }
    }

    /**
     * 子要素の順序を変更
     */
    moveChildToIndex(child: HaveMathMLElementProxy, newIndex: number): void {
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

    // ========================================
    // MathMLElement固有機能: スタイル
    // ========================================

    setStyle(styles: Partial<CSSStyleDeclaration>): void {
        Object.assign(this._element.style, styles);
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

    // ========================================
    // MathMLElement固有機能: MathML属性操作
    // ========================================

    /**
     * MathML属性を設定
     */
    setMathMLAttribute(name: string, value: string | number): this {
        this._element.setAttribute(name, value.toString());
        return this;
    }

    /**
     * MathML属性を取得
     */
    getMathMLAttribute(name: string): string | null {
        return this._element.getAttribute(name);
    }

    /**
     * MathML属性を削除
     */
    removeMathMLAttribute(name: string): this {
        this._element.removeAttribute(name);
        return this;
    }

    // ========================================
    // MathMLElement固有機能: MathML固有属性
    // ========================================

    /**
     * mathcolor属性を設定
     */
    setMathColor(color: string): this {
        return this.setMathMLAttribute("mathcolor", color);
    }

    /**
     * mathsize属性を設定
     */
    setMathSize(size: string | number): this {
        return this.setMathMLAttribute("mathsize", size);
    }

    /**
     * mathvariant属性を設定
     */
    setMathVariant(variant: "normal" | "bold" | "italic" | "bold-italic" | "script" | "bold-script" | "fraktur" | "bold-fraktur" | "double-struck" | "sans-serif" | "bold-sans-serif" | "sans-serif-italic" | "sans-serif-bold-italic" | "monospace"): this {
        return this.setMathMLAttribute("mathvariant", variant);
    }

    /**
     * displaystyle属性を設定
     */
    setDisplayStyle(displaystyle: boolean): this {
        return this.setMathMLAttribute("displaystyle", displaystyle.toString());
    }

    /**
     * テキストコンテンツを設定
     */
    setTextContent(text: string): this {
        this._element.textContent = text;
        return this;
    }

    /**
     * テキストコンテンツを取得
     */
    getTextContent(): string {
        return this._element.textContent || "";
    }
}

export interface HaveMathMLElementProxy {
    readonly dom: MathMLElementProxy;
    delete(): void;
}
