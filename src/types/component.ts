/** Nivel de dificultad */
export type ComponentDifficulty = "easy" | "medium" | "hard";

/** Categorías para organizar los componentes */
export type ComponentCategory =
  | "Navigation"
  | "Input"
  | "Layout"
  | "Data Display"
  | "Feedback"
  | "Animation";

/** Información completa de un componente del hub*/
export interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  route: string;
  difficulty: ComponentDifficulty;
  thumbnail?: string;
  dependencies?: string[];
}
