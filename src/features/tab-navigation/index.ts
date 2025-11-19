// Componente principal
export { TabNavigation } from "./components/TabNavigation";

// Componentes individuales (por si se quieren usar por separado)
export { AddTabButton } from "./components/AddTabButton";
export { TabComponent } from "./components/Tab";
export { TabList } from "./components/TabList";
export { TabPanel } from "./components/TabPanel";

// Hooks (exportables para uso avanzado)
export { useDragAndDrop } from "./hooks/useDragAndDrop";
export { useScrollControls } from "./hooks/useScrollControls";
export { useTabInteractions } from "./hooks/useTabInteractions";
export { useTabManager } from "./hooks/useTabManager";

// Tipos
export type {
  Tab,
  TabNavigationProps,
  TabProps,
  TabType,
  TabTypeConfig,
} from "./types/tab.types";

// Config
export {
  getAvailableTabTypes,
  getTabTypeConfig,
  TAB_TYPES,
} from "./config/tabTypes";
