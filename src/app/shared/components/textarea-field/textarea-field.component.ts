import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'textarea-field',
  templateUrl: './textarea-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFieldComponent {
  @Input()
  controlRef: FormControl;

  @Input()
  errorMessage: string;

  @Input()
  label: string;

  @Input()
  noResize: boolean;

  @Input()
  placeholder: string;

  constructor() {
    this.controlRef = null;
    this.errorMessage = '';
    this.label = '';
    this.noResize = false;
    this.placeholder = '';
  }

  getResizeValue(): string {
    return this.noResize ? 'none' : 'vertical';
  }
}
