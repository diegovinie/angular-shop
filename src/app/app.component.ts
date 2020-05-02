import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from './shared/product.model';
import { DataService } from './data.service';
import { CartService } from './cart.service';

import { mountComponent } from '../adapters';
import { initState } from '../state.jsx';
import App from '../App.jsx';

@Component({
  selector: 'app-root',
  template: '<div id="react-App"></div>'
})
export class AppComponent implements OnInit, DoCheck {

  constructor(private dataService: DataService, private cartService: CartService) {
    // initialize react psudo-store
    initState({ cartService: this.cartService });
  }

  ngOnInit() {

  }

  ngDoCheck() {
    mountComponent('react-App')(App, {
      // cartService: this.cartService,
      dataService: this.dataService
    });
  }
}
