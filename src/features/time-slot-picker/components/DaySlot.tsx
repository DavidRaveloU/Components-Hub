// Componente de cada día (Monday, Tuesday, etc.)

import { AddMoreButton } from "./AddMoreButton";
import type { DaySlot as DaySlotType } from "../types/timeSlot.types";
import { TimeRangeInput } from "./TimeRangeInput";
import { Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTimeValidation } from "../hooks/useTimeValidation";

interface DaySlotProps {
  day: DaySlotType;
  onToggle: (dayId: string) => void;
  onAddRange: (dayId: string) => void;
  onUpdateRange: (dayId: string, rangeId: string, field: "from" | "to", value: string) => void;
  onDeleteRange: (dayId: string, rangeId: string) => void;
  onClearAll: (dayId: string) => void;
}

export const DaySlot = ({
  day,
  onToggle,
  onAddRange,
  onUpdateRange,
  onDeleteRange,
  onClearAll,
}: DaySlotProps) => {
  const { checkOverlaps } = useTimeValidation();
  
  // Verificar overlaps
  const validation = checkOverlaps(day.timeRanges);
  const overlappingIds = validation.overlappingRanges || [];

  const handleToggle = () => {
    onToggle(day.id);
  };

  const handleAddRange = () => {
    onAddRange(day.id);
  };

  const handleUpdateRange = (rangeId: string, field: "from" | "to", value: string) => {
    onUpdateRange(day.id, rangeId, field, value);
  };

  const handleDeleteRange = (rangeId: string) => {
    onDeleteRange(day.id, rangeId);
  };

  const handleClearAll = () => {
    onClearAll(day.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-200 hover:shadow-sm">
      {/* Header: Day name + Clear button + Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{day.day}</h3>
        
        <div className="flex items-center gap-2">
          {/* Clear All Button - Solo visible cuando está enabled y tiene rangos */}
          {day.enabled && day.timeRanges.length > 0 && (
            <button
              onClick={handleClearAll}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200 transition-ios-out",
                "text-gray-400 hover:text-red-600 hover:bg-red-50",
                "focus:outline-none focus:ring-2 focus:ring-red-500",
                "animate-ios-fade-expand"
              )}
              aria-label={`Clear all time ranges for ${day.day}`}
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Toggle Switch */}
          <button
            onClick={handleToggle}
            className={cn(
              "relative w-11 h-6 rounded-full transition-all duration-200 transition-ios",
              day.enabled ? "bg-green-500" : "bg-gray-300"
            )}
            aria-label={`Toggle ${day.day}`}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md",
                "transition-transform duration-200 transition-ios",
                day.enabled ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </div>

      {/* Time Ranges - Only show when enabled */}
      {day.enabled && (
        <div className="space-y-3 animate-ios-height-expand">
          {day.timeRanges.map((range) => (
            <TimeRangeInput
              key={range.id}
              range={range}
              onUpdate={handleUpdateRange}
              onDelete={handleDeleteRange}
              showDelete={day.timeRanges.length > 1}
              hasOverlap={overlappingIds.includes(range.id)}
            />
          ))}

          {/* Add More Button */}
          <AddMoreButton onClick={handleAddRange} />
        </div>
      )}
    </div>
  );
};
