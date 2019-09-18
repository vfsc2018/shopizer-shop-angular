import { Component, OnInit } from '@angular/core';

import { AppService } from '../directive/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Action } from '../directive/app.constants';
import { Helper } from '../directive/helper';
import { error } from '@angular/compiler/src/util';
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
  shipping = {
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
  cartData: any;
  config: any;
  shippingData: any;
  shippingQuateID: any;
  stateData: Array<any> = [];
  countryData: Array<any> = [];
  // countyData: Array<any> = ['Belarus', 'Canada', 'Romania', 'United State'];
  constructor(
    private appService: AppService,
    private helper: Helper,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.getCountry();
    this.getCart();

  }
  onSameBillingAddress(event) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.shipping = {
        firstname: this.checkout.firstname,
        lastname: this.checkout.lastname,
        companyName: this.checkout.companyName,
        address: this.checkout.address,
        address1: this.checkout.address1,
        city: this.checkout.city,
        state: this.checkout.state,
        country: this.checkout.country,
        postcode: this.checkout.postcode,
        phone: this.checkout.phone,
        email: this.checkout.email,
        note: this.checkout.note,

      }
    } else {
      this.shipping = {
        firstname: '',
        lastname: '',
        companyName: '',
        address: '',
        address1: '',
        city: '',
        state: '',
        country: '',
        postcode: '',
        phone: '',
        email: '',
        note: ''
      }
    }
  }
  getCountry() {
    let action = Action.COUNTRY;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.countryData = data;
      }, error => {
      });
  }
  getState(code) {
    let action = Action.ZONES;
    this.appService.getMethod(action + '?code=' + code)
      .subscribe(data => {
        this.stateData = data;
      }, error => {
      });
  }
  getCart() {
    this.spinnerService.show();
    let action = Action.CART;
    this.appService.getMethod(action + this.cookieService.get('shopizer-cart-id'))
      .subscribe(data => {
        this.spinnerService.hide();
        this.cartData = data;
        this.getOrderTotal('')
      }, error => {
        this.spinnerService.hide();
      });

  }
  getOrderTotal(quoteID) {
    console.log(this.cartData)
    // this.spinnerService.show();
    let action;
    if (quoteID) {
      action = Action.CART + this.cartData.id + '/' + Action.TOTAL + '?quote=' + quoteID;
    } else {
      action = Action.CART + this.cartData.id + '/' + Action.TOTAL;
    }
    this.appService.getMethod(action)
      .subscribe(data => {
        this.summeryOrder = data;
        this.spinnerService.hide();
      }, error => {

        this.spinnerService.hide();
      });
    this.getConfig();

  }
  getConfig() {
    let action = Action.CONFIG;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.config = data;
        // this.summeryOrder = data;
      }, error => {
      });
  }
  ngOnInit() {

  }
  onPayment() {
    console.log(this.checkout)
  }
  onCountrySelect(value) {
    console.log(value);
    this.getState(value);
    // let index = this.countyStateData.findIndex(order => order.country === value);
    // this.stateData = this.countyStateData[index].states;

  }
  onShippingChange() {
    this.spinnerService.show();
    let action = Action.CART + this.cartData.id + '/' + Action.SHIPPING;
    let param = { 'postalCode': this.checkout.postcode, 'countryCode': this.checkout.country }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data)
        this.shippingData = data;
        this.spinnerService.hide();
      }, error => {

        this.spinnerService.hide();
      });
  }
  shippingQuoteChange(value) {
    console.log(value);
    // this.shippingQuateID = value.shippingQuoteOptionId
    this.getOrderTotal(value.shippingQuoteOptionId)
  }
}
