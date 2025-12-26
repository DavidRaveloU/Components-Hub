import { useState } from 'react';

export function useExpandableCard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const expand = (id: string) => {
    setSelectedId(id);
  };

  const collapse = () => {
    setSelectedId(null);
  };

  return {
    selectedId,
    expand,
    collapse,
    isExpanded: selectedId !== null,
  };
}
