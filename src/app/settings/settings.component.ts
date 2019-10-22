import { Component, OnInit, Input } from '@angular/core';
import { Helper } from '../directive/helper';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { DataSharingService } from '../directive/data-sharing.service';
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
    private appService: AppService,
    private dataSharingService: DataSharingService
  ) {
    console.log('12345646546565')
    this.userDataFlag = localStorage.getItem('userData') ? true : false;
    if (localStorage.getItem('langulage')) {
      this.language = localStorage.getItem('langulage') == 'en' ? 'English' : 'Francais';
    } else {
      this.language = 'Language'
    }
    this.dataSharingService.isLogin.subscribe(value => {
      console.log(value)
      this.userDataFlag = localStorage.getItem('userData') ? true : false;
      if (localStorage.getItem('langulage')) {
        this.language = localStorage.getItem('langulage') == 'en' ? 'English' : 'Francais';
      } else {
        this.language = 'Language'
      }
      this.getProfile();
    });
    //console.log('*********************')
    this.getProfile();
  }
  getProfile() {
    let action = Action.AUTH + Action.CUSTOMER + Action.PROFILE;
    this.appService.getMethod(action)
      .subscribe(data => {
        //console.log(data)
        this.userData = data;
      }, error => {
      });
  }
  onChangeLanguage(value) {

    //console.log(this.language)
    //console.log(value)
    if (this.language != value) {
      this.helper.languageChange();
    }
    this.language = value;
  }
  logout() {
    this.userDataFlag = false;
    this.router.navigate(['/account']);
    localStorage.removeItem('userData');
    this.cookieService.delete('shopizer-cart-id');
    this.cookieService.delete('localCart');
    this.menuHide();
  }
  menuHide() {
    this.isOpen = false;
  }
}
