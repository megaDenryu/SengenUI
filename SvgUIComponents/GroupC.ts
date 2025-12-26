import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";
import { SvgElementBase } from "./BaseClasses/SvgElementBase";

export interface GroupOptions {
    transform?: string;
    className?: string | string[];
    id?: string;
}

/**
 * SVG Group要素のコンポーネント
 * 複数のSVG要素をグループ化するためのコンテナ
 */
export class GroupC extends SvgContainerBase {
    constructor(options?: GroupOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const group = SvgElementCreater.createGroupElement();
        return new SvgElementProxy(group);
    }

    /**
     * 子要素の数を取得
     */
    public getChildCount(): number {
        return this._children.length;
    }

    /**
     * 指定インデックスの子要素を取得
     */
    public getChildAt(index: number): SvgElementBase | undefined {
        return this._children[index];
    }

    /**
     * 指定した子要素のインデックスを取得
     */
    public getChildIndex(child: SvgElementBase): number {
        return this._children.indexOf(child);
    }

    /**
     * 子要素を指定した位置に挿入
     */
    public insertChildAt(index: number, child: SvgElementBase): this {
        if (index < 0 || index > this._children.length) {
            throw new Error(`Invalid index: ${index}`);
        }

        this._children.splice(index, 0, child);
        
        // DOM要素を適切な位置に挿入
        const nextSibling = this._children[index + 1];
        if (nextSibling) {
            this._svgDom.element.insertBefore(child.dom.element, nextSibling.dom.element);
        } else {
            this._svgDom.element.appendChild(child.dom.element);
        }
        
        return this;
    }

    /**
     * 子要素の順序を変更
     */
    public moveChild(child: SvgElementBase, newIndex: number): this {
        const currentIndex = this.getChildIndex(child);
        if (currentIndex === -1) {
            throw new Error("Child not found in group");
        }

        if (newIndex < 0 || newIndex >= this._children.length) {
            throw new Error(`Invalid index: ${newIndex}`);
        }

        // 配列から削除して新しい位置に挿入
        this._children.splice(currentIndex, 1);
        this._children.splice(newIndex, 0, child);

        // DOMも更新
        this._svgDom.element.removeChild(child.dom.element);
        const nextSibling = this._children[newIndex + 1];
        if (nextSibling) {
            this._svgDom.element.insertBefore(child.dom.element, nextSibling.dom.element);
        } else {
            this._svgDom.element.appendChild(child.dom.element);
        }

        return this;
    }

    /**
     * グループ全体を指定分だけ移動
     */
    public moveBy(deltaX: number, deltaY: number): this {
        const currentTransform = this.getSvgAttribute("transform") || "";
        const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
        
        let currentX = 0;
        let currentY = 0;
        
        if (translateMatch) {
            const coords = translateMatch[1].split(/[,\s]+/);
            currentX = parseFloat(coords[0]) || 0;
            currentY = parseFloat(coords[1]) || 0;
        }
        
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;
        
        // 既存のtransformからtranslateを除去
        let newTransform = currentTransform.replace(/translate\([^)]*\)\s*/, "");
        
        // 新しいtranslateを先頭に追加
        newTransform = `translate(${newX}, ${newY}) ${newTransform}`.trim();
        
        this.setTransform(newTransform);
        return this;
    }

    /**
     * グループを指定位置に移動
     */
    public moveTo(x: number, y: number): this {
        const currentTransform = this.getSvgAttribute("transform") || "";
        
        // 既存のtransformからtranslateを除去
        let newTransform = currentTransform.replace(/translate\([^)]*\)\s*/, "");
        
        // 新しいtranslateを先頭に追加
        newTransform = `translate(${x}, ${y}) ${newTransform}`.trim();
        
        this.setTransform(newTransform);
        return this;
    }

    /**
     * グループをスケール
     */
    public scaleBy(scaleX: number, scaleY?: number): this {
        scaleY = scaleY || scaleX;
        const currentTransform = this.getSvgAttribute("transform") || "";
        const newTransform = `${currentTransform} scale(${scaleX}, ${scaleY})`.trim();
        this.setTransform(newTransform);
        return this;
    }

    /**
     * グループを回転
     */
    public rotateBy(degrees: number, centerX?: number, centerY?: number): this {
        const currentTransform = this.getSvgAttribute("transform") || "";
        let rotateTransform = `rotate(${degrees}`;
        
        if (centerX !== undefined && centerY !== undefined) {
            rotateTransform += `, ${centerX}, ${centerY}`;
        }
        
        rotateTransform += ")";
        const newTransform = `${currentTransform} ${rotateTransform}`.trim();
        this.setTransform(newTransform);
        return this;
    }

    /**
     * グループのバウンディングボックスを計算
     */
    public getBoundingBox(): { x: number; y: number; width: number; height: number } {
        if (this._children.length === 0) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }

        // SVGのgetBBox()メソッドを使用
        try {
            const bbox = (this._svgDom.element as SVGGraphicsElement).getBBox();
            return {
                x: bbox.x,
                y: bbox.y,
                width: bbox.width,
                height: bbox.height
            };
        } catch (e) {
            // getBBox()が使用できない場合は、簡易的な計算
            return { x: 0, y: 0, width: 0, height: 0 };
        }
    }

    /**
     * 現在の移動量を取得
     */
    public getTranslation(): { x: number; y: number } {
        const transform = this.getSvgAttribute("transform") || "";
        const translateMatch = transform.match(/translate\(([^)]+)\)/);
        
        if (translateMatch) {
            const coords = translateMatch[1].split(/[,\s]+/);
            return {
                x: parseFloat(coords[0]) || 0,
                y: parseFloat(coords[1]) || 0
            };
        }
        
        return { x: 0, y: 0 };
    }
}
