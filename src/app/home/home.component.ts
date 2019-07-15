import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Helper } from '../directive/helper';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @ViewChild("CartComponent") CartComponent: CartComponent;
  constructor(
    private appService: AppService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
    private Helper: Helper
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

    if (this.cookieService.get('shopizer-cart-id')) {
      let cartData = JSON.parse(this.cookieService.get('localCart'));
      let index = cartData.findIndex(order => order.id === result.id);
      let param = { "product": result.id, "quantity": index == -1 ? 1 : cartData[index].quantity + 1 }
      let id = this.cookieService.get('shopizer-cart-id');
      this.appService.putMethod(action, id, param)
        .subscribe(data => {
          this.spinnerService.hide();
          this.showMiniCart();
        }, error => {
          this.spinnerService.hide();
          this.showMiniCart();
        });

    } else {
      let param = { "product": result.id, "quantity": 1 }
      this.appService.postMethod(action, param)
        .subscribe(data => {
          console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code);
          this.spinnerService.hide();
          this.showMiniCart();
        }, error => {
          this.spinnerService.hide();
        });
    }


  }
  showMiniCart() {
    this.Helper.showMiniCart(1);
  }
  filterFeaturedItem(val) {
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
