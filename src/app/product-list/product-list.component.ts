import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductListComponent implements OnInit {
  @Input() productData: any[];
  @Output() onClickCart: EventEmitter<any> = new EventEmitter();
  @Output() onClickDetail: EventEmitter<any> = new EventEmitter();

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
  p: any = 0;
  ngOnInit() {
  }
  onClickAddCart(result) {
    this.onClickCart.emit(result);
  }
  onClickName(result) {
    this.onClickDetail.emit(result);
  }
}
