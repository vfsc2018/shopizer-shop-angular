import { Component, OnInit, Input } from '@angular/core';
import { Helper } from '../directive/helper';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @Input() isOpen: boolean;
  @Input() languageData: any = [];
  language: any = '';
  userDataFlag: boolean = false;
  constructor(
    private helper: Helper,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.userDataFlag = localStorage.getItem('userData') ? true : false;
    this.language = localStorage.getItem('langulage') == 'en' ? 'English' : 'French'

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
