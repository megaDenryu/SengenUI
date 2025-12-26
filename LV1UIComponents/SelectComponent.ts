import { HtmlElementProxy } from "../SengenBase/DomProxy";
import { LV1HtmlComponentBase } from "../SengenBase/LV1HtmlComponentBase";
import { TypedEventListener, SelectEventType } from "../SengenBase/EventTypes";

interface SelectOptions {
    /**
     * セレクトボックスのオプション配列
     * - value: プログラムで取得される値（例: "save_123", "tokyo"）
     * - text: ユーザーに表示されるテキスト（例: "琴葉 葵", "東京"）
     * - selected: 初期選択状態
     * - dataset: 追加のメタデータ（HTML5のdata-*属性）
     */
    options?: { value: string; text: string; selected?: boolean; dataset?: Record<string, string> }[];
    class?: string[] | string;
    id?: string;
    disabled?: boolean;
    multiple?: boolean;
}

export class SelectC extends LV1HtmlComponentBase {
    constructor(options?: SelectOptions) {
        super(); 

        if (options?.options) {
            this.setOptions(options.options);
        }
        if (options?.class) {
            this.dom.addCSSClass(options.class);
        }
        if (options?.id) {
            this.dom.element.id = options.id;
        }
        if (options?.disabled) {
            this.setDisabled(options.disabled);
        }
        if (options?.multiple) {
            this.setMultiple(options.multiple);
        }
    }

    protected createDomProxy(): HtmlElementProxy {
        const select = document.createElement('select');
        return new HtmlElementProxy(select);
    }

    /**
     * セレクトボックスのオプションを設定します
     * @param options オプション配列
     *   - value: プログラムで取得される値（getValue()で返される）
     *   - text: ユーザーに表示されるテキスト
     *   - selected: 初期選択状態
     *   - dataset: 追加のメタデータ（例: { saveID: "save_123" }）
     * @example
     * selectC.setOptions([
     *   { value: "tokyo", text: "東京" },
     *   { value: "osaka", text: "大阪", selected: true },
     *   { value: "save_123", text: "琴葉 葵", dataset: { saveID: "save_123" } }
     * ]);
     */
    public setOptions(options: { value: string; text: string; selected?: boolean; dataset?: Record<string, string> }[]): this {
        const selectElement = this.dom.element as HTMLSelectElement;
        selectElement.innerHTML = '';
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;  // プログラムで取得される値
            optionElement.textContent = option.text;  // ユーザーに表示されるテキスト
            if (option.selected) {
                optionElement.selected = true;
            }
            // datasetが指定されている場合は設定（HTML5のdata-*属性）
            if (option.dataset) {
                Object.keys(option.dataset).forEach(key => {
                    optionElement.dataset[key] = option.dataset![key];
                });
            }
            selectElement.appendChild(optionElement);
        });
        return this;
    }

    public getValue(): string {
        return (this.dom.element as HTMLSelectElement).value;
    }

    public getSelectedValues(): string[] {
        const selectElement = this.dom.element as HTMLSelectElement;
        return Array.from(selectElement.selectedOptions).map(option => option.value);
    }

    public addClass(className: string | string[]): this {
        this.dom.addCSSClass(className);
        return this;
    }

    public removeClass(className: string | string[]): this {
        this.dom.removeCSSClass(className);
        return this;
    }
    
    public setDisabled(disabled: boolean): this {
        (this.dom.element as HTMLSelectElement).disabled = disabled;
        return this;
    }
    
    public setMultiple(multiple: boolean): this {
        (this.dom.element as HTMLSelectElement).multiple = multiple;
        return this;
    }

    public setSize(size: number): this {
        (this.dom.element as HTMLSelectElement).size = size;
        return this;
    }

    /**
     * 型安全なSelect用イベントリスナーを追加します
     * @param event イベントタイプ
     * @param listener イベントハンドラー
     */
    public addSelectEventListener<T extends SelectEventType>(
        event: T, 
        listener: TypedEventListener<T>
    ): this {
        this.addTypedEventListener(event, listener);
        return this;
    }

    // Type-safe event handlers for Select-specific events
    public onSelectChange(callback: TypedEventListener<'change'>): this {
        this.addTypedEventListener('change', callback);
        return this;
    }

    public onSelectInput(callback: TypedEventListener<'input'>): this {
        this.addTypedEventListener('input', callback);
        return this;
    }
    
    public clickSimulate(targetValue: string): void {
        const selectElement = this.dom.element as HTMLSelectElement;
        let optionFound = false;
        for (let i = 0; i < selectElement.options.length; i++) {
            const option = selectElement.options[i];
            if (option.value === targetValue) {
                selectElement.selectedIndex = i;
                optionFound = true;
                break;
            }
        }
        if (!optionFound) {
            console.warn(`Option with value "${targetValue}" not found.`);
        }
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
    }
}