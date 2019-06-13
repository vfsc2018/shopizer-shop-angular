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
  productData: Array<any> = []
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
