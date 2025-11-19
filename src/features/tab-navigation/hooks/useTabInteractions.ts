import { useCallback, useEffect, useRef, useState } from "react";

interface UseTabInteractionsProps {
  onSelect: (id: string) => void;
  onEdit?: (id: string, newLabel: string) => void;
  onDelete?: (id: string) => void;
}

export function useTabInteractions({
  onSelect,
  onEdit,
  onDelete,
}: UseTabInteractionsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus cuando empieza a editar
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  /**
   * Iniciar edición
   */
  const startEditing = useCallback((id: string, currentLabel: string) => {
    setEditingId(id);
    setEditValue(currentLabel);
  }, []);

  /**
   * Confirmar edición
   */
  const confirmEdit = useCallback(() => {
    if (editingId && editValue.trim() && onEdit) {
      onEdit(editingId, editValue.trim());
    }
    setEditingId(null);
    setEditValue("");
  }, [editingId, editValue, onEdit]);

  /**
   * Cancelar edición
   */
  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValue("");
  }, []);

  /**
   * Handle click en tab
   */
  const handleTabClick = useCallback(
    (id: string) => {
      if (editingId !== id) {
        onSelect(id);
      }
    },
    [editingId, onSelect]
  );

  /**
   * Handle double click para editar
   */
  const handleTabDoubleClick = useCallback(
    (id: string, currentLabel: string) => {
      startEditing(id, currentLabel);
    },
    [startEditing]
  );

  /**
   * Handle key press en input de edición
   */
  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        confirmEdit();
      } else if (e.key === "Escape") {
        cancelEdit();
      }
    },
    [confirmEdit, cancelEdit]
  );

  /**
   * Handle delete
   */
  const handleDelete = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (onDelete) {
        onDelete(id);
      }
    },
    [onDelete]
  );

  return {
    editingId,
    editValue,
    setEditValue,
    inputRef,
    startEditing,
    confirmEdit,
    cancelEdit,
    handleTabClick,
    handleTabDoubleClick,
    handleEditKeyDown,
    handleDelete,
  };
}
