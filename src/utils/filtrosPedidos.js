export const loadFiltros = () => {
    try {
      const saved = localStorage.getItem("filtrosPedidos");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Error leyendo filtros del localStorage", e);
      return {};
    }
  };