import { useState, useEffect } from "react";
import { getAulas } from "../api/aulas";

export function useListaAulas() {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await getAulas();
        setAulas(response.data);
      } catch (err) {
        console.error("Error al obtener aulas:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAulas();
  }, []);

  return { aulas, setAulas, loading, error };
}
