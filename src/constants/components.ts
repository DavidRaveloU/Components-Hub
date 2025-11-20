import type { ComponentInfo } from "@/types/component";

/** Lista de todos los componentes del hub */
export const COMPONENTS: ComponentInfo[] = [
  {
    id: "tab-navigation",
    name: "Tab Navigation",
    description:
      "Navigate between different content sections with animated tabs",
    category: "Navigation",
    tags: ["tabs", "navigation", "animated", "accessibility"],
    route: "/demo/tab-navigation",
    difficulty: "easy",
  },
  {
    id: "time-slot-picker",
    name: "Time Slot Picker",
    description: "Select time slots with drag and drop",
    category: "Input",
    tags: ["time", "slot", "picker", "drag and drop", "accessibility"],
    route: "/demo/time-slot-picker",
    difficulty: "easy",
  },
  {
    id: "toast-notification",
    name: "Toast Notification",
    description: "Show toast notifications",
    category: "Feedback",
    tags: ["toast", "notification", "accessibility"],
    route: "/demo/toast-notification",
    difficulty: "medium",
  },
];

/** Obtener todas las categorías únicas */
export const getCategories = () => {
  return Array.from(new Set(COMPONENTS.map((c) => c.category)));
};

/** Obtener componenetes por categorías */
export const getComponentsByCategory = (category: string) => {
  return COMPONENTS.filter((c) => c.category === category);
};

/** Obtener componente por id */
export const getComponentById = (id: string) => {
  return COMPONENTS.find((c) => c.id === id);
};
