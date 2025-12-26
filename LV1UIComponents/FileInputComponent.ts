import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { InputEventType, TypedEventListener } from "../SengenBase/EventTypes";

export interface FileInputOptions {
    id?: string;
    class?: string[] | string;
    accept?: string;           // ファイルフィルター（例: ".exe", ".txt", "image/*"）
    multiple?: boolean;        // 複数ファイル選択
    disabled?: boolean;
}

/**
 * ファイル入力専用コンポーネント
 * 型安全性と責務分離を重視した設計
 */
export class FileInputC extends LV1HtmlComponentBase {
    constructor(options: FileInputOptions = {}) {
        super();
        
        if (options.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options.id) {
            this.dom.element.id = options.id;
        }
        if (options.accept) {
            this.setAccept(options.accept);
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
        return new HtmlElementProxy(input);
    }

    /**
     * acceptプロパティを設定（ファイルフィルター）
     */
    public setAccept(accept: string): this {
        (this.dom.element as HTMLInputElement).accept = accept;
        return this;
    }

    /**
     * multiple属性を設定（複数ファイル選択）
     */
    public setMultiple(multiple: boolean): this {
        (this.dom.element as HTMLInputElement).multiple = multiple;
        return this;
    }

    /**
     * 選択されたファイルを取得
     */
    public getFiles(): FileList | null {
        return (this.dom.element as HTMLInputElement).files;
    }

    /**
     * ファイル選択ダイアログを開く
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

    // === ファイル入力固有のイベントメソッド ===

    /**
     * ファイル選択時のイベント（プリミティブ版）
     */
    public onChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    /**
     * 単一ファイル選択時のコールバック（型安全版）
     */
    public onFileSelected(callback: (file: File) => void): this {
        this.addTypedEventListener('change', (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                callback(files[0]);
            }
        });
        return this;
    }

    /**
     * 複数ファイル選択時のコールバック（型安全版）
     */
    public onFilesSelected(callback: (files: File[]) => void): this {
        this.addTypedEventListener('change', (e) => {
            const fileList = (e.target as HTMLInputElement).files;
            if (fileList && fileList.length > 0) {
                callback(Array.from(fileList));
            }
        });
        return this;
    }

    /**
     * ファイルパス取得版（Electron環境用）
     * 単一ファイルのパスを取得
     */
    public onFilePathSelected(callback: (filePath: string) => void): this {
        this.addTypedEventListener('change', (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                const file = files[0];
                const filePath = (file as any).path || file.name;
                callback(filePath);
            }
        });
        return this;
    }

    /**
     * ファイルパス取得版（Electron環境用）
     * 複数ファイルのパスを取得
     */
    public onFilePathsSelected(callback: (filePaths: string[]) => void): this {
        this.addTypedEventListener('change', (e) => {
            const fileList = (e.target as HTMLInputElement).files;
            if (fileList && fileList.length > 0) {
                const filePaths = Array.from(fileList).map(file => (file as any).path || file.name);
                callback(filePaths);
            }
        });
        return this;
    }

    /**
     * クリックされた時のイベント
     */
    public onClick(callback: TypedEventListener<'click'>): this {
        this.addTypedEventListener('click', callback);
        return this;
    }

    /**
     * 型安全なファイル入力用イベントリスナーを追加
     */
    public addFileInputEventListener<T extends InputEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }
}
