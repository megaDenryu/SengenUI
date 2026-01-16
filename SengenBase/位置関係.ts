/**
 * 座標系の階層構造
 * 
 * 【座標系の関係】
 * 画面座標点 (ブラウザウィンドウ基準)
 *   ↓ to描画座標点(描画基準座標)
 * 描画座標点 (描画空間の原点基準 - Miroのようなキャンバス)
 *   ↓ to図形内座標点(図形内基準座標)
 * 図形内座標点 (図形内部の原点基準 - 入れ子可能)
 *   ↓ to図形内座標点(さらに内側の図形内基準座標)
 * 図形内座標点 (さらに深い階層...)
 * 
 * 【各座標点が属する座標系】
 * - 画面座標点: ブラウザウィンドウ座標系（暗黙的なグローバル座標系）
 * - 描画座標点: 描画基準座標（描画原点: 画面座標点）に属する
 * - 図形内座標点: 図形内基準座標（図形内原点: 描画座標点 or 図形内座標点）に属する
 * 
 * 【変換の流れ】
 * - 下位→上位: to画面座標点() で最上位の画面座標まで変換
 * - 上位→下位: to描画座標点() → to図形内座標点() で段階的に変換
 * 
 * 【基準座標の役割】
 * - 描画基準座標: 描画原点(画面座標点)を保持
 * - 図形内基準座標: 図形内原点(描画座標点 or 図形内座標点)を保持し、親座標系を遡れる
 */

import { divideVectorN, dotVectorN, minusVectorN, plusVectorN, timesVectorN, VectorN, VectorNと見なせる } from "./vector";
import { Px長さ, ビューポート座標値 } from "./css長さ単位";

export class Px2DVector implements VectorNと見なせる<Px2DVector>,Px2DVectorとみなせる<Px2DVector> {
    public readonly x: Px長さ;
    public readonly y: Px長さ;
    constructor(x: Px長さ, y: Px長さ) {
        this.x = x;
        this.y = y;
    }
    public static fromVectorN(vectorN: VectorNと見なせる<any>): Px2DVector {
        if (vectorN.vectorN.array.length < 2) {
            throw new Error("VectorNの次元が足りません。少なくとも2次元必要です。");
        }
        return new Px2DVector(new Px長さ(vectorN.vectorN.array[0]), new Px長さ(vectorN.vectorN.array[1]));
    }
    public static fromNumbers(x: number, y: number): Px2DVector {
        return new Px2DVector(new Px長さ(x), new Px長さ(y));
    }
    public static fromXYpair(xy: {x: number, y: number}): Px2DVector {
        return new Px2DVector(new Px長さ(xy.x), new Px長さ(xy.y));
    }
    public newFromVectorN(vectorN: VectorN): this {return Px2DVector.fromVectorN(vectorN) as this;}
    public get vectorN(): VectorN {return new VectorN([this.x.値, this.y.値]);}
    public get px2DVector(): Px2DVector {return this;}
    public newFromPx2DVector(px2DVector: Px2DVector) {return px2DVector;}

    public plus(v: Px2DVector): Px2DVector { return plusVectorN(this, v);}
    public minus(v: Px2DVector): Px2DVector { return minusVectorN(this, v); }
    public times(k: number): Px2DVector {return timesVectorN(this, k); }
    public divide(k: number): Px2DVector {return divideVectorN(this, k); }
    public dot(v: Px2DVector): number {return dotVectorN(this, v); }
    public equals(other: Px2DVector): boolean { return this.x.値 === other.x.値 && this.y.値 === other.y.値;}
    public toStr():string{
        return `(x: ${this.x.toStr()}, y: ${this.y.toStr()})`
    }
}

export interface Px2DVectorとみなせる<Self extends Px2DVectorとみなせる<Self>> {
    get px2DVector(): Px2DVector;
    newFromPx2DVector(px2DVector: Px2DVector): Self; //本来staticでいいが、メソッドチェーンを実現するためのテクニック
}

function test() {
    const a = new Px2DVector(new Px長さ(1), new Px長さ(2));
    const b = new Px2DVector(new Px長さ(3), new Px長さ(4));
    const c = a.newFromVectorN(b.vectorN);
}

