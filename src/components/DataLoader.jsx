const DataLoader = ({ loading, error, children, fallbackLoading = "Cargando...", fallbackError = "Error al cargar" }) => {
  if (loading) {return <p>{fallbackLoading}</p>;}
  if (error) {return <p>{fallbackError}</p>;}
  return <>{children}</>;
};

export default DataLoader;