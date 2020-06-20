import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent {
  @Input()
  controlRef: FormControl;

  @Input()
  errorMessage: string;

  @Input()
  isError: boolean;

  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  type: string;

  constructor() {
    this.controlRef = null;
    this.errorMessage = '';
    this.isError = false;
    this.label = '';
    this.placeholder = '';
    this.type = 'text';
  }
}
