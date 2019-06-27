import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';

import { CookieService } from 'ngx-cookie-service';
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
  constructor(private appService: AppService, private cookieService: CookieService) {
    this.getStore();
  }

  ngOnInit() {
    // let action = Action.CONFIGURATIONS;
    // this.appService.getMethod(action)
    //   .subscribe(data => {
    //     this.configuration = data;
    //   }, error => {
    //   });

    this.getCategoryHierarchy()
    this.getContent()
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

    let action = Action.CATEGORY + '?' + Action.FILTER + '=' + Action.FEATURED;
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data);
        this.category = data;
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
  getYear(date) {
    // console.log(date);
    return new Date(date).getFullYear();
  }

}
