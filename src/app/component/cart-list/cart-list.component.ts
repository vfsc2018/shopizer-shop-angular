import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartData: Array<any> = [
    { 'name': 'Crackle Plates', 'price': '22.00', 'total': '44.00', 'quantity': 2 },
    { 'name': 'Crackle Plates', 'price': '36.00', 'total': '180.00', 'quantity': 9 },
    { 'name': 'Crackle Plates', 'price': '17.00', 'total': '144.00', 'quantity': 8 },
    { 'name': 'Crackle Plates', 'price': '22.00', 'total': '44.00', 'quantity': 2 }
  ]
  constructor() { }

  ngOnInit() {
  }

}
