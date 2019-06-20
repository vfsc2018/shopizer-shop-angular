import { Component, Input } from '@angular/core'

@Component({
  selector: "err-required",
  template: `<div *ngIf="!isValid" class="alert alert-danger">
              {{message}}
            </div>`
})
export class RequiredValidationErrorComponent {
  @Input() isValid: boolean;
  @Input() message: string;
  constructor() { }
}

