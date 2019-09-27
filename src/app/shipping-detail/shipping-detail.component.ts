import { Component, OnInit } from '@angular/core';

import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.scss']
})
export class ShippingDetailComponent implements OnInit {

  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    public router: Router
  ) { }

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
    email: ''
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
    email: ''
  }
  stateData: Array<any> = [];
  countryData: Array<any> = [];
  ngOnInit() {
    this.getCountry();
  }
  getCountry() {
    let action = Action.COUNTRY;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.countryData = data;
        this.getProfile();
      }, error => {
      });
  }
  onCountrySelect(value) {
    console.log(value);
    this.getState(value);

  }
  getState(code) {
    let action = Action.ZONES;
    this.appService.getMethod(action + '?code=' + code)
      .subscribe(data => {
        this.stateData = data;
      }, error => {
      });
  }
  getProfile() {
    let action = Action.AUTH + Action.CUSTOMER + Action.PROFILE;
    this.appService.getMethod(action)
      .subscribe(data => {
        console.log(data);
        this.billing = data.billing;
        this.shipping = data.delivery;
      }, error => {
      });
  }
  onUpdateAddress() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.spinnerService.show();
    let action = 'private/  ' + Action.CUSTOMER + userData.id + '/' + Action.ADDRESS;
    let param = {
      "id": userData.id,
      "billing": {
        "company": this.billing.company,
        "address": this.billing.address,
        "city": this.billing.city,
        "postalCode": this.billing.postalCode,
        "stateProvince": this.billing.stateProvince,
        "country": this.billing.country,
        "zone": this.billing.stateProvince,
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
        "country": this.shipping.country,
        "zone": "No",
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
        this.toastr.error('Registering customer user already exist');
      });
  }
}
