import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  isOpen: boolean = false;

  
  toggleSearch() {
    this.isOpen = !this.isOpen ;
  }

  ngOnInit() {
  }

}
