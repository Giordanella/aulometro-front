import { useState } from "react";

const useBorrarItem = (deleteItemById, onDelete) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (itemId) => {
    setLoading(true);
    try {
      await deleteItemById(itemId);
      onDelete(itemId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting the item:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    loading,
  };
};

export default useBorrarItem;
