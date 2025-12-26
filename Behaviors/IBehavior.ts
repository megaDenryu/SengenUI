import { HtmlComponentBase } from "../SengenBase/HtmlComponentBase";

/**
 * UI要素に対する振る舞いを定義するインターフェース
 * Strategyパターンとして実装し、UI要素に様々な機能を追加可能にする
 */
export interface IBehavior {
    /**
     * 指定されたUI要素に振る舞いをアタッチ
     * @param element アタッチ対象のUI要素
     */
    attach(element: HtmlComponentBase): void;
    
    /**
     * 振る舞いをデタッチし、リソースをクリーンアップ
     */
    detach(): void;
}

/**
 * 振る舞いの状態を表すタイプ
 */
export type BehaviorState = 'detached' | 'attached' | 'active';

/**
 * 振る舞いのオプション設定
 */
export interface IBehaviorOptions {
    /** 振る舞いが有効かどうか */
    enabled?: boolean;
    /** デバッグモード */
    debug?: boolean;
}