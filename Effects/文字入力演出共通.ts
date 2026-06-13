export interface 画面座標 {
    readonly x: number;
    readonly y: number;
}

type 文字入力対象 = HTMLInputElement | HTMLTextAreaElement | HTMLElement;

const 対象inputType = new Set(["text", "search", "email", "url", "tel", "password", "number"]);

export function 文字入力対象か(target: EventTarget | null): target is 文字入力対象 {
    if (target instanceof HTMLTextAreaElement) return true;
    if (target instanceof HTMLInputElement) return 対象inputType.has(target.type);
    return target instanceof HTMLElement && target.isContentEditable;
}

export function キャレット画面座標を取得する(対象: 文字入力対象): 画面座標 {
    if (対象 instanceof HTMLInputElement || 対象 instanceof HTMLTextAreaElement) {
        return inputキャレット座標を取得する(対象);
    }

    const 選択範囲 = window.getSelection();
    if (選択範囲 !== null && 選択範囲.rangeCount > 0) {
        const range = 選択範囲.getRangeAt(0).cloneRange();
        range.collapse(false);
        const rect = range.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
            return { x: rect.right, y: rect.top + rect.height / 2 };
        }
    }
    return 要素右端中央(対象);
}

function inputキャレット座標を取得する(対象: HTMLInputElement | HTMLTextAreaElement): 画面座標 {
    const rect = 対象.getBoundingClientRect();
    const style = getComputedStyle(対象);
    const mirror = document.createElement("div");
    const marker = document.createElement("span");
    const caret位置 = 対象.selectionStart ?? 対象.value.length;

    Object.assign(mirror.style, {
        position: "fixed",
        left: "0",
        top: "0",
        visibility: "hidden",
        whiteSpace: 対象 instanceof HTMLTextAreaElement ? "pre-wrap" : "pre",
        overflowWrap: "break-word",
        boxSizing: style.boxSizing,
        width: `${rect.width}px`,
        padding: style.padding,
        border: style.border,
        font: style.font,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
    });
    mirror.textContent = 対象.value.slice(0, caret位置);
    marker.textContent = "\u200b";
    mirror.appendChild(marker);
    document.body.appendChild(mirror);

    const markerRect = marker.getBoundingClientRect();
    mirror.remove();
    return {
        x: rect.left + markerRect.left - 対象.scrollLeft,
        y: rect.top + markerRect.top - 対象.scrollTop + markerRect.height / 2,
    };
}

function 要素右端中央(対象: HTMLElement): 画面座標 {
    const rect = 対象.getBoundingClientRect();
    return { x: rect.right - 8, y: rect.top + rect.height / 2 };
}
