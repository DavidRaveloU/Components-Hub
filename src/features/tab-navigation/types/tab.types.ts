import type { LucideIcon } from "lucide-react";

/* Tipos de tabs disponibles */
export type TabType =
  | "payment"
  | "login"
  | "dashboard"
  | "profile"
  | "settings"
  | "analytics"
  | "notifications"
  | "messages";

/* Configuración de cada tipo de tab */
export interface TabTypeConfig {
  type: TabType;
  defaultLabel: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

/* Estructura de una tab individual */
export interface Tab {
  id: string;
  type: TabType;
  label: string;
  order: number;
  isActive: boolean;
  content?: React.ReactNode;
}

/* Props para el componente Tab */
export interface TabProps {
  tab: Tab;
  isActive: boolean;
  isDragging?: boolean; // <-- AGREGAR
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newLabel: string) => void;
}
/* Props para TabNavegation (componente principal) */
export interface TabNavigationProps {
  initialTabs?: Tab[];
  allowAdd?: boolean;
  allowDelete?: boolean;
  allowEdit?: boolean;
  allowReorder?: boolean;
  onTabsChange?: (tabs: Tab[]) => void;
}
