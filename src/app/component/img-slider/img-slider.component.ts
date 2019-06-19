import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.scss']
})
export class ImgSliderComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit(): void {

    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true, "imageInfinityMove": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];

    this.galleryImages = [
      {
        small: 'https://cdn.pixabay.com/photo/2015/11/09/14/43/laptop-1035345__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2015/11/09/14/43/laptop-1035345__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2015/11/09/14/43/laptop-1035345__340.jpg'
      },
      {
        small: 'https://cdn.pixabay.com/photo/2013/12/22/15/30/motherboard-232515__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2013/12/22/15/30/motherboard-232515__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2013/12/22/15/30/motherboard-232515__340.jpg'
      },
      {
        small: 'https://cdn.pixabay.com/photo/2015/05/31/11/50/apple-791323__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2015/05/31/11/50/apple-791323__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2015/05/31/11/50/apple-791323__340.jpg'
      },
      {
        small: 'https://cdn.pixabay.com/photo/2015/05/31/11/23/headphones-791163__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2015/05/31/11/23/headphones-791163__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2015/05/31/11/23/headphones-791163__340.jpg'
      }
    ];

  }

}
