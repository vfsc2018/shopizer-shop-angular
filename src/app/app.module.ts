import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule, HttpClient, } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { RouterModule, Routes } from "@angular/router";

// import { AgmCoreModule } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './directive/app.service';
import { EqualValidator } from './directive/validator';
import { DataSharingService } from './directive/data-sharing.service';
import { Helper } from './directive/helper';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxGalleryModule } from 'ngx-gallery';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
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

import { BannerComponent } from './component/banner/banner.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ButtonComponent } from './component/button/button.component';
import { CartListComponent, ListComponent } from './component/cart-list/cart-list.component';
import { CustomLabelComponent } from './component/custom-label/custom-label.component';
import { InputFieldComponent } from './component/input-field/input-field.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';
import { CustomCheckboxComponent } from './component/custom-checkbox/custom-checkbox.component';
import { ImgComponent } from './component/img/img.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopComponent } from './shop/shop.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { BestSellerComponent } from './component/best-seller/best-seller.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { ShopColorComponent } from './component/shop-color/shop-color.component';
import { ShopSizeComponent } from './component/shop-size/shop-size.component';
import { RequiredValidationErrorComponent } from './directive/validation/validation-error.components';
import { CustomTextareaComponent } from './component/custom-textarea/custom-textarea.component';
import { CustomSelectComponent } from './component/custom-select/custom-select.component';
import { ImgSliderComponent } from './component/img-slider/img-slider.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component'
import { ContactComponent } from './contact/contact.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ErrorComponent } from './error/error.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { CountDown } from "./component/countdown/countdown";
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { AgmCoreModule } from '@agm/core';

import { NoDataComponent } from './component/no-data/no-data.component';
import { SafeHtml } from './shared/utility/safe-html';
import { ToastrModule } from 'ngx-toastr';
import { ManufactureComponent } from './component/manufacture/manufacture.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginMenuComponent } from './component/login-menu/login-menu.component';
import { OrdersComponent } from './orders/orders.component';
import { ContentComponent } from './content/content.component';
import { RatingComponent } from './component/rating/rating.component';
import { ArrayFilterPipe, LimitToPipe } from './component/custom-select/pipes/index';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { StripeComponent } from './component/stripe/stripe.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
/** load this at startup */
export function loadConfigurations(configurationService: ConfigurationService) {
  return () => configurationService.loadConfigurations();
}

/**
 * Outch not easy to create a class executed at startup. I expect to be a better Angular dev,
 * could barely undestand what i have done ... carl
 */



const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    data: { title: 'Checkout' }
  },
  {
    path: "shoppingcart",
    component: ShoppingCartComponent,
    data: { title: 'Shopping Cart' }
  },
  {
    path: "product-detail",
    component: ProductDetailComponent,
    data: { title: 'Product Detail' }
  },
  {
    path: "account",
    component: AccountComponent,
    data: { title: 'Login' }
  },
  {
    path: "register",
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: "category/:id",
    component: ShopComponent,
    data: { title: 'Category' }
  },
  {
    path: "search/:id",
    component: SearchResultComponent,
    data: { title: 'Search' }
  },
  {
    path: "shop",
    component: ShopComponent,
    data: { title: 'Shop' }
  },
  {
    path: "wishlist",
    component: WishListComponent,
    data: { title: 'Wish List' }
  },
  {
    path: "contact",
    component: ContactComponent,
    data: { title: 'Contact' }
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' }
  },
  {
    path: "error",
    component: ErrorComponent,
    data: { title: 'Error' }
  },
  {
    path: "blog-detail",
    component: BlogDetailComponent,
    data: { title: 'Blog Detail' }
  },
  {
    path: "coming-soon",
    component: ComingSoonComponent,
    data: { title: 'Comming Soon' }
  },
  {
    path: "password",
    component: ChangePasswordComponent,
    data: { title: 'Change Password' }
  },
  {
    path: "orders",
    component: OrdersComponent,
    data: { title: 'Orders' }
  },
  {
    path: "order-detail",
    component: OrderDetailComponent,
    data: { title: 'Order Detail' }
  },
  {
    path: "shipping-detail",
    component: ShippingDetailComponent,
    data: { title: 'Shipping Detail' }
  },
  {
    path: "content/:id",
    component: ContentComponent,
    data: { title: 'Content' }
  }
];


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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
    HomeComponent,
    BannerComponent,
    ShoppingCartComponent,
    ButtonComponent,
    CartListComponent,
    CustomLabelComponent,
    InputFieldComponent,
    ListComponent,
    AccountComponent,
    RegisterComponent,
    CustomCheckboxComponent,
    ImgComponent,
    ProductListComponent,
    ShopComponent,
    WishListComponent,
    BestSellerComponent,
    CategoriesComponent,
    ShopColorComponent,
    CustomTextareaComponent,
    CustomSelectComponent,
    ImgSliderComponent,
    ProductDetailComponent,
    RequiredValidationErrorComponent,
    ContactComponent,
    ForgotPasswordComponent,
    ErrorComponent,
    BlogDetailComponent,
    ComingSoonComponent,
    CountDown,
    AutocompleteComponent,
    ShopSizeComponent,
    NoDataComponent,
    SafeHtml,
    ManufactureComponent,
    SearchResultComponent,
    SettingsComponent,
    ChangePasswordComponent,
    LoginMenuComponent,
    OrdersComponent,
    OrderDetailComponent,
    ShippingDetailComponent,
    ContentComponent,
    RatingComponent,
    EqualValidator,
    ArrayFilterPipe,
    LimitToPipe,
    OrderConfirmComponent,
    StripeComponent
  ],
  entryComponents: [
    CartComponent,
    OrderConfirmComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCOWHYbCCs9_t8g7oOozjTR75wNx5_xpb4",
      libraries: ["places"],
      language: 'en'
    }),
    ToastrModule.forRoot({
      progressBar: true
    }),
    HttpModule,
    Ng5SliderModule,
    NgxPaginationModule,
    // FormValidationModule,
    NgxGalleryModule,
    CarouselModule,
    Ng4LoadingSpinnerModule,
    MalihuScrollbarModule.forRoot()
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
    CategoryService,
    TranslateModule,
    AppService,
    CookieService,
    DataSharingService,
    Helper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
