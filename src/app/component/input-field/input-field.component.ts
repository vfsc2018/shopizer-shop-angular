import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {

  @Input() label: string;
  @Input() labelAfter: string;
  @Input() bottom: string;
  @Input() type: string;
  @Input() value: string;
  @Input() name: string;
  @Input() inputModel: string;
  @Input() placeHolder: string;
  @Output() onInputChange: EventEmitter<any> = new EventEmitter();
  @Output() inputModelChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onValueChange(value) {
    console.log(value)
    this.onInputChange.emit(value);
  }

}
