import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeConvolveMatrixOptions {
    className?: string | string[];
    id?: string;
    kernelMatrix?: number[];
    order?: number | [number, number];
    divisor?: number;
    bias?: number;
    targetX?: number;
    targetY?: number;
    edgeMode?: "duplicate" | "wrap" | "none";
    preserveAlpha?: boolean;
    result?: string;
    in?: string;
}

/**
 * SVGフィルタープリミティブ：畳み込みマトリックスフィルター
 * 画像に対して畳み込み演算を適用してエッジ検出、シャープ化、ブラー等の効果を実現
 */
export class FeConvolveMatrixC extends SvgFilterPrimitiveBase {
    constructor(options?: FeConvolveMatrixOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.kernelMatrix) this.setKernelMatrix(options.kernelMatrix);
            if (options.order !== undefined) this.setOrder(options.order);
            if (options.divisor !== undefined) this.setDivisor(options.divisor);
            if (options.bias !== undefined) this.setBias(options.bias);
            if (options.targetX !== undefined) this.setTargetX(options.targetX);
            if (options.targetY !== undefined) this.setTargetY(options.targetY);
            if (options.edgeMode) this.setEdgeMode(options.edgeMode);
            if (options.preserveAlpha !== undefined) this.setPreserveAlpha(options.preserveAlpha);
            if (options.result) this.setResult(options.result);
            if (options.in) this.setIn(options.in);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeConvolveMatrixElement();
        return new SvgElementProxy(element);
    }

    /**
     * 畳み込みカーネルマトリックスを設定
     */
    public setKernelMatrix(matrix: number[]): this {
        this.setSvgAttribute("kernelMatrix", matrix.join(" "));
        return this;
    }

    /**
     * 畳み込みカーネルマトリックスを取得
     */
    public getKernelMatrix(): number[] | null {
        const value = this.getSvgAttribute("kernelMatrix");
        return value ? value.split(" ").map(Number) : null;
    }

    /**
     * マトリックスの次数を設定
     */
    public setOrder(order: number | [number, number]): this {
        if (typeof order === "number") {
            this.setSvgAttribute("order", order.toString());
        } else {
            this.setSvgAttribute("order", `${order[0]} ${order[1]}`);
        }
        return this;
    }

    /**
     * マトリックスの次数を取得
     */
    public getOrder(): [number, number] | null {
        const value = this.getSvgAttribute("order");
        if (!value) return null;
        const parts = value.split(" ");
        if (parts.length === 1) {
            const order = Number(parts[0]);
            return [order, order];
        } else {
            return [Number(parts[0]), Number(parts[1])];
        }
    }

    /**
     * 除数を設定
     */
    public setDivisor(divisor: number): this {
        this.setSvgAttribute("divisor", divisor.toString());
        return this;
    }

    /**
     * 除数を取得
     */
    public getDivisor(): number | null {
        const value = this.getSvgAttribute("divisor");
        return value ? Number(value) : null;
    }

    /**
     * バイアス値を設定
     */
    public setBias(bias: number): this {
        this.setSvgAttribute("bias", bias.toString());
        return this;
    }

    /**
     * バイアス値を取得
     */
    public getBias(): number | null {
        const value = this.getSvgAttribute("bias");
        return value ? Number(value) : null;
    }

    /**
     * ターゲットX座標を設定
     */
    public setTargetX(targetX: number): this {
        this.setSvgAttribute("targetX", targetX.toString());
        return this;
    }

    /**
     * ターゲットX座標を取得
     */
    public getTargetX(): number | null {
        const value = this.getSvgAttribute("targetX");
        return value ? Number(value) : null;
    }

    /**
     * ターゲットY座標を設定
     */
    public setTargetY(targetY: number): this {
        this.setSvgAttribute("targetY", targetY.toString());
        return this;
    }

    /**
     * ターゲットY座標を取得
     */
    public getTargetY(): number | null {
        const value = this.getSvgAttribute("targetY");
        return value ? Number(value) : null;
    }

    /**
     * エッジモードを設定
     */
    public setEdgeMode(edgeMode: "duplicate" | "wrap" | "none"): this {
        this.setSvgAttribute("edgeMode", edgeMode);
        return this;
    }

    /**
     * エッジモードを取得
     */
    public getEdgeMode(): string | null {
        return this.getSvgAttribute("edgeMode");
    }

    /**
     * アルファチャンネル保持を設定
     */
    public setPreserveAlpha(preserveAlpha: boolean): this {
        this.setSvgAttribute("preserveAlpha", preserveAlpha.toString());
        return this;
    }

    /**
     * アルファチャンネル保持を取得
     */
    public getPreserveAlpha(): boolean {
        const value = this.getSvgAttribute("preserveAlpha");
        return value === "true";
    }

    /**
     * 結果の識別子を設定
     */
    public setResult(result: string): this {
        this.setSvgAttribute("result", result);
        return this;
    }

    /**
     * 結果の識別子を取得
     */
    public getResult(): string | null {
        return this.getSvgAttribute("result");
    }

    /**
     * 入力ソースを設定
     */
    public setIn(input: string): this {
        this.setSvgAttribute("in", input);
        return this;
    }

    /**
     * 入力ソースを取得
     */
    public getIn(): string | null {
        return this.getSvgAttribute("in");
    }

    // === プリセットメソッド ===

    /**
     * エッジ検出フィルター（Sobel X）
     */
    public createEdgeDetectionX(result: string = "edge-x"): this {
        const kernel = [
            -1, 0, 1,
            -2, 0, 2,
            -1, 0, 1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * エッジ検出フィルター（Sobel Y）
     */
    public createEdgeDetectionY(result: string = "edge-y"): this {
        const kernel = [
            -1, -2, -1,
             0,  0,  0,
             1,  2,  1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * ラプラシアンエッジ検出
     */
    public createLaplacianEdge(result: string = "laplacian-edge"): this {
        const kernel = [
             0, -1,  0,
            -1,  4, -1,
             0, -1,  0
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * シャープ化フィルター
     */
    public createSharpen(intensity: number = 1, result: string = "sharpen"): this {
        const center = 4 + intensity;
        const kernel = [
             0, -1,  0,
            -1, center, -1,
             0, -1,  0
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * ボックスブラー
     */
    public createBoxBlur(size: number = 3, result: string = "box-blur"): this {
        const value = 1 / (size * size);
        const kernel = Array(size * size).fill(value);
        this.setKernelMatrix(kernel);
        this.setOrder(size);
        this.setResult(result);
        return this;
    }

    /**
     * ガウシアンブラー近似
     */
    public createGaussianBlur(result: string = "gaussian-blur"): this {
        const kernel = [
            1, 2, 1,
            2, 4, 2,
            1, 2, 1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setDivisor(16);
        this.setResult(result);
        return this;
    }

    /**
     * エンボス効果
     */
    public createEmboss(result: string = "emboss"): this {
        const kernel = [
            -2, -1,  0,
            -1,  1,  1,
             0,  1,  2
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setBias(0.5);
        this.setResult(result);
        return this;
    }

    /**
     * アンシャープマスク
     */
    public createUnsharpMask(amount: number = 1, result: string = "unsharp-mask"): this {
        const center = 8 + amount;
        const kernel = [
             0, -1,  0,
            -1, center, -1,
             0, -1,  0
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setDivisor(4);
        this.setResult(result);
        return this;
    }

    /**
     * 輪郭強調
     */
    public createOutline(result: string = "outline"): this {
        const kernel = [
            -1, -1, -1,
            -1,  8, -1,
            -1, -1, -1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * リッジ検出
     */
    public createRidge(result: string = "ridge"): this {
        const kernel = [
            -1, -1, -1,
            -1,  8, -1,
            -1, -1, -1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setBias(0.5);
        this.setResult(result);
        return this;
    }

    /**
     * モーションブラー（水平）
     */
    public createMotionBlurH(size: number = 5, result: string = "motion-blur-h"): this {
        const kernel = Array(size).fill(1 / size);
        this.setKernelMatrix(kernel);
        this.setOrder([size, 1]);
        this.setResult(result);
        return this;
    }

    /**
     * モーションブラー（垂直）
     */
    public createMotionBlurV(size: number = 5, result: string = "motion-blur-v"): this {
        const kernel = Array(size).fill(1 / size);
        this.setKernelMatrix(kernel);
        this.setOrder([1, size]);
        this.setResult(result);
        return this;
    }

    /**
     * プリューウィット エッジ検出（X方向）
     */
    public createPrewittX(result: string = "prewitt-x"): this {
        const kernel = [
            -1, 0, 1,
            -1, 0, 1,
            -1, 0, 1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * プリューウィット エッジ検出（Y方向）
     */
    public createPrewittY(result: string = "prewitt-y"): this {
        const kernel = [
            -1, -1, -1,
             0,  0,  0,
             1,  1,  1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * ロバーツクロス エッジ検出
     */
    public createRobertsCross(result: string = "roberts-cross"): this {
        const kernel = [
             1,  0,
             0, -1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(2);
        this.setResult(result);
        return this;
    }

    /**
     * ハイパスフィルター
     */
    public createHighpass(result: string = "highpass"): this {
        const kernel = [
             0, -1,  0,
            -1,  5, -1,
             0, -1,  0
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * ローパスフィルター
     */
    public createLowpass(result: string = "lowpass"): this {
        const kernel = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setDivisor(9);
        this.setResult(result);
        return this;
    }

    /**
     * バンドパスフィルター
     */
    public createBandpass(result: string = "bandpass"): this {
        const kernel = [
             0, -1,  0,
            -1,  4, -1,
             0, -1,  0
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(3);
        this.setResult(result);
        return this;
    }

    /**
     * ドッグ（DoG: Difference of Gaussians）
     */
    public createDoG(result: string = "dog"): this {
        const kernel = [
             0,  0, -1,  0,  0,
             0, -1, -2, -1,  0,
            -1, -2, 16, -2, -1,
             0, -1, -2, -1,  0,
             0,  0, -1,  0,  0
        ];
        this.setKernelMatrix(kernel);
        this.setOrder(5);
        this.setResult(result);
        return this;
    }

    /**
     * エッジモードをデュプリケートに設定
     */
    public duplicateEdges(): this {
        this.setEdgeMode("duplicate");
        return this;
    }

    /**
     * エッジモードをラップに設定
     */
    public wrapEdges(): this {
        this.setEdgeMode("wrap");
        return this;
    }

    /**
     * エッジモードをなしに設定
     */
    public noEdgeMode(): this {
        this.setEdgeMode("none");
        return this;
    }

    /**
     * アルファチャンネルを保持
     */
    public preserveAlphaChannel(): this {
        this.setPreserveAlpha(true);
        return this;
    }

    /**
     * アルファチャンネルを処理
     */
    public processAlphaChannel(): this {
        this.setPreserveAlpha(false);
        return this;
    }
}
