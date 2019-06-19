import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  @Input() label: string;
  @Input() labelAfter: string;
  @Input() bottom: string;
  @Input() selectedValue: string;
  @Input() data: any[];
  constructor() { }

  ngOnInit() {
  }

}
