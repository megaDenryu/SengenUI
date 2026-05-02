/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from "vitest";
import { 候補入力C } from "./候補入力Component";

describe("候補入力C", () => {
    it("上下キーとEnterで候補を選べる", () => {
        const 候補入力 = new 候補入力C({
            候補を取得する: (検索語) => {
                const 全候補 = ["りんご", "ぶどう", "もも"];
                return 全候補
                    .filter((候補) => 候補.includes(検索語))
                    .map((候補) => ({ 値: 候補 }));
            },
        });
        候補入力.マウントする(document.body);
        const 入力 = document.body.querySelector<HTMLInputElement>("input");
        if (!入力) throw new Error("入力欄が見つからない");
        入力.value = "";
        入力.dispatchEvent(new Event("focus"));
        入力.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
        入力.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
        入力.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        expect(候補入力.getValue()).toBe("ぶどう");
    });

    it("アクティブ候補が変わると可視範囲へ寄せる", () => {
        const 元のscrollIntoView = HTMLElement.prototype.scrollIntoView;
        const 呼び出し記録: ScrollLogicalPosition[] = [];
        HTMLElement.prototype.scrollIntoView = ((arg?: boolean | ScrollIntoViewOptions) => {
            if (typeof arg === "object" && arg?.block) {
                呼び出し記録.push(arg.block);
            }
        }) as typeof HTMLElement.prototype.scrollIntoView;

        try {
            const 候補入力 = new 候補入力C({
                候補を取得する: () => Array.from({ length: 30 }, (_, index) => ({ 値: `候補${index}` })),
            });
            候補入力.マウントする(document.body);
            const 入力 = document.body.querySelectorAll<HTMLInputElement>("input")[0];
            if (!入力) throw new Error("入力欄が見つからない");
            入力.dispatchEvent(new Event("focus"));
            入力.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
            入力.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
            expect(呼び出し記録).toContain("nearest");
        } finally {
            HTMLElement.prototype.scrollIntoView = 元のscrollIntoView;
        }
    });
});