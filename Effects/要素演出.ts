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

/** 要素の輪郭から光のリングが二重に外へ走る(スイッチON等の確定フィードバック) */
export function パルス演出を再生する(対象: HtmlComponentBase, 色: string = "rgba(120, 200, 255, 0.9)"): void {
    安全に演出する("パルス", () => {
        // Why: 単一リングだと一瞬で見えにくい。内側の濃いリングと外側の薄いリングを
        // 重ねて外へ押し出し、波が二重に走る確定感を出す。立ち上がりは鋭く減衰はなめらか
        対象.dom.element.animate(
            [
                { boxShadow: `0 0 0 0 ${色}, 0 0 0 0 rgba(0, 0, 0, 0)`, offset: 0 },
                { boxShadow: `0 0 0 3px ${色}, 0 0 0 10px rgba(120, 200, 255, 0.35)`, offset: 0.18 },
                { boxShadow: "0 0 0 18px rgba(120, 200, 255, 0), 0 0 0 28px rgba(0, 0, 0, 0)", offset: 1 },
            ],
            { duration: 600, easing: "cubic-bezier(0.1, 0.7, 0.25, 1)" },
        );
    });
}

/** 要素全体が二段で強く明滅する(ポーズ適用等の大きな状態変化のフィードバック) */
export function フラッシュ演出を再生する(対象: HtmlComponentBase): void {
    安全に演出する("フラッシュ", () => {
        // Why: 一段の明滅だと「パッ」で終わり効いた印象が弱い。鋭く強く光らせ、
        // いったん少し戻してもう一度光らせる二段明滅で「確かに効いた」手応えを出す
        対象.dom.element.animate(
            [
                { filter: "brightness(1) saturate(1)", offset: 0 },
                { filter: "brightness(2.4) saturate(1.5) contrast(1.1)", offset: 0.18 },
                { filter: "brightness(1.25) saturate(1.1)", offset: 0.42 },
                { filter: "brightness(1.8) saturate(1.3)", offset: 0.6 },
                { filter: "brightness(1) saturate(1)", offset: 1 },
            ],
            { duration: 480, easing: "ease-out" },
        );
    });
}

/** 要素がぼかしと透明から強く浮かび上がる登場演出(キャラ読み込み等) */
export function 登場演出を再生する(対象: HtmlComponentBase): void {
    安全に演出する("登場", () => {
        // Why: 直線的に現れるだけだと「登場した」感が薄い。深いぼかしと強い発光から始め、
        // くっきりする手前で一度輝度をオーバーシュートさせてから落ち着かせ、登場の瞬間を際立たせる。
        // transformはキャンバス操作と競合するため使わず、filter/opacityのみで表現する(本ファイル冒頭のWhy参照)
        対象.dom.element.animate(
            [
                { opacity: 0, filter: "blur(12px) brightness(1.9)", offset: 0 },
                { opacity: 1, filter: "blur(1px) brightness(1.5)", offset: 0.7 },
                { opacity: 1, filter: "blur(0px) brightness(1)", offset: 1 },
            ],
            { duration: 700, easing: "cubic-bezier(0.2, 0.7, 0.25, 1)" },
        );
    });
}

/** 要素の中心から火花(光の粒)が勢いよく散り、発光リングが広がる(電源点灯等の祝福) */
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

    // Why: 粒(飛沫)だけだと点の集まりで終わる。中心から広がる発光リング(波面)を先に置くと
    // 点火が外へ波及する祝福らしさが出る。クリックリップル演出と同じ波紋手法を要素中心に適用する
    スパークリングを飛ばす(中心X, 中心Y, 色候補[Math.floor(Math.random() * 色候補.length)]);

    const 粒数 = 14;
    for (let i = 0; i < 粒数; i++) {
        const 色 = 色候補[Math.floor(Math.random() * 色候補.length)];
        const サイズ = 4 + Math.random() * 5;
        const 角度 = (i / 粒数) * Math.PI * 2 + Math.random() * 0.6;
        const 距離 = 30 + Math.random() * 40;

        // Why: 粒はレイアウトに属さないfixed要素としてbody直下に置き、終了後に即破棄する
        const 粒 = div({}).setStyleCSS({
            position: "fixed",
            left: `${中心X - サイズ / 2}px`,
            top: `${中心Y - サイズ / 2}px`,
            width: `${サイズ}px`,
            height: `${サイズ}px`,
            borderRadius: "50%",
            backgroundColor: 色,
            filter: `drop-shadow(0 0 5px ${色})`,
            pointerEvents: "none",
            zIndex: "99999",
        }).bodyにマウントする();

        const 横移動 = Math.cos(角度) * 距離;
        const 縦移動 = Math.sin(角度) * 距離;
        // Why: 飛び出し直後に一瞬膨らませてから縮めて消すと、点火で弾き出される勢いが強調される
        const アニメーション = 粒.dom.element.animate(
            [
                { transform: "translate(0, 0) scale(0.7)", opacity: 1, offset: 0 },
                { transform: `translate(${横移動 * 0.35}px, ${縦移動 * 0.35}px) scale(1.4)`, opacity: 1, offset: 0.25 },
                { transform: `translate(${横移動}px, ${縦移動}px) scale(0)`, opacity: 0, offset: 1 },
            ],
            { duration: 420 + Math.random() * 260, easing: "cubic-bezier(0.1, 0.6, 0.3, 1)" },
        );
        アニメーション.finished
            .then(() => 粒.delete())
            .catch(() => 粒.delete());
    }
}

/** 要素中心から外へ広がって消える発光リング(スパークの波面) */
function スパークリングを飛ばす(中心X: number, 中心Y: number, 色: string): void {
    const 初期直径 = 14;
    const 最大直径 = 90;
    const リング = div({}).setStyleCSS({
        position: "fixed",
        left: `${中心X - 初期直径 / 2}px`,
        top: `${中心Y - 初期直径 / 2}px`,
        width: `${初期直径}px`,
        height: `${初期直径}px`,
        borderRadius: "50%",
        border: `2px solid ${色}`,
        boxShadow: `0 0 10px ${色}, inset 0 0 6px ${色}`,
        pointerEvents: "none",
        zIndex: "99999",
        opacity: "0",
    }).bodyにマウントする();

    const アニメーション = リング.dom.element.animate(
        [
            { transform: "scale(0.4)", opacity: 0.9, borderWidth: "2.5px", offset: 0 },
            { transform: `scale(${最大直径 / 初期直径})`, opacity: 0, borderWidth: "0.5px", offset: 1 },
        ],
        { duration: 480, easing: "cubic-bezier(0.15, 0.7, 0.25, 1)" },
    );
    アニメーション.finished
        .then(() => リング.delete())
        .catch(() => リング.delete());
}
