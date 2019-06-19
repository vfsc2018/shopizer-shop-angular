import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';


@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  //@Input() productDetails: any[];

  isOpen: boolean = false;

  productDetail: Array<any> = [
    { itemName: 'Ignacio Chairs', price: '39.00', description: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.' }]

  sellerData: Array<any> = [
    { 'name': 'Crackle Plates', 'price': 22.99 },
    { 'name': 'floor lamp', 'price': 48.05 },
    { 'name': 'wooden fan', 'price': 25.54 }
  ];

  categoriesData: Array<any> = [
    { 'name': 'sofa', 'quantity': 35 },
    { 'name': 'chair', 'quantity': 15 },
    { 'name': 'lamp', 'quantity': 12 },
    { 'name': 'decor', 'quantity': 22 }
  ];
  sizeData: Array<any> = [
    { 'name': 'xs', 'quantity': 35 },
    { 'name': 's', 'quantity': 15 },
    { 'name': 'm', 'quantity': 12 },
    { 'name': 'l', 'quantity': 15 },
    { 'name': 'xl', 'quantity': 15 },
    { 'name': 'xxl', 'quantity': 15 }
  ];
  colorData: Array<any> = [
    { 'color': 'black', 'quantity': 4 },
    { 'color': 'green', 'quantity': 15 },
    { 'color': 'pink', 'quantity': 12 },
    { 'color': 'blue', 'quantity': 6 },
    { 'color': 'red', 'quantity': 8 },
    { 'color': 'yellow', 'quantity': 2 }
  ];
  minValue: number = 22;
  maxValue: number = 77;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1

  };

  constructor() { }

  ngOnInit() {
  }

}
