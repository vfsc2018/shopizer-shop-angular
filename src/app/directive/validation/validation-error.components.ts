import { Host, SkipSelf, Inject } from '@angular/core'
import { NgControl } from '@angular/forms';
import {
  NG_VALIDATORS, Validator, ValidatorFn,
  RequiredValidator,
  MinLengthValidator,
  MaxLengthValidator,
  PatternValidator
} from '@angular/forms';
import { ValidationComponent, ValidationType, ValidationErrorComponent } from './validation-error.component'

@ValidationComponent({
  selector: "required"
})



interface ClockInterface {
  string;
}

@ValidationType(RequiredValidator)
export class RequiredValidationErrorComponent extends ValidationErrorComponent {
  constructor(
    @Host() @SkipSelf() control: NgControl,
    @Host() @SkipSelf() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>) {
    super(control, validators);
  }
}

@ValidationComponent({
  selector: "minlength"
})
@ValidationType(MinLengthValidator)
export class MinLengthValidationErrorComponent extends ValidationErrorComponent {
  constructor(
    @Host() @SkipSelf() control: NgControl,
    @Host() @SkipSelf() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>) {
    super(control, validators);
  }
}

@ValidationComponent({
  selector: "maxlength"
})
@ValidationType(MaxLengthValidator)
export class MaxLengthValidationErrorComponent extends ValidationErrorComponent {
  constructor(
    @Host() @SkipSelf() control: NgControl,
    @Host() @SkipSelf() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>) {
    super(control, validators);
  }
}

@ValidationComponent({
  selector: "pattern"
})
@ValidationType(PatternValidator)
export class PatternValidationErrorComponent extends ValidationErrorComponent {
  constructor(
    @Host() @SkipSelf() control: NgControl,
    @Host() @SkipSelf() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>) {
    super(control, validators);
  }
}