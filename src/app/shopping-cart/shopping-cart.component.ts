import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  templateUrl: './Shopping-cart.component.html',
  styleUrls: ['./Shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartData: Array<any> = [
    { 'name': 'Crackle Plates', 'price': '22.00', 'total': '44.00', 'quantity': 2 },
    { 'name': 'Crackle Plates', 'price': '36.00', 'total': '180.00', 'quantity': 9 },
    { 'name': 'Crackle Plates', 'price': '17.00', 'total': '144.00', 'quantity': 8 },
    { 'name': 'Crackle Plates', 'price': '22.00', 'total': '44.00', 'quantity': 2 }
  ]
  constructor() { }
  @Input() name: string
  ngOnInit() {
  }
  removeCartData(index) {
    console.log(index)
    this.cartData.splice(index, 1);
  }
  // updateQuntity(value) {
  //   console.log(this.cartData[value])
  //   // console.log(value)
  //   // console.log(this.cartData)
  //   // if (value == 1) {
  //   this.cartData[value].quantity = this.cartData[value].quantity - 1
  //   // } else {
  //   //   this.cartData[index].quantity = this.cartData[index].quantity + 1
  //   // }

  // }
}
