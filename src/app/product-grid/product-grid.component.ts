import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPageInfo } from 'ngx-virtual-scroller';
@Component({
  selector: 'product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input() productData: any[];
  @Input() Large: any;
  @Input() Hide: any;
  @Input() withScroll: string;
  @Output() onClickCart: EventEmitter<any> = new EventEmitter();
  @Output() onClickDetail: EventEmitter<any> = new EventEmitter();
  @Output() onPagination: EventEmitter<any> = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
  onClickAddCart(result) {
    this.onClickCart.emit(result);
  }
  onClickName(result) {
    this.onClickDetail.emit(result);
  }
  fetchMore(event: IPageInfo) {
    if (event.endIndex !== this.productData.length - 1 || event.endIndex == -1) return;
    this.onPagination.emit(this.productData.length);
  }
}
