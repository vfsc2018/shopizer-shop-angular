import { Component, OnInit, Input } from '@angular/core';
import { Helper } from '../directive/helper';



@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  // @Input() isOpen: boolean;
  // @Input() languageData: any = [];
  constructor(
    private helper: Helper
  ) {

  }
  onChangeLanguage() {
    this.helper.languageChange();
  }
}
