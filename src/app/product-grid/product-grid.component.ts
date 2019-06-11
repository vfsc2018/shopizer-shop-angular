import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input() productData: any[];
  @Input() Large: any;
  @Input() Hide: any;


  constructor() { }
  ngOnInit() {
  }

}
