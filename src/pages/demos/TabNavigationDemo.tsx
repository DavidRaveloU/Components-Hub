import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tab } from "@/features/tab-navigation";
import { TabNavigation } from "@/features/tab-navigation";
import { useState } from "react";

export function TabNavigationDemo() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "tab-1",
      type: "analytics",
      label: "Analytics",
      order: 0,
      isActive: true,
    },
    {
      id: "tab-2",
      type: "notifications",
      label: "Notifications",
      order: 1,
      isActive: false,
    },
    {
      id: "tab-3",
      type: "messages",
      label: "Messages",
      order: 2,
      isActive: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimalista */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Back to components</span>
          </Link>
        </div>
      </header>

      {/* Demo - Centrado y limpio */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        <TabNavigation
          initialTabs={tabs}
          allowAdd={true}
          allowDelete={true}
          allowEdit={true}
          allowReorder={true}
          onTabsChange={setTabs}
        />
      </main>
    </div>
  );
}
