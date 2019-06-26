import { Component, OnInit } from "@angular/core";
import { OwlOptions } from 'ngx-owl-carousel-o';

import Siema from "siema";

@Component({
  selector: "latest-news",
  templateUrl: "./latest-news.component.html",
  styleUrls: ["./latest-news.component.scss"]
})
export class LatestNewsComponent implements OnInit {
  constructor() { }

  ngOnInit() { }


  currentJustify = 'start';
  customOptions: OwlOptions = {
    loop: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 2
      }
    },
    nav: false
  }


  ngAfterViewInit() {
    // new Siema({
    //   perPage: 2
    // });
  }
}
