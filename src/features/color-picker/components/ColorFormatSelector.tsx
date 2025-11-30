// Selector RGB/HEX/HSL/HTML

import type { ColorFormat } from '../types/colorPicker.types';
import { cn } from '@/utils/cn';

interface ColorFormatSelectorProps {
  selectedFormat: ColorFormat;
  onChange: (format: ColorFormat) => void;
}

const FORMATS: ColorFormat[] = ['RGB', 'HEX', 'HSL', 'HTML'];

export function ColorFormatSelector({ selectedFormat, onChange }: ColorFormatSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Format:</span>
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {FORMATS.map((format) => (
          <button
            key={format}
            onClick={() => onChange(format)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
              selectedFormat === format
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}