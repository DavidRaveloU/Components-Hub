import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Plus } from "lucide-react";
import type { TabType } from "../types/tab.types";
import { cn } from "@/utils/cn";
import { createPortal } from "react-dom";
import { getAvailableTabTypes } from "../config/tabTypes";

interface AddTabButtonProps {
  onAddTab: (type: TabType) => void;
  existingTypes?: TabType[];
}

export function AddTabButton({
  onAddTab,
  existingTypes = [],
}: AddTabButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: -1, left: -1 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableTypes = getAvailableTabTypes();

  // Calcular posición ANTES del paint (useLayoutEffect)
  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const modalWidth = 520; // Ancho del modal
      const modalHeight = 400; // Altura máxima aproximada del modal
      const gap = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.bottom + gap;
      let left = rect.left;

      // Verificar si el modal cabe debajo del botón
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < modalHeight + gap && spaceAbove > spaceBelow) {
        // No cabe debajo pero sí arriba - mostrar arriba
        top = rect.top - modalHeight - gap;
      }

      // Verificar límites horizontales
      if (left + modalWidth > viewportWidth) {
        // Se sale por la derecha - alinear a la derecha
        left = viewportWidth - modalWidth - 16; // 16px de margen
      }

      // Asegurar que no se salga por la izquierda
      if (left < 16) {
        left = 16;
      }

      // eslint-disable-next-line -- Valid use of setState in useLayoutEffect for DOM positioning
      setPosition({ top, left });
    } else if (!isOpen) {
      // Resetear posición cuando se cierra para forzar recálculo en próxima apertura
      setPosition({ top: -1, left: -1 });
    }
  }, [isOpen]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAddTab = (type: TabType) => {
    onAddTab(type);
    setIsOpen(false);
  };

  // No mostrar el modal hasta que tenga posición calculada
  const shouldShowModal = isOpen && position.top > 0 && position.left >= 0;

  return (
    <>
      {/* Botón Add page */}
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        type="button"
        className={cn(
          "h-8 px-2.5 py-1 rounded-lg flex justify-center items-center gap-1.5",
          "text-sm font-medium leading-tight transition-all duration-300 transition-spring",
          "flex-shrink-0 transform-gpu",
          "bg-gray-400/15 hover:bg-gray-400/35 hover:scale-105",
          "text-gray-600",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F72E2]",
          "focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_rgba(47,114,226,0.1)]",
          isOpen && "bg-gray-400/35 scale-105"
        )}
      >
        <Plus className="w-4 h-4" />
        <span>Add page</span>
      </button>

      {/* Dropdown Modal - Solo mostrar cuando la posición esté calculada */}
      {shouldShowModal &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] w-[520px] bg-white rounded-xl shadow-2xl border border-gray-200 animate-spring-fade"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">
                Choose a page type
              </h3>
            </div>

            {/* List de opciones */}
            <div className="p-2 max-h-[400px] overflow-y-auto">
              {availableTypes.map((typeConfig) => {
                const Icon = typeConfig.icon;
                const alreadyExists = existingTypes.includes(typeConfig.type);

                return (
                  <button
                    key={typeConfig.type}
                    onClick={() =>
                      !alreadyExists && handleAddTab(typeConfig.type)
                    }
                    disabled={alreadyExists}
                    type="button"
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg",
                      "text-left transition-all duration-200 transition-spring",
                      alreadyExists
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50 hover:scale-[1.02] cursor-pointer active:scale-[0.98]"
                    )}
                  >
                    {/* Icon con fondo de color */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 bg-blue-100">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {typeConfig.defaultLabel}
                        </h4>
                        {alreadyExists && (
                          <span className="text-xs text-gray-400 font-medium">
                            Already added
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {typeConfig.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
