import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { TabComponent } from "./Tab";
import type { Tab as TabType } from "../types/tab.types";

interface TabListProps {
  tabs: TabType[];
  activeTabId: string | null;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
  onSetFirst?: (id: string) => void;
  allowDelete?: boolean;
}

export function TabList({
  tabs,
  activeTabId,
  onSelect,
  onDelete,
  onRename,
  onSetFirst,
  allowDelete = true,
}: TabListProps) {
  return (
    <SortableContext
      items={tabs.map((t) => t.id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <TabComponent
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            onSelect={onSelect}
            onDelete={onDelete}
            onRename={onRename}
            onSetFirst={onSetFirst}
            allowDelete={allowDelete}
          />
        ))}
      </div>
    </SortableContext>
  );
}
