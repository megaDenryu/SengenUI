
export class VectorN implements VectorNと見なせる<VectorN> {
    public readonly array: number[];

    constructor(array: number[]) {
        this.array = array;
    }

    public get vectorN(): VectorN {
        return this;
    }

    /**
     * 標準基底から標準基底への自明な線形写像をする。
     * 例えば
     * 自分が(1,2,3,4)で2次元が指定されたら(1,2)を返し射影する。
     * 6次元が指定されたら(1,2,3,4,0,0)を返して埋め込む。
     */
    public 埋め込みor射影(次元数: number): VectorN {
        if (次元数 <= 0) {
            throw new Error("次元数は1以上である必要があります");
        }
        
        if (次元数 <= this.array.length) {
            // 指定次元数が現在の次元数以下の場合は切り詰める
            return new VectorN(this.array.slice(0, 次元数));
        } else {
            // 指定次元数が現在の次元数より大きい場合は0で埋める
            const paddedArray = [...this.array, ...Array(次元数 - this.array.length).fill(0)];
            return new VectorN(paddedArray);
        }
    }

    public plus(v: VectorN): VectorN { return plusVectorN(this, v);}
    public minus(v: VectorN): VectorN { return minusVectorN(this, v); }
    public times(k: number): VectorN {return timesVectorN(this, k); }
    public divide(k: number): VectorN {return divideVectorN(this, k); }
    public dot(v: VectorN): number {return dotVectorN(this, v); }

    public newFromVectorN(vectorN: VectorN): this {return vectorN as this;}

    public op(other: this): this {
        // 演算の内容は具体的なクラスに依存するため、ここでは何もしない
        return new VectorN([0,0]) as this;
    }
}

function test() {
    const a = new VectorN([1, 2, 3]);
    const b = new VectorN([4, 5, 6]);
    const c = a.plus(b);
}

export interface VectorNと見なせる<Self extends VectorNと見なせる<Self>> {
    vectorN: VectorN;
    newFromVectorN(vectorN: VectorN): Self; //本来staticでいいが、メソッドチェーンを実現するためのテクニック
}

// ベクトルの足し算引き算外積など、ベクトルとベクトルでベクトルになる演算
export function VxVtoV型演算デコレート<T1 extends VectorNと見なせる<T1>,T2 extends VectorNと見なせる<T2>>(a: T1, b: T2, op: (x: VectorN, y: VectorN) => VectorN): T1 {
    return a.newFromVectorN(op(a.vectorN, b.vectorN));
}

// ベクトルの内積など、ベクトルとベクトルで数になる演算
export function VxVtoK型演算デコレート<T extends VectorNと見なせる<T>>(a: T, b: T, op: (x: VectorN, y: VectorN) => number): number {
    return op(a.vectorN, b.vectorN);
}

// ベクトルと実数の掛け算などベクトルとスカラーでベクトルになる演算
export function VxKtoV型演算デコレート<T extends VectorNと見なせる<T>>(a: T, k:number, op: (x: VectorN, k: number) => VectorN): T {
    return a.newFromVectorN(op(a.vectorN, k));
}

// ベクトルの次元が異なる場合、短い方を0で埋める
export function padVectors(a: number[], b: number[]): [number[], number[]] {
    const maxLen = Math.max(a.length, b.length);
    const paddedA = [...a, ...Array(maxLen - a.length).fill(0)];
    const paddedB = [...b, ...Array(maxLen - b.length).fill(0)];
    return [paddedA, paddedB];
}

export function plusVectorN<T extends VectorNと見なせる<T>>(a: T, b: T): T {
    const [paddedA, paddedB] = padVectors(a.vectorN.array, b.vectorN.array);
    return a.newFromVectorN(new VectorN(paddedA.map((x, i) => x + paddedB[i])));
}

export function minusVectorN<T extends VectorNと見なせる<T>>(a: T, b: T): T {
    const [paddedA, paddedB] = padVectors(a.vectorN.array, b.vectorN.array);
    return a.newFromVectorN(new VectorN(paddedA.map((x, i) => x - paddedB[i])));
}

export function timesVectorN<T extends VectorNと見なせる<T>>(a: T, k:number): T {
    return a.newFromVectorN(new VectorN(a.vectorN.array.map(x => x * k)));
}

export function divideVectorN<T extends VectorNと見なせる<T>>(a: T, k:number): T {
    if (k === 0) {
        throw new Error("除数は0であってはいけません");
    }
    return a.newFromVectorN(new VectorN(a.vectorN.array.map(x => x / k)));
}

export function dotVectorN(a: VectorNと見なせる<any>, b: VectorNと見なせる<any>): number {
    const [paddedA, paddedB] = padVectors(a.vectorN.array, b.vectorN.array);
    return paddedA.reduce((sum, x, i) => sum + x * paddedB[i], 0);
}
