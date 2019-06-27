import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService, private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService) { }
  productData: Array<any> = [];
  filterData: Array<any> = [];
  categoryData: Array<any> = [];
  public loading = false;
  sliderItems = [
    {
      title: "title1",
      description: "lorem ipsum",
      img: "https://s3.ca-central-1.amazonaws.com/shopizer-lightsail/files/DEFAULT/banner.jpg"
    },
    {
      title: "title2",
      description: "lorem ipsum",
      img: "../../assets/images/slide2.jpg"
    },
    {
      title: "title3",
      description: "lorem ipsum",
      img: "../../assets/images/slide4.jpg"
    },
    {
      title: "title4",
      description: "lorem ipsum",
      img: "../../assets/images/slide5.jpg"
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
    } else {
      this.appService.postMethod(action, param)
        .subscribe(data => {
          console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code);
          this.spinnerService.hide();
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
