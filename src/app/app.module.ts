import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DataService } from './data.service';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    // SearchBarComponent,
    // FiltersComponent,
    // ShowcaseComponent,
    // CartComponent,
    // ProductThumbnailComponent,
    // SortFiltersComponent,
    // UrlFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    DataService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
