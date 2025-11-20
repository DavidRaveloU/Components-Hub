// Botón "Add More" para agregar rangos

import { Plus } from "lucide-react";
import { cn } from "@/utils/cn";

interface AddMoreButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const AddMoreButton = ({ onClick, disabled = false }: AddMoreButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full py-2.5 px-4 rounded-lg border-2 border-dashed",
        "text-sm font-medium transition-all duration-200 transition-ios",
        "flex items-center justify-center gap-2",
        disabled
          ? "border-gray-200 text-gray-300 cursor-not-allowed"
          : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer active:scale-[0.98]"
      )}
    >
      <Plus className="w-4 h-4" />
      <span>Add More</span>
    </button>
  );
};