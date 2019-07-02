import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.merchant = JSON.parse(this.cookieService.get('store-data'));


  }

}
