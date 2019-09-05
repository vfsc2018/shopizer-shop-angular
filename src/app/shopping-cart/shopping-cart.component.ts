import { Component, OnInit, Input } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
    private appService: AppService,
    public router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }
  ngOnInit() {
    this.getCart()
  }
  getCart() {
    this.spinnerService.show();
    let action = Action.CART;
    this.appService.getMethod(action + this.cookieService.get('shopizer-cart-id'))
      .subscribe(data => {
        this.spinnerService.hide();
        this.cartData = data.products;
        this.subtotal = data.subtotal;
        this.total = data.displayTotal;
      }, error => {
        this.cartData = [];
        // this.router.navigate(['/']);
        this.cookieService.delete('shopizer-cart-id')
        this.spinnerService.hide();
      });
  }
  public updateQuantity(result, flag: any): void {
    this.spinnerService.show();
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
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
      });

  }
  removeCartData(result) {
    this.spinnerService.show();
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 0 }
    this.appService.putMethod(action, this.cookieService.get('shopizer-cart-id'), param)
      .subscribe(data => {
        this.getCart();
        this.spinnerService.hide();
      }, error => {
        this.getCart();
        this.spinnerService.hide();
      });
  }
  amount(item) {
    return item.Amount;
  }

  sum(prev, next) {
    return prev + next;
  }
  onCheckOut() {
    this.router.navigate(['/checkout']);
  }
  clearShoppingCard() {
    this.spinnerService.show();
    let start = 0;
    let me = this;
    let doThing = function (start) {
      for (let i = start; i < me.cartData.length; i++) {
        let action = Action.CART;
        let param = { "product": me.cartData[i].id, "quantity": 0 }
        me.appService.putMethod(action, me.cookieService.get('shopizer-cart-id'), param)
          .subscribe(data => {

            console.log(i)
            console.log(me.cartData.length - 1, 'me.cartData.length')
            if (me.cartData.length - 2 == i) {
              me.getCart();
              me.spinnerService.hide();
            }
            doThing(i + 1)
          }, error => {
            me.getCart();
            me.spinnerService.hide();
          });
        break;
      }
    }
    doThing(start)
  }
  onClickContinueButton() {
    this.router.navigate(['/']);
  }

}
