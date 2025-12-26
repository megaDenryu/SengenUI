import { IBehavior } from "./IBehavior";
import { HtmlComponentBase } from "../SengenBase/HtmlComponentBase";

/**
 * 複数のBehaviorを組み合わせて管理するコンポジットクラス
 * Compositeパターンの実装
 */
export class CompositeBehavior implements IBehavior {
    private _behaviors: IBehavior[] = [];
    private _attachedElement: HtmlComponentBase | null = null;
    private _isAttached = false;

    constructor(behaviors?: IBehavior[]) {
        if (behaviors) {
            this._behaviors = [...behaviors];
        }
    }

    /**
     * Behaviorを追加
     */
    public addBehavior(behavior: IBehavior): this {
        this._behaviors.push(behavior);
        
        // 既にアタッチされている場合は、新しいBehaviorもアタッチ
        if (this._isAttached && this._attachedElement) {
            behavior.attach(this._attachedElement);
        }
        
        return this;
    }

    /**
     * Behaviorを削除
     */
    public removeBehavior(behavior: IBehavior): this {
        const index = this._behaviors.indexOf(behavior);
        if (index > -1) {
            // デタッチしてから削除
            behavior.detach();
            this._behaviors.splice(index, 1);
        }
        return this;
    }

    /**
     * 全てのBehaviorを要素にアタッチ
     */
    public attach(element: HtmlComponentBase): void {
        this._attachedElement = element;
        this._isAttached = true;
        
        this._behaviors.forEach(behavior => {
            try {
                behavior.attach(element);
            } catch (error) {
                console.error('Failed to attach behavior:', error);
            }
        });
    }

    /**
     * 全てのBehaviorをデタッチ
     */
    public detach(): void {
        this._behaviors.forEach(behavior => {
            try {
                behavior.detach();
            } catch (error) {
                console.error('Failed to detach behavior:', error);
            }
        });
        
        this._attachedElement = null;
        this._isAttached = false;
    }
}


export class BehaviorManager {
    private _behaviors: IBehavior[] = [];

    public addBehavior(behavior: IBehavior): this {
        this._behaviors.push(behavior);
        return this;
    }

    public delete(): void {
        this._behaviors.forEach(behavior => {
            try {
                behavior.detach();
            } catch (error) {
                console.error('Failed to detach behavior:', error);
            }
        });
        this._behaviors = [];
    }

}