import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../features/dataSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.data.filters);

  const handleSortChange = (e) => {
    dispatch(setFilters({ sortBy: e.target.value }));
  };

  const handleSearchChange = (e) => {
    dispatch(setFilters({ searchQuery: e.target.value }));
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Sök..."
        value={filters.searchQuery}
        onChange={handleSearchChange}
      />
      <select value={filters.sortBy} onChange={handleSortChange}>
        <option value="name">Namn</option>
        <option value="value">Värde</option>
      </select>
    </div>
  );
};

export default Filter;