import { validateFileSize, validateFileType } from "../utils/fileUtils";

import type { FileValidationConfig } from "../types/fileUpload.types";
import { useCallback } from "react";

export function useFileValidation(config: FileValidationConfig) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    acceptedTypes = [],
    maxFiles = 10,
  } = config;

  /**
   * Validar un archivo individual
   */
  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      // Validar tamaño
      if (!validateFileSize(file, maxSize)) {
        return {
          valid: false,
          error: `File size exceeds ${maxSize / (1024 * 1024)}MB`,
        };
      }

      // Validar tipo
      if (acceptedTypes.length > 0 && !validateFileType(file, acceptedTypes)) {
        return {
          valid: false,
          error: `File type not allowed. Accepted: ${acceptedTypes.join(", ")}`,
        };
      }

      return { valid: true };
    },
    [maxSize, acceptedTypes]
  );

  /**
   * Validar múltiples archivos
   */
  const validateFiles = useCallback(
    (
      files: File[],
      currentFilesCount: number
    ): {
      validFiles: File[];
      errors: Array<{ file: File; error: string }>;
    } => {
      const validFiles: File[] = [];
      const errors: Array<{ file: File; error: string }> = [];

      // Validar límite de archivos
      const availableSlots = maxFiles - currentFilesCount;

      files.forEach((file, index) => {
        if (index >= availableSlots) {
          errors.push({
            file,
            error: `Maximum ${maxFiles} files allowed`,
          });
          return;
        }

        const validation = validateFile(file);

        if (validation.valid) {
          validFiles.push(file);
        } else {
          errors.push({
            file,
            error: validation.error!,
          });
        }
      });

      return { validFiles, errors };
    },
    [maxFiles, validateFile]
  );

  return {
    validateFile,
    validateFiles,
  };
}
