import { Component, OnInit, Input } from '@angular/core';


import { CookieService } from 'ngx-cookie-service';
import { trigger, style, animate, transition, } from '@angular/animations';
import { DataSharingService } from '../directive/data-sharing.service';
import { Router } from '@angular/router';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from 'src/environments/environment';

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
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';

  api_url=environment.baseUrl;
  @Input() isOpen: boolean;
  constructor(
    private cookieService: CookieService,
    private appService: AppService,
    public router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private dataSharingService: DataSharingService
  ) {
    this.getCart();
  }

  cartData: any;
  cartCode: string;

  goShopingCart() {
    this.router.navigate(['/shoppingcart']);
    this.dataSharingService.modelRef.getValue().close()
  }
  getCart() {
    this.spinnerService.show();
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.cartCode = this.cookieService.get('vfscfood-cart-id');
    let action;

    if (this.cartCode) {
      action = Action.CART + this.cartCode;
    } else if(userData) {
      action =  Action.PRIVATE + Action.CUSTOMER + Action.CARTS;
    } else {
      return;
    }
    
    this.appService.getMethod(action).subscribe(data => {
        this.cartData = data;
        this.cartData.products.map(e=>{
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
        this.cookieService.set('vfscfood-cart-id', data.code);
        this.refreshCount(data.quantity);
        this.addCartLocal(data.products);
        this.spinnerService.hide();
      }, error => {
        this.cartData = '';
        this.refreshCount(0);
        this.cookieService.deleteAll();
        // this.cookieService.delete('vfscfood-cart-id');
        this.spinnerService.hide();
      });
  }
  addCartLocal(data) {
    let localCart = []; 
    data.map((value) => {
      localCart.push({ 'id': value.id, 'quantity': value.quantity })
    });
    this.cookieService.set('localCart', JSON.stringify(localCart));
    
  }
  refreshCount(value) {
    this.dataSharingService.count.next(value);
    localStorage.setItem('itemCount', JSON.stringify(value));
  }
  removecartData(result) {
    // console.log(result);Add 
    this.spinnerService.show();
    let action = Action.CART;
    let param = { "product": result.id, "quantity": 0 }
    let id = this.cookieService.get('vfscfood-cart-id');
    this.appService.put(action, id, param).subscribe(data => {
      console.log(data);
        let cartData = JSON.parse(this.cookieService.get('localCart'));
        let index = cartData.findIndex(order => order.id === result.id);
        cartData.splice(index, 1);
        this.cookieService.set('localCart', JSON.stringify(cartData));
        this.getCart();
        this.spinnerService.hide();
      }, error => {
        this.getCart();
        this.spinnerService.hide();
        // this.toastr.error('Can not action this product','Product not avaiable');
      });
  }
  toggleSearch() {
    //this.isOpen = !this.isOpen;
  }

}
