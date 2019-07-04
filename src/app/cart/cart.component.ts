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
  // isOpen: boolean = false;
  // count: number = 0;
  constructor(
    private configurationService: ConfigurationService,
    private cookieService: CookieService,
    private appService: AppService,
    public router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private dataSharingService: DataSharingService
  ) {
    console.log('fffdsf');
    this.getCart();
  }

  cartData: any;

  goShopingCart() {
    this.router.navigate(['/shoppingcart']);
  }
  getCart() {
    this.spinnerService.show();
    let action = Action.CART;
    this.appService.getMethod(action + this.cookieService.get('shopizer-cart-id'))
      .subscribe(data => {
        this.cartData = data;
        this.dataSharingService.count.next(data.quantity);
        this.spinnerService.hide();
      }, error => {
        this.cartData = '';
        this.dataSharingService.count.next(0);
        this.cookieService.delete('shopizer-cart-id');
        this.spinnerService.hide();
      });
  }
  removecartData(result) {
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
  // toggleSearch() {
  //   this.isOpen = !this.isOpen;
  //   this.getCart();
  // }

}
