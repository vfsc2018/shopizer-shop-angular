import { Component, OnInit } from '@angular/core';

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
    public router: Router
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
    let action = Action.LOGIN;
    let param = { "username": this.user.username, "password": this.user.password }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        this.spinnerService.hide();
        this.router.navigate(['/orders']);
        localStorage.setItem('userData', JSON.stringify(data));
        this.toastr.success('You successfully logged in to this website', 'Well done!');
      }, error => {
        this.spinnerService.hide();
        this.toastr.error('Incorrect username or password');
        console.log('user')
      });
  }
  onRegister() {
    // console.log('-----------')
    let action = Action.REGISTER;
    let param = {
      "encodedPassword": "nimble",
      "emailAddress": "jaimin@nimblechapps.com",
      "userName": "Jaimin",
    }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);
      }, error => {
      });
  }
}
