import { Component, OnInit } from '@angular/core';
import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private appService: AppService, public router: Router) { }
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
    this.search_text = value;
    this.autoCompleteData = [];
  }
  keyDownFunction(event) {
    if (event.keyCode == 13) {

      this.router.navigate(['/search/' + this.search_text]);
      this.toggleSearch();

    }
  }
  onClickSearchIcon() {
    this.router.navigate(['/search/' + this.search_text]);
    this.toggleSearch();
  }
}