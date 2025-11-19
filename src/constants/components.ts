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
