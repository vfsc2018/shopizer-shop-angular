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
      { "breakpoint": 500, "width": "100%", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 },
      { "breakpoint": 767, "width": "100%", "height": "500px", "thumbnailsColumns": 4 },
      { "breakpoint": 991, "width": "100%", "height": "500px", "thumbnailsColumns": 4 },
      { "breakpoint": 1199, "width": "100%", "height": "545px", "thumbnailsColumns": 4 }
    ];

    this.galleryImages = [
      {
        small: 'https://cdn.pixabay.com/photo/2014/12/15/17/19/architect-569361__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2014/12/15/17/19/architect-569361__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2014/12/15/17/19/architect-569361__340.jpg'
      },
      {
        small: 'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463__340.jpg'
      },
      {
        small: 'https://cdn.pixabay.com/photo/2015/06/08/15/21/furniture-802031__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2015/06/08/15/21/furniture-802031__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2015/06/08/15/21/furniture-802031__340.jpg'
      },
      {
        small: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
        medium: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
        big: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg'
      }
    ];

  }

}
