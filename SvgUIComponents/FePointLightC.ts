import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FePointLightOptions {
    className?: string | string[];
    id?: string;
    x?: number;
    y?: number;
    z?: number;
}

/**
 * SVGフィルタープリミティブ：点光源
 * 3D空間の特定の点から全方向に光を放射する光源
 */
export class FePointLightC extends SvgFilterPrimitiveBase {
    constructor(options?: FePointLightOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.z !== undefined) this.setZ(options.z);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFePointLightElement();
        return new SvgElementProxy(element);
    }

    /**
     * X座標を設定
     */
    public setX(x: number): this {
        this.setSvgAttribute("x", x.toString());
        return this;
    }

    /**
     * X座標を取得
     */
    public getX(): number | null {
        const value = this.getSvgAttribute("x");
        return value ? Number(value) : null;
    }

    /**
     * Y座標を設定
     */
    public setY(y: number): this {
        this.setSvgAttribute("y", y.toString());
        return this;
    }

    /**
     * Y座標を取得
     */
    public getY(): number | null {
        const value = this.getSvgAttribute("y");
        return value ? Number(value) : null;
    }

    /**
     * Z座標を設定（高さ）
     */
    public setZ(z: number): this {
        this.setSvgAttribute("z", z.toString());
        return this;
    }

    /**
     * Z座標を取得
     */
    public getZ(): number | null {
        const value = this.getSvgAttribute("z");
        return value ? Number(value) : null;
    }

    /**
     * 3D位置を一度に設定
     */
    public setPosition(x: number, y: number, z: number): this {
        this.setX(x);
        this.setY(y);
        this.setZ(z);
        return this;
    }

    /**
     * 3D位置を取得
     */
    public getPosition(): { x: number; y: number; z: number } {
        return {
            x: this.getX() || 0,
            y: this.getY() || 0,
            z: this.getZ() || 0
        };
    }

    // === プリセットメソッド ===

    /**
     * 中央上部の光源
     */
    public setCenterTopLight(centerX: number = 250, centerY: number = 250, height: number = 100): this {
        this.setPosition(centerX, centerY, height);
        return this;
    }

    /**
     * 左上の光源
     */
    public setTopLeftLight(x: number = 100, y: number = 100, height: number = 100): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 右上の光源
     */
    public setTopRightLight(x: number = 400, y: number = 100, height: number = 100): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 左下の光源
     */
    public setBottomLeftLight(x: number = 100, y: number = 400, height: number = 100): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 右下の光源
     */
    public setBottomRightLight(x: number = 400, y: number = 400, height: number = 100): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 近距離照明
     */
    public setCloseLight(x: number, y: number, height: number = 50): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 遠距離照明
     */
    public setDistantLight(x: number, y: number, height: number = 200): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 天井照明
     */
    public setCeilingLight(x: number, y: number, height: number = 300): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * デスクライト風の照明
     */
    public setDeskLight(x: number, y: number, height: number = 80): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * スタジオライト風の照明
     */
    public setStudioLight(x: number, y: number, height: number = 150): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * ランプ風の照明
     */
    public setLampLight(x: number, y: number, height: number = 120): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * キャンドル風の照明（低い位置）
     */
    public setCandleLight(x: number, y: number, height: number = 30): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 月光風の照明（高い位置）
     */
    public setMoonlight(x: number = 250, y: number = 100, height: number = 500): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 焚き火風の照明
     */
    public setCampfireLight(x: number, y: number, height: number = 40): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 街灯風の照明
     */
    public setStreetLight(x: number, y: number, height: number = 250): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 懐中電灯風の照明
     */
    public setFlashlightLight(x: number, y: number, height: number = 60): this {
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 球体の周囲に複数の光源を配置
     */
    public setOrbitalLight(
        centerX: number, centerY: number, centerZ: number,
        radius: number, angle: number
    ): this {
        const radians = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radians);
        const y = centerY + radius * Math.sin(radians);
        this.setPosition(x, y, centerZ);
        return this;
    }

    /**
     * リング状の光源配置
     */
    public setRingLight(
        centerX: number, centerY: number, height: number,
        radius: number, position: number
    ): this {
        const angle = position * 360;
        return this.setOrbitalLight(centerX, centerY, height, radius, angle);
    }

    /**
     * ランダムな位置に光源を配置
     */
    public setRandomPosition(
        minX: number = 0, maxX: number = 500,
        minY: number = 0, maxY: number = 500,
        minZ: number = 50, maxZ: number = 200
    ): this {
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        const z = Math.random() * (maxZ - minZ) + minZ;
        this.setPosition(x, y, z);
        return this;
    }

    /**
     * 格子状の位置に光源を配置
     */
    public setGridPosition(
        gridX: number, gridY: number,
        startX: number = 0, startY: number = 0,
        spacingX: number = 100, spacingY: number = 100,
        height: number = 100
    ): this {
        const x = startX + gridX * spacingX;
        const y = startY + gridY * spacingY;
        this.setPosition(x, y, height);
        return this;
    }

    /**
     * 他の点からの相対位置に設定
     */
    public setRelativePosition(
        baseX: number, baseY: number, baseZ: number,
        offsetX: number, offsetY: number, offsetZ: number
    ): this {
        this.setPosition(baseX + offsetX, baseY + offsetY, baseZ + offsetZ);
        return this;
    }

    /**
     * 二点間の中点に設定
     */
    public setMidpoint(
        x1: number, y1: number, z1: number,
        x2: number, y2: number, z2: number
    ): this {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const midZ = (z1 + z2) / 2;
        this.setPosition(midX, midY, midZ);
        return this;
    }

    /**
     * 他の点光源との距離を計算
     */
    public getDistanceFrom(other: FePointLightC): number {
        const pos1 = this.getPosition();
        const pos2 = other.getPosition();
        
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }

    /**
     * 指定した点からの距離を計算
     */
    public getDistanceFromPoint(x: number, y: number, z: number): number {
        const pos = this.getPosition();
        
        const dx = pos.x - x;
        const dy = pos.y - y;
        const dz = pos.z - z;
        
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }

    /**
     * 位置を移動
     */
    public move(deltaX: number, deltaY: number, deltaZ: number): this {
        const current = this.getPosition();
        this.setPosition(
            current.x + deltaX,
            current.y + deltaY,
            current.z + deltaZ
        );
        return this;
    }

    /**
     * X軸を中心に回転
     */
    public rotateAroundX(centerY: number, centerZ: number, angle: number): this {
        const pos = this.getPosition();
        const cos = Math.cos(angle * Math.PI / 180);
        const sin = Math.sin(angle * Math.PI / 180);
        
        const y = pos.y - centerY;
        const z = pos.z - centerZ;
        
        const newY = y * cos - z * sin + centerY;
        const newZ = y * sin + z * cos + centerZ;
        
        this.setPosition(pos.x, newY, newZ);
        return this;
    }

    /**
     * Y軸を中心に回転
     */
    public rotateAroundY(centerX: number, centerZ: number, angle: number): this {
        const pos = this.getPosition();
        const cos = Math.cos(angle * Math.PI / 180);
        const sin = Math.sin(angle * Math.PI / 180);
        
        const x = pos.x - centerX;
        const z = pos.z - centerZ;
        
        const newX = x * cos + z * sin + centerX;
        const newZ = -x * sin + z * cos + centerZ;
        
        this.setPosition(newX, pos.y, newZ);
        return this;
    }

    /**
     * Z軸を中心に回転
     */
    public rotateAroundZ(centerX: number, centerY: number, angle: number): this {
        const pos = this.getPosition();
        const cos = Math.cos(angle * Math.PI / 180);
        const sin = Math.sin(angle * Math.PI / 180);
        
        const x = pos.x - centerX;
        const y = pos.y - centerY;
        
        const newX = x * cos - y * sin + centerX;
        const newY = x * sin + y * cos + centerY;
        
        this.setPosition(newX, newY, pos.z);
        return this;
    }

    /**
     * 位置の説明文を取得
     */
    public getPositionDescription(): string {
        const pos = this.getPosition();
        
        let description = `位置(${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)})`;
        
        if (pos.z > 200) description += " - 高位置";
        else if (pos.z > 100) description += " - 中位置";
        else if (pos.z > 50) description += " - 低位置";
        else description += " - 地表近く";
        
        return description;
    }
}
