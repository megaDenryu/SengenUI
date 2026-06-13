/**
 * 「活動が続いている間だけ」対象が柔らかく明滅するグロー演出。
 *
 * Why: 発話中の口パクのように「開始と終了の明確なイベントがなく、
 * 細かい活動通知だけが届く」ものを光らせるための仕組み。
 * 点灯を維持する() が呼ばれ続ける限り光り、途絶えると自動消灯する。
 */

import { HtmlComponentBase } from '../SengenBase/HtmlComponentBase';


export class リフレッシュ式グロー演出 {
    private _アニメーション: Animation | null = null;
    private _消灯タイマーID: number | null = null;

    constructor(
        private readonly _対象: HtmlComponentBase,
        private readonly _色: string | (() => string) = "rgba(120, 200, 255, 0.8)",
        private readonly _強さ: number | (() => number) = 1,
        // Why: 口パクの音素間隔より十分長く、発話終了後すぐ消える長さ
        private readonly _消灯遅延ミリ秒: number = 700,
    ) {}

    /** 活動を通知してグローを維持する。最初の呼び出しで点灯する */
    点灯を維持する(): void {
        if (this._アニメーション === null) {
            // Why: 演出は装飾。失敗しても呼び出し元(口パク等)を巻き添えにしない
            try {
                const 色 = typeof this._色 === "function" ? this._色() : this._色;
                const 強さ = typeof this._強さ === "function" ? this._強さ() : this._強さ;
                this._アニメーション = this._対象.dom.element.animate(
                    [
                        { filter: "drop-shadow(0 0 4px transparent)" },
                        { filter: `drop-shadow(0 0 ${16 * 強さ}px ${色})` },
                        { filter: "drop-shadow(0 0 4px transparent)" },
                    ],
                    { duration: 1200, iterations: Infinity, easing: "ease-in-out" },
                );
            } catch (e) {
                console.warn("[演出] グローの再生に失敗しました(アプリ動作には影響しません):", e);
                return;
            }
        }
        if (this._消灯タイマーID !== null) {
            window.clearTimeout(this._消灯タイマーID);
        }
        this._消灯タイマーID = window.setTimeout(() => this.停止する(), this._消灯遅延ミリ秒);
    }

    停止する(): void {
        if (this._消灯タイマーID !== null) {
            window.clearTimeout(this._消灯タイマーID);
            this._消灯タイマーID = null;
        }
        this._アニメーション?.cancel();
        this._アニメーション = null;
    }
}
