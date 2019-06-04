import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { RouterModule } from "@angular/router";

import { ConfigurationService } from "./services/configuration/configuration.service";
import { CategoryService } from "./services/category/category.service";
import { SiteheaderComponent } from "./siteheader/siteheader.component";
import { SearchComponent } from "./search/search.component";
import { CartComponent } from "./cart/cart.component";
import { SliderComponent } from "./slider/slider.component";
import { FeaturedComponent } from "./featured/featured.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { LatestNewsComponent } from "./latest-news/latest-news.component";
import { MenuItemComponent } from "./siteheader/menu-item/menu-item.component";
import { NewsletterComponent } from "./newsletter/newsletter.component";
import { SitefooterComponent } from "./sitefooter/sitefooter.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { HomeComponent } from "./home/home.component";

/** load this at startup */
export function loadConfigurations(configurationService: ConfigurationService) {
  return () => configurationService.loadConfigurations();
}

/**
 * Outch not easy to create a class executed at startup. I expect to be a better Angular dev,
 * could barely undestand what i have done ... carl
 */

@NgModule({
  declarations: [
    AppComponent,
    SiteheaderComponent,
    SearchComponent,
    CartComponent,
    SliderComponent,
    FeaturedComponent,
    ProductGridComponent,
    LatestNewsComponent,
    MenuItemComponent,
    NewsletterComponent,
    SitefooterComponent,
    CheckoutComponent,
    HomeComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "checkout",
        component: CheckoutComponent
      }
    ])
  ],
  providers: [
    /** load merchant and configurations */
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [ConfigurationService],
      multi: true
    },
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
