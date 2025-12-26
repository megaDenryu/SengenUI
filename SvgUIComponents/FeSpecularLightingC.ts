import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeSpecularLightingOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    surfaceScale?: number;
    specularConstant?: number;
    specularExponent?: number;
    kernelUnitLength?: number | [number, number];
    result?: string;
    lightingColor?: string;
}

/**
 * SVGフィルタープリミティブ：鏡面照明フィルター
 * 光源を用いて鏡面反射による照明効果を適用
 */
export class FeSpecularLightingC extends SvgFilterPrimitiveBase {
    constructor(options?: FeSpecularLightingOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.surfaceScale !== undefined) this.setSurfaceScale(options.surfaceScale);
            if (options.specularConstant !== undefined) this.setSpecularConstant(options.specularConstant);
            if (options.specularExponent !== undefined) this.setSpecularExponent(options.specularExponent);
            if (options.kernelUnitLength !== undefined) this.setKernelUnitLength(options.kernelUnitLength);
            if (options.result) this.setResult(options.result);
            if (options.lightingColor) this.setLightingColor(options.lightingColor);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeSpecularLightingElement();
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
     * 鏡面定数を設定（反射の強さ）
     */
    public setSpecularConstant(constant: number): this {
        this.setSvgAttribute("specularConstant", constant.toString());
        return this;
    }

    /**
     * 鏡面定数を取得
     */
    public getSpecularConstant(): number | null {
        const value = this.getSvgAttribute("specularConstant");
        return value ? Number(value) : null;
    }

    /**
     * 鏡面指数を設定（光沢の鋭さ）
     */
    public setSpecularExponent(exponent: number): this {
        this.setSvgAttribute("specularExponent", exponent.toString());
        return this;
    }

