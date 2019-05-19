import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  isOpen: boolean = false;

  
  toggleSearch() {
    this.isOpen = !this.isOpen ;
  }

  ngOnInit() {
  }

}
