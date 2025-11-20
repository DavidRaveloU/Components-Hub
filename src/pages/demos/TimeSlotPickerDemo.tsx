import type { DaySlotType } from "@/features/time-slot-picker";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { TimeSlotPicker } from "@/features/time-slot-picker";
import { useState } from "react";

export function TimeSlotPickerDemo() {
  const [selectedDays, setSelectedDays] = useState<DaySlotType[]>([]);

  const handleChange = (days: DaySlotType[]) => {
    setSelectedDays(days);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header minimalista */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Back to components</span>
          </Link>
        </div>
      </header>

      {/* Demo - Centrado y limpio */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Time Slot Picker
          </h1>
          <p className="text-gray-600">
            Select available time slots for each day of the week
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Time Slot Picker */}
          <div className="lg:col-span-2">
            <TimeSlotPicker onChange={handleChange} />
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selected Schedule
              </h3>
              
              {selectedDays.filter(day => day.enabled).length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  No days selected yet
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedDays
                    .filter((day) => day.enabled)
                    .map((day) => (
                      <div key={day.id} className="border-l-2 border-blue-500 pl-3">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {day.day}
                        </h4>
                        <div className="space-y-1">
                          {day.timeRanges.map((range) => (
                            <p key={range.id} className="text-xs text-gray-600">
                              {range.from} - {range.to}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}