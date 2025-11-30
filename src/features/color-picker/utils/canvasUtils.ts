// Utilidades de canvas

import type { RGBColor } from "../types/colorPicker.types";

/**
 * Obtiene el color de un pixel específico del canvas
 */
export function getPixelColor(
  canvas: HTMLCanvasElement,
  x: number,
  y: number
): RGBColor | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const imageData = ctx.getImageData(x, y, 1, 1);
  const data = imageData.data;

  return {
    r: data[0],
    g: data[1],
    b: data[2],
  };
}

/**
 * Obtiene los datos de imagen de una región del canvas
 */
export function getCanvasImageData(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
): ImageData | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  return ctx.getImageData(x, y, width, height);
}

/**
 * Carga una imagen en un canvas
 */
export function loadImageToCanvas(
  canvas: HTMLCanvasElement,
  imageUrl: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Ajustar tamaño del canvas a la imagen
      canvas.width = img.width;
      canvas.height = img.height;

      // Dibujar imagen
      ctx.drawImage(img, 0, 0);
      resolve();
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
}

/**
 * Obtiene todos los pixeles del canvas
 */
export function getAllPixels(
  canvas: HTMLCanvasElement
): Uint8ClampedArray | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return imageData.data;
}

/**
 * Convierte coordenadas del mouse a coordenadas del canvas
 */
export function getCanvasCoordinates(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: Math.floor((clientX - rect.left) * scaleX),
    y: Math.floor((clientY - rect.top) * scaleY),
  };
}
