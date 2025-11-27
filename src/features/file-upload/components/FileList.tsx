import { FileItem } from './FileItem';
import type { UploadFile } from '../types/fileUpload.types';

interface FileListProps {
  files: UploadFile[];
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
}

export function FileList({ files, onRemove, onRetry }: FileListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Files ({files.length})
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>
            {files.filter((f) => f.status === 'success').length} completed
          </span>
          {files.some((f) => f.status === 'error') && (
            <span className="text-red-600">
              • {files.filter((f) => f.status === 'error').length} failed
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onRemove={onRemove}
            onRetry={onRetry}
          />
        ))}
      </div>
    </div>
  );
}