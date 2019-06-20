import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductListComponent implements OnInit {
  @Input() productData: any[];
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
  p: any = 0;
  ngOnInit() {
  }

}
