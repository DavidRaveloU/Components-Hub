import type { DropZoneStatus, FileUploadProps } from '../types/fileUpload.types';
import { Trash2, Upload as UploadIcon } from 'lucide-react';

import { DropZone } from './DropZone';
import { FileList } from './FileList';
import { cn } from '@/utils/cn';
import { useFileUpload } from '../hooks/useFileUpload';
import { useState } from 'react';

export function FileUpload({
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['image/*', '.pdf', '.doc', '.docx'],
  maxFiles = 10,
  multiple = true,
  onUpload,
  onFilesChange,
}: FileUploadProps) {
  const [dropZoneStatus, setDropZoneStatus] = useState<DropZoneStatus>('idle');

  const {
    files,
    addFiles,
    removeFile,
    clearAll,
    retryUpload,
    uploadAll,
  } = useFileUpload({
    maxSize,
    acceptedTypes,
    maxFiles,
    onUpload,
    onFilesChange,
    autoUpload: false, // Manual upload
  });

  const handleDrop = async (newFiles: File[]) => {
    await addFiles(newFiles);
  };

  const handleUploadAll = async () => {
    setDropZoneStatus('uploading');
    try {
      await uploadAll();
      setDropZoneStatus('idle');
    } catch (error) {
      setDropZoneStatus(error as DropZoneStatus);
    }
  };

  const hasFiles = files.length > 0;
  const hasPendingFiles = files.some((f) => f.status === 'idle');
  const isUploading = files.some((f) => f.status === 'uploading');
  const allCompleted = files.length > 0 && files.every((f) => f.status === 'success');

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Drop Zone */}
      <DropZone
        onDrop={handleDrop}
        acceptedTypes={acceptedTypes}
        status={dropZoneStatus}
        multiple={multiple}
      />

      {/* File List */}
      {hasFiles && (
        <FileList
          files={files}
          onRemove={removeFile}
          onRetry={retryUpload}
        />
      )}

      {/* Actions */}
      {hasFiles && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={clearAll}
            disabled={isUploading}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              'text-red-600 hover:bg-red-50',
              isUploading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>

          <div className="flex items-center gap-3">
            {allCompleted && (
              <span className="text-sm font-medium text-green-600">
                All files uploaded successfully!
              </span>
            )}
            
            {hasPendingFiles && (
              <button
                onClick={handleUploadAll}
                disabled={isUploading}
                className={cn(
                  'flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all',
                  'bg-blue-600 text-white hover:bg-blue-700 active:scale-95',
                  isUploading && 'opacity-50 cursor-not-allowed'
                )}
              >
                <UploadIcon className="w-4 h-4" />
                {isUploading ? 'Uploading...' : 'Upload All'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-gray-500 text-center space-y-1">
        <p>Maximum file size: {maxSize / (1024 * 1024)}MB</p>
        <p>Maximum {maxFiles} files allowed</p>
      </div>
    </div>
  );
}