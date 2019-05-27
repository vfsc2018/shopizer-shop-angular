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
  selectedIndex: number = 0;

  sliderItems = [
    {
      title: "title1",
      description: "lorem ipsum",
      img: "https://s3.ca-central-1.amazonaws.com/shopizer-lightsail/files/DEFAULT/banner.jpg"
    },
    {
      title: "title2",
      description: "lorem ipsum",
      img: "http://placekitten.com/1920/818"
    },
    {
      title: "title3",
      description: "lorem ipsum",
      img: "http://placekitten.com/1920/819"
    },
    {
      title: "title4",
      description: "lorem ipsum",
      img: "http://placekitten.com/1920/820"
    }
  ];

  changeSlide(slideNumber) {
    this.siema.goTo(slideNumber);
  }

  addSelected(siema) {
    this.selectedIndex = siema.currentSlide;
  }

  ngAfterViewInit(): void {
    var that = this;
    this.siema = new Siema({
      loop: true,
      onChange: function() {
        that.addSelected(this);
      }
    });
  }
}
