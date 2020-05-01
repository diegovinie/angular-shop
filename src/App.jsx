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

    currentSorting: '',

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

    this.dataService = props.dataService;
    this.cartService = props.cartService;

    this.onURLChange = this.onURLChange.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.updateProducts = this.updateProducts.bind(this)
    this.sortProducts = this.sortProducts.bind(this)
  }

  componentDidMount() {
    this.dataService.getData().then(data => {
      this.setState({
        originalData: data,
        mainFilter: {
          search: '',
          categories: data.categories.slice(0),
          customFilter: this.state.customFilters[0],
          priceFilter: this.state.priceFilters[0]
        },
        // Make a deep copy of the original data to keep it immutable
        products: data.products.slice(0)
      });
    });
  }

  componentDidUpdate(_, prevState) {
    const { products } = this.state;

    if (prevState.products.length !== products.length) {
      this.sortProducts('name');
    }
  }

  //////////// Methods ///////////////////////

  onURLChange(url) {
    this.dataService.getRemoteData(url).subscribe(data => {
      this.setState({
        originalData: data,
        mainFilter: {
          search: '',
          categories: data.categories.slice(0),
          customFilter: this.customFilters[0],
          priceFilter: this.priceFilters[0]
        },
        products: data.products.slice(0)
      });
      // this clean SearchBar when url change, is pending
      // this.searchComponent.reset();

      // this.cartService.flushCart();
    });
  }

  onSearchChange(search) {
    this.setState({
      mainFilter: { ...this.state.mainFilter, search: search.search }
    });

    this.updateProducts({
      type: 'search',
      change: search.change
    });
  }

  onFilterChange(data) {
    if (data.type === 'category') {
      if (data.isChecked) {
        this.mainFilter.categories.push(data.filter);
      } else {
        this.mainFilter.categories = this.mainFilter.categories.filter(
          category => {
            return category.categori_id !== data.filter.categori_id;
          });
      }
    } else if (data.type === 'custom') {
      this.mainFilter.customFilter = data.filter;
    } else if (data.type === 'price') {
      this.mainFilter.priceFilter = data.filter;
    }
    this.updateProducts({
      type: data.type,
      change: data.change
    });
  }

  updateProducts(filter) {
    let productsSource = this.originalData.products;
    const prevProducts = this.products;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1) || (filter.type === 'category' && filter.change === -1)) {
      productsSource = this.products;
      filterAllData = false;
    }
    // console.log('filtering ' + productsSource.length + ' products')

    this.products = productsSource.filter(product => {
      // Filter by search
      if (filterAllData || filter.type === 'search') {
        if (!product.name.match(new RegExp(this.mainFilter.search, 'i'))) {
          return false;
        }
      }

      // Filter by categories
      if (filterAllData || filter.type === 'category') {
        let passCategoryFilter = false;
        product.categories.forEach(product_category => {
          if (!passCategoryFilter) {
            passCategoryFilter = this.mainFilter.categories.reduce((found, category) => {
                return found || product_category === category.categori_id;
            }, false);
          }
        });
        if (!passCategoryFilter) {
          return false;
        }
      }

      // Filter by custom filters
      if (filterAllData || filter.type === 'custom') {
        let passCustomFilter = false;
        const customFilter = this.mainFilter.customFilter.value;
        if (customFilter === 'all') {
          passCustomFilter = true;
        } else if (customFilter === 'available' && product.available) {
          passCustomFilter = true;
        } else if (customFilter === 'unavailable' && !product.available) {
          passCustomFilter = true;
        } else if (customFilter === 'bestseller' && product.best_seller) {
          passCustomFilter = true;
        }
        if (!passCustomFilter) {
          return false;
        }
      }

      // Filter by price filters
      if (filterAllData || filter.type === 'price') {
        let passPriceFilter = false;
        const customFilter = this.mainFilter.priceFilter.value;
        const productPrice = parseFloat(product.price.replace(/\./g, '').replace(',', '.'));
        if (customFilter === 'all') {
          passPriceFilter = true;
        } else if (customFilter === 'more_30000' && productPrice > 30000) {
          passPriceFilter = true;
        } else if (customFilter === 'less_10000' && productPrice < 10000) {
          passPriceFilter = true;
        }
        if (!passPriceFilter) {
          return false;
        }
      }

      return true;
    });

    this.setState({ products: nextProducts });

    // If the number of products increased after the filter has been applied then sort again
    // If the number of products remained equal, there's a high chance that the items have been reordered.
    // if (prevProducts.length <= products.length && products.length > 1) {
    //   this.sortProducts(this.state.currentSorting);
    // }

    // These two types of filters usually add new data to the products showcase so a sort is necessary
    // if (filter.type === 'custom' || filter.type === 'price') {
    //   this.sortProducts(this.state.currentSorting);
    // }
  }

  sortProducts(criteria) {
    // console.log('sorting ' + this.products.length + ' products')
    const products = this.state.products.slice()
      .sort((a, b) => {
        const priceComparison = parseFloat(a.price.replace(/\./g, '')
        .replace(',', '.')) - parseFloat(b.price.replace(/\./g, '').replace(',', '.'));
        if (criteria === 'priceDes') {
          return -priceComparison;
        } else if (criteria === 'priceAsc') {
          return  priceComparison;
        } else if (criteria === 'name') {
          const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        } else {
          // Keep the same order in case of any unexpected sort criteria
          return -1;
        }
      });

    this.setState({ products, currentSorting: criteria });
  }

  /////////////// render function /////////////
  render() {
    const {
      originalData,
      customFilters,
      priceFilters,
      sortFilters,
      products,
    } = this.state;

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
