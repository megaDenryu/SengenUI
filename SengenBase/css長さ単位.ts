
import { 単位付き実数 } from "./数と全単射な物";
import { Px2DVector, Px2DVectorとみなせる } from "./位置関係";


export abstract class Css長さ単位<Self extends Css長さ単位<Self>> extends 単位付き実数<Css長さ単位<Self>>{
    public constructor(値: number) {
        super(値);
    }
    public abstract toCssValue(): string;
    public abstract toStr(): string;
}

// 文字列からCSS長さ単位を作成するユーティリティ関数
export function CssLengthFromString(文字列: string): Px長さ | Percent長さ | Vw長さ | Vh長さ {
    const 単位 = 文字列.slice(-2);
    const 値 = parseFloat(文字列.slice(0, -2));
    
    switch (単位) {
        case "px":return new Px長さ(値);
        case "%":return new Percent長さ(値);
        case "vw":return new Vw長さ(値);
        case "vh":return new Vh長さ(値);
        default:throw new Error(`不正なCSS長さ単位: ${文字列}`);
    }
}

// コンテキスト(ビューポート)の寸法（幅と高さ）。ビューポート座標ではなくサイズの型。
export interface コンテキスト {
    width: Px長さ;
    height: Px長さ;
}

export interface 要素座標 {
    readonly x: Px長さ;
    readonly y: Px長さ;
}

export interface I座標系付き要素座標<系 extends string> extends 要素座標,Px2DVectorとみなせる<I座標系付き要素座標<系>> {
    readonly 座標系: 系;
}
export type Iビューポート座標 = I座標系付き要素座標<'viewport'>;
export type Iドキュメント座標 = I座標系付き要素座標<'document'>;
export type Iオフセット座標 = I座標系付き要素座標<'offset'>;

export abstract class 座標系付き要素座標Base<系 extends string, Self extends 座標系付き要素座標Base<系, Self>> implements I座標系付き要素座標<系> {

    public abstract readonly 座標系: 系;
    public readonly px2DVector: Px2DVector;
    public get x(): Px長さ {return this.px2DVector.x;}
    public get y(): Px長さ {return this.px2DVector.y;}
    public constructor(px2DVector: Px2DVector) {
        this.px2DVector = px2DVector;
    }
    public abstract newFromPx2DVector(px2DVector: Px2DVector): Self;

    public equals(other: I座標系付き要素座標<系>): boolean {
        return this.px2DVector.equals(other.px2DVector);
    }

    
    public plus(other: Self|Px2DVector): Self {return this.newFromPx2DVector(this.px2DVector.plus(other.px2DVector));}
    public minus(other: Self): Self {return this.newFromPx2DVector(this.px2DVector.minus(other.px2DVector));}
    public times(k: number): Self {return this.newFromPx2DVector(this.px2DVector.times(k));}
    public divide(k: number): Self {return this.newFromPx2DVector(this.px2DVector.divide(k));}
    public dot(other: Self): number {return this.px2DVector.dot(other.px2DVector);}

}

/**
 * ビューポート（ブラウザの表示領域）を原点とした現在位置。
 * - ビューポートとは、スクロールを考慮した“いま画面に映っている領域”のことです。
 * - CSS で `position: absolute / fixed / relative` いずれであっても、最終的に描画された位置が反映されます。
 * - スクロールすると値が変化しますが、スクロール量そのものは加算されません（常に画面左上を原点とした座標）。
 */
export class ビューポート座標値 extends 座標系付き要素座標Base<'viewport', ビューポート座標値> implements Iビューポート座標 {
    public readonly 座標系 = 'viewport';
    public constructor(px2DVector: Px2DVector) {
        super(px2DVector);
    }
    public newFromPx2DVector(px2DVector: Px2DVector): ビューポート座標値{
        return new ビューポート座標値(px2DVector);
    }

    public static fromPx長さ(x: Px長さ, y: Px長さ): ビューポート座標値 {
        return new ビューポート座標値(new Px2DVector(x, y));
    }

