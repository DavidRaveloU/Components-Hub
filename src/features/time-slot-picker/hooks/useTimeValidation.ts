// Validación de overlaps entre rangos de tiempo

import type { TimeRange } from "../types/timeSlot.types";
import { hasOverlap } from "../utils/timeUtils";
import { useCallback } from "react";

export interface ValidationResult {
  hasOverlap: boolean;
  overlappingRanges?: string[]; // IDs de rangos que se solapan
}

export function useTimeValidation() {
  /**
   * Detecta si hay overlaps entre rangos y retorna los IDs afectados
   */
  const checkOverlaps = useCallback((ranges: TimeRange[]): ValidationResult => {
    if (ranges.length < 2) {
      return { hasOverlap: false };
    }

    const overlapping = hasOverlap(ranges);

    if (!overlapping) {
      return { hasOverlap: false };
    }

    // Encontrar qué rangos específicos se solapan
    const overlappingIds: string[] = [];
    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        // Lógica simplificada de detección
        const range1 = ranges[i];
        const range2 = ranges[j];

        if (range1.from < range2.to && range2.from < range1.to) {
          if (!overlappingIds.includes(range1.id))
            overlappingIds.push(range1.id);
          if (!overlappingIds.includes(range2.id))
            overlappingIds.push(range2.id);
        }
      }
    }

    return {
      hasOverlap: true,
      overlappingRanges: overlappingIds,
    };
  }, []);

  return {
    checkOverlaps,
  };
}
