import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private appService: AppService) { }
  search_text: string = '';
  isOpen: boolean = false;
  autoCompleteData: Array<any> = [];
  keyword = 'name';
  toggleSearch() {
    this.autoCompleteData = [];
    this.search_text = '';
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
  }
  onSearch() {
    let action = Action.SEARCH + Action.AUTOCOMPLETE;
    let param = { "query": this.search_text }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);
        this.autoCompleteData = data.values;
      }, error => {
      });
  }
  selectEvent(value) {

    let action = Action.SEARCH;
    let param = { "count": 100, query: value, "start": 0 }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);

      }, error => {
      });
  }
}