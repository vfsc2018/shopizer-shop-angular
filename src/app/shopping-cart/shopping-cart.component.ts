import { Component, OnInit, Input } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  header_data = [{ 'name': 'product', 'width_size': 'width-50' }, { 'name': 'price', 'width_size': 'width-10' }, { 'name': 'quantity', 'width_size': 'width-20' }, { 'name': 'total', 'width_size': 'width-20' }, { 'name': '', 'width_size': '' }];
  cartData: Array<any> = [];
  subtotal: any;
  total: any;

  constructor(
    private cookieService: CookieService,
    private appService: AppService
  ) { }
  ngOnInit() {
    this.getCart()
  }
  getCart() {
    let action = Action.CART;
    this.appService.getMethod(action + this.cookieService.get('shopizer-cart-id'))
      .subscribe(data => {
        this.cartData = data.products;
        this.subtotal = data.subtotal;
        this.total = data.displayTotal;
      }, error => {
      });
  }
  public updateQuantity(result, flag: any): void {
    let product;
    let quantity;
    if (flag == 1) {
      product = result.id
      quantity = result.quantity + 1
    } else if (flag == 0) {
      product = result.id
      quantity = result.quantity - 1
    } else {
      product = result.data.id
      quantity = result.value
    }
    let action = Action.CART;
    let param = { "product": product, "quantity": quantity }
    this.appService.putMethod(action, this.cookieService.get('shopizer-cart-id'), param)
      .subscribe(data => {
        console.log(data)
        this.cartData = data.products;
        this.subtotal = data.subtotal;
        this.total = data.displayTotal;
      }, error => {
      });

  }
  removeCartData(result) {
    console.log(result)
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 0 }
    this.appService.putMethod(action, this.cookieService.get('shopizer-cart-id'), param)
      .subscribe(data => {
        this.getCart();
      }, error => {
      });
  }
  amount(item) {
    return item.Amount;
  }

  sum(prev, next) {
    return prev + next;
  }

}
