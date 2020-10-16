import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { environment } from 'src/environments/environment';
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

  api_url=environment.baseUrl;
  @Input() data: any[];
  @Input() showGrid: any;
  @Output() onCrossButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onDownButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onUpButtonClick: EventEmitter<number> = new EventEmitter();
  @Output() onQtyChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.data.map(e=>{
      if(e.image && e.image.imageUrl.indexOf("http")<0)
      {
        e.image.imageUrl=this.api_url+ e.image.imageUrl;
        e.images.map(ex=>{
          if(ex.imageUrl.indexOf("http")<0)
          {
            ex.imageUrl=this.api_url+ ex.imageUrl;
          }     
        });
      }     
    });
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
