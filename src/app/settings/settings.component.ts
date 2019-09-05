import { Component, OnInit, Input } from '@angular/core';
import { Helper } from '../directive/helper';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @Input() isOpen: boolean;
  @Input() languageData: any = [];
  language: any = '';
  userData: any;
  userDataFlag: boolean = false;
  constructor(
    private helper: Helper,
    private cookieService: CookieService,
    private router: Router,
    private appService: AppService
  ) {
    this.userDataFlag = localStorage.getItem('userData') ? true : false;
    this.language = 'Language'
    this.getProfile();
  }
  getProfile() {
    let action = Action.AUTH + Action.CUSTOMER + Action.PROFILE;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.userData = data;
      }, error => {
      });
  }
  onChangeLanguage(value) {
    this.language = value;
    this.helper.languageChange();
  }
  logout() {
    this.userDataFlag = false;
    this.router.navigate(['/account']);
    localStorage.removeItem('userData');
  }
  menuHide() {
    this.isOpen = false;
  }
}