export abstract class Canvas座標Base<Self extends Canvas座標Base<Self>> implements Px2DVectorとみなせる<Self>,VectorNと見なせる<Self> {
    public readonly px2DVector: Px2DVector;
    public constructor(px2DVector: Px2DVector) {
        this.px2DVector = px2DVector;
    }
    public get vectorN(): VectorN { return this.px2DVector.vectorN;}
    public abstract newFromVectorN(vectorN: VectorN): Self;
    public abstract newFromPx2DVector(px2DVector: Px2DVector): Self;
    public abstract plus(v: Px2DVector):Self
    public abstract minus(v: Px2DVector):Self
    public abstract minus(v: Self):Px2DVector
    public abstract times(k: number):Self
    public abstract divide(k: number):Self
    public abstract dot(v: Px2DVector):number
    public toStr():string{
        return this.px2DVector.toStr()
    }
}

export type 配置物座標点 = 描画座標点 | 図形内座標点;

// これはブラウザ画面中央を原点とするので実質なくても同じ。
class 画面基準座標 {
}

export class 画面座標点 extends Canvas座標Base<画面座標点> {
    public constructor(px2DVector: Px2DVector) {
        super(px2DVector);
    }
    
    public static fromVectorN(vectorN: VectorNと見なせる<any>): 画面座標点 {
        if (vectorN.vectorN.array.length < 2) {
            throw new Error("VectorNの次元が足りません。少なくとも2次元必要です。");
        }
        return new 画面座標点(new Px2DVector(new Px長さ(vectorN.vectorN.array[0]), new Px長さ(vectorN.vectorN.array[1])));
    }
    public static fromPx2DVector(px2DVector: Px2DVectorとみなせる<any>): 画面座標点 {
        return new 画面座標点(px2DVector.px2DVector);
    }

    public static fromNumbers(x: number, y: number): 画面座標点 {
        return new 画面座標点(new Px2DVector(new Px長さ(x), new Px長さ(y)));
    }

    /**
     * ビューポート座標値から画面座標点へ変換
     * ビューポート座標値は画面左上を原点とするため、そのまま画面座標点として扱える
     */
    public static fromビューポート座標値(ビューポート座標: ビューポート座標値): 画面座標点 {
        return 画面座標点.fromPx2DVector(ビューポート座標);
    }

    public toビューポート座標値(): ビューポート座標値 {
        // 画面座標点はビューポート座標値と同じ基準なので、そのままPx2DVectorを返す
        return new ビューポート座標値(this.px2DVector);
    }

    public newFromVectorN(vectorN: VectorN): 画面座標点 {return 画面座標点.fromVectorN(vectorN);}
    public newFromPx2DVector(px2DVector: Px2DVector): 画面座標点 {return 画面座標点.fromPx2DVector(px2DVector);}
    public plus(v: Px2DVector) { return new 画面座標点(this.px2DVector.plus(v)); }
    // minusのオーバーロード
    public minus(v: 画面座標点): Px2DVector;
    public minus(v: Px2DVector): 画面座標点;
    public minus(v: Px2DVector | 画面座標点): Px2DVector | 画面座標点 {
        if (v instanceof 画面座標点) {
            return this.px2DVector.minus(v.px2DVector);
        } else {
            return new 画面座標点(this.px2DVector.minus(v));
        }
    }
    public times(k: number) {return timesVectorN(this as 画面座標点, k); }
    public divide(k: number) {return divideVectorN(this as 画面座標点, k); }
    public dot(v: Px2DVector) {return dotVectorN(this, v); }

    // public to描画座標点(描画基準座標: 描画基準座標): 描画座標点 {
    //     const 相対vec = this.px2DVector.minus(描画基準座標.描画原点.px2DVector)
    //     return new 描画座標点(相対vec, 描画基準座標);
    // }

    public to描画座標点(描画基準座標: 描画基準座標): 描画座標点 {
        /**
         * 描画基準座標系でクリックした点が拡縮後座標系でどこにあるか、その点を求める。
         * 拡縮後座標系の中心o'とする。
         * 拡縮中心をsとする
         */
        const alpha = 描画基準座標.拡縮率;
        const c = this.px2DVector
        const s = 描画基準座標.拡縮中心点.px2DVector;
        const o_dash = s.times(1-alpha);
        const d = c.minus(o_dash).divide(alpha);
        return 描画座標点.fromPx2DVector(d,描画基準座標).minus(描画基準座標.描画原点.px2DVector);
    }

