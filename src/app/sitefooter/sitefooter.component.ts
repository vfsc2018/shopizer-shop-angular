import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Helper } from '../directive/helper';
import { CookieService } from 'ngx-cookie-service';
import { SafeHtml } from '../shared/utility/safe-html'
import { TranslateService } from '@ngx-translate/core';
import { DataSharingService } from '../directive/data-sharing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'sitefooter',
  templateUrl: './sitefooter.component.html',
  styleUrls: ['./sitefooter.component.scss']
})
export class SitefooterComponent implements OnInit {
  configuration: any;
  merchant: any;
  category: any;
  content: any;
  pitchContent: any;
  lan: any;
  constructor(
    private appService: AppService,
    private cookieService: CookieService,
    private translate: TranslateService,
    private helper: Helper,
    public router: Router,
    private dataSharingService: DataSharingService,
  ) {
    this.getStore();
    this.lan = localStorage.getItem('langulage');
  }

  ngOnInit() {
    this.getCategoryHierarchy();
    this.getContent();
    this.getPitch();
  }
  getStore() {

    let action = Action.STORE + Action.DEFAULT;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.merchant = data;
      }, error => {
      });
  }
  getCategoryHierarchy() {

    let action = Action.CATEGORY + '?count=20&page=0';
    // let action = Action.CATEGORY + '?' + Action.FILTER + '=' + Action.VISIBLE;
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data);
        this.category = data.categories;
      }, error => {
      });
  }
  getContent() {

    let action = Action.CONTENT + Action.PAGES + '?' + Action.STORE + '=' + Action.DEFAULT;
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data)
        this.content = data;
      }, error => {
      });
  }
  getPitch() {
    let action = Action.CONTENT + Action.BOXES + Action.PITCH;
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data.boxContent)
        this.pitchContent = data;
      }, error => {
      });
  }
  getYear(date) {
    // console.log(date);
    return new Date(date).getFullYear();
  }
  onClickCategory(category) {
    this.dataSharingService.categoryData.next(category);
    localStorage.setItem('category_id', JSON.stringify(category))
    this.router.navigate(['/category/' + category.description.friendlyUrl]);

  }
  changeLang() {
    this.helper.languageChange();
    // if (localStorage.getItem('langulage') == 'en') {
    //   localStorage.setItem('langulage', 'fr');
    //   this.translate.use('fr');
    // } else {
    //   localStorage.setItem('langulage', 'en');
    //   this.translate.use('en');
    // }
  }

}
