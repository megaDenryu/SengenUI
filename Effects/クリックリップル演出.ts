/**
 * クリック位置から円形の波紋が広がる、画面全体の入力フィードバック。
 *
 * Why: ボタンだけでなくパーツスイッチやキャンバスなど、クリック可能な場所すべてで
 * 入力を受け付けた感触を返す。document購読はSengenUI内部に閉じる。
 */

import { div } from '../LV1UIComponents/LV1CreationFunctions';
import { DivC } from '../LV1UIComponents/DivComponent';


export interface クリックリップル演出設定 {
    readonly 色候補: ReadonlyArray<string>;
    readonly 最大半径: number;
    readonly 継続ミリ秒: number;
    readonly 強さ: number;
}

const 既定設定: クリックリップル演出設定 = {
    色候補: ["rgba(255, 255, 255, 0.8)"],
    最大半径: 34,
    継続ミリ秒: 420,
    強さ: 1,
};

export class クリックリップル演出 {
    private readonly _レイヤー: DivC;
    private readonly _設定: クリックリップル演出設定;
    private _動作中 = false;

    // Why: removeEventListenerで同一参照を渡すためフィールドに束縛する
    private readonly _onPointerDown = (イベント: PointerEvent): void => {
        this._波紋を出す(イベント.clientX, イベント.clientY);
    };

    constructor(設定: Partial<クリックリップル演出設定> = {}) {
        this._設定 = { ...既定設定, ...設定 };
        // Why: 全画面の最前面に描くが、pointerEvents:noneで本来のUI操作は素通しする
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
        // Why: capture指定でUI側のstopPropagationに影響されず全クリックを拾う
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
            border: `${1 + this._設定.強さ}px solid ${色}`,
            boxShadow: `0 0 ${8 * this._設定.強さ}px ${色}`,
            boxSizing: "border-box",
        });
        this._レイヤー.child(波紋);

        const アニメーション = 波紋.dom.element.animate(
            [
                { transform: "scale(0.15)", opacity: 1 },
                { transform: "scale(1)", opacity: 0 },
            ],
            { duration: this._設定.継続ミリ秒, easing: "cubic-bezier(0.1, 0.7, 0.25, 1)" },
        );
        アニメーション.finished
            .then(() => 波紋.delete())
            .catch(() => 波紋.delete());
    }
}
