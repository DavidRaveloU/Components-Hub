import { FileUp, Upload } from 'lucide-react';

import type { DropZoneProps } from '../types/fileUpload.types';
import { cn } from '@/utils/cn';
import { useFileDrop } from '../hooks/useFileDrop';
import { useRef } from 'react';

export function DropZone({ onDrop, acceptedTypes = [], status, multiple = true }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useFileDrop();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onDrop(files);
    }
    // Reset input para permitir seleccionar el mismo archivo de nuevo
    e.target.value = '';
  };

  // Estado visual
  const isUploading = status === 'uploading';
  const hasError = status === 'error';

  return (
    <div
      className={cn(
        'relative w-full rounded-xl border-2 border-dashed transition-all duration-200',
        'flex flex-col items-center justify-center p-12 cursor-pointer',
        'hover:border-blue-400 hover:bg-blue-50/50',
        isDragging && 'border-blue-500 bg-blue-50 scale-[1.02]',
        isUploading && 'border-blue-400 bg-blue-50 pointer-events-none',
        hasError && 'border-red-400 bg-red-50',
        !isDragging && !isUploading && !hasError && 'border-gray-300 bg-gray-50/50'
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, onDrop)}
      onClick={handleClick}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Icon */}
      <div
        className={cn(
          'mb-4 p-4 rounded-full transition-all duration-200',
          isDragging && 'bg-blue-100 scale-110',
          isUploading && 'bg-blue-100 animate-pulse',
          hasError && 'bg-red-100',
          !isDragging && !isUploading && !hasError && 'bg-gray-100'
        )}
      >
        {isDragging ? (
          <FileUp className="w-8 h-8 text-blue-600" />
        ) : (
          <Upload className="w-8 h-8 text-gray-600" />
        )}
      </div>

      {/* Text */}
      <div className="text-center">
        {isDragging ? (
          <p className="text-base font-semibold text-blue-600">Drop files here</p>
        ) : isUploading ? (
          <p className="text-base font-semibold text-blue-600">Uploading...</p>
        ) : hasError ? (
          <p className="text-base font-semibold text-red-600">Upload failed</p>
        ) : (
          <>
            <p className="text-base font-semibold text-gray-900 mb-1">
              Drag & drop files here
            </p>
            <p className="text-sm text-gray-500">
              or <span className="text-blue-600 font-medium">browse</span> to choose files
            </p>
          </>
        )}
      </div>

      {/* Accepted types hint */}
      {acceptedTypes.length > 0 && !isDragging && !isUploading && (
        <p className="text-xs text-gray-400 mt-3">
          Accepted: {acceptedTypes.join(', ')}
        </p>
      )}
    </div>
  );
}