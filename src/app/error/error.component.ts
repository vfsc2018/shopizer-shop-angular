import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  merchant: any;
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.merchant = JSON.parse(this.cookieService.get('store-data'));
  }

}
