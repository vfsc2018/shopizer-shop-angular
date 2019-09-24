import { Component, OnInit, Input } from '@angular/core';


import { CookieService } from 'ngx-cookie-service';
import { Merchant } from '../services/configuration/merchant'
import { ConfigurationService } from '../services/configuration/configuration.service'
import { IfStmt } from '@angular/compiler';
import { trigger, style, animate, transition, } from '@angular/animations';

import { DataSharingService } from '../directive/data-sharing.service';
import { Router } from '@angular/router';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('item', [
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class CartComponent {

  private merchant = null;
  @Input() isOpen: boolean;
  constructor(
    private configurationService: ConfigurationService,
    private cookieService: CookieService,
    private appService: AppService,
    public router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private dataSharingService: DataSharingService
  ) {
    this.getCart();
  }

  cartData: any;

  goShopingCart() {
    this.router.navigate(['/shoppingcart']);
    this.dataSharingService.modelRef.getValue().close()
  }
  getCart() {
    this.spinnerService.show();
    let userData = JSON.parse(localStorage.getItem('userData'));
    let action;
    if (userData) {
      action = Action.CUSTOMERS + userData.id + '/' + Action.CARTS;
    } else {
      action = Action.CART + this.cookieService.get('shopizer-cart-id');
    }
    this.appService.getMethod(action)
      .subscribe(data => {
        this.cartData = data;
        this.cookieService.set('shopizer-cart-id', data.code);
        this.refreshCount(data.quantity);
        this.addCartLocal(data.products);
        this.spinnerService.hide();
      }, error => {
        this.cartData = '';
        this.refreshCount(0);
        this.cookieService.delete('shopizer-cart-id');
        this.spinnerService.hide();
      });
  }
  addCartLocal(data) {
    let localCart = [];
    data.map((value) => {
      localCart.push({ 'id': value.id, 'quantity': value.quantity })
    });
    this.cookieService.set('localCart', JSON.stringify(localCart));
    console.log(this.cookieService.get('localCart'))
  }
  refreshCount(value) {
    this.dataSharingService.count.next(value);
    localStorage.setItem('itemCount', JSON.stringify(value))
  }
  removecartData(result) {
    console.log(result);
    this.spinnerService.show();
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 0 }
    this.appService.putMethod(action, this.cookieService.get('shopizer-cart-id'), param)
      .subscribe(data => {
        let cartData = JSON.parse(this.cookieService.get('localCart'));
        let index = cartData.findIndex(order => order.id === result.id);
        cartData.splice(index, 1);
        this.cookieService.set('localCart', JSON.stringify(cartData));
        this.getCart();
        this.spinnerService.hide();
      }, error => {
        this.getCart();
        this.spinnerService.hide();
      });
  }
  // toggleSearch() {
  //   this.isOpen = !this.isOpen;
  //   this.getCart();
  // }

}
