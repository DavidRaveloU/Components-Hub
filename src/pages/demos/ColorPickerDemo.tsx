import { ColorPicker } from '@/features/color-picker/components/ColorPicker';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ColorPickerDemo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Back to components</span>
          </Link>
        </div>
      </header>

      {/* Demo */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Color Picker
          </h1>
          <p className="text-lg text-gray-600">
            Extract colors from images, pick with eyedropper, and create palettes
          </p>
        </div>

        <ColorPicker />
      </main>
    </div>
  );
}
