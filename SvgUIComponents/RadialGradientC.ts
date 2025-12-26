import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgGradientBase } from "./BaseClasses/SvgGradientBase";

export interface RadialGradientOptions {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
    fx?: number | string;
    fy?: number | string;
    fr?: number | string;
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
 * SVG RadialGradient要素のコンポーネント
 * 円形グラデーションを定義するためのSVG要素をラップします
 */
export class RadialGradientC extends SvgGradientBase {
    private _stops: GradientStop[] = [];

    constructor(options?: RadialGradientOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.cx !== undefined) this.setCx(options.cx);
            if (options.cy !== undefined) this.setCy(options.cy);
            if (options.r !== undefined) this.setR(options.r);
            if (options.fx !== undefined) this.setFx(options.fx);
            if (options.fy !== undefined) this.setFy(options.fy);
            if (options.fr !== undefined) this.setFr(options.fr);
            if (options.gradientUnits) this.setGradientUnits(options.gradientUnits);
            if (options.gradientTransform) this.setGradientTransform(options.gradientTransform);
            if (options.spreadMethod) this.setSpreadMethod(options.spreadMethod);
            if (options.href) this.setHref(options.href);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const radialGradient = SvgElementCreater.createRadialGradientElement();
        return new SvgElementProxy(radialGradient);
    }

    /**
     * グラデーション中心X座標を設定
     */
    public setCx(cx: number | string): this {
        this.setSvgAttribute("cx", cx);
        return this;
    }

    /**
     * グラデーション中心X座標を取得
     */
    public getCx(): string {
        return this.getSvgAttribute("cx") || "50%";
    }

    /**
     * グラデーション中心Y座標を設定
     */
    public setCy(cy: number | string): this {
        this.setSvgAttribute("cy", cy);
        return this;
    }

    /**
     * グラデーション中心Y座標を取得
     */
    public getCy(): string {
        return this.getSvgAttribute("cy") || "50%";
    }

    /**
     * グラデーション半径を設定
     */
    public setR(r: number | string): this {
        this.setSvgAttribute("r", r);
        return this;
    }

    /**
     * グラデーション半径を取得
     */
    public getR(): string {
        return this.getSvgAttribute("r") || "50%";
    }

    /**
     * フォーカル点X座標を設定
     */
    public setFx(fx: number | string): this {
        this.setSvgAttribute("fx", fx);
        return this;
    }

    /**
     * フォーカル点X座標を取得
     */
    public getFx(): string {
        return this.getSvgAttribute("fx") || this.getCx();
    }

    /**
     * フォーカル点Y座標を設定
     */
    public setFy(fy: number | string): this {
        this.setSvgAttribute("fy", fy);
        return this;
    }

    /**
     * フォーカル点Y座標を取得
     */
    public getFy(): string {
        return this.getSvgAttribute("fy") || this.getCy();
    }

    /**
     * フォーカル半径を設定
     */
    public setFr(fr: number | string): this {
        this.setSvgAttribute("fr", fr);
        return this;
    }

