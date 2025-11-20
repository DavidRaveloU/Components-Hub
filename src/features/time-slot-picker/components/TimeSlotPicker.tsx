// Componente principal (contenedor de días)

import { DaySlot } from "./DaySlot";
import type { TimeSlotPickerProps } from "../types/timeSlot.types";
import { useTimeSlots } from "../hooks/useTimeSlots";

export const TimeSlotPicker = ({
  initialDays = [],
  onChange,
}: TimeSlotPickerProps) => {
  const {
    days,
    toggleDay,
    addTimeRange,
    updateTimeRange,
    deleteTimeRange,
    clearDayRanges,
  } = useTimeSlots({
    initialDays,
    onChange,
  });

  return (
    <div className="w-full max-w-2xl">
      <div className="space-y-4">
        {days.map((day) => (
          <DaySlot
            key={day.id}
            day={day}
            onToggle={toggleDay}
            onAddRange={addTimeRange}
            onUpdateRange={updateTimeRange}
            onDeleteRange={deleteTimeRange}
            onClearAll={clearDayRanges}
          />
        ))}
      </div>
    </div>
  );
};