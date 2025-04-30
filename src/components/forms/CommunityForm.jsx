import { useState, useEffect } from "react";
import AcceptButton from "components/buttons/Accept";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Select from "components/selects/Select";
import api from "lib/axios";

const CommunityForm = ({ onSubmit, isSubmitting, existingCommunity }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    idMunicipio: "",
    jefa: "",
    contacto: "",
    direccion: "",
    idRuta: ""
  });

  // Inicializar datos si estamos editando
  useEffect(() => {
    if (existingCommunity) {
      setFormData({
        nombre: existingCommunity.nombre || "",
        idMunicipio: existingCommunity.idMunicipio || "",
        jefa: existingCommunity.jefa || "",
        contacto: existingCommunity.contacto || "",
        direccion: existingCommunity.direccion || "",
        idRuta: existingCommunity.idRuta || ""
      });
    }
  }, [existingCommunity]);
  // Obtener rutas y municipios
  const { data: rutas = [] } = useQuery({
    queryKey: ["rutas"],
    queryFn: async () => {
      const { data } = await api.get("/rutas");
      return data;
    },
    onError: () => toast.error("Error cargando rutas")
  });

  const { data: municipios = [] } = useQuery({
    queryKey: ["municipios"],
    queryFn: async () => {
      const { data } = await api.get("/municipios");
      return data;
    },
    onError: () => toast.error("Error cargando municipios")
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la comunidad
          </label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-verdeLogo focus:ring-verdeLogo"
            required
          />
        </div>

        {/* Selector de Municipio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Municipio perteneciente
          </label>
          <Select
            name="idMunicipio"
            options={municipios}
            value={formData.idMunicipio}
            onChange={handleChange}
            placeholder="Selecciona un municipio"
          />
        </div>

        {/* Selector de Ruta */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ruta asociada
          </label>
          <Select
            name="idRuta"
            options={rutas}
            value={formData.idRuta}
            onChange={handleChange}
            placeholder="Selecciona una ruta"
          />
        </div>

        {/* Campos restantes */}
        {["jefa", "contacto", "direccion"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {{
                jefa: "Jefa de comunidad",
                contacto: "Contacto de la jefa",
                direccion: "Dirección o enlace de mapa"
              }[field]}
            </label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-verdeLogo focus:ring-verdeLogo"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <AcceptButton
          disabled={isSubmitting}
          type="submit"
          label={isSubmitting 
            ? (existingCommunity ? "Actualizando..." : "Creando...") 
            : (existingCommunity ? "Actualizar Comunidad" : "Crear Comunidad")}
        />
      </div>
    </form>
  );
};

export default CommunityForm;