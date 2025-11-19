import { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { createPortal } from "react-dom";

interface RenameModalProps {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
  onConfirm: (newName: string) => void;
}

export function RenameModal({
  isOpen,
  currentName,
  onClose,
  onConfirm,
}: RenameModalProps) {
  const [value, setValue] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  // Reset value cuando cambia currentName
  useEffect(() => {
    setValue(currentName);
  }, [currentName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onConfirm(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[9998] animate-in fade-in-0 duration-150"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-150">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">
              Rename page
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page name
            </label>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full px-3 py-2 border border-gray-300 rounded-lg",
                "text-sm text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-[#2F72E2] focus:border-[#2F72E2]",
                "transition-all"
              )}
              placeholder="Enter page name..."
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!value.trim()}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors",
                  value.trim()
                    ? "bg-[#2F72E2] hover:bg-[#2563D4]"
                    : "bg-gray-300 cursor-not-allowed"
                )}
              >
                Rename
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}
