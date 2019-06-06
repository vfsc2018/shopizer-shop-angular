import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  templateUrl: './Shopping-cart.component.html',
  styleUrls: ['./Shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }
  @Input() name: string
  ngOnInit() {
  }

}