    public to図形内座標点(図形内基準座標: 図形内基準座標):図形内座標点 {
        return this.to描画座標点(図形内基準座標.描画基準座標).to図形内座標点(図形内基準座標)
    }
}



//Miroのようなキャンバスのようなものがあるときに使う
export class 描画基準座標 {
    public 描画原点: 画面座標点;
    public 拡縮率: number = 1.0;
    public 拡縮中心点: 画面座標点 = new 画面座標点(new Px2DVector(new Px長さ(0), new Px長さ(0)));

    constructor(描画原点: 画面座標点) {
        this.描画原点 = 描画原点;
    }
}

export class 描画座標点 extends Canvas座標Base<描画座標点> {
    public readonly 描画基準座標: 描画基準座標;
    public constructor(px2DVector: Px2DVector, 描画基準座標: 描画基準座標) {
        super(px2DVector);
        this.描画基準座標 = 描画基準座標;
    }
    public static fromVectorN(vectorN: VectorNと見なせる<any>, 描画基準座標: 描画基準座標): 描画座標点 {
        if (vectorN.vectorN.array.length < 2) {
            throw new Error("VectorNの次元が足りません。少なくとも2次元必要です。");
        }
        return new 描画座標点(new Px2DVector(new Px長さ(vectorN.vectorN.array[0]), new Px長さ(vectorN.vectorN.array[1])), 描画基準座標);
    }
    public static fromPx2DVector(px2DVector: Px2DVectorとみなせる<any>, 描画基準座標: 描画基準座標): 描画座標点 {
        return new 描画座標点(px2DVector.px2DVector, 描画基準座標);
    }
    public static fromNumbers(x: number, y: number, 描画基準座標: 描画基準座標): 描画座標点 {
        return new 描画座標点(new Px2DVector(new Px長さ(x), new Px長さ(y)), 描画基準座標);
    }

    public to描画座標点(): 描画座標点 {
        return this;
    }

    /** 拡縮率を取得 */
    public get 拡縮率(): number {
        return this.描画基準座標.拡縮率;
    }

    /**
     * ビューポート座標値から描画座標点へ変換
     * ビューポート座標値は画面左上を原点とするブラウザの表示領域座標
     * 描画座標点は描画基準座標の描画原点を基準とした座標
     */
    public static fromビューポート座標値(ビューポート座標: ビューポート座標値, 描画基準座標: 描画基準座標): 描画座標点 {
        // ビューポート座標値を画面座標点として扱い、描画座標点に変換
        const 画面座標 = 画面座標点.fromビューポート座標値(ビューポート座標);
        return 画面座標.to描画座標点(描画基準座標);
    }

    public toビューポート座標値(): ビューポート座標値 {
        return this.to画面座標点().toビューポート座標値();
    }

    public newFromVectorN(vectorN: VectorN): 描画座標点 {
        return 描画座標点.fromVectorN(vectorN, this.描画基準座標);
    }
    public newFromPx2DVector(px2DVector: Px2DVector): 描画座標点 {
        return 描画座標点.fromPx2DVector(px2DVector, this.描画基準座標);
    }

    public plus(v: Px2DVector): 描画座標点 { return new 描画座標点(this.px2DVector.plus(v), this.描画基準座標); }
    // minusのオーバーロード
    public minus(v: 描画座標点): Px2DVector;
    public minus(v: Px2DVector): 描画座標点;
    public minus(v: Px2DVector | 描画座標点): Px2DVector | 描画座標点 {
        if (v instanceof 描画座標点) {
            return this.px2DVector.minus(v.px2DVector);
        } else {
            return new 描画座標点(this.px2DVector.minus(v), this.描画基準座標);
        }
    }
    public times(k: number): 描画座標点 {return timesVectorN(this as 描画座標点, k); }
    public divide(k: number): 描画座標点 {return divideVectorN(this as 描画座標点, k); }
    public dot(v: Px2DVector): number {return dotVectorN(this, v); }

    public to画面座標点(): 画面座標点 {
        return 画面座標点.fromPx2DVector(this.px2DVector.plus(this.描画基準座標.描画原点.px2DVector))
    }

