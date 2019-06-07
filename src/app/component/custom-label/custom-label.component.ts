import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'custom-label',
  templateUrl: './custom-label.component.html',
  styleUrls: ['./custom-label.component.scss']
})
export class CustomLabelComponent implements OnInit {

  constructor() { }
  @Input() label: string
  @Input() className: string
  @Input() color: string
  ngOnInit() {
  }

}
