
export interface Tと全単射な物<T> {
    toT(): T;
}

/**
 * TypeScriptでは「自分自身またはサブクラス型」を表現したい場合、F-bounded polymorphism（自己型制約）を使うのが一般的です。
 * これは、クラスが自身の型を参照できるようにするためのテクニックです。
 * ここでは、`Self`がそのクラス自身を指すように定義しています。
 * # これがないとできないこと(なぜこうするのか？問題意識)
 * 単位付き実数 <- Px長さ <- windows用px長さ という順で継承してて作ったとする。そしてthis = Px長さとする。
 * この時、a: thisと推論されるaにwindows用px長さを代入しようとすると、tsではエラーになる。この制約は意味不明であるが、そういう仕様である。
 * なのでこれを乗り越えるには Self extends this というSelf形を作れれば
 * a: Self にはthis = Px長さだけでなく、windows用px長さも代入できるようになる。
 * そして Selfは無限継承列になることを意味するので、単位付き実数<Self extends 単位付き実数<Self>>という漸化式的な型パラメータになる
 * 
 */

export abstract class 単位付き実数<Self extends 単位付き実数<Self>> implements Tと全単射な物<number> {
    public readonly value: number;
    public abstract get 単位(): string;

    constructor(value: number) {
        this.value = value;
    }

    public toT(): number { return this.value;} 
    public plus(他の数: Self): this {return plus単位付き実数(this, 他の数);}
    public minus(他の数: Self): this {return minus単位付き実数(this, 他の数);}
    public multiply(倍率: number): this {return times単位付き実数(this, 倍率);}
    public divide(除数: number): this {return divide単位付き実数(this, 除数);}
    public per(他の数: Self): number {return per単位付き実数(this, 他の数);}
    public isEqual(他の数: Self): boolean {return isEqual単位付き実数(this, 他の数);}
    public isGreaterThan(他の数: Self): boolean {return isGreaterThan単位付き実数(this, 他の数);}
    public isLessThan(他の数: Self): boolean {return isLessThan単位付き実数(this, 他の数);}
    public isZero(): boolean {return isZero単位付き実数(this);}
    public isNotZero(): boolean {return isNotZero単位付き実数(this);}
    public isPositive(): boolean {return isPositive単位付き実数(this);}
    public isNegative(): boolean {return isNegative単位付き実数(this);}
    public isFinite(): boolean {return isFinite単位付き実数(this);}
    public isNaN(): boolean {return isNaN単位付き実数(this);}

}

export function plus単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self,T2 extends Self>(a: T1, b: T2): T1 {
    return new (a.constructor as { new(value: number): T1 })(a.value + b.value);
}
export function minus単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self,T2 extends Self>(a: T1, b: T2): T1 {
    return new (a.constructor as { new(value: number): T1 })(a.value - b.value);
}
export function times単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self>(a: T1, k:number): T1 {
    return new (a.constructor as { new(value: number): T1 })(a.value * k);
}
export function divide単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self>(a: T1, k:number): T1 {
    if (k === 0) {
        throw new Error("除数は0であってはいけません");
    }
    return new (a.constructor as { new(value: number): T1 })(a.value / k);
}
export function per単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self,T2 extends Self>(a: T1, b: T2): number {
    if (b.value === 0) {
        throw new Error("除数は0であってはいけません");
    }
    return a.value / b.value;
}
export function isEqual単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self,T2 extends Self>(a: T1, b: T2): boolean {
    return a.value === b.value && a.単位 === b.単位;
}
export function isGreaterThan単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self,T2 extends Self>(a: T1, b: T2): boolean {
    if (a.単位 !== b.単位) {
        throw new Error(`単位が一致しません: ${a.単位} と ${b.単位}`);
    }
    return a.value > b.value;
}
export function isLessThan単位付き実数<Self extends 単位付き実数<Self>,T1 extends Self,T2 extends Self>(a: T1, b: T2): boolean {
    if (a.単位 !== b.単位) {
        throw new Error(`単位が一致しません: ${a.単位} と ${b.単位}`);
    }
    return a.value < b.value;
}
export function isZero単位付き実数<Self extends 単位付き実数<Self>, T1 extends Self>(a: T1): boolean {
    return a.value === 0;
}
export function isNotZero単位付き実数<Self extends 単位付き実数<Self>, T1 extends Self>(a: T1): boolean {
    return a.value !== 0;
}
export function isPositive単位付き実数<Self extends 単位付き実数<Self>, T1 extends Self>(a: T1): boolean {
    return a.value > 0;
}
export function isNegative単位付き実数<Self extends 単位付き実数<Self>, T1 extends Self>(a: T1): boolean {
    return a.value < 0;
}
export function isFinite単位付き実数<Self extends 単位付き実数<Self>, T1 extends Self>(a: T1): boolean {
    return Number.isFinite(a.value);
}
export function isNaN単位付き実数<Self extends 単位付き実数<Self>, T1 extends Self>(a: T1): boolean {
    return Number.isNaN(a.value);
}