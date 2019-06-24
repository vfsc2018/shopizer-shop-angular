import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService, private cookieService: CookieService, ) { }
  productData: Array<any> = [];

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
        this.productData = data.products;
      }, error => {
      });
  }
  addCart(result) {
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 1 }
    if (this.cookieService.get('shopizer-cart-id')) {
      let id = this.cookieService.get('shopizer-cart-id');
      this.appService.putMethod(action, id, param)
        .subscribe(data => {

        }, error => {
        });
    } else {
      this.appService.postMethod(action, param)
        .subscribe(data => {
          console.log(data);
          this.cookieService.set('shopizer-cart-id', data.code)
        }, error => {
        });
    }

  }
}
