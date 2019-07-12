import { Component, OnInit } from '@angular/core';

import { AppService } from '../directive/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Action } from '../directive/app.constants';
@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  summeryOrder: any;
  // countyData: Array<any> = [];
  checkout = {
    firstname: '',
    lastname: '',
    companyName: '',
    address: '',
    address1: '',
    city: '',
    country: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    note: ''
  }
  countyStateData: Array<any> = [{
    "country": "Canada",
    "states": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon Territory"]
  }, {
    "country": "Romania",
    "states": ["Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", "Botosani", "Braila", "Brasov", "Bucuresti", "Buzau", "Calarasi", "Caras-Severin", "Cluj", "Constanta", "Covasna", "Dimbovita", "Dolj", "Galati", "Gorj", "Giurgiu", "Harghita", "Hunedoara", "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt", "Prahova", "Salaj", "Satu Mare", "Sibiu", "Suceava", "Teleorman", "Timis", "Tulcea", "Vaslui", "Vilcea", "Vrancea"]
  }, {
    "country": "United States",
    "states": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
  }, {
    "country": "Belarus",
    "states": ["Brest", "Homyel", "Horad Minsk", "Hrodna", "Mahilyow", "Minsk", "Vitsyebsk"]
  }];
  stateData: Array<any> = [];
  countyData: Array<any> = ['Belarus', 'Canada', 'Romania', 'United State'];
  constructor(
    private appService: AppService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    let action = Action.CART + this.cookieService.get('shopizer-cart-id') + '/' + Action.PAYMENT;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.summeryOrder = data;
        console.log(data)
        this.spinnerService.hide();
      }, error => {

        this.spinnerService.hide();
      });

  }
  onPayment() {
    console.log(this.checkout)
  }
  onCountrySelect(value) {
    console.log(value)
    let index = this.countyStateData.findIndex(order => order.country === value);
    this.stateData = this.countyStateData[index].states;

  }
  onShippingChange() {
    this.spinnerService.show();
    let action = Action.CART + this.cookieService.get('shopizer-cart-id') + '/' + Action.SHIPPING;
    let param = { 'postalCode': this.checkout.postcode }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data)
        this.spinnerService.hide();
      }, error => {

        this.spinnerService.hide();
      });
  }
}
