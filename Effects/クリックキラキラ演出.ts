/**
 * クリック位置から光の粒(4芒星)が弾けて散るゲーム的演出。
 *
 * Why: document全体のpointerdownを捕捉する必要があり、グローバルイベントを扱う
 * コードはSengenUI内部(PointerWife等と同様)に閉じる。アプリ側は
 * new クリックキラキラ演出().開始する() で有効化するだけでよい。
 */

import { div } from '../LV1UIComponents/LV1CreationFunctions';
import { DivC } from '../LV1UIComponents/DivComponent';


export interface クリックキラキラ演出設定 {
    /** 1クリックあたりの粒の数 */
    readonly 粒数: number;
    /** 粒の色の候補。粒ごとにランダムに選ばれる */
    readonly 色候補: ReadonlyArray<string>;
}

const 既定設定: クリックキラキラ演出設定 = {
    粒数: 10,
    色候補: ["#fff6c8", "#ffe066", "#a8e6ff", "#ffffff", "#d6b3ff"],
};

// Why: キラキラの光芒(4芒星)をclip-pathで表現する
const 星形クリップパス = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

export class クリックキラキラ演出 {
    private readonly _レイヤー: DivC;
    private readonly _設定: クリックキラキラ演出設定;
    // Why: removeEventListenerで同一参照を渡すためフィールドに束縛する
    private readonly _onPointerDown = (e: PointerEvent): void => {
        this._粒を散らす(e.clientX, e.clientY);
    };

    constructor(設定: Partial<クリックキラキラ演出設定> = {}) {
        this._設定 = { ...既定設定, ...設定 };
        // Why: 全画面の最前面レイヤーに粒を描く。pointerEvents:noneでUI操作は素通しする
        this._レイヤー = div({}).setStyleCSS({
            position: "fixed",
            inset: "0",
            pointerEvents: "none",
            zIndex: "99999",
            overflow: "hidden",
        });
    }

    開始する(): this {
        this._レイヤー.bodyにマウントする();
        // Why: capture指定でUI側のstopPropagationに影響されず全クリックを拾う
        document.addEventListener("pointerdown", this._onPointerDown, true);
        return this;
    }

    停止する(): void {
        document.removeEventListener("pointerdown", this._onPointerDown, true);
        this._レイヤー.delete();
    }

    private _粒を散らす(x: number, y: number): void {
        const { 粒数, 色候補 } = this._設定;
        for (let i = 0; i < 粒数; i++) {
            const 色 = 色候補[Math.floor(Math.random() * 色候補.length)];
            this._粒を飛ばす(x, y, 色);
        }
    }

    private _粒を飛ばす(x: number, y: number, 色: string): void {
        const サイズ = 5 + Math.random() * 8;
        const 角度 = Math.random() * Math.PI * 2;
        const 距離 = 24 + Math.random() * 56;
        const 継続ミリ秒 = 450 + Math.random() * 350;
        const 回転角 = (Math.random() - 0.5) * 360;

        const 粒 = div({}).setStyleCSS({
            position: "absolute",
            left: `${x - サイズ / 2}px`,
            top: `${y - サイズ / 2}px`,
            width: `${サイズ}px`,
            height: `${サイズ}px`,
            backgroundColor: 色,
            clipPath: 星形クリップパス,
            filter: `drop-shadow(0 0 4px ${色})`,
        });
        this._レイヤー.child(粒);

        // Why: 飛距離・角度・回転が粒ごとにランダムなため、静的CSSキーフレームではなく
        // Web Animations APIで個別に生成する。終了後は粒のDOMを即座に破棄する
        const 横移動 = Math.cos(角度) * 距離;
        const 縦移動 = Math.sin(角度) * 距離 + 12; // わずかに重力で落ちる風味
        const アニメーション = 粒.dom.element.animate(
            [
                { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1 },
                { transform: `translate(${横移動}px, ${縦移動}px) scale(0) rotate(${回転角}deg)`, opacity: 0 },
            ],
            { duration: 継続ミリ秒, easing: "cubic-bezier(0.1, 0.6, 0.3, 1)" },
        );
        アニメーション.finished
            .then(() => 粒.delete())
            .catch(() => 粒.delete());
    }
}
