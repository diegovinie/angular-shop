import { Component, OnInit, DoCheck } from '@angular/core';

import { mountComponent } from '../adapters';
import App from '../App.jsx';

@Component({
  selector: 'app-root',
  template: '<div id="react-App"></div>'
})
export class AppComponent implements OnInit, DoCheck {

  constructor() {

  }

  ngOnInit() {

  }

  ngDoCheck() {
    mountComponent('react-App')(App, {
      // cartService: this.cartService,
      // dataService: this.dataService
    });
  }
}
