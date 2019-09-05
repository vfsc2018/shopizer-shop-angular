import {
  Component, forwardRef,
  Input, OnChanges,
  OnInit, Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'ng-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})

export class AutocompleteComponent implements OnInit {


  @Input() data = [];
  @Input() bottom: string;
  @Input() type: string;
  @Input() name: string;
  @Input() inputModel: string;
  @Input() placeHolder: string;

  @Output() onInputChange: EventEmitter<any> = new EventEmitter();
  @Output() onClickCross: EventEmitter<any> = new EventEmitter();
  @Output() onClickValue: EventEmitter<any> = new EventEmitter();
  @Output() onSearchIcon: EventEmitter<any> = new EventEmitter();
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
  onClickClose() {
    this.onClickCross.emit()
  }
  onClickItem(value) {
    this.onClickValue.emit(value)
  }
  onClickSearchIcon() {
    this.onSearchIcon.emit()
  }


}
