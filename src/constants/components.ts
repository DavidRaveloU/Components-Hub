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
  {
    id: "file-upload",
    name: "File Upload",
    description:
      "Upload files with drag & drop, preview, and progress tracking",
    category: "Input",
    tags: ["upload", "file", "drag-drop", "preview"],
    route: "/demo/file-upload",
    difficulty: "medium",
    dependencies: ["react"],
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description:
      "Extract colors from images, pick with eyedropper, and create palettes",
    category: "Input",
    tags: ["color", "picker", "eyedropper", "palette", "image"],
    route: "/demo/color-picker",
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
