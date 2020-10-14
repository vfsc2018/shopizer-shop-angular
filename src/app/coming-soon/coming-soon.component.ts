import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  text: any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "weeks",
    Days: "days",
    Hours: "hours",
    Minutes: "mins",
    Seconds: "secs",
    MilliSeconds: "MilliSeconds"
  };
  merchant: any;
  api_url=environment.baseUrl;
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.merchant = JSON.parse(this.cookieService.get('store-data'));
    if(this.merchant.logo)
    {
        this.merchant.logo.path=this.api_url+this.merchant.logo.path;
    }

  }

}
