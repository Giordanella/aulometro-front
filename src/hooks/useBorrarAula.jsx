import { useState } from "react";
import { deleteAulaById } from "../api/aulas";

export function useBorrarAula(onDelete) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (aulaId) => {
    setLoading(true);
    try {
      await deleteAulaById(aulaId);
      onDelete(aulaId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al borrar el aula:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    loading
  };
}
