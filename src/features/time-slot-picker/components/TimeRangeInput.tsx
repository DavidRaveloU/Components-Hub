// Componente de rango "From - To" con auto-corrección

import { adjustToTime, isValidTimeRange } from "../utils/timeUtils";
import { useEffect, useRef } from "react";

import type { TimeRange } from "../types/timeSlot.types";
import { Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface TimeRangeInputProps {
  range: TimeRange;
  onUpdate: (rangeId: string, field: "from" | "to", value: string) => void;
  onDelete: (rangeId: string) => void;
  showDelete?: boolean;
  hasOverlap?: boolean;
}

export const TimeRangeInput = ({
  range,
  onUpdate,
  onDelete,
  showDelete = true,
  hasOverlap = false,
}: TimeRangeInputProps) => {
  const prevFromRef = useRef(range.from);

  // Detectar cuando 'from' cambia y ajustar 'to' si es necesario
  useEffect(() => {
    if (prevFromRef.current !== range.from) {
      prevFromRef.current = range.from;
      
      // Solo ajustar 'to' si from >= to
      if (!isValidTimeRange(range.from, range.to)) {
        const adjustedTo = adjustToTime(range.from);
        onUpdate(range.id, "to", adjustedTo);
      }
    }
  }, [range.from, range.to, range.id, onUpdate]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = e.target.value;
    onUpdate(range.id, "from", newFrom);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = e.target.value;
    onUpdate(range.id, "to", newTo);
  };

  const handleDelete = () => {
    onDelete(range.id);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3 animate-ios-slide-down">
        {/* From Input */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            From
          </label>
          <input
            type="time"
            value={range.from}
            onChange={handleFromChange}
            className={cn(
              "w-full px-3 py-2 rounded-lg border transition-all duration-200 transition-ios",
              "text-sm font-medium",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              hasOverlap
                ? "border-orange-300 bg-orange-50 text-orange-900"
                : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
            )}
          />
        </div>

        {/* Separator */}
        <div className="text-gray-400 font-medium pt-6">→</div>

        {/* To Input */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            To
          </label>
          <input
            type="time"
            value={range.to}
            onChange={handleToChange}
            className={cn(
              "w-full px-3 py-2 rounded-lg border transition-all duration-200 transition-ios",
              "text-sm font-medium",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              hasOverlap
                ? "border-orange-300 bg-orange-50 text-orange-900"
                : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
            )}
          />
        </div>

        {/* Delete Button */}
        {showDelete && (
          <button
            onClick={handleDelete}
            className={cn(
              "mt-6 p-2 rounded-lg transition-all duration-200 transition-ios-out",
              "text-gray-400 hover:text-red-600 hover:bg-red-50",
              "focus:outline-none focus:ring-2 focus:ring-red-500",
              "hover:scale-105 active:scale-95"
            )}
            aria-label="Delete time range"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Overlap Warning - Fuera del flex container */}
      {hasOverlap && (
        <div className="mt-1 text-xs text-orange-600 animate-ios-fade-expand flex items-center gap-1">
          <span>⚠️</span>
          <span>Time overlap detected</span>
        </div>
      )}
    </div>
  );
};