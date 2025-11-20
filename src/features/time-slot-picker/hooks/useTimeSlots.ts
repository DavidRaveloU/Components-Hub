// Estado global de días y rangos de tiempo

import type { DayOfWeek, DaySlot, TimeRange } from "../types/timeSlot.types";
import { useCallback, useState } from "react";

import { generateTimeId } from "../utils/timeUtils";

interface UseTimeSlotsProps {
  initialDays?: DaySlot[];
  onChange?: (days: DaySlot[]) => void;
}

export function useTimeSlots({
  initialDays = [],
  onChange,
}: UseTimeSlotsProps = {}) {
  // Estado principal
  const [days, setDays] = useState<DaySlot[]>(
    initialDays.length > 0 ? initialDays : getDefaultDays()
  );

  // Función toggle ON/OFF
  const toggleDay = useCallback(
    (dayId: string) => {
      const updatedDays = days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            enabled: !day.enabled,
          };
        }
        return day;
      });
      setDays(updatedDays);
      onChange?.(updatedDays);
    },
    [days, onChange]
  );

  // Función para agregar un nuevo rango a un día
  const addTimeRange = useCallback(
    (dayId: string) => {
      const updatedDays = days.map((day) => {
        if (day.id === dayId) {
          const newRange: TimeRange = {
            id: generateTimeId(),
            from: "09:00",
            to: "17:00",
          };
          return {
            ...day,
            timeRanges: [...day.timeRanges, newRange],
          };
        }
        return day;
      });
      setDays(updatedDays);
      onChange?.(updatedDays);
    },
    [days, onChange]
  );

  // Función para actualizar rango
  const updateTimeRange = useCallback(
    (dayId: string, rangeId: string, field: "from" | "to", value: string) => {
      const updatedDays = days.map((day) => {
        if (day.id === dayId) {
          const updatedRanges = day.timeRanges.map((range) => {
            if (range.id === rangeId) {
              return {
                ...range,
                [field]: value,
              };
            }
            return range;
          });
          return {
            ...day,
            timeRanges: updatedRanges,
          };
        }
        return day;
      });
      setDays(updatedDays);
      onChange?.(updatedDays);
    },
    [days, onChange]
  );

  // Función para eliminar rango
  const deleteTimeRange = useCallback(
    (dayId: string, rangeId: string) => {
      const updatedDays = days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            timeRanges: day.timeRanges.filter((range) => range.id !== rangeId),
          };
        }
        return day;
      });
      setDays(updatedDays);
      onChange?.(updatedDays);
    },
    [days, onChange]
  );

  // Función para eliminar todos los rangos de un día
  const clearDayRanges = useCallback(
    (dayId: string) => {
      const updatedDays = days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            timeRanges: [],
          };
        }
        return day;
      });
      setDays(updatedDays);
      onChange?.(updatedDays);
    },
    [days, onChange]
  );

  return {
    days,
    toggleDay,
    addTimeRange,
    updateTimeRange,
    deleteTimeRange,
    clearDayRanges,
  };
}

// Helper: Generar los 7 días por defecto
function getDefaultDays(): DaySlot[] {
  const daysOfWeek: DayOfWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return daysOfWeek.map((day, index) => ({
    id: `day-${index}`,
    day,
    enabled: false,
    timeRanges: [],
  }));
}
