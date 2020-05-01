import React from 'react';
import './SortFilters.scss';

const SortFilters = props => {
  const {
    filters,
    sortChange
  } = props;

  const onSelectChange = e => {
    sortChange(e.target.value);
  };

  return (
    <div id="react-SortFilters" className="sort-filters wrapper">
      <label htmlFor="">Ordenar por</label>
      <select onChange={onSelectChange}>
        {filters.map(filter => (
          <option
            key={`filter-${filter.name}`}
            value={filter.value}
          >
            {filter.name}
          </option>
        ))}
      </select>
      <div className="triangle"></div>
    </div>
  );
};

export default SortFilters;
