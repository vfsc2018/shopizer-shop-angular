import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  templateUrl: './Shopping-cart.component.html',
  styleUrls: ['./Shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartData: Array<any> = [
    { 'name': 'Crackle Plates', 'price': 22.99, 'total': 45.98, 'quantity': 2 },
    { 'name': 'Crackle Plates', 'price': 36.99, 'total': 332.91, 'quantity': 9 },
    { 'name': 'Crackle Plates', 'price': 17.99, 'total': 143.92, 'quantity': 8 },
    { 'name': 'Crackle Plates', 'price': 20.99, 'total': 41.98, 'quantity': 2 }
  ];
  grandTotal: any = '$564.79';

  constructor() { }
  ngOnInit() {
  }
  public updateQuantity(index: any, flag: any): void {
    if (flag == 1) {
      this.cartData[index].quantity = this.cartData[index].quantity + 1;
      this.cartData[index].total = this.cartData[index].price * this.cartData[index].quantity;

    } else if (flag == 0) {
      this.cartData[index].quantity = this.cartData[index].quantity - 1
      this.cartData[index].total = this.cartData[index].price * this.cartData[index].quantity;
    } else {
      let value = this.cartData[index.index].price * index.value;
      this.cartData[index.index].total = value;
    }
    let sum = this.cartData.map(item => item.total)
      .reduce((prev, next) => { return prev + next }, 0);
    this.grandTotal = '$' + sum.toFixed(2);

  }
  removeCartData(index: number) {
    this.cartData.splice(index, 1);
  }
  amount(item) {
    return item.Amount;
  }

  sum(prev, next) {
    return prev + next;
  }

}
