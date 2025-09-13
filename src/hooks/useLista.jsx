import { useCallback, useState } from "react";

export function useLista(apiFunc) {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    const response = await apiFunc();
    setItems(response.data.rows);
  }, [apiFunc]);

  return { items, setItems, fetchItems};
}
