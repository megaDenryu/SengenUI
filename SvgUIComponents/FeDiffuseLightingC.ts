import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeDiffuseLightingOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    surfaceScale?: number;
    diffuseConstant?: number;
    kernelUnitLength?: number | [number, number];
    result?: string;
    lightingColor?: string;
}

/**
 * SVGフィルタープリミティブ：拡散照明フィルター
 * 光源を用いて3D的な拡散照明効果を適用
 */
export class FeDiffuseLightingC extends SvgFilterPrimitiveBase {
    constructor(options?: FeDiffuseLightingOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.surfaceScale !== undefined) this.setSurfaceScale(options.surfaceScale);
            if (options.diffuseConstant !== undefined) this.setDiffuseConstant(options.diffuseConstant);
            if (options.kernelUnitLength !== undefined) this.setKernelUnitLength(options.kernelUnitLength);
            if (options.result) this.setResult(options.result);
            if (options.lightingColor) this.setLightingColor(options.lightingColor);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeDiffuseLightingElement();
        return new SvgElementProxy(element);
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

    /**
     * サーフェススケールを設定（高さの倍率）
     */
    public setSurfaceScale(scale: number): this {
        this.setSvgAttribute("surfaceScale", scale.toString());
        return this;
    }

    /**
     * サーフェススケールを取得
     */
    public getSurfaceScale(): number | null {
        const value = this.getSvgAttribute("surfaceScale");
        return value ? Number(value) : null;
    }

    /**
     * 拡散定数を設定（反射の強さ）
     */
    public setDiffuseConstant(constant: number): this {
        this.setSvgAttribute("diffuseConstant", constant.toString());
        return this;
    }

    /**
     * 拡散定数を取得
     */
    public getDiffuseConstant(): number | null {
        const value = this.getSvgAttribute("diffuseConstant");
        return value ? Number(value) : null;
    }

    /**
     * カーネル単位長を設定
     */
    public setKernelUnitLength(length: number | [number, number]): this {
        if (typeof length === "number") {
            this.setSvgAttribute("kernelUnitLength", length.toString());
        } else {
            this.setSvgAttribute("kernelUnitLength", `${length[0]} ${length[1]}`);
        }
        return this;
    }

