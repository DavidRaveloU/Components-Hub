// Utilidades (formatear tamaño, validar tipo)

/**
 * Formatear tamaño de archivo en bytes a formato legible
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Validar si un archivo cumple con el tamaño máximo
 */
export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}

/**
 * Validar si un archivo es de un tipo permitido
 */
export function validateFileType(file: File, acceptedTypes: string[]): boolean {
  // Si no hay restricción, todo es válido
  if (acceptedTypes.length === 0) return true;

  return acceptedTypes.some((type) => {
    // Tipo genérico (ej: image/*)
    if (type.endsWith("/*")) {
      const baseType = type.split("/")[0];
      return file.type.startsWith(baseType + "/");
    }

    // Extensión específica (ej: .pdf)
    if (type.startsWith(".")) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }

    // Tipo MIME exacto (ej: image/png)
    return file.type === type;
  });
}

/**
 * Obtener extensión de un archivo
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
}

/**
 * Generar ID único para archivo
 */
export function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Verificar si un archivo es una imagen
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}