    public static fromNumbers(x: number, y: number): ビューポート座標値 {
        return ビューポート座標値.fromPx長さ(new Px長さ(x),new Px長さ(y));
    }

    public toDocument(): ドキュメント座標値 {
        return ドキュメント座標値.fromPx長さ(
            new Px長さ(this.x.value + window.scrollX),
            new Px長さ(this.y.value + window.scrollY)
        );
    }
}


/**
 * ページ全体（ドキュメント）左上を原点とした座標。
 * - ビューポート座標にスクロール量（`window.scrollX/Y`）を加算した値です。
 * - `position: absolute` などで CSS 上の left/top を確認したい場合はこちらが把握しやすいです。
 */
export class ドキュメント座標値 extends 座標系付き要素座標Base<'document', ドキュメント座標値> implements Iドキュメント座標 {
    public readonly 座標系 = 'document';
    public constructor(px2DVector: Px2DVector) {
        super(px2DVector);
    }
    public newFromPx2DVector(px2DVector: Px2DVector): ドキュメント座標値{
        return new ドキュメント座標値(px2DVector);
    }

    public static fromPx長さ(x: Px長さ, y: Px長さ): ドキュメント座標値 {
        return new ドキュメント座標値(new Px2DVector(x, y));
    }

    public static fromNumbers(x: number, y: number): ドキュメント座標値 {
        return new ドキュメント座標値(
            new Px2DVector(new Px長さ(x), new Px長さ(y))
        );
    }

    public toViewport(): ビューポート座標値 {
        return ビューポート座標値.fromPx長さ(
            new Px長さ(this.x.value - window.scrollX),
            new Px長さ(this.y.value - window.scrollY)
        );
    }
}

export class オフセット座標値 extends 座標系付き要素座標Base<'offset', オフセット座標値> implements Iオフセット座標 {
    public readonly 座標系 = 'offset';
    public constructor(px2DVector: Px2DVector) {
        super(px2DVector);
    }

    public newFromPx2DVector(px2DVector: Px2DVector): オフセット座標値{
        return new オフセット座標値(px2DVector);
    }

    public static fromPx長さ(x: Px長さ, y: Px長さ): オフセット座標値 {
        return new オフセット座標値(new Px2DVector(x, y));
    }

    public static fromNumbers(x: number, y: number): オフセット座標値 {
        return new オフセット座標値(new Px2DVector(new Px長さ(x), new Px長さ(y)));
    }

    public toDocument(target: HTMLElement): ドキュメント座標値 {
        const rect = target.getBoundingClientRect();
        return ドキュメント座標値.fromPx長さ(
            new Px長さ(rect.left + window.scrollX + this.x.value),
            new Px長さ(rect.top + window.scrollY + this.y.value)
        );
    }
}


// ビューポートの縦横のサイズ(寸法)を取得するユーティリティ関数
function getViewportSize(): コンテキスト {
    // if (typeof window === 'undefined') {
    //     throw new Error("この関数はブラウザ環境でのみ実行できます");
    // }
    return {
        width: new Px長さ(window.innerWidth),
        height: new Px長さ(window.innerHeight)
    };
}

export class Px長さ extends Css長さ単位<Px長さ> {
    public readonly 単位: string = "px";
    public constructor(値: number) {
        if (!Number.isFinite(値)) throw new Error("Px長さの値は有限でなければなりません。");
        if (Number.isNaN(値)) throw new Error("Px長さの値がNaNです。");
        super(値);
    }
    public get 値(): number {return this.value;}
    public toStr(): string {return `${this.value}px`;}
    public toCssValue(): string { return this.toStr();}
    public toPercent(親要素のサイズ: Px長さ): Percent長さ {
        const 値 = (this.value / 親要素のサイズ.value) * 100;
        return new Percent長さ(Math.round(値 * 100) / 100);
    }
    public toVw(): Vw長さ {
        const width = getViewportSize().width;
        return new Vw長さ(Math.round(this.per(width) * 100))
    }
    public toVh(): Vh長さ {
        const height = getViewportSize().height;
        return new Vh長さ(Math.round(this.per(height) * 100));
    }
}

