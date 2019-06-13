import { Component, OnInit } from '@angular/core';


import { CookieService } from 'ngx-cookie-service';
import { Merchant } from '../services/configuration/merchant'
import { ConfigurationService } from '../services/configuration/configuration.service'
import { IfStmt } from '@angular/compiler';
import { trigger, style, animate, transition, } from '@angular/animations';

import { Router } from '@angular/router';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

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
export class CartComponent implements OnInit {

  private merchant = null;
  constructor(
    private configurationService: ConfigurationService,
    private cookieService: CookieService,
    private appService: AppService,
    public router: Router
  ) { }

  isOpen: boolean = false;
  cartData: any;

  toggleSearch() {
    this.isOpen = !this.isOpen;
    this.getCart();
  }
  goShopingCart() {
    this.router.navigate(['/shoppingcart']);
    this.toggleSearch();
  }
  ngOnInit() {

  }
  getCart() {
    let action = Action.CART;
    this.appService.getMethod(action + this.cookieService.get('shopizer-cart-id'))
      .subscribe(data => {
        // console.log(data);
        this.cartData = data;
      }, error => {
      });
  }
  removecartData(result) {
    console.log(result);
    let id = this.cookieService.get('shopizer-cart-id');
    let action = Action.CART;
    let param = id + '/item/' + result.id
    this.appService.deleteMethod(action, param)
      .subscribe(data => {
        this.cartData.splice(result.id, 1);
      }, error => {
      });

  }

}
