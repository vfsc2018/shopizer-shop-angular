import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.scss']
})
export class ImgSliderComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  @Input() galleryImages: any = [];
  constructor() { }

  ngOnInit(): void {

    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true, "imageInfinityMove": true },
      { "breakpoint": 500, "width": "100%", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 },
      { "breakpoint": 767, "width": "100%", "height": "500px", "thumbnailsColumns": 4 },
      { "breakpoint": 991, "width": "100%", "height": "500px", "thumbnailsColumns": 4 },
      { "breakpoint": 1199, "width": "100%", "height": "545px", "thumbnailsColumns": 4 },
      {
        width: '620px',
        height: '630px',
        thumbnailsColumns: 4,
        preview: false,
        thumbnails: this.galleryImages.length > 1 ? true : false,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    // this.galleryImages = [
    //   {
    //     small: 'https://s3.ca-central-1.amazonaws.com/shopizer-demo/products/DEFAULT/xyzabc/SMALL/kit-shelve-2i.jpg',
    //     medium: 'https://s3.ca-central-1.amazonaws.com/shopizer-demo/products/DEFAULT/xyzabc/SMALL/kit-shelve-2i.jpg',
    //     big: 'https://s3.ca-central-1.amazonaws.com/shopizer-demo/products/DEFAULT/xyzabc/SMALL/kit-shelve-2i.jpg'
    //   },
    //   {
    //     small: 'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463__340.jpg',
    //     medium: 'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463__340.jpg',
    //     big: 'https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463__340.jpg'
    //   },
    //   {
    //     small: 'https://cdn.pixabay.com/photo/2015/06/08/15/21/furniture-802031__340.jpg',
    //     medium: 'https://cdn.pixabay.com/photo/2015/06/08/15/21/furniture-802031__340.jpg',
    //     big: 'https://cdn.pixabay.com/photo/2015/06/08/15/21/furniture-802031__340.jpg'
    //   },
    //   {
    //     small: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
    //     medium: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
    //     big: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg'
    //   },
    //   {
    //     small: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
    //     medium: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
    //     big: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg'
    //   },
    //   {
    //     small: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
    //     medium: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg',
    //     big: 'https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960__340.jpg'
    //   }
    // ];

  }

}
