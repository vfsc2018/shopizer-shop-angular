import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    public router: Router,
    private cookieService: CookieService
  ) { }
  user = {
    username: '',
    password: ''
  }
  register = {
    username: '',
    password: ''
  }
  ngOnInit() {
  }
  onEnterLogin(event) {
    console.log('ffdfdsfsdfsd');
    if (event.keyCode == 13) {
      this.onLogin();
    }
  }
  onLogin() {
    this.spinnerService.show();
    let action = Action.CUSTOMER + Action.LOGIN;
    let param = { "username": this.user.username, "password": this.user.password }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        this.spinnerService.hide();
        this.router.navigate(['/orders']);
        localStorage.setItem('userData', JSON.stringify(data));
        this.toastr.success('You have successfully logged in to this website', 'Well done!');
        this.addtoCart();
      }, error => {
        this.spinnerService.hide();
        this.toastr.error('Incorrect username or password');
        console.log('user')
      });
  }
  addtoCart() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let data = JSON.parse(this.cookieService.get('localCart'));
    let action = Action.CUSTOMER + userData.id + '/' + Action.CART;
    data.map((value) => {
      console.log(value);
      let param = { "product": value.id, "quantity": value.quantity }
      this.appService.postMethod(action, param)
        .subscribe(data => {

        }, error => {
        });
    });
  }
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
