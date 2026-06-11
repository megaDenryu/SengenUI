/**
 * ボタン押下点から円形の波紋が広がるゲーム的演出（マテリアルデザイン風）。
 *
 * Why: アプリ中の全ボタンに個別配線せず、documentのpointerdownを1箇所で捕捉して
 * 押下対象がボタンのときだけ波紋を出す。グローバルイベントの購読は
 * PointerWife等と同様にSengenUI内部に閉じる。
 */

import { div } from '../LV1UIComponents/LV1CreationFunctions';
import { DivC } from '../LV1UIComponents/DivComponent';


export interface ボタンリップル演出設定 {
    readonly 色: string;
    readonly 最大半径: number;
}

const 既定設定: ボタンリップル演出設定 = {
    色: "rgba(255, 255, 255, 0.65)",
    最大半径: 28,
};

export class ボタンリップル演出 {
    private readonly _レイヤー: DivC;
    private readonly _設定: ボタンリップル演出設定;
    private _動作中 = false;

    private readonly _onPointerDown = (e: PointerEvent): void => {
        if (!(e.target instanceof Element)) return;
        // Why: ボタン的なUI(button要素)に限定する。何でも波紋を出すとうるさい
        if (e.target.closest("button") === null) return;
        this._波紋を出す(e.clientX, e.clientY);
    };

    constructor(設定: Partial<ボタンリップル演出設定> = {}) {
        this._設定 = { ...既定設定, ...設定 };
        this._レイヤー = div({}).setStyleCSS({
            position: "fixed",
            inset: "0",
            pointerEvents: "none",
            zIndex: "99998",
            overflow: "hidden",
        });
    }

    開始する(): this {
        if (this._動作中) return this;
        this._動作中 = true;
        this._レイヤー.bodyにマウントする();
        document.addEventListener("pointerdown", this._onPointerDown, true);
        return this;
    }

    停止する(): void {
        if (!this._動作中) return;
        this._動作中 = false;
        document.removeEventListener("pointerdown", this._onPointerDown, true);
        this._レイヤー.delete();
    }

    private _波紋を出す(x: number, y: number): void {
        const 直径 = this._設定.最大半径 * 2;
        const 波紋 = div({}).setStyleCSS({
            position: "absolute",
            left: `${x - this._設定.最大半径}px`,
            top: `${y - this._設定.最大半径}px`,
            width: `${直径}px`,
            height: `${直径}px`,
            borderRadius: "50%",
            border: `2px solid ${this._設定.色}`,
            boxSizing: "border-box",
        });
        this._レイヤー.child(波紋);

        const アニメーション = 波紋.dom.element.animate(
            [
                { transform: "scale(0.2)", opacity: 1 },
                { transform: "scale(1)", opacity: 0 },
            ],
            { duration: 380, easing: "ease-out" },
        );
        アニメーション.finished
            .then(() => 波紋.delete())
            .catch(() => 波紋.delete());
    }
}
