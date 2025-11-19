import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";

import { AddTabButton } from "./AddTabButton";
import { RenameModal } from "./RenameModal";
import { TabComponent } from "./Tab";
import { TabList } from "./TabList";
import type { TabNavigationProps } from "../types/tab.types";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useScrollControls } from "../hooks/useScrollControls";
import { useState } from "react";
import { useTabManager } from "../hooks/useTabManager";

export function TabNavigation({
  initialTabs = [],
  allowAdd = true,
  allowDelete = true,
  allowReorder = true,
  onTabsChange,
}: TabNavigationProps) {
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renamingTabId, setRenamingTabId] = useState<string | null>(null);

  const {
    tabs,
    activeTabId,
    addTab,
    removeTab,
    setActiveTab,
    updateTabLabel,
    reorderTabs,
  } = useTabManager({ initialTabs, onTabsChange });

  const {
    sensors,
    activeId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useDragAndDrop({
    tabs,
    onReorder: reorderTabs,
  });

  const { containerRef } = useScrollControls({
    isEnabled: !!activeId,
    scrollSpeed: 10,
  });

  const existingTypes = tabs.map((tab) => tab.type);

  const handleSetFirst = (id: string) => {
    const tabIndex = tabs.findIndex((t) => t.id === id);
    if (tabIndex > 0) {
      const newTabs = [...tabs];
      const [movedTab] = newTabs.splice(tabIndex, 1);
      newTabs.unshift(movedTab);
      reorderTabs(newTabs);
    }
  };

  const handleRename = (id: string) => {
    setRenamingTabId(id);
    setRenameModalOpen(true);
  };

  const handleRenameConfirm = (newName: string) => {
    if (renamingTabId) {
      updateTabLabel(renamingTabId, newName);
    }
    setRenameModalOpen(false);
    setRenamingTabId(null);
  };

  const handleRenameClose = () => {
    setRenameModalOpen(false);
    setRenamingTabId(null);
  };

  const activeTab = tabs.find((tab) => tab.id === activeId);
  const renamingTab = tabs.find((tab) => tab.id === renamingTabId);

  return (
    <>
      <div className="w-full">
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex items-center gap-1 min-w-min">
            {allowReorder ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
              >
                <TabList
                  tabs={tabs}
                  activeTabId={activeTabId}
                  onSelect={setActiveTab}
                  onDelete={allowDelete ? removeTab : undefined}
                  onRename={handleRename}
                  onSetFirst={handleSetFirst}
                  allowDelete={allowDelete}
                />

                <DragOverlay
                  dropAnimation={{
                    duration: 300,
                    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                  }}
                  style={{
                    cursor: "grabbing",
                  }}
                >
                  {activeTab ? (
                    <div
                      className="cursor-grabbing transform-gpu"
                      style={{
                        transform: "rotate(-3deg) scale(1.05)",
                        transition: "transform 0.2s ease-out",
                      }}
                    >
                      <TabComponent
                        tab={activeTab}
                        isActive={activeTab.id === activeTabId}
                        onSelect={() => {}}
                        isDragging={true}
                      />
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            ) : (
              <TabList
                tabs={tabs}
                activeTabId={activeTabId}
                onSelect={setActiveTab}
                onDelete={allowDelete ? removeTab : undefined}
                onRename={handleRename}
                onSetFirst={handleSetFirst}
                allowDelete={allowDelete}
              />
            )}

            {allowAdd && (
              <AddTabButton onAddTab={addTab} existingTypes={existingTypes} />
            )}
          </div>
        </div>
      </div>

      {/* Rename Modal */}
      <RenameModal
        isOpen={renameModalOpen}
        currentName={renamingTab?.label || ""}
        onClose={handleRenameClose}
        onConfirm={handleRenameConfirm}
      />
    </>
  );
}
