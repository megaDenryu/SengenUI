import { HtmlComponentBase } from "./HtmlComponentBase";
import { LV2HtmlComponentBase } from "./LV2HtmlComponentBase";

/**
 * 複数の子部品を集約するLV2（Orchestrator・大型View部品）の基底クラス。
 *
 * Why: LV2には「部品集約」という側面があり、集約側は「どの部品から構築されるか」を
 * 型で明示すべきである。_ルートを構築する(部品) を abstract で強要することで、
 * ルート構築が this 経由の暗黙依存ではなく、引数リストに列挙された部品だけから
 * ツリーを作ることが型契約になる（スコープで見えるかではなく、依存の明示が目的）。
 *
 * 呼び出しはサブクラス自身のコンストラクタの最終段階で行う:
 *   this._componentRoot = this._ルートを構築する(部品);
 * この時点で全部品のインスタンスは構築済みなので、ツリーの中で
 * 「配置しながら 部品.配線する({...}) を呼ぶ」ことができる（I配線可能のthis返し）。
 * 基底コンストラクタからは呼ばない — サブクラスのフィールド初期化前に走るため
 * （Sealed原則と同じ未初期化アクセスの穴になる）。
 *
 * 本クラスは abstract なので、Sealed原則（具象LV2の継承禁止）には抵触しない。
 */
export abstract class LV2部品集約Base<T部品> extends LV2HtmlComponentBase {
    protected abstract _ルートを構築する(部品: T部品): HtmlComponentBase;
}
