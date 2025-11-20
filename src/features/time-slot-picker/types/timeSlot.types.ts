// Tipos: DaySlot, TimeRange, TimeSlotPickerProps
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface TimeRange {
  id: string;
  from: string;
  to: string;
}

export interface DaySlot {
  id: string;
  day: DayOfWeek;
  enabled: boolean;
  timeRanges: TimeRange[];
}

export interface ParsedTime {
  hours: number;
  minutes: number;
}

export interface TimeSlotPickerProps {
  initialDays?: DaySlot[];
  onChange?: (days: DaySlot[]) => void;
}
