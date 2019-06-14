import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shop-color',
  templateUrl: './shop-color.component.html',
  styleUrls: ['./shop-color.component.scss']
})
export class ShopColorComponent implements OnInit {
  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
