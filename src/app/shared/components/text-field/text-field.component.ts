import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {
  @Input()
  controlRef: FormControl;

  @Input()
  errorMessage: string;

  @Input()
  id: string;

  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  type: string;

  constructor() {
    this.controlRef = null;
    this.errorMessage = '';
    this.id = '';
    this.label = '';
    this.placeholder = '';
    this.type = 'text';
  }
}
