import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'list-header',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  animations: [
    trigger('items', [
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(0.550, 0.085, 0.680, 0.530)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class ListComponent implements OnInit {

  @Input() data: any[];
  @Input() showGrid: any;
  @Output() onCrossButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onDownButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onUpButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onQtyChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  removecartData(result) {
    this.onCrossButtonClick.emit(result);
  }
  decreaseQuntity(value) {
    this.onDownButtonClick.emit(value);
  }
  increaseQuntity(value) {
    this.onUpButtonClick.emit(value);
  }
  onQuantityChange(data, value) {
    this.onQtyChange.emit({ data: data, value: value });
  }
}
