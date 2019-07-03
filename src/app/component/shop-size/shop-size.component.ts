import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shop-size',
  templateUrl: './shop-size.component.html',
  styleUrls: ['./shop-size.component.scss']
})
export class ShopSizeComponent implements OnInit {
  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
