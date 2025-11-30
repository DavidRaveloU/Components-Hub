// Tipos

export type ColorFormat = "RGB" | "HEX" | "HSL" | "HTML";

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ExtractedColor {
  rgb: RGBColor;
  hex: string;
  hsl: HSLColor;
  html: string;
}

export interface ColorPickerState {
  image: string | null;
  extractedColors: ExtractedColor[];
  selectedFormat: ColorFormat;
  isEyedropperActive: boolean;
  hoveredPixel: RGBColor | null;
  zoomPosition: { x: number; y: number } | null;
}
