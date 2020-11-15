import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("passwordForm") passwordForm: NgForm;
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
    let username = this.password.username;
    if(username && username.indexOf('@')<0){
      username += '@vfsc.vn';
    }
    let action = Action.CUSTOMER + Action.PASSWORD;
    let param = {
      "password": this.password.newpassword,
      "repeatPassword": this.password.confirmPassword,
      "current": this.password.current,
      "username": username,
    }
    this.appService.putMethod(action, param).subscribe(data => { console.log(data);
        this.spinnerService.hide();
        // this.password = {
        //   current: '',
        //   newpassword: '',
        //   confirmPassword: '',
        //   username: ''
        // }
        this.passwordForm.resetForm();
        // for (let control in this.form.controls) {
        //   this.form.controls[control].setErrors(null);
        // }
        this.toastr.success('You password has been successful changed.', 'Well done!');
      }, error => { console.log("EEEE", error);
        this.spinnerService.hide();
        this.toastr.error('Incorrect username or password','Wrong information');
      });
  }


}
