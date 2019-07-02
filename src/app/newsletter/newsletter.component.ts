import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  constructor(private appService: AppService, private spinnerService: Ng4LoadingSpinnerService) { }
  news = {
    email: ''
  }
  ngOnInit() {
  }
  onNewsLetter() {
    this.spinnerService.show();
    let action = Action.NEWSLETTER;
    let param = { "email": this.news.email };
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);
        this.spinnerService.hide();
      }, error => {
        console.log('error');
        this.spinnerService.hide();
      });
  }
}
