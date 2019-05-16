import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ConfigurationService } from "./configuration/configuration.service";
import { SiteheaderComponent } from "./siteheader/siteheader.component";
import { SearchComponent } from "./search/search.component";
import { CartComponent } from "./cart/cart.component";
import { SliderComponent } from "./slider/slider.component";
import { FeaturedComponent } from './featured/featured.component';

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
    FeaturedComponent
  ],
  imports: [NgbModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    /** load merchant and configurations */
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [ConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
