import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
