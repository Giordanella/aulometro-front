import { useEffect, useState } from "react";

const DataLoader = ({ fetchData, children, fallbackLoading = "Cargando...", fallbackError = "Error al cargar" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchData();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetchData]);

  if (loading) {return <p>{fallbackLoading}</p>;}
  if (error) {return <p>{fallbackError}</p>;}
  return <>{children}</>;
};

export default DataLoader;
