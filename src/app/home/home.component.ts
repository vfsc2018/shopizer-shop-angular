import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
import { CartComponent } from '../cart/cart.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("CartComponent") CartComponent: CartComponent;
  constructor(
    private appService: AppService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }
  productData: Array<any> = [];
  filterData: Array<any> = [];
  categoryData: Array<any> = [];
  public loading = false;
  isOpen: boolean;
  sliderItems = [
    {
      title: "title1",
      description: "lorem ipsum",
      img: "https://s3.ca-central-1.amazonaws.com/shopizer-lightsail/files/DEFAULT/slider2.jpg"
    },
    {
      title: "title2",
      description: "lorem ipsum",
      img: "https://s3.ca-central-1.amazonaws.com/shopizer-lightsail/files/DEFAULT/slider3.jpg"
    },
    {
      title: "title3",
      description: "lorem ipsum",
      img: "https://s3.ca-central-1.amazonaws.com/shopizer-lightsail/files/DEFAULT/banner.jpg"
    }
  ];
  ngOnInit() {
    this.getProductList()
  }
  getProductList() {
    let action = Action.PRODUCT_GROUP;
    this.appService.getMethod(action + 'FEATURED_ITEM')
      .subscribe(data => {
        // console.log(data.products);
        data.products.map(item => {
          item.categories.map(category => {
            // console.log(category)
            let index = this.categoryData.findIndex(value => value.id == category.id);
            if (index == -1) {
              this.categoryData.push({ 'id': category.description.id, 'name': category.description.name })
            }
          })
        });
        // console.log(this.categoryData)
        this.productData = data.products;
        this.filterData = data.products;
      }, error => {
      });
  }
  addCart(result) {
    this.spinnerService.show();
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 1 }
    if (this.cookieService.get('shopizer-cart-id')) {
      let id = this.cookieService.get('shopizer-cart-id');
      this.appService.putMethod(action, id, param)
        .subscribe(data => {
          this.spinnerService.hide();

        }, error => {
          this.spinnerService.hide();
        });
      // this.isOpen = true;
      this.CartComponent.toggleSearch();
    } else {
      this.appService.postMethod(action, param)
        .subscribe(data => {
          console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code);
          this.spinnerService.hide();
          // this.isOpen = true;
          this.CartComponent.toggleSearch();
        }, error => {
          this.spinnerService.hide();
        });
    }


  }
  filterFeaturedItem(val) {
    console.log(val);
    if (val != '') {
      this.filterData = [];
      this.productData.map(item => {
        item.categories.map(category => {
          // console.log(category)
          if (val.id == category.description.id) {
            console.log(item)
            this.filterData.push(item)
          }
        })
      });

    } else {
      this.filterData = this.productData;
    }

  }
}
