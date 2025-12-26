import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgGradientBase } from "./BaseClasses/SvgGradientBase";

export interface LinearGradientOptions {
    x1?: number | string;
    y1?: number | string;
    x2?: number | string;
    y2?: number | string;
    gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    gradientTransform?: string;
    spreadMethod?: 'pad' | 'reflect' | 'repeat';
    href?: string;
    className?: string | string[];
    id?: string;
}

export interface GradientStop {
    offset: number | string;
    color: string;
    opacity?: number;
}

/**
 * SVG LinearGradient要素のコンポーネント
 * 線形グラデーションを定義するためのSVG要素をラップします
 */
export class LinearGradientC extends SvgGradientBase {
    private _stops: GradientStop[] = [];

    constructor(options?: LinearGradientOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.x1 !== undefined) this.setX1(options.x1);
            if (options.y1 !== undefined) this.setY1(options.y1);
            if (options.x2 !== undefined) this.setX2(options.x2);
            if (options.y2 !== undefined) this.setY2(options.y2);
            if (options.gradientUnits) this.setGradientUnits(options.gradientUnits);
            if (options.gradientTransform) this.setGradientTransform(options.gradientTransform);
            if (options.spreadMethod) this.setSpreadMethod(options.spreadMethod);
            if (options.href) this.setHref(options.href);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const linearGradient = SvgElementCreater.createLinearGradientElement();
        return new SvgElementProxy(linearGradient);
    }

    /**
     * グラデーション開始点X座標を設定
     */
    public setX1(x1: number | string): this {
        this.setSvgAttribute("x1", x1);
        return this;
    }

    /**
     * グラデーション開始点X座標を取得
     */
    public getX1(): string {
        return this.getSvgAttribute("x1") || "0%";
    }

    /**
     * グラデーション開始点Y座標を設定
     */
    public setY1(y1: number | string): this {
        this.setSvgAttribute("y1", y1);
        return this;
    }

    /**
     * グラデーション開始点Y座標を取得
     */
    public getY1(): string {
        return this.getSvgAttribute("y1") || "0%";
    }

    /**
     * グラデーション終了点X座標を設定
     */
    public setX2(x2: number | string): this {
        this.setSvgAttribute("x2", x2);
        return this;
    }

    /**
     * グラデーション終了点X座標を取得
     */
    public getX2(): string {
        return this.getSvgAttribute("x2") || "100%";
    }

    /**
     * グラデーション終了点Y座標を設定
     */
    public setY2(y2: number | string): this {
        this.setSvgAttribute("y2", y2);
        return this;
    }

    /**
     * グラデーション終了点Y座標を取得
     */
    public getY2(): string {
        return this.getSvgAttribute("y2") || "0%";
    }

    /**
     * グラデーション単位を設定
     */
    public setGradientUnits(units: 'userSpaceOnUse' | 'objectBoundingBox'): this {
        this.setSvgAttribute("gradientUnits", units);
        return this;
    }

    /**
     * グラデーション単位を取得
     */
    public getGradientUnits(): string {
        return this.getSvgAttribute("gradientUnits") || "objectBoundingBox";
    }

    /**
     * グラデーション変形を設定
     */
    public setGradientTransform(transform: string): this {
        this.setSvgAttribute("gradientTransform", transform);
        return this;
    }

    /**
     * グラデーション変形を取得
     */
    public getGradientTransform(): string {
        return this.getSvgAttribute("gradientTransform") || "";
    }

    /**
     * スプレッド方法を設定
     */
    public setSpreadMethod(method: 'pad' | 'reflect' | 'repeat'): this {
        this.setSvgAttribute("spreadMethod", method);
        return this;
    }

    /**
     * スプレッド方法を取得
     */
    public getSpreadMethod(): string {
        return this.getSvgAttribute("spreadMethod") || "pad";
    }

    /**
     * 継承元グラデーションを設定
     */
    public setHref(href: string): this {
        if (!href.startsWith('#')) {
            href = '#' + href;
        }
        this.setSvgAttribute("href", href);
        return this;
    }

    /**
     * 継承元グラデーションを取得
     */
    public getHref(): string {
        return this.getSvgAttribute("href") || "";
    }

    /**
     * グラデーション方向を設定（開始点と終了点）
     */
    public setDirection(x1: number | string, y1: number | string, x2: number | string, y2: number | string): this {
        this.setX1(x1);
        this.setY1(y1);
        this.setX2(x2);
        this.setY2(y2);
        return this;
    }

    /**
     * グラデーション方向を取得
     */
    public getDirection(): { x1: string, y1: string, x2: string, y2: string } {
        return {
            x1: this.getX1(),
            y1: this.getY1(),
            x2: this.getX2(),
            y2: this.getY2()
        };
    }

    /**
     * 色停止点を追加
     */
    public addStop(stop: GradientStop): this {
        this._stops.push(stop);
        
        const stopElement = SvgElementCreater.createStopElement();
        stopElement.setAttribute("offset", stop.offset.toString());
        stopElement.setAttribute("stop-color", stop.color);
        
        if (stop.opacity !== undefined) {
            stopElement.setAttribute("stop-opacity", stop.opacity.toString());
        }
        
        this._svgDom.element.appendChild(stopElement);
        return this;
    }

    /**
     * 複数の色停止点を追加
     */
    public addStops(stops: GradientStop[]): this {
        stops.forEach(stop => this.addStop(stop));
        return this;
    }

    /**
     * 色停止点を削除
     */
    public removeStop(index: number): this {
        if (index >= 0 && index < this._stops.length) {
            this._stops.splice(index, 1);
            const stopElements = this._svgDom.element.querySelectorAll('stop');
            if (stopElements[index]) {
                this._svgDom.element.removeChild(stopElements[index]);
            }
        }
        return this;
    }

    /**
     * すべての色停止点をクリア
     */
    public clearStops(): this {
        this._stops = [];
        const stopElements = this._svgDom.element.querySelectorAll('stop');
        stopElements.forEach(stop => this._svgDom.element.removeChild(stop));
        return this;
    }

    /**
     * 色停止点の配列を取得
     */
    public getStops(): readonly GradientStop[] {
        return this._stops;
    }

    /**
     * 水平グラデーション（左から右）
     */
    public setHorizontal(): this {
        this.setDirection("0%", "0%", "100%", "0%");
        return this;
    }

    /**
     * 垂直グラデーション（上から下）
     */
    public setVertical(): this {
        this.setDirection("0%", "0%", "0%", "100%");
        return this;
    }

    /**
     * 対角グラデーション（左上から右下）
     */
    public setDiagonal(): this {
        this.setDirection("0%", "0%", "100%", "100%");
        return this;
    }

    /**
     * 逆対角グラデーション（右上から左下）
     */
    public setReverseDiagonal(): this {
        this.setDirection("100%", "0%", "0%", "100%");
        return this;
    }

    /**
     * 角度指定グラデーション
     */
    public setAngle(degrees: number): this {
        const radians = (degrees * Math.PI) / 180;
        const x1 = 50 - 50 * Math.cos(radians);
        const y1 = 50 - 50 * Math.sin(radians);
        const x2 = 50 + 50 * Math.cos(radians);
        const y2 = 50 + 50 * Math.sin(radians);
        
        this.setDirection(`${x1}%`, `${y1}%`, `${x2}%`, `${y2}%`);
        return this;
    }

    /**
     * 2色グラデーションを作成
     */
    public setTwoColorGradient(startColor: string, endColor: string): this {
        this.clearStops();
        this.addStop({ offset: "0%", color: startColor });
        this.addStop({ offset: "100%", color: endColor });
        return this;
    }

    /**
     * 3色グラデーションを作成
     */
    public setThreeColorGradient(startColor: string, middleColor: string, endColor: string): this {
        this.clearStops();
        this.addStop({ offset: "0%", color: startColor });
        this.addStop({ offset: "50%", color: middleColor });
        this.addStop({ offset: "100%", color: endColor });
        return this;
    }

    /**
     * レインボーグラデーションを作成
     */
    public setRainbowGradient(): this {
        this.clearStops();
        const colors = [
            { offset: "0%", color: "#ff0000" },    // 赤
            { offset: "16.66%", color: "#ff8000" }, // オレンジ
            { offset: "33.33%", color: "#ffff00" }, // 黄
            { offset: "50%", color: "#00ff00" },    // 緑
            { offset: "66.66%", color: "#0080ff" }, // 青
            { offset: "83.33%", color: "#4000ff" }, // 藍
            { offset: "100%", color: "#8000ff" }    // 紫
        ];
        this.addStops(colors);
        return this;
    }

    /**
     * メタリック効果グラデーションを作成
     */
    public setMetallicGradient(baseColor: string = "#c0c0c0"): this {
        this.clearStops();
        this.addStop({ offset: "0%", color: baseColor, opacity: 0.8 });
        this.addStop({ offset: "25%", color: "#ffffff", opacity: 0.9 });
        this.addStop({ offset: "50%", color: baseColor, opacity: 1 });
        this.addStop({ offset: "75%", color: "#000000", opacity: 0.1 });
        this.addStop({ offset: "100%", color: baseColor, opacity: 0.8 });
        return this;
    }

    /**
     * グラデーションのURL参照を取得
     */
    public getGradientUrl(): string {
        const id = this._svgDom.element.id;
        return id ? `url(#${id})` : "";
    }

    /**
     * グラデーションが使用されているかチェック
     */
    public isUsedInDocument(): boolean {
        const id = this._svgDom.element.id;
        if (!id) return false;
        
        const rootSvg = this._svgDom.element.ownerSVGElement;
        if (!rootSvg) return false;
        
        const gradientUrl = `url(#${id})`;
        const elements = rootSvg.querySelectorAll('[fill], [stroke]');
        
        return Array.from(elements).some(element => {
            const fill = element.getAttribute('fill');
            const stroke = element.getAttribute('stroke');
            return fill === gradientUrl || stroke === gradientUrl;
        });
    }

    /**
     * グラデーションをコピー
     */
    public clone(newId?: string): LinearGradientC {
        const clone = new LinearGradientC({
            id: newId,
            x1: this.getX1(),
            y1: this.getY1(),
            x2: this.getX2(),
            y2: this.getY2(),
            gradientUnits: this.getGradientUnits() as 'userSpaceOnUse' | 'objectBoundingBox',
            gradientTransform: this.getGradientTransform(),
            spreadMethod: this.getSpreadMethod() as 'pad' | 'reflect' | 'repeat'
        });
        
        clone.addStops([...this._stops]);
        return clone;
    }
}
