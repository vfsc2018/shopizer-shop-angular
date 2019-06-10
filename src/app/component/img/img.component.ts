import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'custom-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() src: string
  @Input() alt: string
  constructor() { }

  ngOnInit() {
  }

}
