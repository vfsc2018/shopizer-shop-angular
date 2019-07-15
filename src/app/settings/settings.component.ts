import { Component, OnInit, Input } from '@angular/core';
import { Helper } from '../directive/helper';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @Input() isOpen: boolean;
  @Input() languageData: any = [];
  language: any = '';
  constructor(
    private helper: Helper,
    private cookieService: CookieService,
  ) {

    this.language = localStorage.getItem('langulage') == 'en' ? 'English' : 'French'

  }
  onChangeLanguage(value) {
    this.language = value;
    this.helper.languageChange();
  }
}
