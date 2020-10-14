import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  api_url=environment.baseUrl;
  merchant: any;
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.merchant = JSON.parse(this.cookieService.get('store-data'));
    if(this.merchant.logo)
                {
                    this.merchant.logo.path=this.api_url+this.merchant.logo.path;
                }
  }

}
