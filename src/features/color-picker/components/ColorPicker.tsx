// Componente principal

import { ColorFormatSelector } from './ColorFormatSelector';
import { ColorPalette } from './ColorPalette';
import { CopyNotification } from './CopyNotification';
import { ImageCanvas } from './ImageCanvas';
import { ImageUploader } from './ImageUploader';
import { useColorPicker } from '../hooks/useColorPicker';

interface ColorPickerProps {
  defaultNumColors?: number;
}

export function ColorPicker({ defaultNumColors = 6 }: ColorPickerProps) {
  const {
    canvasRef,
    image,
    imageError,
    handleImageUpload,
    handleClear,
    extractedColors,
    isExtracting,
    numColors,
    handleNumColorsChange,
    selectedFormat,
    setSelectedFormat,
    eyedropper,
    copied,
    handleCopyColor,
  } = useColorPicker({ defaultNumColors });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Copy notification */}
      <CopyNotification show={copied} />

      {/* Image uploader */}
      <ImageUploader
        onUpload={handleImageUpload}
        onClear={handleClear}
        hasImage={!!image}
        error={imageError}
      />

      {/* Main content area */}
      {image && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left column: Image Canvas */}
          <div className="lg:col-span-2">
            <ImageCanvas
              canvasRef={canvasRef}
              isEyedropperActive={eyedropper.isActive}
              onToggleEyedropper={eyedropper.toggle}
              hoveredPixel={eyedropper.hoveredPixel}
              zoomPosition={eyedropper.zoomPosition}
              cursorPosition={eyedropper.cursorPosition}
            />
          </div>

          {/* Right column: Controls & Palette */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Color Palette</h3>
              
              <ColorFormatSelector
                selectedFormat={selectedFormat}
                onChange={setSelectedFormat}
              />

              <ColorPalette
                colors={extractedColors}
                format={selectedFormat}
                isExtracting={isExtracting}
                onCopyColor={handleCopyColor}
                copied={copied}
                numColors={numColors}
                onNumColorsChange={handleNumColorsChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}