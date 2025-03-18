const SelectRuta = ({ rutas = [], value, onChange }) => {
  return (
    <>
      <select
        name="HeadlineAct"
        id="HeadlineAct"
        className="border-gray-300 text-amarilloLogo text-center"
        onChange={onChange}
        value={value}
      >
        <option value="">Elige la ruta</option>
        { rutas 
          ? rutas.map((item, index) => (
            <option key={index} value={item.nombre}>
              {item.nombre}
            </option>
          ) ) : (null)}
      </select>
    </>
  );
}

export default SelectRuta;