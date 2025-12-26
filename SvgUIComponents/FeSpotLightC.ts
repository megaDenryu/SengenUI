import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeSpotLightOptions {
    className?: string | string[];
    id?: string;
    x?: number;
    y?: number;
    z?: number;
    pointsAtX?: number;
    pointsAtY?: number;
    pointsAtZ?: number;
    specularExponent?: number;
    limitingConeAngle?: number;
}

/**
 * SVGフィルタープリミティブ：スポット光源
 * 特定の方向に向けた円錐状の光源（舞台照明やフラッシュライトのような光源）
 */
export class FeSpotLightC extends SvgFilterPrimitiveBase {
    constructor(options?: FeSpotLightOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.z !== undefined) this.setZ(options.z);
            if (options.pointsAtX !== undefined) this.setPointsAtX(options.pointsAtX);
            if (options.pointsAtY !== undefined) this.setPointsAtY(options.pointsAtY);
            if (options.pointsAtZ !== undefined) this.setPointsAtZ(options.pointsAtZ);
            if (options.specularExponent !== undefined) this.setSpecularExponent(options.specularExponent);
            if (options.limitingConeAngle !== undefined) this.setLimitingConeAngle(options.limitingConeAngle);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeSpotLightElement();
        return new SvgElementProxy(element);
    }

    /**
     * 光源のX座標を設定
     */
    public setX(x: number): this {
        this.setSvgAttribute("x", x.toString());
        return this;
    }

    /**
     * 光源のX座標を取得
     */
    public getX(): number | null {
        const value = this.getSvgAttribute("x");
        return value ? Number(value) : null;
    }

    /**
     * 光源のY座標を設定
     */
    public setY(y: number): this {
        this.setSvgAttribute("y", y.toString());
        return this;
    }

    /**
     * 光源のY座標を取得
     */
    public getY(): number | null {
        const value = this.getSvgAttribute("y");
        return value ? Number(value) : null;
    }

    /**
     * 光源のZ座標を設定（高さ）
     */
    public setZ(z: number): this {
        this.setSvgAttribute("z", z.toString());
        return this;
    }

    /**
     * 光源のZ座標を取得
     */
    public getZ(): number | null {
        const value = this.getSvgAttribute("z");
        return value ? Number(value) : null;
    }

    /**
     * 光源の照射先X座標を設定
     */
    public setPointsAtX(pointsAtX: number): this {
        this.setSvgAttribute("pointsAtX", pointsAtX.toString());
        return this;
    }

    /**
     * 光源の照射先X座標を取得
     */
    public getPointsAtX(): number | null {
        const value = this.getSvgAttribute("pointsAtX");
        return value ? Number(value) : null;
    }

    /**
     * 光源の照射先Y座標を設定
     */
    public setPointsAtY(pointsAtY: number): this {
        this.setSvgAttribute("pointsAtY", pointsAtY.toString());
        return this;
    }

    /**
     * 光源の照射先Y座標を取得
     */
    public getPointsAtY(): number | null {
        const value = this.getSvgAttribute("pointsAtY");
        return value ? Number(value) : null;
    }

    /**
     * 光源の照射先Z座標を設定
     */
    public setPointsAtZ(pointsAtZ: number): this {
        this.setSvgAttribute("pointsAtZ", pointsAtZ.toString());
        return this;
    }

    /**
     * 光源の照射先Z座標を取得
     */
    public getPointsAtZ(): number | null {
        const value = this.getSvgAttribute("pointsAtZ");
        return value ? Number(value) : null;
    }

    /**
     * 鏡面指数を設定（光の鋭さ）
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
     * 照射角の制限を設定（円錐の角度）
     */
    public setLimitingConeAngle(angle: number): this {
        this.setSvgAttribute("limitingConeAngle", angle.toString());
        return this;
    }

    /**
     * 照射角の制限を取得
     */
    public getLimitingConeAngle(): number | null {
        const value = this.getSvgAttribute("limitingConeAngle");
        return value ? Number(value) : null;
    }

    /**
     * 光源の位置を一度に設定
     */
    public setLightPosition(x: number, y: number, z: number): this {
        this.setX(x);
        this.setY(y);
        this.setZ(z);
        return this;
    }

    /**
     * 照射先の位置を一度に設定
     */
    public setTargetPosition(pointsAtX: number, pointsAtY: number, pointsAtZ: number): this {
        this.setPointsAtX(pointsAtX);
        this.setPointsAtY(pointsAtY);
        this.setPointsAtZ(pointsAtZ);
        return this;
    }

    /**
     * 光源と照射先を同時に設定
     */
    public setLightAndTarget(
        x: number, y: number, z: number,
        pointsAtX: number, pointsAtY: number, pointsAtZ: number
    ): this {
        this.setLightPosition(x, y, z);
        this.setTargetPosition(pointsAtX, pointsAtY, pointsAtZ);
        return this;
    }

    // === プリセットメソッド ===

    /**
     * 舞台照明（上から下に向けて）
     */
    public createStageLight(
        x: number = 250, y: number = 100,
        targetX: number = 250, targetY: number = 250,
        coneAngle: number = 45,
        intensity: number = 1
    ): this {
        this.setLightAndTarget(x, y, 200, targetX, targetY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * フラッシュライト（手前から奥に向けて）
     */
    public createFlashlight(
        x: number = 100, y: number = 400,
        targetX: number = 300, targetY: number = 200,
        coneAngle: number = 30,
        intensity: number = 2
    ): this {
        this.setLightAndTarget(x, y, 50, targetX, targetY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * デスクランプ（斜め上から下に向けて）
     */
    public createDeskLamp(
        x: number = 200, y: number = 150,
        targetX: number = 250, targetY: number = 300,
        coneAngle: number = 60,
        intensity: number = 1
    ): this {
        this.setLightAndTarget(x, y, 120, targetX, targetY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * 車のヘッドライト
     */
    public createHeadlight(
        x: number = 100, y: number = 300,
        targetX: number = 400, targetY: number = 300,
        coneAngle: number = 40,
        intensity: number = 3
    ): this {
        this.setLightAndTarget(x, y, 30, targetX, targetY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * 投光器（遠くを照らす）
     */
    public createFloodlight(
        x: number = 50, y: number = 50,
        targetX: number = 400, targetY: number = 400,
        coneAngle: number = 80,
        intensity: number = 2
    ): this {
        this.setLightAndTarget(x, y, 150, targetX, targetY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * レーザーポインター（非常に狭い角度）
     */
    public createLaserPointer(
        x: number = 100, y: number = 300,
        targetX: number = 300, targetY: number = 200,
        intensity: number = 5
    ): this {
        this.setLightAndTarget(x, y, 40, targetX, targetY, 0);
        this.setLimitingConeAngle(5);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * サーチライト（探照灯）
     */
    public createSearchlight(
        x: number = 250, y: number = 250,
        targetX: number = 400, targetY: number = 100,
        coneAngle: number = 25,
        intensity: number = 4
    ): this {
        this.setLightAndTarget(x, y, 300, targetX, targetY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * スタジオライト（写真撮影用）
     */
    public createStudioLight(
        x: number = 150, y: number = 100,
        targetX: number = 250, targetY: number = 250,
        coneAngle: number = 50,
        intensity: number = 1.5
    ): this {
        this.setLightAndTarget(x, y, 180, targetX, targetY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * ピンスポットライト（狭い範囲を強く照らす）
     */
    public createPinSpot(
        x: number = 250, y: number = 50,
        targetX: number = 250, targetY: number = 300,
        intensity: number = 3
    ): this {
        this.setLightAndTarget(x, y, 200, targetX, targetY, 0);
        this.setLimitingConeAngle(15);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * 建築照明（建物を下から照らす）
     */
    public createArchitecturalLight(
        x: number = 250, y: number = 450,
        targetX: number = 250, targetY: number = 200,
        coneAngle: number = 70,
        intensity: number = 2
    ): this {
        this.setLightAndTarget(x, y, 20, targetX, targetY, 100);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * ダウンライト（天井から下に向けて）
     */
    public createDownlight(
        x: number = 250, y: number = 250,
        coneAngle: number = 45,
        intensity: number = 1
    ): this {
        this.setLightAndTarget(x, y, 300, x, y + 150, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * アップライト（下から上に向けて）
     */
    public createUplight(
        x: number = 250, y: number = 400,
        coneAngle: number = 60,
        intensity: number = 1.5
    ): this {
        this.setLightAndTarget(x, y, 20, x, y - 150, 200);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * ドラマチックな側面照明
     */
    public createDramaticSideLight(
        fromLeft: boolean = true,
        centerX: number = 250, centerY: number = 250,
        coneAngle: number = 35,
        intensity: number = 2
    ): this {
        const lightX = fromLeft ? centerX - 200 : centerX + 200;
        this.setLightAndTarget(lightX, centerY - 100, 150, centerX, centerY, 0);
        this.setLimitingConeAngle(coneAngle);
        this.setSpecularExponent(intensity);
        return this;
    }

    /**
     * 光源の方向ベクトルを計算
     */
    public getDirectionVector(): { x: number; y: number; z: number } {
        const lightX = this.getX() || 0;
        const lightY = this.getY() || 0;
        const lightZ = this.getZ() || 0;
        const targetX = this.getPointsAtX() || 0;
        const targetY = this.getPointsAtY() || 0;
        const targetZ = this.getPointsAtZ() || 0;
        
        const dx = targetX - lightX;
        const dy = targetY - lightY;
        const dz = targetZ - lightZ;
        
        const length = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        return {
            x: dx / length,
            y: dy / length,
            z: dz / length
        };
    }

    /**
     * 照射距離を計算
     */
    public getDistance(): number {
        const lightX = this.getX() || 0;
        const lightY = this.getY() || 0;
        const lightZ = this.getZ() || 0;
        const targetX = this.getPointsAtX() || 0;
        const targetY = this.getPointsAtY() || 0;
        const targetZ = this.getPointsAtZ() || 0;
        
        const dx = targetX - lightX;
        const dy = targetY - lightY;
        const dz = targetZ - lightZ;
        
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }

    /**
     * 照射角度を計算（度）
     */
    public getBeamAngle(): number {
        const direction = this.getDirectionVector();
        // Z軸との角度を計算
        return Math.acos(Math.abs(direction.z)) * 180 / Math.PI;
    }

    /**
     * ターゲットを中心に光源を回転
     */
    public orbitAroundTarget(angle: number, radius?: number): this {
        const targetX = this.getPointsAtX() || 0;
        const targetY = this.getPointsAtY() || 0;
        const targetZ = this.getPointsAtZ() || 0;
        
        const currentRadius = radius || this.getDistance();
        const radians = angle * Math.PI / 180;
        
        const newX = targetX + currentRadius * Math.cos(radians);
        const newY = targetY + currentRadius * Math.sin(radians);
        const newZ = this.getZ() || 0;
        
        this.setLightPosition(newX, newY, newZ);
        return this;
    }

    /**
     * スポットライトの説明を取得
     */
    public getSpotlightDescription(): string {
        const coneAngle = this.getLimitingConeAngle() || 0;
        const intensity = this.getSpecularExponent() || 1;
        const distance = this.getDistance();
        
        let type = "";
        if (coneAngle < 15) type = "ピンスポット";
        else if (coneAngle < 30) type = "ナロー";
        else if (coneAngle < 60) type = "ミディアム";
        else type = "ワイド";
        
        let power = "";
        if (intensity < 1) power = "弱";
        else if (intensity < 2) power = "中";
        else if (intensity < 4) power = "強";
        else power = "超強";
        
        return `${type}スポット (角度:${coneAngle}°, 強度:${power}, 距離:${distance.toFixed(1)})`;
    }

    /**
     * 照射範囲のサイズを計算
     */
    public getIlluminationAreaSize(): number {
        const distance = this.getDistance();
        const coneAngle = this.getLimitingConeAngle() || 45;
        const radius = distance * Math.tan((coneAngle * Math.PI / 180) / 2);
        return Math.PI * radius * radius; // 照射範囲の面積
    }
}
