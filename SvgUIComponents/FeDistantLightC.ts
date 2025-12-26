import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeDistantLightOptions {
    className?: string | string[];
    id?: string;
    azimuth?: number;
    elevation?: number;
}

/**
 * SVGフィルタープリミティブ：遠方光源
 * 無限遠からの平行光源を定義（太陽光のような光源）
 */
export class FeDistantLightC extends SvgFilterPrimitiveBase {
    constructor(options?: FeDistantLightOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.azimuth !== undefined) this.setAzimuth(options.azimuth);
            if (options.elevation !== undefined) this.setElevation(options.elevation);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeDistantLightElement();
        return new SvgElementProxy(element);
    }

    /**
     * 方位角を設定（0-360度、北が0度、時計回り）
     */
    public setAzimuth(azimuth: number): this {
        this.setSvgAttribute("azimuth", azimuth.toString());
        return this;
    }

    /**
     * 方位角を取得
     */
    public getAzimuth(): number | null {
        const value = this.getSvgAttribute("azimuth");
        return value ? Number(value) : null;
    }

    /**
     * 仰角を設定（0-90度、水平が0度、真上が90度）
     */
    public setElevation(elevation: number): this {
        this.setSvgAttribute("elevation", elevation.toString());
        return this;
    }

    /**
     * 仰角を取得
     */
    public getElevation(): number | null {
        const value = this.getSvgAttribute("elevation");
        return value ? Number(value) : null;
    }

    // === プリセットメソッド ===

    /**
     * 北からの光源
     */
    public setNorthLight(elevation: number = 45): this {
        this.setAzimuth(0);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 東からの光源
     */
    public setEastLight(elevation: number = 45): this {
        this.setAzimuth(90);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 南からの光源
     */
    public setSouthLight(elevation: number = 45): this {
        this.setAzimuth(180);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 西からの光源
     */
    public setWestLight(elevation: number = 45): this {
        this.setAzimuth(270);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 北東からの光源
     */
    public setNortheastLight(elevation: number = 45): this {
        this.setAzimuth(45);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 南東からの光源
     */
    public setSoutheastLight(elevation: number = 45): this {
        this.setAzimuth(135);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 南西からの光源
     */
    public setSouthwestLight(elevation: number = 45): this {
        this.setAzimuth(225);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 北西からの光源
     */
    public setNorthwestLight(elevation: number = 45): this {
        this.setAzimuth(315);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 真上からの光源（天頂）
     */
    public setZenithLight(): this {
        this.setAzimuth(0);
        this.setElevation(90);
        return this;
    }

    /**
     * 水平な光源
     */
    public setHorizontalLight(azimuth: number = 0): this {
        this.setAzimuth(azimuth);
        this.setElevation(0);
        return this;
    }

    /**
     * 朝の太陽光（東から低い角度）
     */
    public setMorningSun(): this {
        this.setAzimuth(90);
        this.setElevation(15);
        return this;
    }

    /**
     * 正午の太陽光（真上から）
     */
    public setNoonSun(): this {
        this.setAzimuth(180);
        this.setElevation(75);
        return this;
    }

    /**
     * 夕方の太陽光（西から低い角度）
     */
    public setEveningSun(): this {
        this.setAzimuth(270);
        this.setElevation(15);
        return this;
    }

    /**
     * 標準的な照明設定（左上から45度）
     */
    public setStandardLighting(): this {
        this.setAzimuth(315);
        this.setElevation(45);
        return this;
    }

    /**
     * ドラマチックな照明（右上から60度）
     */
    public setDramaticLighting(): this {
        this.setAzimuth(45);
        this.setElevation(60);
        return this;
    }

    /**
     * ソフトな照明（真上から30度）
     */
    public setSoftLighting(): this {
        this.setAzimuth(0);
        this.setElevation(30);
        return this;
    }

    /**
     * バックライト効果
     */
    public setBacklight(): this {
        this.setAzimuth(180);
        this.setElevation(30);
        return this;
    }

    /**
     * リムライト効果（輪郭照明）
     */
    public setRimLight(): this {
        this.setAzimuth(135);
        this.setElevation(75);
        return this;
    }

    /**
     * キーライト（主照明）
     */
    public setKeyLight(): this {
        this.setAzimuth(315);
        this.setElevation(45);
        return this;
    }

    /**
     * フィルライト（補助照明）
     */
    public setFillLight(): this {
        this.setAzimuth(45);
        this.setElevation(30);
        return this;
    }

    /**
     * 角度を度からラジアンに変換
     */
    public static degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    /**
     * ラジアンから度に変換
     */
    public static radiansToDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    /**
     * 光源の方向ベクトルを計算
     */
    public getDirectionVector(): { x: number; y: number; z: number } {
        const azimuth = this.getAzimuth() || 0;
        const elevation = this.getElevation() || 0;
        
        const azimuthRad = FeDistantLightC.degreesToRadians(azimuth);
        const elevationRad = FeDistantLightC.degreesToRadians(elevation);
        
        const x = Math.cos(elevationRad) * Math.sin(azimuthRad);
        const y = -Math.cos(elevationRad) * Math.cos(azimuthRad);
        const z = Math.sin(elevationRad);
        
        return { x, y, z };
    }

    /**
     * 方向ベクトルから角度を設定
     */
    public setFromDirectionVector(x: number, y: number, z: number): this {
        const azimuth = FeDistantLightC.radiansToDegrees(Math.atan2(x, -y));
        const elevation = FeDistantLightC.radiansToDegrees(Math.asin(z / Math.sqrt(x*x + y*y + z*z)));
        
        this.setAzimuth(azimuth < 0 ? azimuth + 360 : azimuth);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 時刻に基づいて太陽の位置を設定（簡易版）
     */
    public setSunPosition(hour: number, latitude: number = 35.6762): this {
        // 簡易的な太陽位置計算（実際の天文計算ではない）
        const hourAngle = (hour - 12) * 15; // 15度/時間
        const declination = 23.45 * Math.sin(FeDistantLightC.degreesToRadians((360 / 365) * (284 + 81))); // 春分の日から81日後の概算
        
        const azimuth = hourAngle < 0 ? 90 + Math.abs(hourAngle) : 270 - hourAngle;
        const elevation = Math.max(0, 90 - Math.abs(latitude - declination));
        
        this.setAzimuth(azimuth);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 季節に基づいて照明を調整
     */
    public setSeasonalLighting(season: "spring" | "summer" | "autumn" | "winter"): this {
        switch (season) {
            case "spring":
                this.setAzimuth(90);
                this.setElevation(55);
                break;
            case "summer":
                this.setAzimuth(180);
                this.setElevation(75);
                break;
            case "autumn":
                this.setAzimuth(270);
                this.setElevation(45);
                break;
            case "winter":
                this.setAzimuth(180);
                this.setElevation(25);
                break;
        }
        return this;
    }

    /**
     * 照明の方向を反対側に設定
     */
    public setOppositeDirection(): this {
        const currentAzimuth = this.getAzimuth() || 0;
        const currentElevation = this.getElevation() || 0;
        
        this.setAzimuth((currentAzimuth + 180) % 360);
        this.setElevation(currentElevation);
        return this;
    }

    /**
     * 照明角度をランダムに設定
     */
    public setRandomDirection(): this {
        const azimuth = Math.random() * 360;
        const elevation = Math.random() * 90;
        
        this.setAzimuth(azimuth);
        this.setElevation(elevation);
        return this;
    }

    /**
     * 照明の強さを示すラベルを取得
     */
    public getLightingDescription(): string {
        const azimuth = this.getAzimuth() || 0;
        const elevation = this.getElevation() || 0;
        
        let direction = "";
        if (azimuth >= 315 || azimuth < 45) direction = "北";
        else if (azimuth >= 45 && azimuth < 135) direction = "東";
        else if (azimuth >= 135 && azimuth < 225) direction = "南";
        else direction = "西";
        
        let height = "";
        if (elevation < 15) height = "低角度";
        else if (elevation < 45) height = "中角度";
        else if (elevation < 75) height = "高角度";
        else height = "真上";
        
        return `${direction}から${height}の照明`;
    }
}