    /**
     * 鏡面指数を取得
     */
    public getSpecularExponent(): number | null {
        const value = this.getSvgAttribute("specularExponent");
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
     * 金属光沢効果
     */
    public createMetallicShine(
        surfaceScale: number = 2,
        specularConstant: number = 1.5,
        specularExponent: number = 20,
        lightingColor: string = "white",
        result: string = "metallic-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(45, 45);
        this.setResult(result);
        return this;
    }

    /**
     * プラスチック光沢効果
     */
    public createPlasticShine(
        surfaceScale: number = 1,
        specularConstant: number = 1,
        specularExponent: number = 10,
        lightingColor: string = "white",
        result: string = "plastic-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(0, 45);
        this.setResult(result);
        return this;
    }

    /**
     * ガラス光沢効果
     */
    public createGlassShine(
        surfaceScale: number = 1.5,
        specularConstant: number = 2,
        specularExponent: number = 30,
        lightingColor: string = "white",
        result: string = "glass-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(315, 60);
        this.setResult(result);
        return this;
    }

    /**
     * 鏡面効果
     */
    public createMirrorShine(
        surfaceScale: number = 3,
        specularConstant: number = 3,
        specularExponent: number = 50,
        lightingColor: string = "white",
        result: string = "mirror-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(0, 90);
        this.setResult(result);
        return this;
    }

    /**
     * ソフト光沢効果
     */
    public createSoftShine(
        surfaceScale: number = 0.5,
        specularConstant: number = 0.8,
        specularExponent: number = 5,
        lightingColor: string = "white",
        result: string = "soft-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(315, 30);
        this.setResult(result);
        return this;
    }

    /**
     * シャープ光沢効果
     */
    public createSharpShine(
        surfaceScale: number = 2,
        specularConstant: number = 2,
        specularExponent: number = 40,
        lightingColor: string = "white",
        result: string = "sharp-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(45, 60);
        this.setResult(result);
        return this;
    }

    /**
     * 宝石光沢効果
     */
    public createJewelShine(
        surfaceScale: number = 2.5,
        specularConstant: number = 2.5,
        specularExponent: number = 60,
        lightingColor: string = "white",
        result: string = "jewel-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(45, 45);
        this.setResult(result);
        return this;
    }

    /**
     * 水面光沢効果
     */
    public createWaterShine(
        surfaceScale: number = 1,
        specularConstant: number = 1.2,
        specularExponent: number = 15,
        lightingColor: string = "#ccddff",
        result: string = "water-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(90, 30);
        this.setResult(result);
        return this;
    }

    /**
     * 金色光沢効果
     */
    public createGoldShine(
        surfaceScale: number = 1.8,
        specularConstant: number = 1.8,
        specularExponent: number = 25,
        result: string = "gold-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor("#ffdd88");
        this.addDistantLight(315, 45);
        this.setResult(result);
        return this;
    }

    /**
     * 銀色光沢効果
     */
    public createSilverShine(
        surfaceScale: number = 1.5,
        specularConstant: number = 1.5,
        specularExponent: number = 30,
        result: string = "silver-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor("#f0f0f0");
        this.addDistantLight(45, 45);
        this.setResult(result);
        return this;
    }

    /**
     * 点光源による光沢
     */
    public createPointShine(
        x: number, y: number, z: number = 100,
        surfaceScale: number = 1.5,
        specularConstant: number = 1.5,
        specularExponent: number = 20,
        lightingColor: string = "white",
        result: string = "point-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addPointLight(x, y, z);
        this.setResult(result);
        return this;
    }

    /**
     * スポット光沢
     */
    public createSpotShine(
        x: number, y: number, z: number = 100,
        pointsAtX: number, pointsAtY: number, pointsAtZ: number = 0,
        coneAngle: number = 30,
        surfaceScale: number = 2,
        specularConstant: number = 2,
        specularExponent: number = 25,
        lightingColor: string = "white",
        result: string = "spot-shine"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addSpotLight(x, y, z, pointsAtX, pointsAtY, pointsAtZ, specularExponent, coneAngle);
        this.setResult(result);
        return this;
    }

    /**
     * サテン仕上げ効果
     */
    public createSatinFinish(
        surfaceScale: number = 0.8,
        specularConstant: number = 0.6,
        specularExponent: number = 8,
        lightingColor: string = "white",
        result: string = "satin-finish"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(0, 45);
        this.setResult(result);
        return this;
    }

    /**
     * マット仕上げ効果
     */
    public createMatteFinish(
        surfaceScale: number = 0.3,
        specularConstant: number = 0.3,
        specularExponent: number = 3,
        lightingColor: string = "white",
        result: string = "matte-finish"
    ): this {
        this.setSurfaceScale(surfaceScale);
        this.setSpecularConstant(specularConstant);
        this.setSpecularExponent(specularExponent);
        this.setLightingColor(lightingColor);
        this.addDistantLight(315, 30);
        this.setResult(result);
        return this;
    }

    /**
     * 光沢パラメータをリセット
     */
    public resetSpecular(): this {
        this.setSurfaceScale(1);
        this.setSpecularConstant(1);
        this.setSpecularExponent(1);
        this.setLightingColor("white");
        // 子要素（光源）をクリア
        this._svgDom.element.innerHTML = "";
        return this;
    }

    /**
     * 光沢の強さを調整
     */
    public adjustShineIntensity(multiplier: number): this {
        const currentConstant = this.getSpecularConstant() || 1;
        this.setSpecularConstant(currentConstant * multiplier);
        return this;
    }

    /**
     * 光沢の鋭さを調整
     */
    public adjustShineSharpness(multiplier: number): this {
        const currentExponent = this.getSpecularExponent() || 1;
        this.setSpecularExponent(currentExponent * multiplier);
        return this;
    }

    /**
     * 材質プリセット：光沢の度合いで設定
     */
    public setMaterialPreset(material: "matte" | "satin" | "glossy" | "mirror"): this {
        switch (material) {
            case "matte":
                return this.createMatteFinish();
            case "satin":
                return this.createSatinFinish();
            case "glossy":
                return this.createPlasticShine();
            case "mirror":
                return this.createMirrorShine();
            default:
                return this;
        }
    }
}
