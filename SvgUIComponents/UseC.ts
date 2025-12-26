import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";

export interface UseOptions {
    href?: string;
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
 * SVG Use要素のコンポーネント
 * 他のSVG要素を参照して再利用するためのSVG要素をラップします
 */
export class UseC extends SvgGraphicsBase {
    constructor(options?: UseOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.href) this.setHref(options.href);
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
        const use = SvgElementCreater.createUseElement();
        return new SvgElementProxy(use);
    }

    /**
     * 参照する要素のhrefを設定
     */
    public setHref(href: string): this {
        if (!href.startsWith('#')) {
            href = '#' + href;
        }
        this.setSvgAttribute("href", href);
        return this;
    }

    /**
     * 参照する要素のhrefを取得
     */
    public getHref(): string {
        return this.getSvgAttribute("href") || "";
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
     * 参照ID による設定（#を自動付与）
     */
    public setReferenceById(id: string): this {
        this.setHref(`#${id}`);
        return this;
    }

    /**
     * 外部ファイルの要素を参照
     */
    public setExternalReference(url: string, id: string): this {
        this.setHref(`${url}#${id}`);
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
     * スケールを設定（transformを使用）
     */
    public setScale(scaleX: number, scaleY?: number): this {
        scaleY = scaleY !== undefined ? scaleY : scaleX;
        const currentTransform = this.getSvgAttribute("transform") || "";
        const scaleTransform = `scale(${scaleX}, ${scaleY})`;
        
        // 既存のスケール変換を置換または追加
        const newTransform = currentTransform.replace(/scale\([^)]*\)/, '').trim();
        this.setTransform(newTransform ? `${newTransform} ${scaleTransform}` : scaleTransform);
        return this;
    }

    /**
     * 回転を設定（transformを使用）
     */
    public setRotation(angle: number, centerX?: number, centerY?: number): this {
        let rotateTransform = `rotate(${angle}`;
        if (centerX !== undefined && centerY !== undefined) {
            rotateTransform += ` ${centerX} ${centerY}`;
        }
        rotateTransform += ')';
        
        const currentTransform = this.getSvgAttribute("transform") || "";
        const newTransform = currentTransform.replace(/rotate\([^)]*\)/, '').trim();
        this.setTransform(newTransform ? `${newTransform} ${rotateTransform}` : rotateTransform);
        return this;
    }

    /**
     * 複製を作成（新しいUse要素）
     */
    public clone(): UseC {
        const clone = new UseC();
        clone.setHref(this.getHref());
        clone.setPosition(this.getX(), this.getY());
        clone.setSize(this.getWidth(), this.getHeight());
        
        const transform = this.getSvgAttribute("transform");
        if (transform) {
            clone.setTransform(transform);
        }
        
        const opacity = this.getSvgAttribute("opacity");
        if (opacity) {
            clone.setOpacity(parseFloat(opacity));
        }
        
        return clone;
    }

    /**
     * グリッド状に配置された複製を作成
     */
    public createGrid(rows: number, cols: number, spacingX: number, spacingY: number): UseC[] {
        const clones: UseC[] = [];
        const baseX = this.getX();
        const baseY = this.getY();
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const clone = this.clone();
                clone.setPosition(
                    baseX + col * spacingX,
                    baseY + row * spacingY
                );
                clones.push(clone);
            }
        }
        
        return clones;
    }

    /**
     * 円形に配置された複製を作成
     */
    public createCircularArray(count: number, radius: number, centerX: number, centerY: number): UseC[] {
        const clones: UseC[] = [];
        const angleStep = (2 * Math.PI) / count;
        
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            const clone = this.clone();
            clone.setPosition(x, y);
            clones.push(clone);
        }
        
        return clones;
    }

    /**
     * アニメーション - 位置移動
     */
    public animatePosition(toX: number, toY: number, duration: string = "1s"): this {
        const animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animateX.setAttribute("attributeName", "x");
        animateX.setAttribute("to", toX.toString());
        animateX.setAttribute("dur", duration);
        animateX.setAttribute("fill", "freeze");
        
        const animateY = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animateY.setAttribute("attributeName", "y");
        animateY.setAttribute("to", toY.toString());
        animateY.setAttribute("dur", duration);
        animateY.setAttribute("fill", "freeze");
        
        this._svgDom.element.appendChild(animateX);
        this._svgDom.element.appendChild(animateY);
        return this;
    }

    /**
     * アニメーション - フェードイン
     */
    public fadeIn(duration: string = "1s"): this {
        const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animate.setAttribute("attributeName", "opacity");
        animate.setAttribute("values", "0;1");
        animate.setAttribute("dur", duration);
        animate.setAttribute("fill", "freeze");
        
        this._svgDom.element.appendChild(animate);
        return this;
    }

    /**
     * アニメーション - フェードアウト
     */
    public fadeOut(duration: string = "1s"): this {
        const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animate.setAttribute("attributeName", "opacity");
        animate.setAttribute("values", "1;0");
        animate.setAttribute("dur", duration);
        animate.setAttribute("fill", "freeze");
        
        this._svgDom.element.appendChild(animate);
        return this;
    }
}
