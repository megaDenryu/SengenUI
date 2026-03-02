import * as LV1 from './index';

// --- Base helper for type inference ---
type OptionsOf<T extends new (...args: any[]) => any> = ConstructorParameters<T>[0];

// --- Structural Elements ---
export const div = (options?: OptionsOf<typeof LV1.DivC>) => new LV1.DivC(options);
export const span = (options?: OptionsOf<typeof LV1.SpanC>) => new LV1.SpanC(options);
export const p = (options?: OptionsOf<typeof LV1.PC>) => new LV1.PC(options);
export const br = (options?: OptionsOf<typeof LV1.BrC>) => new LV1.BrC(options);
export const hr = (options?: OptionsOf<typeof LV1.HrC>) => new LV1.HrC(options);

// --- Headings ---
export const h1 = (options?: OptionsOf<typeof LV1.H1C>) => new LV1.H1C(options);
export const h2 = (options?: OptionsOf<typeof LV1.H2C>) => new LV1.H2C(options);
export const h3 = (options?: OptionsOf<typeof LV1.H3C>) => new LV1.H3C(options);
export const h4 = (options?: OptionsOf<typeof LV1.H4C>) => new LV1.H4C(options);
export const h5 = (options?: OptionsOf<typeof LV1.H5C>) => new LV1.H5C(options);
export const h6 = (options?: OptionsOf<typeof LV1.H6C>) => new LV1.H6C(options);

// --- Interactive Elements ---
export const button = (options?: OptionsOf<typeof LV1.ButtonC>) => new LV1.ButtonC(options);
export const a = (options?: OptionsOf<typeof LV1.AC>) => new LV1.AC(options);
export const img = (options?: OptionsOf<typeof LV1.ImgC>) => new LV1.ImgC(options);

// --- Form Elements ---
export const input = (options?: OptionsOf<typeof LV1.InputC>) => new LV1.InputC(options);
export const textInput = (options?: OptionsOf<typeof LV1.TextInputC>) => new LV1.TextInputC(options);
export const numberInput = (options?: OptionsOf<typeof LV1.NumberInputC>) => new LV1.NumberInputC(options);
export const checkbox = (options?: OptionsOf<typeof LV1.CheckboxInputC>) => new LV1.CheckboxInputC(options);
export const radio = (options: OptionsOf<typeof LV1.RadioInputC>) => new LV1.RadioInputC(options);
export const fileInput = (options?: OptionsOf<typeof LV1.FileInputC>) => new LV1.FileInputC(options);
export const select = (options?: OptionsOf<typeof LV1.SelectC>) => new LV1.SelectC(options);
export const textarea = (options?: OptionsOf<typeof LV1.TextAreaC>) => new LV1.TextAreaC(options);
export const label = (options?: OptionsOf<typeof LV1.LabelC>) => new LV1.LabelC(options);
export const form = (options?: OptionsOf<typeof LV1.FormC>) => new LV1.FormC(options);

// --- List Elements ---
export const ul = (options?: OptionsOf<typeof LV1.UlC>) => new LV1.UlC(options);
export const ol = (options?: OptionsOf<typeof LV1.OlC>) => new LV1.OlC(options);
export const li = (options?: OptionsOf<typeof LV1.LiC>) => new LV1.LiC(options);

// --- Table Elements ---
export const table = (options?: OptionsOf<typeof LV1.TableC>) => new LV1.TableC(options);
export const thead = (options?: OptionsOf<typeof LV1.THeadC>) => new LV1.THeadC(options);
export const tbody = (options?: OptionsOf<typeof LV1.TBodyC>) => new LV1.TBodyC(options);
export const tfoot = (options?: OptionsOf<typeof LV1.TFootC>) => new LV1.TFootC(options);
export const tr = (options?: OptionsOf<typeof LV1.TrC>) => new LV1.TrC(options);
export const td = (options?: OptionsOf<typeof LV1.TdC>) => new LV1.TdC(options);
export const th = (options?: OptionsOf<typeof LV1.ThC>) => new LV1.ThC(options);

// --- Others ---
export const canvas = (options?: OptionsOf<typeof LV1.CanvasC>) => new LV1.CanvasC(options);
export const iframe = (options?: OptionsOf<typeof LV1.IframeC>) => new LV1.IframeC(options);
export const audio = (options?: OptionsOf<typeof LV1.AudioC>) => new LV1.AudioC(options);
