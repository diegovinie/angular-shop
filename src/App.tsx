import React, { Component } from 'react';
import Filters from 'components/Filters';
import Showcase from 'components/Showcase';
import SearchBar from 'components/SearchBar';
import Cart from 'components/Cart';
import UrlForm from 'components/UrlForm';
import SortFilters from 'components/SortFilters';
import { Category, Filter, Product } from 'shared/models';
import { DataService } from 'services/DataService';
import { CartService } from 'services/CartService';
import './App.scss';

interface Props {
  dataService: DataService;
  cartService: CartService;
}

interface State {
  originalData: {
    products: Product[],
    categories: Category[]
  };
  currentSorting: string;
  customFilters: Filter[];
  priceFilters: Filter[];
  sortFilters: Filter[];
  products: Product[],
}

type MainFilter = {
  categories: Array<Category>;
  search: string;
  customFilter?: Filter;
  priceFilter?: Filter;
}

class App extends Component<Props, State> {
  // it is preferred out of the state
  mainFilter: MainFilter = {
    categories: [],
    search: ''
  };

  dataService: DataService;

  cartService: CartService;

  state = {
    originalData: {
      products: [],
      categories: []
    },

    currentSorting: 'name',

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

  constructor(props: Props) {
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
      this.mainFilter = {
        search: '',
        categories: data.categories.slice(0),
        customFilter: this.state.customFilters[0],
        priceFilter: this.state.priceFilters[0]
      };

      this.setState({
        originalData: data,
        // Make a deep copy of the original data to keep it immutable
        products: data.products.slice(0)
      });
    });
  }

  componentDidUpdate(_: any, prevState: State) {
    const { products } = this.state;

    const sameFirst = prevState.products[0] === products[0];
    const sameLength = prevState.products.length === products.length;
    // trying to compare arrays
    if (!sameLength || !sameFirst) {
      this.sortProducts(this.state.currentSorting);
    }
  }

  //////////// Methods ///////////////////////

  onURLChange(url: string) {
    this.dataService.getRemoteData(url).subscribe(data => {

      this.mainFilter = {
        search: '',
        categories: data.categories.slice(0),
        customFilter: this.state.customFilters[0],
        priceFilter: this.state.priceFilters[0]
      };

      this.cartService.flushCart();
      SearchBar.reset && SearchBar.reset();

      this.setState({
        originalData: data,
        products: data.products.slice(0)
      });
    });
  }

  onSearchChange(search: {search: string, change: number}) {
    this.mainFilter.search = search.search;

    this.updateProducts({
      type: 'search',
      change: search.change
    });
  }

  onFilterChange(data: {type: string, filter: any, isChecked: boolean, change: number }) {
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

  updateProducts(filter: { type: string, change: number }) {
    const {
      originalData,
      products,
    } = this.state;

    let productsSource: Product[] = originalData.products;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1) || (filter.type === 'category' && filter.change === -1)) {
      productsSource = products;
      filterAllData = false;
    }
    // console.log('filtering ' + productsSource.length + ' products')

    const nextProducts = productsSource.filter(product => {
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
            passCategoryFilter = this.mainFilter.categories.reduce((found: boolean, category: Category) => {
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
        const customFilter = this.mainFilter.customFilter && this.mainFilter.customFilter.value;
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
        const customFilter = this.mainFilter.priceFilter && this.mainFilter.priceFilter.value;
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
  }

  sortProducts(criteria: string) {
    // console.log('sorting ' + this.products.length + ' products')
    const products = this.state.products.slice()
      .sort((a: Product, b: Product) => {
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
