import React, { Component } from 'react';
import Filters from './components/Filters';
import Showcase from './components/Showcase';
import SearchBar from './components/SearchBar';
import Cart from './components/Cart';
import UrlForm from './components/UrlForm';
import SortFilters from './components/SortFilters';

class App extends Component {
  state = {
    originalData: [],

    customFilters: [
      { name: 'Todo', value: 'all', checked: true },
      { name: 'Disponible', value: 'available', checked: false },
      { name: 'No disponible', value: 'unavailable', checked: false },
      { name: 'Mejor vendido', value: 'bestseller', checked: false }
    ],

    priceFilters: [
      { name: 'Todo', value: 'all', checked: true },
      { name: 'Precio > 30.000', value: 'more_30000', checked: false },
      { name: 'Precio < 10.000', value: 'less_10000', checked: false }
    ],

    sortFilters: [
      { name: 'Nombre (A to Z)', value: 'name' },
      { name: 'Precio (low to high)', value: 'priceAsc' },
      { name: 'Precio (high to low)', value: 'priceDes' }
    ],

    products: [],
  }

  constructor(props) {
    super(props);

    this.onURLChange = this.onURLChange.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.sortProducts = this.sortProducts.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onURLChange() {

  }

  onFilterChange() {

  }

  sortProducts() {

  }

  onSearchChange() {

  }

  render() {
    const {
      originalData,
      customFilters,
      priceFilters,
      sortFilters,
      products,
    } this.state;

    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="filters-wrapper">
                <UrlForm urlChange={this.onURLChange} />
                <Cart />
                <Filters
                  categories={originalData && originalData.categories}
                  customFilters={customFilters}
                  priceFilters={priceFilters}
                  filterChange={this.onFilterChange}
                />
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-8">
                  <div className="sort-filters-wrapper">
                    <SortFilters
                      filters={sortFilters}
                      sortChange={this.sortProducts}
                    />
                  </div>
                </div>
                <SearchBar searchChange={this.onSearchChange} className="col-4" />
              </div>
              <div className="row">
                <div className="col-12">

                </div>
              </div>
              <div className="row">
                <Showcase products={products} className="col-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
