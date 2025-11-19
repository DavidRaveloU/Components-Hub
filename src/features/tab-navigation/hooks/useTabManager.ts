import type { Tab, TabType } from "../types/tab.types";
import { useCallback, useState } from "react";

import { getTabTypeConfig } from "../config/tabTypes";

interface UseTabManagerProps {
  initialTabs?: Tab[];
  onTabsChange?: (tabs: Tab[]) => void;
}
export function useTabManager({
  initialTabs = [],
  onTabsChange,
}: UseTabManagerProps = {}) {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState<string | null>(
    initialTabs.find((t) => t.isActive)?.id || initialTabs[0]?.id || null
  );

  /**
   * Agregar nueva tab
   */
  const addTab = useCallback(
    (type: TabType) => {
      const config = getTabTypeConfig(type);
      if (!config) return;

      const newTab: Tab = {
        id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        label: config.defaultLabel,
        order: tabs.length,
        isActive: false,
      };

      const updatedTabs = [...tabs, newTab];
      setTabs(updatedTabs);
      setActiveTabId(newTab.id); // Activar la nueva tab
      onTabsChange?.(updatedTabs);
    },
    [tabs, onTabsChange]
  );

  /**
   * Eliminar tab
   */
  const removeTab = useCallback(
    (id: string) => {
      const updatedTabs = tabs.filter((tab) => tab.id !== id);

      // Si se elimina la tab activa, activar la primera disponible
      if (activeTabId === id && updatedTabs.length > 0) {
        setActiveTabId(updatedTabs[0].id);
      } else if (updatedTabs.length === 0) {
        setActiveTabId(null);
      }

      setTabs(updatedTabs);
      onTabsChange?.(updatedTabs);
    },
    [tabs, activeTabId, onTabsChange]
  );

  /**
   * Cambiar tab activa
   */
  const setActiveTab = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  /**
   * Editar label de una tab
   */
  const updateTabLabel = useCallback(
    (id: string, newLabel: string) => {
      const updatedTabs = tabs.map((tab) =>
        tab.id === id ? { ...tab, label: newLabel } : tab
      );
      setTabs(updatedTabs);
      onTabsChange?.(updatedTabs);
    },
    [tabs, onTabsChange]
  );

  /**
   * Reordenar tabs (llamado después del drag & drop)
   */
  const reorderTabs = useCallback(
    (newTabs: Tab[]) => {
      const reorderedTabs = newTabs.map((tab, index) => ({
        ...tab,
        order: index,
      }));
      setTabs(reorderedTabs);
      onTabsChange?.(reorderedTabs);
    },
    [onTabsChange]
  );

  /**
   * Obtener tab activa
   */
  const activeTab = tabs.find((tab) => tab.id === activeTabId) || null;

  return {
    tabs,
    activeTabId,
    activeTab,
    addTab,
    removeTab,
    setActiveTab,
    updateTabLabel,
    reorderTabs,
  };
}
