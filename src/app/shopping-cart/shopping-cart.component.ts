import { Component, OnInit, Input } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from 'src/environments/environment';
import { Helper } from '../directive/helper';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  api_url=environment.baseUrl;
  header_data = [{ 'name': 'product', 'width_size': 'width-50' }, { 'name': 'price', 'width_size': 'width-10' }, { 'name': 'quantity', 'width_size': 'width-20' }, { 'name': 'total', 'width_size': 'width-20' }, { 'name': '', 'width_size': '' }];
  cartData: Array<any> = [];
  subtotal: any;
  total: any;
  info: any = {};

  constructor(
    private cookieService: CookieService,
    private appService: AppService,
    public router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private helper: Helper
  ) { }
  ngOnInit() {
    this.appService.getMethod("information").subscribe(data => {       
      this.info = data;
    }, error => { });
    this.getCart()
  }

  getCart() {
    let cartCode = this.cookieService.get('vfscfood-cart-id');
    if(!cartCode) return;

    this.spinnerService.show();
    let action = Action.CART;
    this.appService.getMethod(action + cartCode).subscribe(data => {
        this.spinnerService.hide();
        this.cartData = data.products? data.products: [];
        this.cartData.map(e=>{
          e.showDateAvailable = this.helper.checkDateAvailable(e.dateAvailable);
          e.available =  e.available && !e.showDateAvailable;
          if(e.image && e.image.imageUrl.indexOf("http")<0)
          {
            e.image.imageUrl=this.api_url+ e.image.imageUrl;
            e.images.map(ex=>{
              if(ex.imageUrl.indexOf("http")<0)
              {
                ex.imageUrl=this.api_url+ ex.imageUrl;
              }     
            });
          }     
        });
        this.subtotal = data.subtotal;
        this.total = data.displayTotal;
      }, error => {
        this.cartData = [];
        this.helper.resetCart();
        // this.cookieService.delete('vfscfood-cart-id');
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
    let param = { "product": product, "quantity": quantity };
    let id = this.cookieService.get('vfscfood-cart-id');
    this.appService.put(action, id, param).subscribe(data => {
        // console.log(data)
        this.cartData = data.products? data.products: [];
        
        this.cartData.map(e=>{
          if(e.image && e.image.imageUrl.indexOf("http")<0)
          {
            e.image.imageUrl=this.api_url+ e.image.imageUrl;
            e.images.map(ex=>{
              if(ex.imageUrl.indexOf("http")<0)
              {
                ex.imageUrl=this.api_url+ ex.imageUrl;
              }     
            });
          }     
        });
      
        this.subtotal = data.subtotal;
        this.total = data.displayTotal;
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
        this.toastr.error('Can not action this product','Product not avaiable');
      });

  }
  removeCartData(result) {
    
    let id = this.cookieService.get('vfscfood-cart-id');
    if(!id) return;

    this.spinnerService.show();
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 0 }
    this.appService.put(action, id, param).subscribe(data => {
        this.getCart();
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
        this.toastr.error('Can not action this product','Product not avaiable');
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
    let action = Action.CART;
    let id = this.cookieService.get('vfscfood-cart-id');
    this.appService.deleteMethod(action, id).subscribe(data => { 
        this.cartData = [];
        // this.cookieService.delete('vfscfood-cart-id');
        this.spinnerService.hide();
    }, error => { 
      this.cartData = [];
      // this.cookieService.delete('vfscfood-cart-id');
      this.spinnerService.hide();
    });
    
    this.helper.resetCart();
  }
  // clearShoppingCard() {
  //   this.spinnerService.show();
  //   let start = 0;
  //   let me = this;
  //   let doThing = function (start) {
  //     for (let i = start; i < me.cartData.length; i++) {
  //       let action = Action.CART;
  //       let param = { "product": me.cartData[i].id, "quantity": 0 }
  //       me.appService.put(action, me.cookieService.get('vfscfood-cart-id'), param)
  //         .subscribe(data => {

  //           if (me.cartData.length - 2 == i) {
  //             me.getCart();
  //             me.spinnerService.hide();
  //           }
  //           doThing(i + 1)
  //         }, error => {
  //           me.getCart();
  //           me.spinnerService.hide();
  //         });
  //       break;
  //     }
  //   }
  //   doThing(start)
  // }
  onClickContinueButton() {
    this.router.navigate(['/']);
  }

}
