import { Component, OnInit } from '@angular/core';

import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    public router: Router
  ) { }
  register = {
    username: '',
    password: '',
    confirmPassword: ''
  }
  // shipping = {
  //   firstName: '',
  //   lastName: '',
  //   company: '',
  //   address: '',
  //   city: '',
  //   stateProvince: '',
  //   country: '',
  //   postalCode: '',
  //   phone: ''
  // }
  billing = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    phone: ''
  }
  stateData: Array<any> = [];
  countryData: Array<any> = [];
  ngOnInit() {
    this.getCountry()
  }
  // onChangeDeliveryAddress(event) {
  //   console.log(event.target.checked)
  //   if (event.target.checked) {
  //     this.shipping = {
  //       firstName: this.billing.firstName,
  //       lastName: this.billing.lastName,
  //       company: this.billing.company,
  //       address: this.billing.address,
  //       city: this.billing.city,
  //       stateProvince: this.billing.stateProvince,
  //       country: this.billing.country,
  //       postalCode: this.billing.postalCode,
  //       phone: this.billing.phone
  //     }
  //   } else {
  //     this.shipping = {
  //       firstName: '',
  //       lastName: '',
  //       company: '',
  //       address: '',
  //       city: '',
  //       stateProvince: '',
  //       country: '',
  //       postalCode: '',
  //       phone: ''
  //     }
  //   }
  // }
  getCountry() {
    let action = Action.COUNTRY;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.countryData = data;
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
  onRegister() {
    this.spinnerService.show();
    let action = Action.CUSTOMER + Action.REGISTER;
    let param = {
      "userName": this.register.username,
      "password": this.register.password,
      "emailAddress": this.register.username,
      "gender": "F",
      "language": "en",
      "billing": {
        // "company": this.billing.company,
        // "address": this.billing.address,
        // "city": this.billing.city,
        // "postalCode": this.billing.postalCode,
        // "stateProvince": this.billing.stateProvince,
        "country": this.billing.country,
        "zone": this.billing.stateProvince,
        "firstName": this.billing.firstName,
        "lastName": this.billing.lastName,
        // "phone": this.billing.phone
      }
      // "delivery": {
      //   "company": this.shipping.company,
      //   "address": this.shipping.address,
      //   "city": this.shipping.city,
      //   "postalCode": this.shipping.postalCode,
      //   "stateProvince": this.shipping.stateProvince,
      //   "country": this.shipping.country,
      //   "zone": "No",
      //   "firstName": this.shipping.firstName,
      //   "lastName": this.shipping.lastName,
      //   "phone": this.shipping.phone
      // }
    }
    // console.log(param); 
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);
        this.spinnerService.hide();
        this.router.navigate(['/orders']);
        localStorage.setItem('userData', JSON.stringify(data));
        this.toastr.success('You have successfully registerd in to this site.', 'Congratulation');
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error('Registering customer user already exist');
        console.log('user')
      });
  }

}
