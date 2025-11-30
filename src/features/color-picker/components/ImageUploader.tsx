// Subir imagen

import { Upload, X } from 'lucide-react';

import { cn } from '@/utils/cn';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  onClear?: () => void;
  hasImage: boolean;
  error?: string | null;
}

export function ImageUploader({ onUpload, onClear, hasImage, error }: ImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      {!hasImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={cn(
            'relative border-2 border-dashed rounded-xl p-12 transition-all',
            'hover:border-blue-400 hover:bg-blue-50/50',
            'cursor-pointer group',
            error ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900 mb-1">
                Upload an image
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supports: JPG, PNG, GIF, WebP (Max 10MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <Upload className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Image loaded</p>
              <p className="text-xs text-gray-500">Ready to extract colors</p>
            </div>
          </div>

          {onClear && (
            <button
              onClick={onClear}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Clear image"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}