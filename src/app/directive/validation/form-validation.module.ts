import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RequiredValidationErrorComponent,
  MinLengthValidationErrorComponent,
  MaxLengthValidationErrorComponent,
  PatternValidationErrorComponent
} from './validation-error.components'


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    RequiredValidationErrorComponent,
    MinLengthValidationErrorComponent,
    MaxLengthValidationErrorComponent,
    PatternValidationErrorComponent
  ],
  //providers: [],
  exports: [
    RequiredValidationErrorComponent,
    MinLengthValidationErrorComponent,
    MaxLengthValidationErrorComponent,
    PatternValidationErrorComponent]
})
export class FormValidationModule { }