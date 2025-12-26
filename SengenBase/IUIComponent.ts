/**
 * HTMLエレメントとSvgエレメントの共通インターフェース
 */
export interface HtmlAndSvgInterface {
    delete(): void;
    addClass(className: string | string[]): void;
    removeClass(className: string | string[]): void;
    show(): void;
    hide(): void;
}