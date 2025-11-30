// Manejo de imagen

import { useCallback, useState } from "react";

export function useImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback((file: File) => {
    setIsLoading(true);
    setError(null);

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      setIsLoading(false);
      return;
    }

    // Validar tamaño (máximo 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image size must be less than 10MB");
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setImage(result);
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to load image");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    setError(null);
  }, []);

  return {
    image,
    isLoading,
    error,
    uploadImage,
    clearImage,
  };
}
