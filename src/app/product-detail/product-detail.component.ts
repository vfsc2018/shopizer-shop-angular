import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  //@Input() productDetails: any[];

  productDetail: Array<any> = [
    { itemName: 'Ignacio Chairs', price: '39.00', description: 'A chair is a piece of furniture. It is used for sitting on and it can also be used for standing on, if you cant reach something.There is another type of chair called a sofa or settee.' }]

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

  currentJustify = 'start';
  customOptions: OwlOptions = {
    loop: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
  }

}
