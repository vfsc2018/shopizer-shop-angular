import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Helper } from '../directive/helper';
import { DataSharingService } from '../directive/data-sharing.service';
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
    private cookieService: CookieService,
    private Helper: Helper,
    private dataSharingService: DataSharingService
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
    if (event.keyCode == 13) {
      this.onLogin();
    }
  }
  onLogin() {
    this.spinnerService.show();
    let action = Action.CUSTOMER + Action.LOGIN;
    let username = this.user.username;
    if(username && username.indexOf('@')<0){
        username += "@vfsc.vn";
    }
    let param = { "username": username, "password": this.user.password }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        this.spinnerService.hide();
        this.router.navigate(['/orders']);
        localStorage.setItem('userData', JSON.stringify(data));
        this.dataSharingService.isLogin.next(0);
        this.toastr.success('You have successfully logged in to this website', 'Well done!');
        this.addToCart();
      }, error => {
        this.spinnerService.hide();
        this.toastr.error('Incorrect username or password');
        console.log('user')
      });
  }
  addToCart() {
    let cardCode = this.cookieService.get('vfscfood-cart-id');
    
    if (cardCode) {
      // let userData = JSON.parse(localStorage.getItem('userData'));
      let data = JSON.parse(this.cookieService.get('localCart'));
      let action = Action.PRIVATE + Action.CUSTOMER + Action.CARTS;
      if(data){
        data.map((value) => {
          let param = { "product": value.id, "quantity": value.quantity }
          this.appService.postMethod(action, param)
            .subscribe(x => {

            }, error => {
            });
        });
      
        this.Helper.showMiniCart(1);
      }
    }
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
