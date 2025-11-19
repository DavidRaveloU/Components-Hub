import { GripVertical, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CSS } from "@dnd-kit/utilities";
import type { TabProps } from "../types/tab.types";
import { cn } from "@/utils/cn";
import { createPortal } from "react-dom";
import { getTabTypeConfig } from "../config/tabTypes";
import { useSortable } from "@dnd-kit/sortable";

interface ExtendedTabProps extends TabProps {
  onRename?: (id: string) => void;
  onSetFirst?: (id: string) => void;
  allowDelete?: boolean;
}

export function TabComponent({
  tab,
  isActive,
  onSelect,
  onDelete,
  onRename,
  onSetFirst,
  allowDelete = true,
  isDragging,
}: ExtendedTabProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // CONFIG — NO se usa en un return condicional aquí
  const config = getTabTypeConfig(tab.type);
  const Icon = config?.icon;

  const isBeingDragged = isDragging || isSortableDragging;

  // POSICIÓN DEL MENÚ
  useEffect(() => {
    if (menuOpen && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.left - 120,
      });
    }
  }, [menuOpen]);

  // CLICK FUERA PARA CERRAR MENÚ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleSetFirst = () => {
    onSetFirst?.(tab.id);
    setMenuOpen(false);
  };

  const handleRename = () => {
    onRename?.(tab.id);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(tab.id);
    setMenuOpen(false);
  };

  if (!config) return null;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "h-8 px-2.5 py-1 rounded-lg flex justify-center items-center gap-1.5",
          "text-sm font-medium leading-tight transition-all duration-300 ease-out",
          "relative group flex-shrink-0 transform-gpu",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F72E2]",
          "focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_rgba(47,114,226,0.1)]",
          isActive
            ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-gray-200 cursor-grab"
            : "bg-gray-400/15 hover:bg-gray-400/35 cursor-grab",
          isBeingDragged && "opacity-30 scale-95"
        )}
        onClick={() => onSelect(tab.id)}
      >
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className={cn(
            "cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100",
            "text-gray-400 hover:text-gray-500 transition-opacity",
            "touch-none -ml-1 flex items-center"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>

        {/* Icon */}
        <div
          className={cn(
            "flex items-center",
            isActive ? "text-gray-700" : "text-gray-500"
          )}
        >
          {Icon && <Icon className="w-4 h-4" />}
        </div>

        {/* Label */}
        <span
          className={cn(
            "text-sm font-medium select-none",
            isActive ? "text-gray-900" : "text-gray-600"
          )}
        >
          {tab.label}
        </span>

        {/* Botón menú */}
        <button
          ref={menuButtonRef}
          onClick={handleMenuClick}
          className={cn(
            "p-0.5 rounded flex items-center",
            "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
            "transition-all duration-200",
            "opacity-0 group-hover:opacity-100",
            menuOpen && "opacity-100 bg-gray-100"
          )}
          aria-label="More options"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* MENU DESPLEGABLE */}
      {menuOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] w-[180px] bg-white rounded-lg shadow-xl border border-gray-200 py-1 animate-in fade-in-0 zoom-in-95 duration-150"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <button
              onClick={handleSetFirst}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Set as first page
            </button>

            <button
              onClick={handleRename}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Rename
            </button>

            <div className="h-px bg-gray-200 my-1" />

            {allowDelete && (
              <button
                onClick={handleDelete}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
