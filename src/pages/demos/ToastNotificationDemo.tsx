import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ToastNotificationDemo() {
  // Estado para el panel de control
  const [toastType, setToastType] = useState<"success" | "error" | "warning" | "info" | "default">("success");
  const [position, setPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right">("top-right");
  const [animation, setAnimation] = useState<"slide" | "fade" | "bounce" | "zoom">("slide");
  const [hasTimer, setHasTimer] = useState(true);
  const [duration, setDuration] = useState(5000);
  const [title, setTitle] = useState("Success!");
  const [description, setDescription] = useState("Your file was saved successfully!");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Toast Notifications
          </h1>
          <p className="text-gray-600">
            Customizable toast notifications with stacking, animations, and auto-dismiss
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Customize Toast
              </h2>

              <div className="space-y-6">
                {/* Toast Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["success", "error", "warning", "info", "default"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setToastType(type)}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transition-ios
                          ${toastType === type
                            ? type === "success" ? "bg-green-100 text-green-700 border-2 border-green-500"
                            : type === "error" ? "bg-red-100 text-red-700 border-2 border-red-500"
                            : type === "warning" ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-500"
                            : type === "info" ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                            : "bg-gray-100 text-gray-700 border-2 border-gray-500"
                            : "bg-gray-50 text-gray-600 border-2 border-transparent hover:border-gray-300"
                          }
                        `}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Top Row */}
                    {(["top-left", "top-center", "top-right"] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPosition(pos)}
                        className={`
                          px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 transition-ios
                          ${position === pos
                            ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                            : "bg-gray-50 text-gray-600 border-2 border-transparent hover:border-gray-300"
                          }
                        `}
                      >
                        {pos.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </button>
                    ))}
                    {/* Bottom Row */}
                    {(["bottom-left", "bottom-center", "bottom-right"] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPosition(pos)}
                        className={`
                          px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 transition-ios
                          ${position === pos
                            ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                            : "bg-gray-50 text-gray-600 border-2 border-transparent hover:border-gray-300"
                          }
                        `}
                      >
                        {pos.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Animation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["slide", "fade", "bounce", "zoom"] as const).map((anim) => (
                      <button
                        key={anim}
                        onClick={() => setAnimation(anim)}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transition-ios
                          ${animation === anim
                            ? "bg-purple-100 text-purple-700 border-2 border-purple-500"
                            : "bg-gray-50 text-gray-600 border-2 border-transparent hover:border-gray-300"
                          }
                        `}
                      >
                        {anim.charAt(0).toUpperCase() + anim.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timer Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Auto Dismiss
                    </label>
                    <button
                      onClick={() => setHasTimer(!hasTimer)}
                      className={`
                        relative w-11 h-6 rounded-full transition-all duration-200 transition-ios
                        ${hasTimer ? "bg-green-500" : "bg-gray-300"}
                      `}
                    >
                      <span
                        className={`
                          absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md
                          transition-transform duration-200 transition-ios
                          ${hasTimer ? "translate-x-5" : "translate-x-0"}
                        `}
                      />
                    </button>
                  </div>

                  {/* Duration Slider */}
                  {hasTimer && (
                    <div className="animate-ios-slide-down">
                      <label className="block text-xs text-gray-600 mb-2">
                        Duration: {duration / 1000}s
                      </label>
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="500"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-ios"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-ios resize-none"
                  />
                </div>

                {/* Generate Button */}
                <button
                  className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 transition-ios-out shadow-lg shadow-blue-500/30"
                >
                  Generate Toast
                </button>

                {/* Clear All Button */}
                <button
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 transition-ios text-sm"
                >
                  Clear All Toasts
                </button>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-8 min-h-[600px] relative sticky top-8">
              <div className="text-center text-gray-400 mt-32">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Toast Preview Area
                </h3>
                <p className="text-sm text-gray-500">
                  Click "Generate Toast" to see your customized notification
                </p>
              </div>

              {/* Aquí aparecerán los toasts en las diferentes posiciones */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}