/**
 * 文字が入力された位置から、小さな波紋が広がる入力フィードバック。
 */

import { div } from '../LV1UIComponents/LV1CreationFunctions';
import { DivC } from '../LV1UIComponents/DivComponent';
import { キャレット画面座標を取得する, 文字入力対象か } from './文字入力演出共通';


export interface 入力リップル演出設定 {
    readonly 色候補: ReadonlyArray<string>;
    readonly 最大半径: number;
    readonly 強さ: number;
}

const 既定設定: 入力リップル演出設定 = {
    色候補: ["#73e7ff"],
    最大半径: 18,
    強さ: 1,
};

export class 入力リップル演出 {
    private readonly _レイヤー: DivC;
    private readonly _設定: 入力リップル演出設定;
    private _動作中 = false;

    private readonly _onInput = (イベント: Event): void => {
        if (!文字入力対象か(イベント.target)) return;
        const 座標 = キャレット画面座標を取得する(イベント.target);
        this._波紋を出す(座標.x, 座標.y);
    };

    constructor(設定: Partial<入力リップル演出設定> = {}) {
        this._設定 = { ...既定設定, ...設定 };
        this._レイヤー = div({}).setStyleCSS({
            position: "fixed",
            inset: "0",
            pointerEvents: "none",
            zIndex: "99999",
            overflow: "hidden",
        });
    }

    開始する(): this {
        if (this._動作中) return this;
        this._動作中 = true;
        this._レイヤー.bodyにマウントする();
        document.addEventListener("input", this._onInput, true);
        document.addEventListener("compositionupdate", this._onInput, true);
        document.addEventListener("compositionend", this._onInput, true);
        return this;
    }

    停止する(): void {
        if (!this._動作中) return;
        this._動作中 = false;
        document.removeEventListener("input", this._onInput, true);
        document.removeEventListener("compositionupdate", this._onInput, true);
        document.removeEventListener("compositionend", this._onInput, true);
        this._レイヤー.delete();
    }

    private _波紋を出す(x: number, y: number): void {
        const 色 = this._設定.色候補[Math.floor(Math.random() * this._設定.色候補.length)];
        const 半径 = this._設定.最大半径 * this._設定.強さ;
        const 直径 = 半径 * 2;
        const 波紋 = div({}).setStyleCSS({
            position: "absolute",
            left: `${x - 半径}px`,
            top: `${y - 半径}px`,
            width: `${直径}px`,
            height: `${直径}px`,
            borderRadius: "50%",
            border: `${1 + this._設定.強さ * 0.5}px solid ${色}`,
            boxShadow: `0 0 ${6 * this._設定.強さ}px ${色}`,
            boxSizing: "border-box",
        });
        this._レイヤー.child(波紋);

        const animation = 波紋.dom.element.animate(
            [
                { transform: "scale(0.15)", opacity: 0.9 },
                { transform: "scale(1)", opacity: 0 },
            ],
            { duration: 320, easing: "ease-out" },
        );
        animation.finished.then(() => 波紋.delete()).catch(() => 波紋.delete());
    }
}
