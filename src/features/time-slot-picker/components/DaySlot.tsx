// Componente de cada día (Monday, Tuesday, etc.)

import { AddMoreButton } from "./AddMoreButton";
import type { DaySlot as DaySlotType } from "../types/timeSlot.types";
import { TimeRangeInput } from "./TimeRangeInput";
import { cn } from "@/utils/cn";
import { useTimeValidation } from "../hooks/useTimeValidation";

interface DaySlotProps {
  day: DaySlotType;
  onToggle: (dayId: string) => void;
  onAddRange: (dayId: string) => void;
  onUpdateRange: (dayId: string, rangeId: string, field: "from" | "to", value: string) => void;
  onDeleteRange: (dayId: string, rangeId: string) => void;
}

export const DaySlot = ({
  day,
  onToggle,
  onAddRange,
  onUpdateRange,
  onDeleteRange,
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-200 hover:shadow-sm">
      {/* Header: Day name + Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{day.day}</h3>
        
        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          className={cn(
            "relative w-11 h-6 rounded-full transition-all duration-200 transition-spring",
            day.enabled ? "bg-green-500" : "bg-gray-300"
          )}
          aria-label={`Toggle ${day.day}`}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md",
              "transition-transform duration-200 transition-spring",
              day.enabled ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
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
