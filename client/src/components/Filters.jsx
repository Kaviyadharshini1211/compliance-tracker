const Filters = ({ setFilters }) => {
  return (
    <div>
      <select
        onChange={(e) =>
          setFilters(f => ({ ...f, status: e.target.value }))
        }
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default Filters;