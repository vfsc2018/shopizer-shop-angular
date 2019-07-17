import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  password = {
    current: '',
    new: '',
    repeat: ''
  }
  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }
  onChangePassword() {
    // this.spinnerService.show();
    // let action = Action.LOGIN;
    // let param = { "changePassword": this.password.new, "password": this.password.current }
    // this.appService.putMethod(action, param)
    //   .subscribe(data => {
    //     this.spinnerService.hide();
    //     this.toastr.success('You successfully logged in to this website', 'Well done!');
    //   }, error => {
    //     this.spinnerService.hide();
    //     // this.toastr.error('Incorrect username or password');
    //   });
  }


}
