/**
 * 特定の要素を対象にした単発のゲーム的演出関数群。
 * いずれもWeb Animations APIで実行し、終了後に後始末する。
 *
 * Why: transformはキャンバス操作(移動/回転/拡縮)等と取り合いになりやすいため、
 * 対象要素に適用する演出はboxShadow/filter/opacityなどレイアウトに干渉しない
 * プロパティに限定する。位置に粒を飛ばす演出は独立したfixed要素で行う。
 */

import { div } from '../LV1UIComponents/LV1CreationFunctions';
import { HtmlComponentBase } from '../SengenBase/HtmlComponentBase';


/**
 * Why: 演出は装飾であり、失敗してもアプリ本体(キャラ構築等の呼び出し元)を
 * 巻き添えにしてはならない。アニメーション実行の失敗は警告に留めて続行する。
 */
function 安全に演出する(演出名: string, 実行: () => void): void {
    try {
        実行();
    } catch (e) {
        console.warn(`[演出] ${演出名}の再生に失敗しました(アプリ動作には影響しません):`, e);
    }
}

/** 要素の輪郭から光のリングが一周広がる(スイッチON等の確定フィードバック) */
export function パルス演出を再生する(対象: HtmlComponentBase, 色: string = "rgba(120, 200, 255, 0.9)"): void {
    安全に演出する("パルス", () => {
        対象.dom.element.animate(
            [
                { boxShadow: `0 0 0 0 ${色}` },
                { boxShadow: "0 0 0 12px rgba(0, 0, 0, 0)" },
            ],
            { duration: 450, easing: "ease-out" },
        );
    });
}

/** 要素全体が一瞬明るく光る(ポーズ適用等の大きな状態変化のフィードバック) */
export function フラッシュ演出を再生する(対象: HtmlComponentBase): void {
    安全に演出する("フラッシュ", () => {
        対象.dom.element.animate(
            [
                { filter: "brightness(1)" },
                { filter: "brightness(1.9) saturate(1.2)", offset: 0.25 },
                { filter: "brightness(1)" },
            ],
            { duration: 420, easing: "ease-out" },
        );
    });
}

/** 要素がぼかしと透明から浮かび上がる登場演出(キャラ読み込み等) */
export function 登場演出を再生する(対象: HtmlComponentBase): void {
    安全に演出する("登場", () => {
        対象.dom.element.animate(
            [
                { opacity: 0, filter: "blur(8px) brightness(1.6)" },
                { opacity: 1, filter: "blur(0px) brightness(1)" },
            ],
            { duration: 600, easing: "ease-out" },
        );
    });
}

/** 要素の中心から小さな火花(光の粒)が散る(電源点灯等の小さな祝福) */
export function スパーク演出を再生する(
    対象: HtmlComponentBase,
    色候補: ReadonlyArray<string> = ["#fff6c8", "#ffe066", "#aef3a0"],
): void {
    安全に演出する("スパーク", () => スパークを実行する(対象, 色候補));
}

function スパークを実行する(対象: HtmlComponentBase, 色候補: ReadonlyArray<string>): void {
    const rect = 対象.dom.element.getBoundingClientRect();
    const 中心X = rect.left + rect.width / 2;
    const 中心Y = rect.top + rect.height / 2;

    const 粒数 = 6;
    for (let i = 0; i < 粒数; i++) {
        const 色 = 色候補[Math.floor(Math.random() * 色候補.length)];
        const サイズ = 3 + Math.random() * 3;
        const 角度 = (i / 粒数) * Math.PI * 2 + Math.random() * 0.6;
        const 距離 = 14 + Math.random() * 14;

        // Why: 粒はレイアウトに属さないfixed要素としてbody直下に置き、終了後に即破棄する
        const 粒 = div({}).setStyleCSS({
            position: "fixed",
            left: `${中心X - サイズ / 2}px`,
            top: `${中心Y - サイズ / 2}px`,
            width: `${サイズ}px`,
            height: `${サイズ}px`,
            borderRadius: "50%",
            backgroundColor: 色,
            filter: `drop-shadow(0 0 3px ${色})`,
            pointerEvents: "none",
            zIndex: "99999",
        }).bodyにマウントする();

        const アニメーション = 粒.dom.element.animate(
            [
                { transform: "translate(0, 0) scale(1)", opacity: 1 },
                {
                    transform: `translate(${Math.cos(角度) * 距離}px, ${Math.sin(角度) * 距離}px) scale(0)`,
                    opacity: 0,
                },
            ],
            { duration: 350 + Math.random() * 200, easing: "ease-out" },
        );
        アニメーション.finished
            .then(() => 粒.delete())
            .catch(() => 粒.delete());
    }
}
