import { useEffect, useRef } from "react";

interface UseScrollControlsProps {
  isEnabled: boolean;
  scrollSpeed?: number;
}

export function useScrollControls({
  isEnabled,
  scrollSpeed = 10,
}: UseScrollControlsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isEnabled) {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const threshold = 100; // Zona de activación en px

      // Scroll hacia la izquierda
      if (e.clientX < rect.left + threshold) {
        if (!scrollIntervalRef.current) {
          scrollIntervalRef.current = window.setInterval(() => {
            container.scrollLeft -= scrollSpeed;
          }, 16);
        }
      }
      // Scroll hacia la derecha
      else if (e.clientX > rect.right - threshold) {
        if (!scrollIntervalRef.current) {
          scrollIntervalRef.current = window.setInterval(() => {
            container.scrollLeft += scrollSpeed;
          }, 16);
        }
      }
      // Detener scroll
      else {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
          scrollIntervalRef.current = null;
        }
      }
    };

    const handleMouseUp = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isEnabled, scrollSpeed]);

  return { containerRef };
}
