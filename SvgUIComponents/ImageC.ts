import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";
import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";

export interface ImageOptions {
    src?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    preserveAspectRatio?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    decoding?: 'auto' | 'sync' | 'async';
    opacity?: number;
    transform?: string;
    className?: string | string[];
    id?: string;
}

/**
 * SVG Image要素のコンポーネント
 * 外部画像ファイルや埋め込み画像を表示するためのSVG要素をラップします
 */
export class ImageC extends SvgGraphicsBase {
    constructor(options?: ImageOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.src) this.setSrc(options.src);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.preserveAspectRatio) this.setPreserveAspectRatio(options.preserveAspectRatio);
            if (options.crossOrigin) this.setCrossOrigin(options.crossOrigin);
            if (options.decoding) this.setDecoding(options.decoding);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const image = SvgElementCreater.createImageElement();
        return new SvgElementProxy(image);
    }

    /**
     * 画像のソースを設定
     */
    public setSrc(src: string): this {
        this.setSvgAttribute("href", src);
        return this;
    }

    /**
     * 画像のソースを取得
     */
    public getSrc(): string {
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
     * アスペクト比の保持方法を設定
     */
    public setPreserveAspectRatio(value: string): this {
        this.setSvgAttribute("preserveAspectRatio", value);
        return this;
    }

    /**
     * アスペクト比の保持方法を取得
     */
    public getPreserveAspectRatio(): string {
        return this.getSvgAttribute("preserveAspectRatio") || "";
    }

    /**
     * CORS設定を設定
     */
    public setCrossOrigin(crossOrigin: 'anonymous' | 'use-credentials'): this {
        this.setSvgAttribute("crossorigin", crossOrigin);
        return this;
    }

    /**
     * CORS設定を取得
     */
    public getCrossOrigin(): string {
        return this.getSvgAttribute("crossorigin") || "";
    }

    /**
     * デコーディング方法を設定
     */
    public setDecoding(decoding: 'auto' | 'sync' | 'async'): this {
        this.setSvgAttribute("decoding", decoding);
        return this;
    }

    /**
     * デコーディング方法を取得
     */
    public getDecoding(): string {
        return this.getSvgAttribute("decoding") || "";
    }

    /**
     * 位置とサイズを一度に設定
     */
    public setBounds(x: number, y: number, width: number, height: number): this {
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    /**
     * 位置とサイズを取得
     */
    public getBounds(): { x: number, y: number, width: number, height: number } {
        return {
            x: this.getX(),
            y: this.getY(),
            width: this.getWidth(),
            height: this.getHeight()
        };
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
     * アスペクト比を維持して画像を表示
     */
    public maintainAspectRatio(): this {
        this.setPreserveAspectRatio("xMidYMid meet");
        return this;
    }

    /**
     * 画像を領域全体に引き伸ばし
     */
    public stretchToFit(): this {
        this.setPreserveAspectRatio("none");
        return this;
    }

    /**
     * 画像を切り抜いて表示
     */
    public cropToFit(): this {
        this.setPreserveAspectRatio("xMidYMid slice");
        return this;
    }

    /**
     * 左上基準で配置
     */
    public alignTopLeft(): this {
        this.setPreserveAspectRatio("xMinYMin meet");
        return this;
    }

    /**
     * 右下基準で配置
     */
    public alignBottomRight(): this {
        this.setPreserveAspectRatio("xMaxYMax meet");
        return this;
    }

    /**
     * 画像の読み込み完了を待つ
     * SVGImageElementの特性に合わせた実装
     */
    public async waitForLoad(): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = this._svgDom.element as SVGImageElement;
            const src = this.getSrc();
            
            // src属性が設定されていない場合は即座に解決
            if (!src || src.trim() === '') {
                resolve();
                return;
            }
            
            // データURIの場合は即座に解決（通常は同期的に処理される）
            if (src.startsWith('data:')) {
                // 少し待ってから解決（ブラウザによる処理時間を考慮）
                setTimeout(() => resolve(), 10);
                return;
            }
            
            const onLoad = () => {
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
                resolve();
            };
            
            const onError = (event: Event) => {
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
                reject(new Error(`Image failed to load: ${src}`));
            };
            
            // タイムアウトを設定（30秒）
            const timeout = setTimeout(() => {
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
                reject(new Error(`Image load timeout: ${src}`));
            }, 30000);
            
            const cleanup = () => {
                clearTimeout(timeout);
            };
            
            img.addEventListener('load', () => {
                cleanup();
                onLoad();
            });
            img.addEventListener('error', (event) => {
                cleanup();
                onError(event);
            });
        });
    }

    /**
     * 画像の読み込み状態を確認
     * SVGImageElementでは直接的な方法がないため、間接的に判定
     */
    public isImageLoaded(): boolean {
        const src = this.getSrc();
        
        // src属性が設定されていない場合は「読み込み完了」とみなす
        if (!src || src.trim() === '') {
            return true;
        }
        
        // データURIの場合は通常即座に読み込まれるため、trueを返す
        if (src.startsWith('data:')) {
            return true;
        }
        
        // 外部リソースの場合は確実な判定ができないため、falseを返す
        // （実際の状態確認はwaitForLoad()を使用することを推奨）
        return false;
    }

    /**
     * 画像の自然なサイズを取得（可能な場合）
     * SVGImageElementでは直接取得できないため、別の方法を使用
     */
    public async getNaturalSize(): Promise<{ width: number, height: number } | null> {
        const src = this.getSrc();
        if (!src || src.trim() === '') {
            return null;
        }

        return new Promise((resolve) => {
            // HTMLImageElementを一時的に作成してサイズを取得
            const tempImg = new Image();
            
            tempImg.onload = () => {
                resolve({
                    width: tempImg.naturalWidth,
                    height: tempImg.naturalHeight
                });
            };
            
            tempImg.onerror = () => {
                resolve(null);
            };
            
            tempImg.src = src;
        });
    }

    /**
     * 画像のアスペクト比を取得
     */
    public async getAspectRatio(): Promise<number | null> {
        const size = await this.getNaturalSize();
        if (!size || size.height === 0) {
            return null;
        }
        return size.width / size.height;
    }

    /**
     * 自然なサイズに合わせてリサイズ
     */
    public async resizeToNaturalSize(): Promise<this> {
        const size = await this.getNaturalSize();
        if (size) {
            this.setWidth(size.width);
            this.setHeight(size.height);
        }
        return this;
    }

    /**
     * Base64データURIから画像を設定
     */
    public setFromBase64(base64Data: string, mimeType: string = 'image/png'): this {
        const dataUri = `data:${mimeType};base64,${base64Data}`;
        this.setSrc(dataUri);
        return this;
    }

    /**
     * Blob から画像を設定
     */
    public setFromBlob(blob: Blob): this {
        const url = URL.createObjectURL(blob);
        this.setSrc(url);
        return this;
    }

    /**
     * ファイルから画像を設定
     */
    public setFromFile(file: File): this {
        const url = URL.createObjectURL(file);
        this.setSrc(url);
        return this;
    }

    /**
     * 画像のリサイズ（アスペクト比維持）
     */
    public resizeProportionally(maxWidth: number, maxHeight: number): this {
        const currentWidth = this.getWidth();
        const currentHeight = this.getHeight();
        
        if (currentWidth === 0 || currentHeight === 0) return this;
        
        const aspectRatio = currentWidth / currentHeight;
        let newWidth = maxWidth;
        let newHeight = maxHeight;
        
        if (newWidth / aspectRatio > newHeight) {
            newWidth = newHeight * aspectRatio;
        } else {
            newHeight = newWidth / aspectRatio;
        }
        
        this.setWidth(newWidth);
        this.setHeight(newHeight);
        return this;
    }

    /**
     * 画像の透明度を徐々に変更するアニメーション
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
     * 画像の透明度を徐々に下げるアニメーション
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

    /**
     * 画像を回転させるアニメーション
     */
    public rotateAnimation(duration: string = "3s", degrees: number = 360): this {
        const centerX = this.getX() + this.getWidth() / 2;
        const centerY = this.getY() + this.getHeight() / 2;
        
        const animateTransform = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        animateTransform.setAttribute("attributeName", "transform");
        animateTransform.setAttribute("type", "rotate");
        animateTransform.setAttribute("values", `0 ${centerX} ${centerY};${degrees} ${centerX} ${centerY}`);
        animateTransform.setAttribute("dur", duration);
        animateTransform.setAttribute("repeatCount", "indefinite");
        
        this._svgDom.element.appendChild(animateTransform);
        return this;
    }
}
