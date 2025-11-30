// Lógica del cuentagotas

import { getCanvasCoordinates, getPixelColor } from "../utils/canvasUtils";
import { useCallback, useEffect, useState } from "react";

import type { RGBColor } from "../types/colorPicker.types";

interface UseEyedropperProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onColorPick?: (color: RGBColor) => void;
}

export function useEyedropper({ canvasRef, onColorPick }: UseEyedropperProps) {
  const [isActive, setIsActive] = useState(false);
  const [hoveredPixel, setHoveredPixel] = useState<RGBColor | null>(null);
  const [zoomPosition, setZoomPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!canvasRef.current || !isActive) return;

      const canvas = canvasRef.current;
      const coords = getCanvasCoordinates(canvas, e.clientX, e.clientY);

      // Verificar que las coordenadas estén dentro del canvas
      if (
        coords.x < 0 ||
        coords.y < 0 ||
        coords.x >= canvas.width ||
        coords.y >= canvas.height
      ) {
        setHoveredPixel(null);
        setZoomPosition(null);
        setCursorPosition(null);
        return;
      }

      // Obtener color del pixel
      const color = getPixelColor(canvas, coords.x, coords.y);
      setHoveredPixel(color);
      setZoomPosition(coords);

      // Guardar posición del cursor para el zoom
      setCursorPosition({ x: e.clientX, y: e.clientY });
    },
    [canvasRef, isActive]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!canvasRef.current || !isActive || !hoveredPixel) return;

      e.preventDefault();
      e.stopPropagation();

      // Llamar callback con el color seleccionado
      onColorPick?.(hoveredPixel);

      // Desactivar eyedropper después de seleccionar
      setIsActive(false);
      setHoveredPixel(null);
      setZoomPosition(null);
      setCursorPosition(null);
    },
    [canvasRef, isActive, hoveredPixel, onColorPick]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredPixel(null);
    setZoomPosition(null);
    setCursorPosition(null);
  }, []);

  // Agregar/remover event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canvasRef, isActive, handleMouseMove, handleClick, handleMouseLeave]);

  const activate = useCallback(() => {
    setIsActive(true);
  }, []);

  const deactivate = useCallback(() => {
    setIsActive(false);
    setHoveredPixel(null);
    setZoomPosition(null);
    setCursorPosition(null);
  }, []);

  const toggle = useCallback(() => {
    setIsActive((prev) => !prev);
    if (isActive) {
      setHoveredPixel(null);
      setZoomPosition(null);
      setCursorPosition(null);
    }
  }, [isActive]);

  return {
    isActive,
    hoveredPixel,
    zoomPosition,
    cursorPosition,
    activate,
    deactivate,
    toggle,
  };
}
