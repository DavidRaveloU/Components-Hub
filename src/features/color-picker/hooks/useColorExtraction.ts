// Extraer colores dominantes

import { useCallback, useState } from "react";

import type { ExtractedColor } from "../types/colorPicker.types";
import { extractDominantColors } from "../utils/colorExtraction";
import { getAllPixels } from "../utils/canvasUtils";

export function useColorExtraction() {
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  const extractColors = useCallback(
    async (canvas: HTMLCanvasElement, numColors: number = 6) => {
      setIsExtracting(true);

      try {
        // Obtener todos los pixeles del canvas
        const pixels = getAllPixels(canvas);

        if (!pixels) {
          throw new Error("Failed to get canvas pixels");
        }

        // Extraer colores dominantes usando k-means
        // Usar setTimeout para no bloquear el UI
        await new Promise((resolve) => setTimeout(resolve, 0));

        const colors = extractDominantColors(pixels, numColors);
        setExtractedColors(colors);
      } catch (error) {
        console.error("Failed to extract colors:", error);
        setExtractedColors([]);
      } finally {
        setIsExtracting(false);
      }
    },
    []
  );

  const clearColors = useCallback(() => {
    setExtractedColors([]);
  }, []);

  return {
    extractedColors,
    isExtracting,
    extractColors,
    clearColors,
  };
}
