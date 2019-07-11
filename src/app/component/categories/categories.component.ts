import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() data: any[];
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onCategoryClick(value) {
    console.log(value)
    this.onClick.emit(value);
  }
  isArray(obj: any) {
    return Array.isArray(obj)
  }
}