function test() {
    const px = new Px長さ(100);
    const px2 = new Px長さ(200);
    const b = px.per(px2);

    
    const percent = new Percent長さ(50);
    const vw = new Vw長さ(10);
    const vh = new Vh長さ(20);
    const a = px.plus(px);
    // const b = percent.plus(px); // 型違いはエラーになる
    const c = vw.plus(vw);
    const d = vh.plus(vh);
}


export class Percent長さ extends Css長さ単位<Percent長さ> {
    public readonly 単位: string = "%";
    public constructor(値: number) {
        if (!Number.isFinite(値)) throw new Error("Percent長さの値は有限でなければなりません。");
        if (Number.isNaN(値)) throw new Error("Percent長さの値がNaNです。");
        /**
         * CSSの%（パーセント）値は、100%を超える値も負の値も指定可能です。
            例：width: 150%; や left: -20%; などは有効です。
            100%を超えると親要素より大きくなり、負の値は左や上にずらすなどの効果になります。
            したがって、厳密に「0以上100以下」に制限する必要はありません。
         */
        super(値);
    }
    public get 値(): number {return this.value;}
    public toStr(): string {return `${this.value}%`;}
    public toCssValue(): string { return this.toStr();}
    
    public toPx(親要素のサイズ: Px長さ): Px長さ {
        const 値 = (this.value / 100) * 親要素のサイズ.value;
        return new Px長さ(Math.round(値 * 100) / 100);
    }
    public toVw(親要素のサイズ: Px長さ): Vw長さ {
        const px = this.toPx(親要素のサイズ);
        return px.toVw();
    }
    public toVh(親要素のサイズ: Px長さ): Vh長さ {
        const px = this.toPx(親要素のサイズ);
        return px.toVh();
    }
}

export class Vw長さ extends Css長さ単位<Vw長さ> {
    public readonly 単位: string = "vw";
    public constructor(値: number) {
        if (!Number.isFinite(値)) throw new Error("Vw長さの値は有限でなければなりません。");
        if (Number.isNaN(値)) throw new Error("Vw長さの値がNaNです。");
        super(値);
    }
    public get 値(): number {return this.value;}
    public toStr(): string {return `${this.value}vw`;}
    public toCssValue(): string { return this.toStr();}

    public toPx(): Px長さ {
        const ビューポート = getViewportSize();
        return ビューポート.width.multiply(this.value / 100);
    }
    public toPercent(親要素のサイズ: Px長さ): Percent長さ {
        const px = this.toPx();
        return px.toPercent(親要素のサイズ);
    }
    public toVh(): Vh長さ {
        const px = this.toPx();
        return px.toVh();
    }
}

export class Vh長さ extends Css長さ単位<Vh長さ> {
    public readonly 単位: string = "vh";
    public constructor(値: number) {
        if (!Number.isFinite(値)) throw new Error("Vh長さの値は有限でなければなりません。");
        if (Number.isNaN(値)) throw new Error("Vh長さの値がNaNです。");
        super(値);
    }
    public get 値(): number {return this.value;}
    public toStr(): string {return `${this.value}vh`;}
    public toCssValue(): string { return this.toStr();}

    public toPx(): Px長さ {
        const ビューポート = getViewportSize();
        return ビューポート.height.multiply(this.value / 100);
    }
}


// CSSの角度単位：度（degree）
export class Degree角度 {
    public readonly 単位: string = "deg";
    public constructor(public readonly value: number) {
        if (!Number.isFinite(value)) throw new Error("Degree角度の値は有限でなければなりません。");
        if (Number.isNaN(value)) throw new Error("Degree角度の値がNaNです。");
    }
    public get 値(): number {return this.value;}
    public toString(): string {return `${this.value}deg`;}
    public toCssValue(): string { return this.toString();}
}



