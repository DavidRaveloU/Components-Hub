// Círculo con zoom del pixel

import { useEffect, useRef } from 'react';

import type { RGBColor } from '../types/colorPicker.types';
import { rgbToHex } from '../utils/colorConversion';

interface EyedropperZoomProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  position: { x: number; y: number };
  cursorPosition: { x: number; y: number };
  color: RGBColor;
}

const ZOOM_SIZE = 120; // Tamaño del círculo de zoom
const GRID_SIZE = 11; // Tamaño de la cuadrícula (debe ser impar)

export function EyedropperZoom({
  canvasRef,
  position,
  cursorPosition,
  color,
}: EyedropperZoomProps) {
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const zoomCanvas = zoomCanvasRef.current;
    if (!canvas || !zoomCanvas) return;

    const ctx = canvas.getContext('2d');
    const zoomCtx = zoomCanvas.getContext('2d');
    if (!ctx || !zoomCtx) return;

    // Limpiar canvas de zoom
    zoomCtx.clearRect(0, 0, ZOOM_SIZE, ZOOM_SIZE);

    // Calcular área a capturar
    const halfGrid = Math.floor(GRID_SIZE / 2);
    const sourceX = Math.max(0, position.x - halfGrid);
    const sourceY = Math.max(0, position.y - halfGrid);
    const sourceWidth = Math.min(GRID_SIZE, canvas.width - sourceX);
    const sourceHeight = Math.min(GRID_SIZE, canvas.height - sourceY);

    // Obtener datos de imagen
    const imageData = ctx.getImageData(sourceX, sourceY, sourceWidth, sourceHeight);

    // Dibujar pixeles ampliados
    const pixelSize = ZOOM_SIZE / GRID_SIZE;

    for (let y = 0; y < sourceHeight; y++) {
      for (let x = 0; x < sourceWidth; x++) {
        const i = (y * sourceWidth + x) * 4;
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        zoomCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        zoomCtx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }

    // Dibujar cuadrícula
    zoomCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    zoomCtx.lineWidth = 1;

    for (let i = 0; i <= GRID_SIZE; i++) {
      const pos = i * pixelSize;
      // Líneas verticales
      zoomCtx.beginPath();
      zoomCtx.moveTo(pos, 0);
      zoomCtx.lineTo(pos, ZOOM_SIZE);
      zoomCtx.stroke();

      // Líneas horizontales
      zoomCtx.beginPath();
      zoomCtx.moveTo(0, pos);
      zoomCtx.lineTo(ZOOM_SIZE, pos);
      zoomCtx.stroke();
    }

    // Resaltar pixel central
    const centerX = halfGrid * pixelSize;
    const centerY = halfGrid * pixelSize;

    zoomCtx.strokeStyle = '#fff';
    zoomCtx.lineWidth = 2;
    zoomCtx.strokeRect(centerX, centerY, pixelSize, pixelSize);

    zoomCtx.strokeStyle = '#000';
    zoomCtx.lineWidth = 1;
    zoomCtx.strokeRect(centerX + 1, centerY + 1, pixelSize - 2, pixelSize - 2);
  }, [canvasRef, position]);

  // Posicionar el zoom cerca del cursor
  const zoomStyle: React.CSSProperties = {
    position: 'fixed',
    left: cursorPosition.x + 20,
    top: cursorPosition.y + 20,
    pointerEvents: 'none',
    zIndex: 9999,
  };

  return (
    <div style={zoomStyle} className="animate-ios-fade-in">
      <div className="bg-white rounded-full p-2 shadow-2xl border-2 border-gray-300">
        <canvas
          ref={zoomCanvasRef}
          width={ZOOM_SIZE}
          height={ZOOM_SIZE}
          className="rounded-full"
          style={{ width: ZOOM_SIZE, height: ZOOM_SIZE }}
        />
      </div>

      {/* Color info */}
      <div className="mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-mono text-center shadow-lg">
        <div className="font-semibold">{rgbToHex(color)}</div>
        <div className="text-gray-400 mt-0.5">
          RGB({color.r}, {color.g}, {color.b})
        </div>
      </div>
    </div>
  );
}