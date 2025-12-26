import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export interface DirectoryInputOptions {
    id?: string;
    class?: string[] | string;
    multiple?: boolean;        // 複数フォルダー選択（実験的機能）
    disabled?: boolean;
}

/**
 * フォルダー選択専用コンポーネント
 * webkitdirectory属性を使用してディレクトリ選択に特化
 * 型安全性と責務分離を重視した設計
 */
export class DirectoryInputC extends LV1HtmlComponentBase {
    constructor(options: DirectoryInputOptions = {}) {
        super();
        
        if (options.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options.id) {
            this.dom.element.id = options.id;
        }
        if (options.multiple !== undefined) {
            this.setMultiple(options.multiple);
        }
        if (options.disabled) {
            this.setDisabled(options.disabled);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const input = document.createElement('input');
        input.type = 'file';
        // webkitdirectory属性を設定してフォルダー選択を有効化
        (input as any).webkitdirectory = true;
        return new HtmlElementProxy(input);
    }

    /**
     * multiple属性を設定（複数フォルダー選択 - 実験的機能）
     */
    public setMultiple(multiple: boolean): this {
        (this.dom.element as HTMLInputElement).multiple = multiple;
        return this;
    }

    /**
     * 選択されたファイルリストを取得
     * フォルダー選択時は、フォルダー内のすべてのファイルが含まれる
     */
    public getFiles(): FileList | null {
        return (this.dom.element as HTMLInputElement).files;
    }

    /**
     * フォルダー選択ダイアログを開く
     */
    public click(): void {
        (this.dom.element as HTMLInputElement).click();
    }

    /**
     * 無効/有効状態を設定
     */
    public setDisabled(disabled: boolean): this {
        (this.dom.element as HTMLInputElement).disabled = disabled;
        return this;
    }

    /**
     * 無効状態を取得
     */
    public isDisabled(): boolean {
        return (this.dom.element as HTMLInputElement).disabled;
    }

    /**
     * CSSクラスを追加
     */
    public addClass(className: string | string[]): this {
        this.dom.addCSSClass(className);
        return this;
    }

    /**
     * CSSクラスを削除
     */
    public removeClass(className: string | string[]): this {
        this.dom.removeCSSClass(className);
        return this;
    }

    // === ディレクトリ入力固有のイベントメソッド ===

    /**
     * フォルダー選択時のイベント（プリミティブ版）
     */
    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    /**
     * 単一フォルダー選択時のコールバック（型安全版）
     * フォルダー内のすべてのファイルを取得
     */
    public onDirectorySelected(callback: (files: File[]) => void): this {
        this.addTypedEventListener('change', (e) => {
            const fileList = (e.target as HTMLInputElement).files;
            if (fileList && fileList.length > 0) {
                callback(Array.from(fileList));
            }
        });
        return this;
    }

    /**
     * フォルダーパス取得版（Electron環境用）
     * 選択されたフォルダーのパスを取得
     */
    public onDirectoryPathSelected(callback: (directoryPath: string) => void): this {
        this.addTypedEventListener('change', (e) => {
            const fileList = (e.target as HTMLInputElement).files;
            if (fileList && fileList.length > 0) {
                const firstFile = fileList[0];
                // Electron環境ではfile.pathからフォルダーパスを抽出
                const fullPath = (firstFile as any).path || firstFile.webkitRelativePath;
                if (fullPath) {
                    // ファイルパスからフォルダーパスを抽出
                    const directoryPath = this.extractDirectoryPath(fullPath);
                    callback(directoryPath);
                }
            }
        });
        return this;
    }

    /**
     * フォルダー選択時の詳細情報取得版（型安全版）
     * フォルダーパスとファイルリストの両方を取得
     */
    public onDirectorySelectedWithDetails(
        callback: (details: { directoryPath: string; files: File[] }) => void
    ): this {
        this.addTypedEventListener('change', (e) => {
            const fileList = (e.target as HTMLInputElement).files;
            if (fileList && fileList.length > 0) {
                const files = Array.from(fileList);
                const firstFile = files[0];
                const fullPath = (firstFile as any).path || firstFile.webkitRelativePath;
                const directoryPath = this.extractDirectoryPath(fullPath);
                
                callback({ directoryPath, files });
            }
        });
        return this;
    }

    /**
     * ファイルパスからディレクトリパスを抽出
     */
    private extractDirectoryPath(fullPath: string): string {
        // WindowsとUnix系の両方に対応
        const separator = fullPath.includes('\\') ? '\\' : '/';
        const parts = fullPath.split(separator);
        // 最後の要素（ファイル名）を除外
        parts.pop();
        return parts.join(separator);
    }

    /**
     * クリックされた時のイベント
     */
    public onClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }

    /**
     * 型安全なディレクトリ入力用イベントリスナーを追加
     */
    public addDirectoryInputEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}
