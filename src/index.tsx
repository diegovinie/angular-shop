import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { initState } from './state.jsx';
import { CartService } from './services/CartService';
import { DataService } from './services/DataService';

// instanciate services
const dataService = new DataService();
const cartService = new CartService();

// initialize react psudo-store
initState({ cartService });

ReactDOM.render(
  <React.StrictMode>
    <App dataService={dataService} cartService={cartService} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();