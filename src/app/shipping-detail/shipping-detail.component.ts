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
  register = {
    username: '',
    password: ''
  }
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
  ngOnInit() {

    this.getProfile();
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
  // keyPress(event) {
  //   const pattern = /[0-9\+\-\ ]/;

  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }



  // onEnterLogin(event) {
  //   console.log('ffdfdsfsdfsd');
  //   if (event.keyCode == 13) {
  //     this.onLogin();
  //   }
  // }
  // onLogin() {
  //   this.spinnerService.show();
  //   let action = Action.LOGIN;
  //   let param = { "username": this.user.username, "password": this.user.password }
  //   this.appService.postMethod(action, param)
  //     .subscribe(data => {
  //       this.spinnerService.hide();
  //       this.router.navigate(['/password']);
  //       localStorage.setItem('userData', JSON.stringify(data));
  //       this.toastr.success('You successfully logged in to this website', 'Well done!');
  //     }, error => {
  //       this.spinnerService.hide();
  //       this.toastr.error('Incorrect username or password');
  //       console.log('user')
  //     });
  // }
  // onRegister() {
  //   // console.log('-----------')
  //   let action = Action.REGISTER;
  //   let param = {
  //     "encodedPassword": "nimble",
  //     "emailAddress": "jaimin@nimblechapps.com",
  //     "userName": "Jaimin",
  //   }
  //   this.appService.postMethod(action, param)
  //     .subscribe(data => {
  //       console.log(data);
  //     }, error => {
  //     });
  // }
}
