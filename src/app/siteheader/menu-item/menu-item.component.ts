import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Category } from '../../services/category/model/category'
import { Router } from '@angular/router';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() items: Category[];
  @ViewChild('childMenu') public childMenu;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor(public router: Router) {
  }

  ngOnInit() {
  }
  onClickCategory(value) {
    this.onClick.emit(value);
  }
}
