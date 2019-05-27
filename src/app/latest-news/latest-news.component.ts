import { Component, OnInit } from "@angular/core";

import Siema from "siema";

@Component({
  selector: "latest-news",
  templateUrl: "./latest-news.component.html",
  styleUrls: ["./latest-news.component.scss"]
})
export class LatestNewsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    new Siema({
      perPage: 2
    });
  }
}
