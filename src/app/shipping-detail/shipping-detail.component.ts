import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';

import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare let google: any;
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.scss']
})
export class ShippingDetailComponent implements OnInit {
  @ViewChild("search") public searchElementRef: ElementRef;
  @ViewChild("searchShipping") public searchShippingElementRef: ElementRef;
  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {

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

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchShippingElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let p = autocomplete.getPlace();
          this.shipping.countryCode = p.address_components.find(i => i.types.some(i => i == "country")).short_name;
          this.shipping.country = p.address_components.find(i => i.types.some(i => i == "country")).long_name;
          this.shipping.stateProvince = p.address_components.find(i => i.types.some(i => i == "administrative_area_level_1")).long_name;
          this.shipping.zone = p.address_components.find(i => i.types.some(i => i == "administrative_area_level_1")).short_name;
          this.shipping.city = p.address_components.find(i => i.types.some(i => i == "locality")).long_name;
          let poCode = p.address_components.find(i => i.types.some(i => i == "postal_code"));
          if (poCode != undefined) {
            this.shipping.postalCode = poCode.long_name
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
          this.shipping.address = array.toString();
        });
      });
    });


  }
  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: false,
    // limitTo: 5,
    height: '300px',
  };
  shipping = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    countryCode: '',
    zone: ''
  }
  billing = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    countryCode: '',
    zone: ''
  }
  stateData: Array<any> = [];
  countryData: Array<any> = [];
  shippingStateData: Array<any> = [];
  shippingCountryData: Array<any> = [];
  ngOnInit() {
    this.getCountry();
  }
  getCountry() {
    let action = Action.COUNTRY;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.countryData = data;
        this.shippingCountryData = data;
        this.getProfile();
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

    this.shippingStateData = value.value.zones;
    this.shipping.stateProvince = '';
    this.shipping.zone = '';
  }
  onShippingStateSelect(value) {
    this.shipping.stateProvince = value.value.name;
    this.shipping.zone = value.value.code;
  }
  // getState(code) {
  //   console.log(code)
  //   let action = Action.ZONES;
  //   this.appService.getMethod(action + '?code=' + code.value.code)
  //     .subscribe(data => {
  //       this.stateData = data;
  //     }, error => {
  //     });
  // }
  getProfile() {
    let action = Action.AUTH + Action.CUSTOMER + Action.PROFILE;
    this.appService.getMethod(action)
      .subscribe(data => {
        console.log(data);
        this.billing = data.billing;
        if (data.delivery) {
          this.shipping = data.delivery;
          let shippingIndex = this.shippingCountryData.findIndex(order => order.code === data.delivery.country);
          if (shippingIndex != -1) {
            this.shipping.country = this.shippingCountryData[shippingIndex].name;
            this.shipping.countryCode = this.shippingCountryData[shippingIndex].code;
            this.shippingStateData = this.shippingCountryData[shippingIndex].zones;
            let shippingIndex1 = this.shippingStateData.findIndex(order => order.code === data.delivery.zone);
            if (shippingIndex1 != 1) {
              // this.shipping.stateProvince = this.shippingStateData[shippingIndex1].name;
              // this.shipping.zone = this.shippingStateData[shippingIndex1].zone;
            }
          }
        }



        console.log(data.billing);
        let index = this.countryData.findIndex(order => order.code === data.billing.country);
        if (index != -1) {
          this.billing.country = this.countryData[index].name;
          this.billing.countryCode = this.countryData[index].code;
          this.stateData = this.countryData[index].zones;
          if (!data.delivery) {
            this.shipping.country = this.countryData[index].name;
            this.shipping.countryCode = this.countryData[index].code;
            this.shippingStateData = this.countryData[index].zones;
          }

          console.log(this.stateData)
          let index1 = this.stateData.findIndex(order => order.code === data.billing.zone);
          if (index != 1) {
            this.billing.stateProvince = this.stateData[index1].name;
            this.billing.zone = this.stateData[index1].code;

            if (!data.delivery) {
              this.shipping.stateProvince = this.stateData[index1].name;
              this.shipping.zone = this.stateData[index1].zone;
            }
          }
        }

        console.log(index, '***********');
      }, error => {
      });
  }
  onUpdateAddress() {

    let userData = JSON.parse(localStorage.getItem('userData'));
    this.spinnerService.show();
    let action = Action.AUTH + Action.CUSTOMER + Action.ADDRESS;
    let param = {
      "id": userData.id,
      "billing": {
        "company": this.billing.company,
        "address": this.billing.address,
        "city": this.billing.city,
        "postalCode": this.billing.postalCode,
        "stateProvince": this.billing.stateProvince,
        "country": this.billing.countryCode,
        "zone": this.billing.zone,
        "firstName": this.billing.firstName,
        "lastName": this.billing.lastName,
        "phone": this.billing.phone
      },
      "delivery": {
        "company": this.shipping.company,
        "address": this.shipping.address,
        "city": this.shipping.city,
        "postalCode": this.shipping.postalCode,
        "stateProvince": this.shipping.stateProvince,
        "country": this.shipping.countryCode,
        "zone": this.shipping.zone,
        "firstName": this.shipping.firstName,
        "lastName": this.shipping.lastName,
        "phone": this.shipping.phone
      }
    }
    // console.log(param); 
    this.appService.patchMethod(action, param)
      .subscribe(data => {
        console.log(data);
        this.spinnerService.hide();
        this.toastr.success('Your address has been updated successfully.', 'Congratulation');
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.success('Your address has been updated successfully.', 'Congratulation');
        // this.toastr.error('Registering customer user already exist');
      });
  }
}
