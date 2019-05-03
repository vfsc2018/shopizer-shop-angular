import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SiteheaderComponent } from './siteheader/siteheader.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [AppComponent, SiteheaderComponent, SearchComponent, CartComponent],
  imports: [NgbModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
