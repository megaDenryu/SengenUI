/**
 * 文字入力時にキャレット付近へ小さな光粒を散らす演出。
 */

import { div } from '../LV1UIComponents/LV1CreationFunctions';
import { DivC } from '../LV1UIComponents/DivComponent';
import { キャレット画面座標を取得する, 文字入力対象か } from './文字入力演出共通';


export interface 入力キラキラ演出設定 {
    readonly 色候補: ReadonlyArray<string>;
    readonly 粒数: number;
    readonly 強さ: number;
}

const 既定設定: 入力キラキラ演出設定 = {
    色候補: ["#fff6c8", "#73e7ff", "#ffffff"],
    粒数: 4,
    強さ: 1,
};

const 星形クリップパス = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

export class 入力キラキラ演出 {
    private readonly _レイヤー: DivC;
    private readonly _設定: 入力キラキラ演出設定;
    private _動作中 = false;

    private readonly _onInput = (イベント: Event): void => {
        if (!文字入力対象か(イベント.target)) return;
        const 座標 = キャレット画面座標を取得する(イベント.target);
        for (let i = 0; i < Math.ceil(this._設定.粒数 * this._設定.強さ); i++) {
            this._粒を飛ばす(座標.x, 座標.y);
        }
    };

    constructor(設定: Partial<入力キラキラ演出設定> = {}) {
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

    private _粒を飛ばす(x: number, y: number): void {
        const 色 = this._設定.色候補[Math.floor(Math.random() * this._設定.色候補.length)];
        const サイズ = (3 + Math.random() * 4) * Math.max(0.4, this._設定.強さ);
        const 横移動 = (Math.random() - 0.5) * 24 * this._設定.強さ;
        const 縦移動 = (-6 - Math.random() * 20) * this._設定.強さ;
        const 粒 = div({}).setStyleCSS({
            position: "absolute",
            left: `${x - サイズ / 2}px`,
            top: `${y - サイズ / 2}px`,
            width: `${サイズ}px`,
            height: `${サイズ}px`,
            backgroundColor: 色,
            clipPath: 星形クリップパス,
            filter: `drop-shadow(0 0 3px ${色})`,
        });
        this._レイヤー.child(粒);

        const animation = 粒.dom.element.animate(
            [
                { transform: "translate(0, 0) scale(0.7)", opacity: 0.9 },
                { transform: `translate(${横移動}px, ${縦移動}px) scale(0)`, opacity: 0 },
            ],
            { duration: 300 + Math.random() * 220, easing: "ease-out" },
        );
        animation.finished.then(() => 粒.delete()).catch(() => 粒.delete());
    }
}
