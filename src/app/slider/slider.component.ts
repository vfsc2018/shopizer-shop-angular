import { Component, OnInit } from "@angular/core";
import Siema from "siema";

@Component({
  selector: "slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  siema = Siema;

  changeSlide() {
    this.siema.next();
  }

  ngAfterViewInit(): void {
    this.siema = new Siema({
      loop: true
    });
  }
}
