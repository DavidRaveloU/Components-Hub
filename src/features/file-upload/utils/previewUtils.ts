// Generar previews de imágenes

/**
 * Generar URL de preview para una imagen
 */
export function generateImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Image preview generation failed"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Image preview generation failed"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Limpiar URL de preview (para evitar memory leaks)
 */
export function revokePreviewUrl(url: string): void {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}
