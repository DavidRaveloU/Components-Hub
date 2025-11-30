// Hook principal que une todo

import type { ColorFormat, RGBColor } from "../types/colorPicker.types";
import { useCallback, useEffect, useRef, useState } from "react";

import { formatColor } from "../utils/colorConversion";
import { loadImageToCanvas } from "../utils/canvasUtils";
import { useClipboard } from "./useClipboard";
import { useColorExtraction } from "./useColorExtraction";
import { useEyedropper } from "./useEyedropper";
import { useImageUpload } from "./useImageUpload";

interface UseColorPickerProps {
  defaultNumColors?: number;
}

export function useColorPicker({
  defaultNumColors = 6,
}: UseColorPickerProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>("HEX");
  const [numColors, setNumColors] = useState(defaultNumColors);

  // Hooks
  const {
    image,
    isLoading: isLoadingImage,
    error: imageError,
    uploadImage,
    clearImage,
  } = useImageUpload();
  const { extractedColors, isExtracting, extractColors, clearColors } =
    useColorExtraction();
  const { copied, copyToClipboard } = useClipboard();

  const eyedropper = useEyedropper({
    canvasRef,
    onColorPick: (color: RGBColor) => {
      const formattedColor = formatColor(color, selectedFormat);
      copyToClipboard(formattedColor);
    },
  });

  // Cargar imagen en canvas cuando cambia
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    loadImageToCanvas(canvasRef.current, image)
      .then(() => {
        // Extraer colores automáticamente después de cargar la imagen
        if (canvasRef.current) {
          extractColors(canvasRef.current, numColors);
        }
      })
      .catch((error) => {
        console.error("Failed to load image to canvas:", error);
      });
  }, [image, extractColors, numColors]);

  // Manejar cambio de imagen
  const handleImageUpload = useCallback(
    (file: File) => {
      clearColors();
      eyedropper.deactivate();
      uploadImage(file);
    },
    [uploadImage, clearColors, eyedropper]
  );

  // Manejar limpieza
  const handleClear = useCallback(() => {
    clearImage();
    clearColors();
    eyedropper.deactivate();
  }, [clearImage, clearColors, eyedropper]);

  // Copiar color de la paleta
  const handleCopyColor = useCallback(
    (color: RGBColor) => {
      const formattedColor = formatColor(color, selectedFormat);
      copyToClipboard(formattedColor);
    },
    [selectedFormat, copyToClipboard]
  );

  // Re-extraer colores cuando cambia el número
  const handleNumColorsChange = useCallback(
    (newNum: number) => {
      setNumColors(newNum);
      if (canvasRef.current && image) {
        extractColors(canvasRef.current, newNum);
      }
    },
    [image, extractColors]
  );

  return {
    // Canvas
    canvasRef,

    // Image
    image,
    isLoadingImage,
    imageError,
    handleImageUpload,
    handleClear,

    // Colors
    extractedColors,
    isExtracting,
    numColors,
    handleNumColorsChange,

    // Format
    selectedFormat,
    setSelectedFormat,

    // Eyedropper
    eyedropper,

    // Clipboard
    copied,
    handleCopyColor,
  };
}
