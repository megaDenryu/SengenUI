/**
 * マウスカーソルの軌跡に小さな光の粒が尾を引くゲーム的演出。
 *
 * Why: document全体のpointermoveを捕捉するため、PointerWife等と同様に
 * グローバルイベントの購読はSengenUI内部に閉じる。
 */

import { div } from '../LV1UIComponents/LV1CreationFunctions';
import { DivC } from '../LV1UIComponents/DivComponent';


export interface マウストレイル演出設定 {
    /** 粒を生成する最小移動距離(px)。小さいほど密な尾になる */
    readonly 生成間隔距離: number;
    readonly 色候補: ReadonlyArray<string>;
    readonly 強さ: number;
}

const 既定設定: マウストレイル演出設定 = {
    生成間隔距離: 14,
    色候補: ["#a8e6ff", "#d6b3ff", "#ffffff"],
    強さ: 1,
};

export class マウストレイル演出 {
    private readonly _レイヤー: DivC;
    private readonly _設定: マウストレイル演出設定;
    private _前回X = 0;
    private _前回Y = 0;
    private _動作中 = false;

    private readonly _onPointerMove = (e: PointerEvent): void => {
        const 距離 = Math.hypot(e.clientX - this._前回X, e.clientY - this._前回Y);
        if (距離 < this._設定.生成間隔距離 / Math.max(0.25, this._設定.強さ)) return;
        this._前回X = e.clientX;
        this._前回Y = e.clientY;
        this._粒を残す(e.clientX, e.clientY);
    };

    constructor(設定: Partial<マウストレイル演出設定> = {}) {
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
        document.addEventListener("pointermove", this._onPointerMove, true);
        return this;
    }

    停止する(): void {
        if (!this._動作中) return;
        this._動作中 = false;
        document.removeEventListener("pointermove", this._onPointerMove, true);
        this._レイヤー.delete();
    }

    private _粒を残す(x: number, y: number): void {
        const { 色候補 } = this._設定;
        const 色 = 色候補[Math.floor(Math.random() * 色候補.length)];
        const サイズ = (3 + Math.random() * 4) * Math.max(0.4, this._設定.強さ);

        const 粒 = div({}).setStyleCSS({
            position: "absolute",
            left: `${x - サイズ / 2}px`,
            top: `${y - サイズ / 2}px`,
            width: `${サイズ}px`,
            height: `${サイズ}px`,
            borderRadius: "50%",
            backgroundColor: 色,
            filter: `drop-shadow(0 0 3px ${色})`,
        });
        this._レイヤー.child(粒);

        // Why: その場でゆっくり落ちながら縮んで消える。軌跡として「尾」に見える
        const アニメーション = 粒.dom.element.animate(
            [
                { transform: "translate(0, 0) scale(1)", opacity: 0.9 },
                { transform: `translate(0, ${6 + Math.random() * 10}px) scale(0)`, opacity: 0 },
            ],
            { duration: 350 + Math.random() * 250, easing: "ease-out" },
        );
        アニメーション.finished
            .then(() => 粒.delete())
            .catch(() => 粒.delete());
    }
}
