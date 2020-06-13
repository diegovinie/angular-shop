import React, { useState } from 'react';
import './Filters.scss';

const Filters = props => {
  const {
    categories,
    customFilters,
    priceFilters,
    filterChange,
    label,
  } = props;

  const showFilters = true;

  const [sideShown, setSideShown] = useState(false);

  const onInputChange = (filter, type) => e => {
    filterChange({
      type,
      filter,
      isChecked: e.target.checked,
      change: e.target.checked ? 1 : -1
    })
  };

  return (
    <div id="react-Filters" className="Filters">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setSideShown(true)}>
        Filters
      </button>
      <div className="filters">
        <button
          type="button"
          className="close-side-btn"
          onClick={() => setSideShown(false)}
        >
          x
        </button>
        <h5>Filtrar por categoría</h5>
        {showFilters && (
          <form>
            {categories && categories.map(filter => (
              <div
                key={filter.name}
                className="category-filter filter-wrapper"
              >
                <label className="fake-checkbox">
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={onInputChange(filter, 'category')}
                  />
                  <span
                    className="square"
                  >
                    <span className="fill"></span>
                  </span>
                  <span className="label">
                    {filter.name}
                  </span>
                  <span></span>
                </label>
              </div>
            ))}
          </form>
        )}
        <h5>Filtrar por precio</h5>
        {showFilters && (
          <form>
            {priceFilters.map(filter => (
              <div
                key={filter.name}
                className="custom-filter filter-wrapper"
              >
                  <label className="fake-checkbox">
                    <input
                      type="radio"
                      name="price"
                      defaultChecked={filter.checked}
                      onClick={onInputChange(filter, 'price')}
                    />
                    <span className="circle">
                      <span className="fill"></span>
                    </span>
                    <span className="label">
                      {filter.name}
                    </span>
                    <span></span>
                  </label>
              </div>
            ))}
          </form>
        )}

        <h5>Filtros personalizados</h5>
        {showFilters && (
          <form>
            {customFilters.map(filter => (
              <div
                key={filter.name}
                className="custom-filter filter-wrapper"
              >
                  <label className="fake-checkbox">
                    <input
                      type="radio"
                      name="custom"
                      defaultChecked={filter.checked}
                      onClick={onInputChange(filter, 'custom')}
                    />
                    <span className="circle">
                      <span className="fill"></span>
                    </span>
                    <span className="label">
                      {filter.name}
                    </span>
                    <span></span>
                  </label>
              </div>
            ))}
          </form>
        )}
      </div>
    </div>
  );
};

export default Filters;
