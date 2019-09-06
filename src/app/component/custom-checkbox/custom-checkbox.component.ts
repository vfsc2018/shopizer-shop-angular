import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {
  @Input() label: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onChangeCheckBox(event) {
    this.onChange.emit(event);
  }
}
