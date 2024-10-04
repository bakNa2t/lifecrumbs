const Select = () => {
  return (
    <select className="text-sm md:text-base py-1 px-2 rounded-lg bg-dark-3 font-medium outline-none">
      <option value="date-asc" className="text-sm md:text-base">
        date asc
      </option>
      <option value="date-desc" className="text-sm md:text-base">
        date desc
      </option>
    </select>
  );
};

export default Select;
