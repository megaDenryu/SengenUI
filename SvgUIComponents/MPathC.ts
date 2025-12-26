import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgAnimationBase } from "./BaseClasses/SvgAnimationBase";

export interface MPathOptions {
    className?: string | string[];
    id?: string;
    href?: string;
    xlinkHref?: string;
}

/**
 * SVGアニメーション要素：モーションパス
 * animateMotion要素内でパスを参照するために使用
 */
export class MPathC extends SvgAnimationBase {
    constructor(options?: MPathOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.href) this.setHref(options.href);
            if (options.xlinkHref) this.setXlinkHref(options.xlinkHref);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createMPathElement();
        return new SvgElementProxy(element);
    }

    /**
     * 参照するパスのhrefを設定
     */
    public setHref(href: string): this {
        this.setSvgAttribute("href", href);
        return this;
    }

    /**
     * 参照するパスのhrefを取得
     */
    public getHref(): string | null {
        return this.getSvgAttribute("href");
    }

    /**
     * 参照するパスのxlink:hrefを設定（古い形式）
     */
    public setXlinkHref(href: string): this {
        this.setSvgAttribute("xlink:href", href);
        return this;
    }

    /**
     * 参照するパスのxlink:hrefを取得
     */
    public getXlinkHref(): string | null {
        return this.getSvgAttribute("xlink:href");
    }

    // === プリセットメソッド ===

    /**
     * パスIDを指定してモーションパスを設定
     */
    public setPathById(pathId: string): this {
        this.setHref(`#${pathId}`);
        return this;
    }

    /**
     * 外部SVGファイルのパスを参照
     */
    public setExternalPath(svgFile: string, pathId: string): this {
        this.setHref(`${svgFile}#${pathId}`);
        return this;
    }

    /**
     * 円形のモーションパス
     */
    public createCircularPath(cx: number = 0, cy: number = 0, radius: number = 50): this {
        // Note: このメソッドは説明用。実際にはpath要素を別途作成する必要がある
        const pathData = `M ${cx + radius} ${cy} 
                         A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} 
                         A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy}`;
        // 実際の使用では、path要素を作成してからそのIDを参照する
        console.warn("createCircularPath: 実際にはpath要素を別途作成してIDで参照してください");
        return this;
    }

    /**
     * 直線のモーションパス
     */
    public createLinearPath(x1: number, y1: number, x2: number, y2: number): this {
        // Note: このメソッドは説明用。実際にはpath要素を別途作成する必要がある
        const pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
        console.warn("createLinearPath: 実際にはpath要素を別途作成してIDで参照してください");
        return this;
    }

    /**
     * ベジェ曲線のモーションパス
     */
    public createBezierPath(
        startX: number, startY: number,
        cp1X: number, cp1Y: number,
        cp2X: number, cp2Y: number,
        endX: number, endY: number
    ): this {
        // Note: このメソッドは説明用。実際にはpath要素を別途作成する必要がある
        const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${endX} ${endY}`;
        console.warn("createBezierPath: 実際にはpath要素を別途作成してIDで参照してください");
        return this;
    }

    /**
     * 波形のモーションパス
     */
    public createWavePath(
        startX: number = 0, 
        startY: number = 100, 
        endX: number = 300, 
        amplitude: number = 50, 
        frequency: number = 2
    ): this {
        // Note: このメソッドは説明用。実際にはpath要素を別途作成する必要がある
        let pathData = `M ${startX} ${startY}`;
        const steps = 50;
        const stepX = (endX - startX) / steps;
        
        for (let i = 1; i <= steps; i++) {
            const x = startX + i * stepX;
            const y = startY + Math.sin((i / steps) * frequency * Math.PI * 2) * amplitude;
            pathData += ` L ${x} ${y}`;
        }
        
        console.warn("createWavePath: 実際にはpath要素を別途作成してIDで参照してください");
        return this;
    }

    /**
     * スパイラル（螺旋）のモーションパス
     */
    public createSpiralPath(
        centerX: number = 150, 
        centerY: number = 150, 
        initialRadius: number = 10, 
        radiusGrowth: number = 2, 
        turns: number = 3
    ): this {
        // Note: このメソッドは説明用。実際にはpath要素を別途作成する必要がある
        const steps = turns * 30;
        let pathData = "";
        
        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * turns * Math.PI * 2;
            const radius = initialRadius + (radiusGrowth * i);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                pathData = `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        }
        
        console.warn("createSpiralPath: 実際にはpath要素を別途作成してIDで参照してください");
        return this;
    }

    /**
     * 8の字パス
     */
    public createFigureEightPath(centerX: number = 150, centerY: number = 150, size: number = 50): this {
        // Note: このメソッドは説明用。実際にはpath要素を別途作成する必要がある
        const pathData = `M ${centerX} ${centerY - size}
                         C ${centerX + size} ${centerY - size} ${centerX + size} ${centerY} ${centerX} ${centerY}
                         C ${centerX - size} ${centerY} ${centerX - size} ${centerY + size} ${centerX} ${centerY + size}
                         C ${centerX + size} ${centerY + size} ${centerX + size} ${centerY} ${centerX} ${centerY}
                         C ${centerX - size} ${centerY} ${centerX - size} ${centerY - size} ${centerX} ${centerY - size}`;
        
        console.warn("createFigureEightPath: 実際にはpath要素を別途作成してIDで参照してください");
        return this;
    }

    /**
     * ジグザグパス
     */
    public createZigzagPath(
        startX: number = 0, 
        startY: number = 100, 
        endX: number = 300, 
        amplitude: number = 30, 
        segments: number = 6
    ): this {
        // Note: このメソッドは説明用。実際にはpath要素を別途作成する必要がある
        let pathData = `M ${startX} ${startY}`;
        const segmentWidth = (endX - startX) / segments;
        
        for (let i = 1; i <= segments; i++) {
            const x = startX + i * segmentWidth;
            const y = startY + (i % 2 === 0 ? -amplitude : amplitude);
            pathData += ` L ${x} ${y}`;
        }
        
        console.warn("createZigzagPath: 実際にはpath要素を別途作成してIDで参照してください");
        return this;
    }
}
