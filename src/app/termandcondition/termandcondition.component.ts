import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
// import { Helper } from '../directive/helper';
import { Action, AppConstants } from '../directive/app.constants';
@Component({
  selector: 'termandcondition',
  templateUrl: './termandcondition.component.html',
  styleUrls: ['./termandcondition.component.scss']
})
export class TermandconditionComponent implements OnInit {

  constructor(private appService: AppService) { }
  termpolicy: any;

  ngOnInit() {

    let data = JSON.parse(localStorage.getItem('content_id'));
    let action = Action.CONTENT + Action.PAGES + data.code
    this.appService.getMethod(action)
      .subscribe(data => {
        // console.log(data);
        this.termpolicy = data;
      }, error => {
      });
  }

}
