import { Component, forwardRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
  }]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() labelAfter: string;
  @Input() bottom: string;
  @Input() type: string;
  @Input() name: string;
  @Input() inputModel: string;
  @Input() readonly: boolean;
  @Input() placeHolder: string;

  @Output() onInputChange: EventEmitter<any> = new EventEmitter();
  @Output() inputModelChange = new EventEmitter<string>();

  private _required: any;
  private _value: any = '';
  @Input()
  get required(): Boolean { return this._required; }
  set required(value: Boolean) { this._required = this.coerceBooleanProperty(value); }

  constructor() { }

  ngOnInit() {
  }

  onValueChange(value) {
    // console.log(value)
    this.onInputChange.emit(value);
  }
  private _onTouched: () => {};
  private _onChange: (_: any) => {};

  //get accessor
  get value(): any {
    return this._value;
  };

  //set accessor including call the onchange callback
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._onChange(value);
    }
  }

  //Set touched on blur
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
  /** Coerces a data-bound value (typically a string) to a boolean. */
  coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }



}
