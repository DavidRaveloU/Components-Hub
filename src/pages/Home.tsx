import { COMPONENTS, getCategories } from "@/constants/components";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { ComponentCard } from "@/components/home/ComponentCard";
import type { ComponentCategory } from "@/types/component";
import { Search } from "lucide-react";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ComponentCategory | "all"
  >("all");

  const categories = getCategories();

  // Filtrar componentes según búsqueda y categoría
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredComponents = useMemo(() => {
    return COMPONENTS.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        component.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || component.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Component Hub
            </h1>
            <p className="text-gray-600 text-lg">
              A collection of reusable React components with live demos
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search components, tags, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className="transition-all"
            >
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 px-4 py-2"
              >
                All ({COMPONENTS.length})
              </Badge>
            </button>
            {categories.map((category) => {
              const count = COMPONENTS.filter(
                (c) => c.category === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category as ComponentCategory)
                  }
                  className="transition-all"
                >
                  <Badge
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    className="cursor-pointer hover:scale-105 px-4 py-2"
                  >
                    {category} ({count})
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No components found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              Showing {filteredComponents.length} component
              {filteredComponents.length !== 1 ? "s" : ""}
            </div>

            {/* Grid de componentes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
