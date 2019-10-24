import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AppService } from '../directive/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Action } from '../directive/app.constants';
import { Helper } from '../directive/helper';
import { error } from '@angular/compiler/src/util';
import { parsePhoneNumberFromString, format, AsYouType } from 'libphonenumber-js';
declare let google: any;
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  @ViewChild("search") public searchElementRef: ElementRef;
  summeryOrder: any;
  isShipping: Boolean = false;
  isAccount: Boolean = false;
  public scrollbarOptions = { axis: 'y', theme: 'light' };
  // countyData: Array<any> = [];
  billing = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    // address1: '',
    city: '',
    country: '',
    countryCode: '',
    stateProvince: '',
    postalCode: '',
    phone: '',
    email: '',
    zone: ''
  }
  note: string = '';
  password: string = '';
  shipping = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    // address1: '',
    city: '',
    country: '',
    countryCode: '',
    stateProvince: '',
    postalCode: '',
    phone: '',
    email: '',
    zone: ''
    // note: ''
  }
  cartData: any;
  config: any;
  shippingData: any;
  shippingQuateID: any;
  stateData: Array<any> = [];
  countryData: Array<any> = [];
  shippingStateData: Array<any> = [];
  shippingCountryData: Array<any> = [];
  userDataFlag: boolean = false;
  selectConfig = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: false,
    // limitTo: 5,
    height: '300px',
  };
  // countyData: Array<any> = ['Belarus', 'Canada', 'Romania', 'United State'];
  constructor(
    private appService: AppService,
    private helper: Helper,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.getCountry();
    this.getCart();
    this.userDataFlag = localStorage.getItem('userData') ? true : false;

    // let me = this;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let p = autocomplete.getPlace();
          this.billing.countryCode = p.address_components.find(i => i.types.some(i => i == "country")).short_name;
          this.billing.country = p.address_components.find(i => i.types.some(i => i == "country")).long_name;
          this.billing.stateProvince = p.address_components.find(i => i.types.some(i => i == "administrative_area_level_1")).long_name;
          this.billing.zone = p.address_components.find(i => i.types.some(i => i == "administrative_area_level_1")).short_name;
          this.billing.city = p.address_components.find(i => i.types.some(i => i == "locality")).long_name;
          let poCode = p.address_components.find(i => i.types.some(i => i == "postal_code"));
          if (poCode != undefined) {
            this.billing.postalCode = poCode.long_name
          }
          var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            sublocality: 'sublocality'
          };
          let array = [];
          for (var i = 0; i < p.address_components.length; i++) {
            var addressType = p.address_components[i].types[0];
            if (componentForm[addressType]) {
              var val = p.address_components[i][componentForm[addressType]];
              array.push(val);

            }
          }
          this.billing.address = array.toString();
        });
      });
    });
  }

  getCountry() {
    let action = Action.COUNTRY;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.countryData = data;
        this.shippingCountryData = data;
        if (this.userDataFlag) {
          this.getProfile();
        } else {
          this.getCurrentLocation();
        }

      }, error => {
      });
  }
  onBillingCountrySelect(value) {
    if (value.value) {
      this.billing.country = value.value.name;
      this.billing.countryCode = value.value.code;
      this.stateData = value.value.zones;
      this.billing.stateProvince = '';
      this.billing.zone = '';
    }
  }
  onBillingStateSelect(value) {
    this.billing.stateProvince = value.value.name;
    this.billing.zone = value.value.code;
  }

  onShippingCountrySelect(value) {
    this.shipping.country = value.value.name;
    this.shipping.countryCode = value.value.code;
    // console.log(value)
    this.shippingStateData = value.value.zones;
    this.shipping.stateProvince = '';
    this.shipping.zone = '';
  }
  onShippingStateSelect(value) {
    this.shipping.stateProvince = value.value.name;
    this.shipping.zone = value.value.code;
  }
  // getState(code) {
  //   let action = Action.ZONES;
  //   this.appService.getMethod(action + '?code=' + code)
  //     .subscribe(data => {
  //       this.stateData = data;
  //       this.shippingStateData = data;
  //     }, error => {
  //     });
  // }
  getProfile() {
    let action = Action.AUTH + Action.CUSTOMER + Action.PROFILE;
    this.appService.getMethod(action)
      .subscribe(data => {
        // //console.log(data);
        this.billing = data.billing;
        this.billing.email = data.emailAddress;
        if (data.delivery) {
          this.shipping = data.delivery;
          let shippingIndex = this.shippingCountryData.findIndex(order => order.code === data.delivery.country);
          if (shippingIndex != -1) {
            this.shipping.country = this.shippingCountryData[shippingIndex].name;
            this.shipping.countryCode = this.shippingCountryData[shippingIndex].code;
            this.shippingStateData = this.shippingCountryData[shippingIndex].zones;
            let shippingIndex1 = this.shippingStateData.findIndex(order => order.code === data.delivery.zone);
            if (shippingIndex1 != 1) {
              this.shipping.stateProvince = this.shippingStateData[shippingIndex1].name;
              this.shipping.zone = this.shippingStateData[shippingIndex1].zone;
            }
          }
        }
        let index = this.countryData.findIndex(order => order.code === data.billing.country);
        if (index != -1) {
          this.billing.country = this.countryData[index].name;
          this.billing.countryCode = this.countryData[index].code;
          //console.log(this.countryData[index]);
          this.stateData = this.countryData[index].zones;
          let index1 = this.stateData.findIndex(order => order.code === data.billing.zone);
          if (index != 1) {
            this.billing.stateProvince = this.stateData[index1].name;
            this.billing.zone = this.stateData[index1].code;
          }
        }

        // //console.log(index, '***********');
      }, error => {
      });
  }
  getCurrentLocation() {
    let me = this;
    this.helper.getLocation(function (result, error) {
      if (error) {
        //console.log(error)
      } else {
        // console.log(result)
        me.billing.countryCode = result.find(i => i.types.some(i => i == "country")).short_name;
        me.billing.country = result.find(i => i.types.some(i => i == "country")).long_name;
        me.billing.stateProvince = result.find(i => i.types.some(i => i == "administrative_area_level_1")).long_name;
        me.billing.zone = result.find(i => i.types.some(i => i == "administrative_area_level_1")).short_name;
        me.billing.city = result.find(i => i.types.some(i => i == "locality")).long_name;
        // console.log(me.checkout.country);
      }
    })

  }
  getCart() {
    this.spinnerService.show();
    let action = Action.CART;
    this.appService.getMethod(action + this.cookieService.get('shopizer-cart-id'))
      .subscribe(data => {
        this.spinnerService.hide();
        console.log(data)
        this.cartData = data;
        this.getOrderTotal('')
      }, error => {
        this.spinnerService.hide();
      });

  }
  getOrderTotal(quoteID) {
    //console.log(this.cartData)
    // this.spinnerService.show();
    let action;
    if (this.userDataFlag) {
      if (quoteID) {
        action = Action.AUTH + Action.CART + this.cartData.id + '/' + Action.TOTAL + '?quote=' + quoteID;
      } else {
        action = Action.AUTH + Action.CART + this.cartData.id + '/' + Action.TOTAL;
      }
    } else {
      if (quoteID) {
        action = Action.CART + this.cartData.id + '/' + Action.TOTAL + '?quote=' + quoteID;
      } else {
        action = Action.CART + this.cartData.id + '/' + Action.TOTAL;
      }
    }

    this.appService.getMethod(action)
      .subscribe(data => {
        console.log(data);
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

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Shopizer',
      description: '2 widgets',
      amount: 20
    });

    //console.log(this.billing)
  }
  // onCountrySelect(value) {
  //   //console.log(value);
  //   this.getState(value);
  //   // let index = this.countyStateData.findIndex(order => order.country === value);
  //   // this.stateData = this.countyStateData[index].states;

  // }
  onShippingChange() {
    this.spinnerService.show();
    let action = Action.CART + this.cartData.id + '/' + Action.SHIPPING;
    let param = { 'postalCode': this.billing.postalCode, 'countryCode': this.billing.countryCode }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        //console.log(data)
        this.shippingData = data;
        this.spinnerService.hide();
      }, error => {

        this.spinnerService.hide();
      });
  }
  shippingQuoteChange(value) {
    this.getOrderTotal(value.shippingQuoteOptionId)
  }
  onShipDiffrent(event) {
    this.isShipping = !this.isShipping;
    if (event.target.checked) {
      this.shipping = {
        firstName: this.billing.firstName,
        lastName: this.billing.lastName,
        company: this.billing.company,
        address: this.billing.address,
        // address1: this.checkout.address1,
        city: this.billing.city,

        stateProvince: this.billing.stateProvince,
        zone: this.billing.zone,
        country: this.billing.country,
        countryCode: this.billing.countryCode,
        postalCode: this.billing.postalCode,
        phone: this.billing.phone,
        email: this.billing.email

      }
    } else {
      this.shipping = {
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        city: '',
        stateProvince: '',
        zone: '',
        country: '',
        countryCode: '',
        postalCode: '',
        phone: '',
        email: ''
      }
    }
  }
  onCreateAccount() {
    this.isAccount = !this.isAccount;
  }
  onPhoneChange() {
    this.billing.phone = new AsYouType('US').input(this.billing.phone);
  }
}       