    /**
     * カーネル単位長を取得
     */
    public getKernelUnitLength(): [number, number] | null {
        const value = this.getSvgAttribute("kernelUnitLength");
        if (!value) return null;
        const parts = value.split(" ");
        if (parts.length === 1) {
            const length = Number(parts[0]);
            return [length, length];
        } else {
            return [Number(parts[0]), Number(parts[1])];
        }
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
     * 照明色を設定
     */
    public setLightingColor(color: string): this {
        this.setSvgAttribute("lighting-color", color);
        return this;
    }

    /**
     * 照明色を取得
     */
    public getLightingColor(): string | null {
        return this.getSvgAttribute("lighting-color");
    }

    /**
     * 遠方光源を追加
     */
    public addDistantLight(azimuth: number, elevation: number): this {
        const lightElement = SvgElementCreater.createFeDistantLightElement();
        lightElement.setAttribute("azimuth", azimuth.toString());
        lightElement.setAttribute("elevation", elevation.toString());
        this._svgDom.element.appendChild(lightElement);
        return this;
    }

    /**
     * 点光源を追加
     */
    public addPointLight(x: number, y: number, z: number): this {
        const lightElement = SvgElementCreater.createFePointLightElement();
        lightElement.setAttribute("x", x.toString());
        lightElement.setAttribute("y", y.toString());
        lightElement.setAttribute("z", z.toString());
        this._svgDom.element.appendChild(lightElement);
        return this;
    }

    /**
     * スポット光源を追加
     */
    public addSpotLight(
        x: number, y: number, z: number,
        pointsAtX: number, pointsAtY: number, pointsAtZ: number,
        specularExponent?: number, limitingConeAngle?: number
    ): this {
        const lightElement = SvgElementCreater.createFeSpotLightElement();
        lightElement.setAttribute("x", x.toString());
        lightElement.setAttribute("y", y.toString());
        lightElement.setAttribute("z", z.toString());
        lightElement.setAttribute("pointsAtX", pointsAtX.toString());
        lightElement.setAttribute("pointsAtY", pointsAtY.toString());
        lightElement.setAttribute("pointsAtZ", pointsAtZ.toString());
        if (specularExponent !== undefined) {
            lightElement.setAttribute("specularExponent", specularExponent.toString());
        }
        if (limitingConeAngle !== undefined) {
            lightElement.setAttribute("limitingConeAngle", limitingConeAngle.toString());
        }
        this._svgDom.element.appendChild(lightElement);
        return this;
    }

    // === プリセットメソッド ===

    /**
     * 基本的な上方向照明
     */
    public createTopLighting(
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        lightingColor: string = "white",
        result: string = "top-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addDistantLight(0, 90); // 真上から
        this.setResult(result);
        return this;
    }

    /**
     * 左上からの照明
     */
    public createTopLeftLighting(
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        lightingColor: string = "white",
        result: string = "top-left-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addDistantLight(315, 45); // 左上から45度
        this.setResult(result);
        return this;
    }

    /**
     * 右上からの照明
     */
    public createTopRightLighting(
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        lightingColor: string = "white",
        result: string = "top-right-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addDistantLight(45, 45); // 右上から45度
        this.setResult(result);
        return this;
    }

    /**
     * 側面照明
     */
    public createSideLighting(
        azimuth: number = 0,
        elevation: number = 0,
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        lightingColor: string = "white",
        result: string = "side-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addDistantLight(azimuth, elevation);
        this.setResult(result);
        return this;
    }

    /**
     * 暖色照明
     */
    public createWarmLighting(
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        result: string = "warm-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor("#ffddaa");
        this.addDistantLight(315, 45);
        this.setResult(result);
        return this;
    }

    /**
     * 寒色照明
     */
    public createCoolLighting(
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        result: string = "cool-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor("#aaddff");
        this.addDistantLight(45, 45);
        this.setResult(result);
        return this;
    }

    /**
     * 点光源照明
     */
    public createPointLighting(
        x: number, y: number, z: number = 100,
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        lightingColor: string = "white",
        result: string = "point-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addPointLight(x, y, z);
        this.setResult(result);
        return this;
    }

    /**
     * スポット照明
     */
    public createSpotLighting(
        x: number, y: number, z: number = 100,
        pointsAtX: number, pointsAtY: number, pointsAtZ: number = 0,
        coneAngle: number = 30,
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        lightingColor: string = "white",
        result: string = "spot-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addSpotLight(x, y, z, pointsAtX, pointsAtY, pointsAtZ, 1, coneAngle);
        this.setResult(result);
        return this;
    }

    /**
     * エンボス効果
     */
    public createEmbossEffect(
        surfaceScale: number = 3,
        diffuseConstant: number = 1,
        result: string = "emboss-effect"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor("white");
        this.addDistantLight(315, 45);
        this.setResult(result);
        return this;
    }

    /**
     * ソフト照明
     */
    public createSoftLighting(
        surfaceScale: number = 0.5,
        diffuseConstant: number = 0.7,
        lightingColor: string = "white",
        result: string = "soft-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addDistantLight(0, 45);
        this.setResult(result);
        return this;
    }

    /**
     * ハード照明
     */
    public createHardLighting(
        surfaceScale: number = 2,
        diffuseConstant: number = 1.5,
        lightingColor: string = "white",
        result: string = "hard-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor(lightingColor);
        this.addDistantLight(315, 60);
        this.setResult(result);
        return this;
    }

    /**
     * 夕日照明
     */
    public createSunsetLighting(
        surfaceScale: number = 1,
        diffuseConstant: number = 1,
        result: string = "sunset-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor("#ff6633");
        this.addDistantLight(270, 15); // 西から低い角度
        this.setResult(result);
        return this;
    }

    /**
     * 月光照明
     */
    public createMoonlighting(
        surfaceScale: number = 1,
        diffuseConstant: number = 0.8,
        result: string = "moonlighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor("#ccddff");
        this.addDistantLight(90, 75); // 東から高い角度
        this.setResult(result);
        return this;
    }

    /**
     * 材質効果（金属）
     */
    public createMetallicLighting(
        surfaceScale: number = 1.5,
        diffuseConstant: number = 0.8,
        result: string = "metallic-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor("#e6e6e6");
        this.addDistantLight(45, 60);
        this.setResult(result);
        return this;
    }

    /**
     * 材質効果（プラスチック）
     */
    public createPlasticLighting(
        surfaceScale: number = 0.8,
        diffuseConstant: number = 1.2,
        result: string = "plastic-lighting"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setDiffuseConstant(diffuseConstant);
        this.setLightingColor("white");
        this.addDistantLight(0, 45);
        this.setResult(result);
        return this;
    }

    /**
     * 照明パラメータをリセット
     */
    public resetLighting(): this {
        this.setSurfaceScale(1);
        this.setDiffuseConstant(1);
        this.setLightingColor("white");
        // 子要素（光源）をクリア
        this._svgDom.element.innerHTML = "";
        return this;
    }

    /**
     * 照明の強さを調整
     */
    public adjustIntensity(multiplier: number): this {
        const current = this.getDiffuseConstant() || 1;
        this.setDiffuseConstant(current * multiplier);
        return this;
    }

    /**
     * 高さを強調
     */
    public emphasizeHeight(multiplier: number): this {
        const current = this.getSurfaceScale() || 1;
        this.setSurfaceScale(current * multiplier);
        return this;
    }
}