    public to画面座標点スケール考慮(): 画面座標点 {
        /**
         * 描画座標点から画面座標点への変換（拡縮率と拡縮中心を考慮）
         * to描画座標点の逆変換
         * 
         * 描画座標点dから画面座標点cへの変換式:
         * c = (d + o) - s) * α + s
         * ただし、
         * - d: 描画座標点（描画原点からの相対位置）
         * - o: 描画原点（画面座標系での位置）
         * - s: 拡縮中心点
         * - α: 拡縮率
         */
        const alpha = this.描画基準座標.拡縮率;
        const d = this.px2DVector;  // 描画座標点（描画原点からの相対）
        const o = this.描画基準座標.描画原点.px2DVector;  // 描画原点
        const s = this.描画基準座標.拡縮中心点.px2DVector;  // 拡縮中心
        
        // 描画原点を加算して画面座標系に変換し、拡縮中心を基準に拡縮適用
        const c = d.plus(o).minus(s).times(alpha).plus(s);
        return 画面座標点.fromPx2DVector(c);
    }

    public to図形内座標点(図形内座標: 図形内基準座標): 図形内座標点 {
        const 図形内原点の位置 = 図形内座標.描画基準座標からの相対位置();
        const 相対位置 = this.px2DVector.minus(図形内原点の位置);
        return 図形内座標点.fromPx2DVector(相対位置, 図形内座標);
    }
}

export interface I図形内基準座標 {
    図形内原点: Canvas座標Base<any>;
}

export interface 親座標系を持つ {
    親座標系: 描画基準座標 | 図形内基準座標;
}

export class 図形内基準座標 implements I図形内基準座標 {
    public readonly 図形内原点: 配置物座標点;
    public 拡縮率: number = 1.0;
    
    constructor(図形内原点: 配置物座標点) {
        this.図形内原点 = 図形内原点;
    }

    //親の座標系を遡ってrootである描画基準座標を返す。
    public get 描画基準座標(): 描画基準座標{
        if (this.図形内原点 instanceof 描画座標点) {return this.図形内原点.描画基準座標}
        else { return this.図形内原点.図形内基準座標.描画基準座標 }
    }
    //親の座標系の相対位置を経由して自分とrootの描画基準座標からの相対位置を算出する
    public 描画基準座標からの相対位置(): Px2DVector {
        if (this.図形内原点 instanceof 描画座標点) {return this.図形内原点.px2DVector;} 
        else {return this.図形内原点.px2DVector.plus(this.図形内原点.図形内基準座標.描画基準座標からの相対位置());}
    }
}

export class 図形内座標点 extends Canvas座標Base<図形内座標点> {
    public readonly 図形内基準座標: 図形内基準座標;
    constructor(px2DVector: Px2DVector, 図形内基準座標: 図形内基準座標) {
        super(px2DVector);
        this.図形内基準座標 = 図形内基準座標;
    }
    public static fromVectorN(vectorN: VectorNと見なせる<any>, 図形内座標: 図形内基準座標): 図形内座標点 {
        if (vectorN.vectorN.array.length < 2) {
            throw new Error("VectorNの次元が足りません。少なくとも2次元必要です。");
        }
        return new 図形内座標点(new Px2DVector(new Px長さ(vectorN.vectorN.array[0]), new Px長さ(vectorN.vectorN.array[1])), 図形内座標);
    }
    public static fromPx2DVector(px2DVector: Px2DVectorとみなせる<any>, 図形内座標: 図形内基準座標): 図形内座標点 {
        return new 図形内座標点(px2DVector.px2DVector, 図形内座標);
    }

    public newFromVectorN(vectorN: VectorN): 図形内座標点 {
        return 図形内座標点.fromVectorN(vectorN, this.図形内基準座標);
    }
    public newFromPx2DVector(px2DVector: Px2DVector): 図形内座標点 {
        return 図形内座標点.fromPx2DVector(px2DVector, this.図形内基準座標);
    }

