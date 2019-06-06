import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() data: any[];
  @Output() onCrossButtonClick = new EventEmitter<any>()
  @Output() onDownButtonClick = new EventEmitter<any>()
  @Output() onUpButtonClick = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }
  removecartData(index) {
    console.log(this.data[index])

    this.onCrossButtonClick.emit(index);
  }
  decreaseQuntity(value) {
    this.data[value].quantity = this.data[value].quantity - 1
    this.onDownButtonClick.emit(value);
  }
  increaseQuntity(value) {
    this.data[value].quantity = this.data[value].quantity + 1
    this.onUpButtonClick.emit(value);
  }
}
