import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blogcategories: Array<any> = [
    { 'result.description.name': 'xs', 'result.quantity': 35 },
    { 'result.description.name': 's', 'result.quantity': 15 },
    { 'result.description.name': 'm', 'result.quantity': 12 },
    { 'result.description.name': 'l', 'result.quantity': 15 },
    { 'result.description.name': 'xl', 'result.quantity': 15 },
    { 'result.description.name': 'xxl', 'result.quantity': 15 }
  ];
  sellerData: Array<any> = [
    { 'name': '25/June', 'post': 'Nemo enim ipsam' },
    { 'name': '11/June', 'post': 'Et harum quidem' },
    { 'name': '14/June', 'post': 'Nam libero tempore' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
