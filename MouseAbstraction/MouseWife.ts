import { MouseStateManager } from ".";
import { 二次マウス操作情報履歴 } from "./MouseState";
import { ビューポート座標値 } from "../SengenBase/css長さ単位";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { DocumentBody } from "../LV1UIComponents/DocumentBodyC";

export enum ドラッグ状態 {
    ドラッグ開始,
    ドラッグ中,
    ドラッグ終了
}

export class Drag中値 {
    public constructor( public readonly data: 二次マウス操作情報履歴 ) {}
}
export class Drag開始値 {
    public constructor( public readonly data: 二次マウス操作情報履歴 ) {}
}
export class Drag終了値 {
    public constructor( public readonly data: 二次マウス操作情報履歴 ) {}
}

export interface Iドラッグに連動可能 {
    onドラッグ開始(e: Drag開始値): void; // mousedownで呼ばれる
    onドラッグ中(e: Drag中値): void;   // mousemoveで呼ばれる
    onドラッグ終了(e: Drag終了値): void; // mouseupで呼ばれる
    on右クリック?(e: MouseEvent): void; // 右クリック（contextmenu）で呼ばれる
}

// これはできればpublicにしたくない。マウスと一緒に動くものは必ず１つはあるはず（この最初の１つをマウスワイフということにする）という前提でクラスを作り、
// そこに、外部からドラッグに連動可能な物を突っ込むという考え方のほうがいいかも。
// 実はマウスワイフはViewである必要はないかもしれない。単に、必要なイベントとイベント値を入力してくれればそれでいい。ただし、その
export interface Iドラッグ可能 {
    ドラッグ状態: ドラッグ状態;
    onドラッグ開始(e: MouseEvent): void; // mousedownで呼ばれる
    onドラッグ中(e: MouseEvent): void;   // mousemoveで呼ばれる
    onドラッグ終了(e: MouseEvent): void; // mouseupで呼ばれる
}

// この場合、MouseWifeはどこからmouseイベントを受け取るのか？それはdocumentからになる。そうすると、個別のHTMLエレメントからのイベントは受け取れない。
// つまり、WifeはHTMLElementごとに存在する。
/**
 * 

## **contextmenu イベント** vs **mousedown/mouseup の button === 2**

| 項目                 | contextmenu                                                                             | button === 2 |
|------                |------------                                                                             |--------------|
| **発火タイミング**    | 右クリック時に**自動的に1回**発火                                                          | mousedown と mouseup で**2回**発火 |
| **ブラウザ標準機能**  | ブラウザのコンテキストメニューが表示される前に発火。preventDefault()で標準メニューを抑制できる  | マウスボタンの状態を検出するだけ |
| **使用場面**          | **カスタムコンテキストメニュー実装に最適**                                                  | 右クリックドラッグなど、ボタン状態を細かく制御したい場合
| **デフォルト動作**     | あり（ブラウザのコンテキストメニュー）                                                      | なし 
| **他ボタンとの区別**   | 自動的に右クリックのみ検出                                                                 | `button === 0`（左）、`button === 1`（中央）と手動区別 |


**理由：**
- 右クリックのみを確実に検出できる
- ブラウザの標準コンテキストメニュー表示を防止できる
- `button === 2` の判定ロジックが不要（既に右クリックと確定している）
- ユーザーが右クリックした「瞬間」に反応できる

`contextmenu` イベントは既に右クリックと確定しているため、`button` で再判定する必要がありません。
 * 
 * 
 */
export class MouseWife {
    ドラッグ状態: ドラッグ状態 = ドラッグ状態.ドラッグ終了;
    ドラッグ連動者リスト: Iドラッグに連動可能[] = [];
    constructor(dragHandle: LV1HtmlComponentBase) {
        dragHandle.onMouseDown(this.onドラッグ開始.bind(this))
                .onMouseMove(this.onドラッグ中.bind(this))
                .onMouseUp(this.onドラッグ終了.bind(this));
        // contextmenuイベントは contextmenu は CommonEventType に含まれないため直接addEventListener
        dragHandle.dom.element.addEventListener('contextmenu', this.on右クリック.bind(this));
        DocumentBody().addEventListener('mousemove', this.onドラッグ中.bind(this))
                      .addEventListener('mouseup', this.onドラッグ終了.bind(this));
    }

    public ドラッグ連動登録(ドラッグに連動可能: Iドラッグに連動可能):this {
        this.ドラッグ連動者リスト.push(ドラッグに連動可能);
        return this;
    }

    onドラッグ開始(e: MouseEvent): void {
        if (this.ドラッグ状態 !== ドラッグ状態.ドラッグ終了) {return;}
        this.ドラッグ状態 = ドラッグ状態.ドラッグ開始;
        const operationHistory = MouseStateManager.instance().マウスダウン時のマウス情報(e);
        for (const 連動者 of this.ドラッグ連動者リスト) {
            イベント既定動作と伝搬を停止(e);
            連動者.onドラッグ開始(new Drag開始値(operationHistory));
        }
    }

    onドラッグ中(e: MouseEvent): void {
        if (this.ドラッグ状態 === ドラッグ状態.ドラッグ終了) {return;}
        this.ドラッグ状態 = ドラッグ状態.ドラッグ中;
        const operationHistory = MouseStateManager.instance().マウス移動時のマウス情報(e);
        if (operationHistory == null) { return; }
        for (const 連動者 of this.ドラッグ連動者リスト) {
            イベント既定動作と伝搬を停止(e);
            連動者.onドラッグ中(new Drag中値(operationHistory));
        }
    }

    onドラッグ終了(e: MouseEvent): void {
        if (this.ドラッグ状態 === ドラッグ状態.ドラッグ終了) { return; }
        
        const previousState = this.ドラッグ状態;
        this.ドラッグ状態 = ドラッグ状態.ドラッグ終了;
        const operationHistory = MouseStateManager.instance().マウスアップ時のマウス情報(e);
        if (operationHistory == null) { return; }
        
        if (previousState !== ドラッグ状態.ドラッグ中) {return;}
        for (const 連動者 of this.ドラッグ連動者リスト) {
            イベント既定動作と伝搬を停止(e);
            連動者.onドラッグ終了(new Drag終了値(operationHistory));
        }
    }

    on右クリック(e: MouseEvent): void {
        e.stopPropagation();
        for (const 連動者 of this.ドラッグ連動者リスト) {
            if (連動者.on右クリック) {
                連動者.on右クリック(e);
            }
        }
    }
}


function イベント既定動作と伝搬を停止(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
}

export class 位置管理 {
    private 位置管理対象: LV1HtmlComponentBase;
    private 現在位置: ビューポート座標値;
    constructor(位置管理対象 : LV1HtmlComponentBase) {
        this.位置管理対象 = 位置管理対象;
        this.現在位置 = 位置管理対象.getViewportPosition();
    }

    public 管理対象の移動を開始(): void {
        this.現在位置 = this.位置管理対象.getViewportPosition(); // 現在位置を計測初期位置に設定する。
    }

    public 本体のあるべき位置を計算して適用する(e: Drag中値): void {
        const next = ビューポート座標値.fromNumbers(
            this.現在位置.x.value + e.data.直前のマウス位置から現在位置までの差分.x,
            this.現在位置.y.value + e.data.直前のマウス位置から現在位置までの差分.y
        );
        this.現在位置 = next;
        this.位置管理対象.setViewportPosition(next);
    }

    public 位置を設定(pos: ビューポート座標値): void {
        this.現在位置 = pos;
        this.位置管理対象.setViewportPosition(pos);
    }
}