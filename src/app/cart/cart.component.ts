import { Component, OnInit } from '@angular/core';
import { Merchant } from '../services/configuration/merchant'
import { ConfigurationService } from '../services/configuration/configuration.service'

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private merchant = null;
  constructor(private configurationService : ConfigurationService) { }

  isOpen: boolean = false;

  
  toggleSearch() {
    this.isOpen = !this.isOpen ;
  }

  ngOnInit() {
    //this.configurationService.getMerchant()
    //.subscribe((data:Merchant) => {
    //  this.merchant = data;
    //  console.log('Merchant name ' + this.merchant.name);
    //);

  }

}
