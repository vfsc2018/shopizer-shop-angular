import { Component, OnInit } from '@angular/core';
import { Merchant } from '../services/configuration/merchant'
import { ConfigurationService } from '../services/configuration/configuration.service'
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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
