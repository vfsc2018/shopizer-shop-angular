import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() className: string;
  // @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }


}
