const 読込中スクリプト一覧 = new Map<string, Promise<void>>();
const 読込済みスクリプト一覧 = new Set<string>();

/**
 * 外部スクリプトをdocument.headへ読み込む。
 * Why: Cubism Coreのようにグローバルスクリプトとして先に読み込む必要がある
 * 外部ランタイムのDOM接続をSengenUI内部に閉じ込める。
 */
export function 外部スクリプトを読み込む(src: string): Promise<void> {
    if (読込済みスクリプト一覧.has(src)) {
        return Promise.resolve();
    }
    const 読込中 = 読込中スクリプト一覧.get(src);
    if (読込中 !== undefined) {
        return 読込中;
    }

    const promise = new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            読込中スクリプト一覧.delete(src);
            読込済みスクリプト一覧.add(src);
            resolve();
        };
        script.onerror = () => {
            読込中スクリプト一覧.delete(src);
            reject(new Error(`外部スクリプトの読み込みに失敗しました: ${src}`));
        };
        document.head.appendChild(script);
    });

    読込中スクリプト一覧.set(src, promise);
    return promise;
}
