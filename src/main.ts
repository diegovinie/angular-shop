// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CartService } from './services/CartService';
import { DataService } from './services/DataService';
import { initState } from './state.jsx';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

import { mountComponent } from './adapters';
import App from './App.jsx';

// if (environment.production) {
//   enableProdMode();
// }
//
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));

const dataService = new DataService();
const cartService = new CartService();

// initialize react psudo-store
initState({ cartService });

mountComponent('react-App')(App, {
  cartService,
  dataService
});
