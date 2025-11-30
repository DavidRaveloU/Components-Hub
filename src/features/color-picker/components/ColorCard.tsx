// Card individual de color

import { Check, Copy } from 'lucide-react';
import type { ColorFormat, ExtractedColor } from '../types/colorPicker.types';

import { cn } from '@/utils/cn';
import { formatColor } from '../utils/colorConversion';

interface ColorCardProps {
  color: ExtractedColor;
  format: ColorFormat;
  onCopy: () => void;
  isCopied: boolean;
}

export function ColorCard({ color, format, onCopy, isCopied }: ColorCardProps) {
  const formattedValue = formatColor(color.rgb, format);
  const hexColor = color.hex;

  // Determinar si el color es oscuro para ajustar el texto
  const isDark = (color.rgb.r * 0.299 + color.rgb.g * 0.587 + color.rgb.b * 0.114) < 128;

  return (
    <button
      onClick={onCopy}
      className={cn(
        'group relative overflow-hidden rounded-xl transition-all duration-200',
        'hover:scale-105 hover:shadow-xl active:scale-95',
        'border-2 border-gray-200 hover:border-gray-300'
      )}
    >
      {/* Color preview */}
      <div
        className="h-32 relative"
        style={{ backgroundColor: hexColor }}
      >
        {/* Copy icon overlay */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          'bg-black/0 group-hover:bg-black/10 transition-all duration-200'
        )}>
          {isCopied ? (
            <div className="p-3 bg-white rounded-full shadow-lg animate-ios-bounce-in">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          ) : (
            <div className={cn(
              'p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all',
              isDark ? 'bg-white' : 'bg-gray-900'
            )}>
              <Copy className={cn(
                'w-5 h-5',
                isDark ? 'text-gray-900' : 'text-white'
              )} />
            </div>
          )}
        </div>
      </div>

      {/* Color value */}
      <div className="p-3 bg-white">
        <p className="text-sm font-mono font-semibold text-gray-900 truncate">
          {formattedValue}
        </p>
      </div>
    </button>
  );
}