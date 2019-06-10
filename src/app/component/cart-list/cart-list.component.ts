import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-header',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() data: any[];
  @Output() onCrossButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onDownButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onUpButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onQtyChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  removecartData(index) {
    this.onCrossButtonClick.emit(index);
  }
  decreaseQuntity(value) {
    this.onDownButtonClick.emit(value);
  }
  increaseQuntity(value) {
    this.onUpButtonClick.emit(value);
  }
  onQuantityChange(index, value) {
    this.onQtyChange.emit({ index: index, value: value });
  }
}
