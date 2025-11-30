// Exportaciones

// Componente principal
export { ColorPicker } from "./components/ColorPicker";

// Componentes individuales
export { ImageUploader } from "./components/ImageUploader";
export { ImageCanvas } from "./components/ImageCanvas";
export { ColorFormatSelector } from "./components/ColorFormatSelector";
export { ColorPalette } from "./components/ColorPalette";
export { ColorCard } from "./components/ColorCard";
export { EyedropperZoom } from "./components/EyedropperZoom";
export { CopyNotification } from "./components/CopyNotification";

// Hooks
export { useColorPicker } from "./hooks/useColorPicker";
export { useImageUpload } from "./hooks/useImageUpload";
export { useColorExtraction } from "./hooks/useColorExtraction";
export { useEyedropper } from "./hooks/useEyedropper";
export { useClipboard } from "./hooks/useClipboard";

// Utilidades
export * from "./utils/colorConversion";
export * from "./utils/colorExtraction";
export * from "./utils/canvasUtils";

// Tipos
export type {
  ColorFormat,
  RGBColor,
  HSLColor,
  ExtractedColor,
  ColorPickerState,
} from "./types/colorPicker.types";
