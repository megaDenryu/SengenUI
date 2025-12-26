import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgContainerBase } from "./BaseClasses/SvgContainerBase";
import { SvgElementBase } from "./BaseClasses/SvgElementBase";

export interface DefsOptions {
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Defs要素のコンポーネント
 * グラデーション、パターン、マーカーなどの再利用可能な定義を格納するためのSVG要素をラップします
 */
export class DefsC extends SvgContainerBase {
    constructor(options?: DefsOptions) {
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
        const defs = SvgElementCreater.createDefsElement();
        return new SvgElementProxy(defs);
    }

    /**
     * 線形グラデーションを定義に追加
     */
    public addLinearGradient(id: string, x1: number = 0, y1: number = 0, x2: number = 1, y2: number = 0): this {
        const gradient = SvgElementCreater.createLinearGradientElement();
        gradient.id = id;
        gradient.setAttribute('x1', x1.toString());
        gradient.setAttribute('y1', y1.toString());
        gradient.setAttribute('x2', x2.toString());
        gradient.setAttribute('y2', y2.toString());
        
        this._svgDom.element.appendChild(gradient);
        return this;
    }

    /**
     * 円形グラデーションを定義に追加
     */
    public addRadialGradient(id: string, cx: number = 0.5, cy: number = 0.5, r: number = 0.5): this {
        const gradient = SvgElementCreater.createRadialGradientElement();
        gradient.id = id;
        gradient.setAttribute('cx', cx.toString());
        gradient.setAttribute('cy', cy.toString());
        gradient.setAttribute('r', r.toString());
        
        this._svgDom.element.appendChild(gradient);
        return this;
    }

    /**
     * パターンを定義に追加
     */
    public addPattern(id: string, x: number = 0, y: number = 0, width: number = 10, height: number = 10): this {
        const pattern = SvgElementCreater.createPatternElement();
        pattern.id = id;
        pattern.setAttribute('x', x.toString());
        pattern.setAttribute('y', y.toString());
        pattern.setAttribute('width', width.toString());
        pattern.setAttribute('height', height.toString());
        pattern.setAttribute('patternUnits', 'userSpaceOnUse');
        
        this._svgDom.element.appendChild(pattern);
        return this;
    }

    /**
     * マーカーを定義に追加
     */
    public addMarker(id: string, markerWidth: number = 10, markerHeight: number = 10, refX: number = 5, refY: number = 5): this {
        const marker = SvgElementCreater.createMarkerElement();
        marker.id = id;
        marker.setAttribute('markerWidth', markerWidth.toString());
        marker.setAttribute('markerHeight', markerHeight.toString());
        marker.setAttribute('refX', refX.toString());
        marker.setAttribute('refY', refY.toString());
        marker.setAttribute('orient', 'auto');
        
        this._svgDom.element.appendChild(marker);
        return this;
    }

    /**
     * フィルターを定義に追加
     */
    public addFilter(id: string, x: string = '-50%', y: string = '-50%', width: string = '200%', height: string = '200%'): this {
        const filter = SvgElementCreater.createFilterElement();
        filter.id = id;
        filter.setAttribute('x', x);
        filter.setAttribute('y', y);
        filter.setAttribute('width', width);
        filter.setAttribute('height', height);
        
        this._svgDom.element.appendChild(filter);
        return this;
    }

    /**
     * クリッピングパスを定義に追加
     */
    public addClipPath(id: string): this {
        const clipPath = SvgElementCreater.createClipPathElement();
        clipPath.id = id;
        
        this._svgDom.element.appendChild(clipPath);
        return this;
    }

    /**
     * マスクを定義に追加
     */
    public addMask(id: string): this {
        const mask = SvgElementCreater.createMaskElement();
        mask.id = id;
        
        this._svgDom.element.appendChild(mask);
        return this;
    }

    /**
     * 指定したIDの要素を取得（def内から）
     */
    public getDefinitionById(id: string): SVGElement | null {
        return this._svgDom.element.querySelector(`#${id}`);
    }

    /**
     * すべての定義要素のIDリストを取得
     */
    public getAllDefinitionIds(): string[] {
        const elements = this._svgDom.element.querySelectorAll('[id]');
        return Array.from(elements).map(el => el.id).filter(Boolean);
    }

    /**
     * 定義が存在するかチェック
     */
    public hasDefinition(id: string): boolean {
        return this.getDefinitionById(id) !== null;
    }

    /**
     * 未使用の定義を削除
     */
    public removeUnusedDefinitions(rootSvg: SVGSVGElement): this {
        const allIds = this.getAllDefinitionIds();
        const usedIds = new Set<string>();
        
        // 使用されているIDを収集
        const elementsWithReferences = rootSvg.querySelectorAll('[href], [fill], [stroke], [filter], [clip-path], [mask], [marker-start], [marker-mid], [marker-end]');
        
        elementsWithReferences.forEach(element => {
            const attributes = ['href', 'fill', 'stroke', 'filter', 'clip-path', 'mask', 'marker-start', 'marker-mid', 'marker-end'];
            attributes.forEach(attr => {
                const value = element.getAttribute(attr);
                if (value && value.startsWith('url(#')) {
                    const id = value.slice(5, -1); // "url(#id)" から "id" を抽出
                    usedIds.add(id);
                }
            });
        });
        
        // 未使用の定義を削除
        allIds.forEach(id => {
            if (!usedIds.has(id)) {
                const element = this.getDefinitionById(id);
                if (element) {
                    this._svgDom.element.removeChild(element);
                }
            }
        });
        
        return this;
    }

    /**
     * 定義の統計情報を取得
     */
    public getStatistics(): {
        totalDefinitions: number;
        gradients: number;
        patterns: number;
        markers: number;
        filters: number;
        clipPaths: number;
        masks: number;
    } {
        const defs = this._svgDom.element;
        return {
            totalDefinitions: defs.children.length,
            gradients: defs.querySelectorAll('linearGradient, radialGradient').length,
            patterns: defs.querySelectorAll('pattern').length,
            markers: defs.querySelectorAll('marker').length,
            filters: defs.querySelectorAll('filter').length,
            clipPaths: defs.querySelectorAll('clipPath').length,
            masks: defs.querySelectorAll('mask').length
        };
    }
}
