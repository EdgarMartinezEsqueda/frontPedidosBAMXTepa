const Select = ({ name, value, options = [], onChange, placeholder }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block rounded-md border border-gray-300 px-3 py-2 focus:border-verdeLogo focus:outline-none focus:ring-2 focus:ring-verdeLogo text-gray-700 mx-auto"
    >
      <option value="">{placeholder}</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nombre}
        </option>
      ))}
    </select>
  );
};

export default Select;