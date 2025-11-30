// Canvas con imagen + eyedropper

import { EyedropperZoom } from './EyedropperZoom';
import { Pipette } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ImageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isEyedropperActive: boolean;
  onToggleEyedropper: () => void;
  hoveredPixel: { r: number; g: number; b: number } | null;
  zoomPosition: { x: number; y: number } | null;
  cursorPosition: { x: number; y: number } | null;
}

export function ImageCanvas({
  canvasRef,
  isEyedropperActive,
  onToggleEyedropper,
  hoveredPixel,
  zoomPosition,
  cursorPosition,
}: ImageCanvasProps) {
  return (
    <div className="space-y-4">
      {/* Eyedropper toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Image Preview</h3>
        
        <button
          onClick={onToggleEyedropper}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
            isEyedropperActive
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          <Pipette className="w-4 h-4" />
          {isEyedropperActive ? 'Eyedropper Active' : 'Activate Eyedropper'}
        </button>
      </div>

      {/* Canvas container */}
      <div className="relative bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex justify-center items-center min-h-[400px] shadow-sm">
        <canvas
          ref={canvasRef}
          className={cn(
            'max-w-full h-auto max-h-[600px] object-contain',
            isEyedropperActive && 'cursor-crosshair'
          )}
        />

        {/* Zoom preview */}
        {isEyedropperActive && hoveredPixel && zoomPosition && cursorPosition && (
          <EyedropperZoom
            canvasRef={canvasRef}
            position={zoomPosition}
            cursorPosition={cursorPosition}
            color={hoveredPixel}
          />
        )}
      </div>

      {/* Instructions */}
      {isEyedropperActive && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Click</span> on any pixel to copy its color to clipboard
          </p>
        </div>
      )}
    </div>
  );
}