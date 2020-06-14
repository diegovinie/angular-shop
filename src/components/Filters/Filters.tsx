import React, { useState } from 'react';
import { Filter, Category } from 'shared/models';
import { ChangeEvent } from 'shared/types';
import './Filters.scss';

export interface FiltersProps {
  categories: Array<Category>;
  customFilters: Array<Filter>;
  priceFilters: Array<Filter>;
  filterChange: Function;
}

const Filters: React.FC<FiltersProps> = props => {
  const {
    categories,
    customFilters,
    priceFilters,
    filterChange,
  } = props;

  const showFilters = true;

  const [sideShown, setSideShown] = useState(false);

  const onInputChange = (filter: Filter | Category, type: string) => (e: ChangeEvent) => {
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
      <div className={`filters ${sideShown ? 'side-shown' : ''}`}>
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
                      onChange={onInputChange(filter, 'price')}
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
                      onChange={onInputChange(filter, 'custom')}
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