    public plus(v: Px2DVector): 図形内座標点 { return new 図形内座標点(this.px2DVector.plus(v), this.図形内基準座標); }
    // minusのオーバーロード
    public minus(v: 図形内座標点): Px2DVector;
    public minus(v: Px2DVector): 図形内座標点;
    public minus(v: Px2DVector | 図形内座標点): Px2DVector | 図形内座標点 {
        if (v instanceof 図形内座標点) {
            return this.px2DVector.minus(v.px2DVector);
        } else {
            return new 図形内座標点(this.px2DVector.minus(v), this.図形内基準座標);
        }
    }
    public times(k: number): 図形内座標点 {return timesVectorN(this as 図形内座標点, k); }
    public divide(k: number): 図形内座標点 {return divideVectorN(this as 図形内座標点, k); }
    public dot(v: Px2DVector): number {return dotVectorN(this, v); }

    /** 拡縮率を取得（図形内基準座標または親の描画基準座標から） */
    public get 拡縮率(): number {
        // 図形内基準座標の拡縮率を使用（将来的に独自の拡縮率を持つ場合に備える）
        // ただし、現在は描画基準座標の拡縮率を継承
        return this.図形内基準座標.描画基準座標.拡縮率;
    }

    public to親座標点(): 描画座標点 | 図形内座標点 {
        if (this.図形内基準座標.図形内原点 instanceof 描画座標点) {
            return 描画座標点.fromPx2DVector(this.px2DVector.plus(this.図形内基準座標.図形内原点.px2DVector), this.図形内基準座標.図形内原点.描画基準座標);
        } else {
            return 図形内座標点.fromPx2DVector(this.px2DVector.plus(this.図形内基準座標.図形内原点.px2DVector), this.図形内基準座標.図形内原点.図形内基準座標)
        }
    }

    public to描画座標点(): 描画座標点 {
        const 親座標系座標点 = this.to親座標点();
        if (親座標系座標点 instanceof 描画座標点) {return 親座標系座標点}
        else { return 親座標系座標点.to描画座標点()}
    }

    public to画面座標点(): 画面座標点 {
        return this.to描画座標点().to画面座標点()
    }

    public toビューポート座標値(): ビューポート座標値 {
        return this.to画面座標点().toビューポート座標値();
    }
}



export interface 描画点を持つ者 {
    描画点: 描画座標点;
    描画位置を更新(画面座標点:画面座標点);
}

export interface I描画空間 {
    get 描画基準座標(): 描画基準座標;
}

export class 描画空間 {
    public 描画基準座標: 描画基準座標;
    public readonly 描画点を持つ者リスト: 描画点を持つ者[];

    constructor(描画基準座標: 描画基準座標) {
        this.描画基準座標 = 描画基準座標;
        this.描画点を持つ者リスト = [];
    }

    public add描画点を持つ者(描画点を持つ者: 描画点を持つ者) {
        this.描画点を持つ者リスト.push(描画点を持つ者);
    }

    public 拡縮(倍率: number, 拡縮中心: 画面座標点): void {
        this.描画基準座標 = new 描画基準座標(拡縮中心.plus(this.描画基準座標.描画原点.px2DVector.minus(拡縮中心.px2DVector).times(倍率)));
        for (const 描画点を持つ者 of this.描画点を持つ者リスト) {
            描画点を持つ者.描画点 = 描画点を持つ者.描画点.times(倍率);
        }
    }

    public 描画位置を更新(){
        for (const 描画点を持つ者 of this.描画点を持つ者リスト) {
            描画点を持つ者.描画位置を更新(描画点を持つ者.描画点.to画面座標点());
        }
    }

}

export interface 図形内座標点を持つ者 {
    図形内座標点: 図形内座標点;
    図形内座標を更新(): void;
}

export class 図形内空間 {
    public 図形内座標: 図形内基準座標;
    public readonly 図形内座標点を持つ者リスト: 図形内座標点を持つ者[];

    constructor(図形内座標: 図形内基準座標) {
        this.図形内座標 = 図形内座標;
        this.図形内座標点を持つ者リスト = [];
    }

    public add図形内座標点を持つ者(図形内座標点を持つ者: 図形内座標点を持つ者) {
        this.図形内座標点を持つ者リスト.push(図形内座標点を持つ者);
    }

    public 図形内位置を更新(){
        for (const 図形内座標点を持つ者 of this.図形内座標点を持つ者リスト) {
            図形内座標点を持つ者.図形内座標を更新();
        }
    }

}
