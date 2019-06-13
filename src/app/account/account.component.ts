import { Component, OnInit } from '@angular/core';

import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private appService: AppService) { }
  user = {
    username: '',
    password: ''
  }
  ngOnInit() {
  }
  onLogin() {
    let action = Action.LOGIN;
    let param = { "username": this.user.username, "password": this.user.password }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);
      }, error => {
      });
  }
}
