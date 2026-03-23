import { useState } from "react";
import "../styles/Filters.css";

const Filters = ({ setFilters }) => {
  const [active, setActive] = useState("");

  const handleFilter = (value) => {
    setActive(value);
    setFilters(f => ({ ...f, status: value }));
  };

  return (
    <div className="filters-bar">
      {["", "Pending", "Completed"].map((option) => (
        <button
          key={option}
          className={`filter-btn ${active === option ? "active" : ""}`}
          onClick={() => handleFilter(option)}
        >
          {option === "" ? "All" : option}
        </button>
      ))}
    </div>
  );
};

export default Filters;