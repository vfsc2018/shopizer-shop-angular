import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  itemData = [
    { itemName: 'Ignacio Chairs', price: '39.00' },
    { itemName: 'Diamond Lamp', price: '23.00' },
    { itemName: 'High Table', price: '15.00' },
    { itemName: 'Pendant Shade', price: '20.00' },
    { itemName: 'Aslesha Basket', price: '27.00' },
    { itemName: 'Driva Table Lamp', price: '56.00' },
    { itemName: 'Hanging Sphere', price: '18.00' },
    { itemName: 'Portable Speaker', price: '42.00' }
  ]
  ngOnInit() {
  }

}
