import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'custom-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImgComponent implements OnInit {

  @Input() src: string
  @Input() alt: string
  constructor() { }

  ngOnInit() {
  }

}
