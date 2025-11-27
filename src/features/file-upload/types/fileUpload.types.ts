// Tipos
/**
 * Estado de un archivo
 */
export type FileStatus = "idle" | "uploading" | "success" | "error";

/**
 * Estado de la zona de drop
 */
export type DropZoneStatus = "idle" | "dragover" | "uploading" | "error";

/**
 * Archivo con metadata
 */
export interface UploadFile {
  id: string;
  file: File;
  preview?: string;
  status: FileStatus;
  progress: number;
  error?: string;
}

/**
 * Configuración de validación
 */
export interface FileValidationConfig {
  maxSize?: number;
  acceptedTypes?: string[];
  maxFiles?: number;
}

/**
 * Props del componente principal
 */
export interface FileUploadProps {
  maxSize?: number;
  acceptedTypes?: string[];
  maxFiles?: number;
  multiple?: boolean;
  onUpload?: (files: File[]) => Promise<void>;
  onFilesChange?: (files: UploadFile[]) => void;
}

/**
 * Props del DropZone
 */
export interface DropZoneProps {
  onDrop: (files: File[]) => void;
  acceptedTypes?: string[];
  status: DropZoneStatus;
  multiple?: boolean;
}

/**
 * Props del FileItem
 */
export interface FileItemProps {
  file: UploadFile;
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
  onCancel?: (id: string) => void;
}
