import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  header_data = [{ 'name': 'product', 'width_size': 'width-50' }, { 'name': 'price', 'width_size': 'width-10' }, { 'name': 'stock status', 'width_size': 'width-20' }, { 'name': 'add to cart', 'width_size': 'width-20' }, { 'name': '', 'width_size': '' }];
  constructor(private appService: AppService) { }
  cartData: Array<any> = [{ 'price': 49.99, 'quantity': 2, 'description': { 'name': 'test xggfdsfsdfsdf' } }];
  ngOnInit() {
    this.getWishList()
  }

  getWishList() {
    // let action = Action.CART;
    // this.appService.getMethod(action + this.cookieService.get('shopizer-cart-id'))
    //   .subscribe(data => {
    //     // this.cartData = data.products;
    //     // this.subtotal = data.subtotal;
    //     // this.total = data.displayTotal;
    //   }, error => {
    //   });
  }



}
