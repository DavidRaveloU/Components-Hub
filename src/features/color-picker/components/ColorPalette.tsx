// Paleta de colores extraídos

import type { ColorFormat, ExtractedColor, RGBColor } from '../types/colorPicker.types';
import { Loader2, Palette } from 'lucide-react';

import { ColorCard } from './ColorCard';
import { useState } from 'react';

interface ColorPaletteProps {
  colors: ExtractedColor[];
  format: ColorFormat;
  isExtracting: boolean;
  onCopyColor: (color: RGBColor) => void;
  copied: boolean;
  numColors: number;
  onNumColorsChange: (num: number) => void;
}

export function ColorPalette({
  colors,
  format,
  isExtracting,
  onCopyColor,
  copied,
  numColors,
  onNumColorsChange,
}: ColorPaletteProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (color: RGBColor, index: number) => {
    onCopyColor(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isExtracting) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm text-gray-600">Extracting colors...</p>
      </div>
    );
  }

  if (colors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <div className="p-4 bg-gray-100 rounded-full">
          <Palette className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">No colors extracted yet</p>
          <p className="text-xs text-gray-500 mt-1">Upload an image to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Extracted Colors ({colors.length})
        </h3>

        {/* Number of colors selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="numColors" className="text-sm font-medium text-gray-700">
            Colors:
          </label>
          <select
            id="numColors"
            value={numColors}
            onChange={(e) => onNumColorsChange(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Color grid */}
      <div className="grid grid-row-2 sm:grid-row-3 md:grid-row-4 lg:grid-row-6 gap-4">
        {colors.map((color, index) => (
          <ColorCard
            key={`${color.hex}-${index}`}
            color={color}
            format={format}
            onCopy={() => handleCopy(color.rgb, index)}
            isCopied={copied && copiedIndex === index}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">Click</span> on any color card to copy its value to clipboard
        </p>
      </div>
    </div>
  );
}