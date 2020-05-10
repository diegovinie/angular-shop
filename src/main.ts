import { mountComponent } from './adapters';
import { initState } from './state.jsx';
import App from './App.jsx';
// services
import { CartService } from './services/CartService';
import { DataService } from './services/DataService';

// instanciate services
const dataService = new DataService();
const cartService = new CartService();

// initialize react psudo-store
initState({ cartService });

mountComponent('react-App')(App, {
  cartService,
  dataService
});
