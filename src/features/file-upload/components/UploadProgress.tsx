import type { FileStatus } from '../types/fileUpload.types';
import { cn } from '@/utils/cn';

interface UploadProgressProps {
  progress: number;
  status: FileStatus;
}

export function UploadProgress({ progress, status }: UploadProgressProps) {
  const progressColor = {
    idle: 'bg-gray-300',
    uploading: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
  }[status];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-700">
          {status === 'uploading' && `${progress}%`}
          {status === 'success' && 'Complete'}
          {status === 'error' && 'Failed'}
          {status === 'idle' && 'Pending'}
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            progressColor
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}