    /**
     * フォーカル半径を取得
     */
    public getFr(): string {
        return this.getSvgAttribute("fr") || "0%";
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
     * グラデーションの中心点を設定
     */
    public setCenter(cx: number | string, cy: number | string): this {
        this.setCx(cx);
        this.setCy(cy);
        return this;
    }

    /**
     * グラデーションの中心点を取得
     */
    public getCenter(): { cx: string, cy: string } {
        return {
            cx: this.getCx(),
            cy: this.getCy()
        };
    }

    /**
     * フォーカル点を設定
     */
    public setFocalPoint(fx: number | string, fy: number | string, fr?: number | string): this {
        this.setFx(fx);
        this.setFy(fy);
        if (fr !== undefined) this.setFr(fr);
        return this;
    }

    /**
     * フォーカル点を取得
     */
    public getFocalPoint(): { fx: string, fy: string, fr: string } {
        return {
            fx: this.getFx(),
            fy: this.getFy(),
            fr: this.getFr()
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
     * 円形グラデーション（中心から外側）
     */
    public setCircular(): this {
        this.setCenter("50%", "50%");
        this.setR("50%");
        this.setFocalPoint("50%", "50%");
        return this;
    }

    /**
     * 楕円形グラデーション
     */
    public setElliptical(rx: number | string, ry: number | string): this {
        this.setCenter("50%", "50%");
        this.setGradientTransform(`scale(${rx}, ${ry})`);
        return this;
    }

    /**
     * オフセット円形グラデーション
     */
    public setOffsetCircular(offsetX: number | string, offsetY: number | string): this {
        this.setCenter("50%", "50%");
        this.setFocalPoint(offsetX, offsetY);
        return this;
    }

    /**
     * スポットライト効果
     */
    public setSpotlight(intensity: number = 0.3): this {
        this.setCircular();
        this.setFr(`${intensity * 50}%`);
        return this;
    }

    /**
     * 2色円形グラデーションを作成
     */
    public setTwoColorRadial(innerColor: string, outerColor: string): this {
        this.clearStops();
        this.addStop({ offset: "0%", color: innerColor });
        this.addStop({ offset: "100%", color: outerColor });
        return this;
    }

    /**
     * 3色円形グラデーションを作成
     */
    public setThreeColorRadial(innerColor: string, middleColor: string, outerColor: string): this {
        this.clearStops();
        this.addStop({ offset: "0%", color: innerColor });
        this.addStop({ offset: "50%", color: middleColor });
        this.addStop({ offset: "100%", color: outerColor });
        return this;
    }

    /**
     * 太陽効果グラデーション
     */
    public setSunEffect(): this {
        this.setCircular();
        this.clearStops();
        this.addStop({ offset: "0%", color: "#ffffff", opacity: 1 });
        this.addStop({ offset: "30%", color: "#ffff80", opacity: 0.9 });
        this.addStop({ offset: "70%", color: "#ff8000", opacity: 0.6 });
        this.addStop({ offset: "100%", color: "#ff4000", opacity: 0.3 });
        return this;
    }

    /**
     * 月効果グラデーション
     */
    public setMoonEffect(): this {
        this.setOffsetCircular("30%", "30%");
        this.clearStops();
        this.addStop({ offset: "0%", color: "#ffffff", opacity: 0.9 });
        this.addStop({ offset: "50%", color: "#e0e0e0", opacity: 0.6 });
        this.addStop({ offset: "100%", color: "#808080", opacity: 0.2 });
        return this;
    }

    /**
     * 球体効果グラデーション
     */
    public setSphereEffect(): this {
        this.setCenter("50%", "50%");
        this.setFocalPoint("30%", "30%");
        this.clearStops();
        this.addStop({ offset: "0%", color: "#ffffff", opacity: 0.8 });
        this.addStop({ offset: "70%", color: "#808080", opacity: 0.4 });
        this.addStop({ offset: "100%", color: "#000000", opacity: 0.8 });
        return this;
    }

    /**
     * ヴィネット効果グラデーション
     */
    public setVignetteEffect(intensity: number = 0.5): this {
        this.setCircular();
        this.setR("70%");
        this.clearStops();
        this.addStop({ offset: "0%", color: "#000000", opacity: 0 });
        this.addStop({ offset: "70%", color: "#000000", opacity: 0 });
        this.addStop({ offset: "100%", color: "#000000", opacity: intensity });
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
    public clone(newId?: string): RadialGradientC {
        const clone = new RadialGradientC({
            id: newId,
            cx: this.getCx(),
            cy: this.getCy(),
            r: this.getR(),
            fx: this.getFx(),
            fy: this.getFy(),
            fr: this.getFr(),
            gradientUnits: this.getGradientUnits() as 'userSpaceOnUse' | 'objectBoundingBox',
            gradientTransform: this.getGradientTransform(),
            spreadMethod: this.getSpreadMethod() as 'pad' | 'reflect' | 'repeat'
        });
        
        clone.addStops([...this._stops]);
        return clone;
    }
}
