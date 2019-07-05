import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelectComponent),
    multi: true
  }]
})
export class CustomSelectComponent implements OnInit {
  @Input() label: string;
  @Input() labelAfter: string;
  @Input() bottom: string;
  // @Input() selectedValue: string;
  // @Input() value: string;
  @Input() name: string;
  @Input() data: any[];
  @Input() inputModel: string;
  @Input() placeHolder: string;


  @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

  private _required: any;
  private _value: any = '';
  @Input()
  get required(): Boolean { return this._required; }
  set required(value: Boolean) { this._required = this.coerceBooleanProperty(value); }

  constructor() { }

  ngOnInit() {
  }
  private _onTouched: () => {};
  private _onChange: (_: any) => {};
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._onChange(value);
    }
  }

  onChange(value) {
    console.log(value)
    this.onSelectChange.emit(value);
  }

  onBlur() {
    this._onTouched();
  }
  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;

    }
  }
  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }
  coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }

}
