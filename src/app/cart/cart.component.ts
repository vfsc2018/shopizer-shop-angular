import { Component, OnInit } from '@angular/core';
import { Merchant } from '../services/configuration/merchant'
import { ConfigurationService } from '../services/configuration/configuration.service'
import { IfStmt } from '@angular/compiler';
import { trigger, style, animate, transition, } from '@angular/animations';
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
  constructor(private configurationService: ConfigurationService) { }

  isOpen: boolean = false;
  cartData: Array<any> = [
    { 'name': 'Crackle Plates', 'price': 22.99, 'total': 45.98, 'quantity': 2 },
    { 'name': 'Crackle Plates', 'price': 36.99, 'total': 332.91, 'quantity': 9 }
  ];

  toggleSearch() {
    console.log('toggleSearch')
    if (this.isOpen == true) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  ngOnInit() {


  }
  removecartData(index) {
    this.cartData.splice(index, 1);
  }

}
