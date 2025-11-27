import type {
  FileValidationConfig,
  UploadFile,
} from "../types/fileUpload.types";
import { generateFileId, isImageFile } from "../utils/fileUtils";
import { generateImagePreview, revokePreviewUrl } from "../utils/previewUtils";
import { useCallback, useEffect, useState } from "react";

import { useFileValidation } from "./useFileValidation";

interface UseFileUploadProps extends FileValidationConfig {
  onUpload?: (files: File[]) => Promise<void>;
  onFilesChange?: (files: UploadFile[]) => void;
  autoUpload?: boolean; // Auto-iniciar upload al agregar archivos
}

export function useFileUpload({
  maxSize,
  acceptedTypes = [],
  maxFiles,
  onUpload,
  onFilesChange,
  autoUpload = false,
}: UseFileUploadProps = {}) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const { validateFiles } = useFileValidation({
    maxSize,
    acceptedTypes,
    maxFiles,
  });

  /**
   * Actualizar estado de un archivo
   */
  const updateFileStatus = useCallback(
    (
      id: string,
      status: UploadFile["status"],
      progress?: number,
      error?: string
    ) => {
      setFiles((prev) => {
        const updated = prev.map((file) =>
          file.id === id
            ? { ...file, status, progress: progress ?? file.progress, error }
            : file
        );
        onFilesChange?.(updated);
        return updated;
      });
    },
    [onFilesChange]
  );

  /**
   * Iniciar upload de un archivo
   */
  const startUpload = useCallback(
    async (id: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (!file || file.status === "uploading") return prev;

        return prev.map((f) =>
          f.id === id ? { ...f, status: "uploading" as const, progress: 0 } : f
        );
      });

      try {
        const file = files.find((f) => f.id === id);
        if (!file) return;

        if (onUpload) {
          // Simular progreso mientras se sube
          const progressInterval = setInterval(() => {
            setFiles((prev) => {
              const currentFile = prev.find((f) => f.id === id);
              if (!currentFile || currentFile.status !== "uploading") {
                clearInterval(progressInterval);
                return prev;
              }

              const newProgress = Math.min(currentFile.progress + 10, 90);
              return prev.map((f) =>
                f.id === id ? { ...f, progress: newProgress } : f
              );
            });
          }, 100);

          await onUpload([file.file]);
          clearInterval(progressInterval);
        } else {
          // Simulación por defecto con progreso
          for (let progress = 0; progress <= 100; progress += 10) {
            updateFileStatus(id, "uploading", progress);
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        }

        updateFileStatus(id, "success", 100);
      } catch (error) {
        updateFileStatus(
          id,
          "error",
          0,
          error instanceof Error ? error.message : "Upload failed"
        );
      }
    },
    [files, onUpload, updateFileStatus]
  );

  /**
   * Agregar archivos
   */
  const addFiles = useCallback(
    async (newFiles: File[]) => {
      // Validar archivos
      const { validFiles, errors } = validateFiles(newFiles, files.length);

      // Mostrar errores
      errors.forEach((err) => {
        console.error(`${err.file.name}: ${err.error}`);
      });

      // Crear UploadFile objects
      const uploadFiles: UploadFile[] = await Promise.all(
        validFiles.map(async (file) => {
          const uploadFile: UploadFile = {
            id: generateFileId(),
            file,
            status: "idle",
            progress: 0,
          };

          // Generar preview si es imagen
          if (isImageFile(file)) {
            try {
              uploadFile.preview = await generateImagePreview(file);
            } catch (error) {
              console.error("Failed to generate preview:", error);
            }
          }

          return uploadFile;
        })
      );

      setFiles((prev) => {
        const updated = [...prev, ...uploadFiles];
        onFilesChange?.(updated);
        return updated;
      });

      // Auto-upload si está habilitado
      if (autoUpload && uploadFiles.length > 0) {
        uploadFiles.forEach((file) => {
          startUpload(file.id);
        });
      }
    },
    [files, validateFiles, onFilesChange, autoUpload, startUpload]
  );

  /**
   * Remover archivo
   */
  const removeFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);

        // Limpiar preview URL
        if (file?.preview) {
          revokePreviewUrl(file.preview);
        }

        const updated = prev.filter((f) => f.id !== id);
        onFilesChange?.(updated);
        return updated;
      });
    },
    [onFilesChange]
  );

  /**
   * Limpiar todos los archivos
   */
  const clearAll = useCallback(() => {
    // Limpiar todos los previews
    files.forEach((file) => {
      if (file.preview) {
        revokePreviewUrl(file.preview);
      }
    });

    setFiles([]);
    onFilesChange?.([]);
  }, [files, onFilesChange]);

  /**
   * Reintentar upload de un archivo con error
   */
  const retryUpload = useCallback(
    (id: string) => {
      updateFileStatus(id, "idle", 0, undefined);
      startUpload(id);
    },
    [updateFileStatus, startUpload]
  );

  /**
   * Iniciar upload de todos los archivos pendientes
   */
  const uploadAll = useCallback(() => {
    files.forEach((file) => {
      if (file.status === "idle") {
        startUpload(file.id);
      }
    });
  }, [files, startUpload]);

  // Cleanup previews al desmontar
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          revokePreviewUrl(file.preview);
        }
      });
    };
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearAll,
    startUpload,
    retryUpload,
    uploadAll,
    updateFileStatus,
  };
}
