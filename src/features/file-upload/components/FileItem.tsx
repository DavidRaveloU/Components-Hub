import { File as FileGeneric, FileText, Image as ImageIcon, RefreshCw, X } from 'lucide-react';
import { formatFileSize, getFileExtension, isImageFile } from '../utils/fileUtils';

import type { FileItemProps } from '../types/fileUpload.types';
import { UploadProgress } from './UploadProgress';
import { cn } from '@/utils/cn';

export function FileItem({ file, onRemove, onRetry }: FileItemProps) {
  const extension = getFileExtension(file.file.name);
  const isImage = isImageFile(file.file);

  // Icono según tipo de archivo
  const FileTypeIcon = isImage
    ? ImageIcon
    : extension === 'PDF'
    ? FileText
    : FileGeneric;

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border-2 transition-all',
        file.status === 'success' && 'bg-green-50 border-green-200',
        file.status === 'error' && 'bg-red-50 border-red-200',
        file.status === 'uploading' && 'bg-blue-50 border-blue-200',
        file.status === 'idle' && 'bg-gray-50 border-gray-200'
      )}
    >
      {/* Preview o Icono */}
      <div className="flex-shrink-0">
        {file.preview ? (
          <img
            src={file.preview}
            alt={file.file.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
            <FileTypeIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {file.file.name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {formatFileSize(file.file.size)} • {extension}
        </p>

        {/* Error message */}
        {file.error && (
          <p className="text-xs text-red-600 mt-1">{file.error}</p>
        )}

        {/* Progress bar */}
        <div className="mt-2">
          <UploadProgress progress={file.progress} status={file.status} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-1">
        {/* Retry button (solo para errores) */}
        {file.status === 'error' && onRetry && (
          <button
            onClick={() => onRetry(file.id)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Retry upload"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Remove button */}
        <button
          onClick={() => onRemove(file.id)}
          className="p-1.5 rounded-md hover:bg-red-100 transition-colors"
          aria-label="Remove file"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
}