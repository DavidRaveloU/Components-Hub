import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home";
import { TabNavigationDemo } from "@/pages/demos/TabNavigationDemo";
import { TimeSlotPickerDemo } from "@/pages/demos/TimeSlotPickerDemo";
import { ToastNotificationDemo } from "@/pages/demos/ToastNotificationDemo";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo/tab-navigation" element={<TabNavigationDemo />} />
      <Route path="/demo/time-slot-picker" element={<TimeSlotPickerDemo />} />
      <Route path="/demo/toast-notification" element={<ToastNotificationDemo />} />

      {/* Ruta 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>

              <a
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
