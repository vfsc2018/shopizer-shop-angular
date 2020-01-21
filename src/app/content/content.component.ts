import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action, AppConstants } from '../directive/app.constants';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private appService: AppService,
              private activatedRoute: ActivatedRoute
             ) { }
  page: any;

  ngOnInit() {

    //let data = JSON.parse(localStorage.getItem('content_id'));
    //console.log(data);
    const code = this.activatedRoute.snapshot.paramMap.get('id');
    let action = Action.CONTENT + Action.PAGES + Action.NAME + code;
    console.log('Url ' + action);
    this.appService.getMethod(action)
      .subscribe(data => {
        console.log(data);
        this.page = data;
      }, error => {
      });
  }

}
