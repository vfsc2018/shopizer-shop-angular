import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
  @HostListener('scroll', ['$event'])
  @Input() productData: any[];
  @Input() Large: any;
  @Input() Hide: any;
  @Input() withScroll: string;
  @Output() onClickCart: EventEmitter<any> = new EventEmitter();
  @Output() onClickDetail: EventEmitter<any> = new EventEmitter();
  @Output() onPagination: EventEmitter<any> = new EventEmitter();
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit() {
  }

  onClickAddCart(result) {
    this.onClickCart.emit(result);
  }
  onClickName(result) {
    this.onClickDetail.emit(result);
  }
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
      this.onPagination.emit(this.productData.length);
    }
  }
}
