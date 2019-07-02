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
        this.router.navigate(['/']);
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

}
