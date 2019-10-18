import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  password = {
    current: '',
    newpassword: '',
    confirmPassword: '',
    username: ''
  }

  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }
  onChangePassword() {
    this.spinnerService.show();
    let action = Action.CUSTOMER + Action.PASSWORD;
    let param = {
      "password": this.password.newpassword,
      "repeatPassword": this.password.confirmPassword,
      "current": this.password.current,
      "username": this.password.username,
    }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        this.spinnerService.hide();
        this.password = {
          current: '',
          newpassword: '',
          confirmPassword: '',
          username: ''
        }
        this.toastr.success('You password has been successful changed.', 'Well done!');
      }, error => {
        this.spinnerService.hide();
        // this.toastr.error('Incorrect username or password');
      });
  }


}
