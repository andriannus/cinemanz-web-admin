import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FORM_STATE } from '@app/shared/services/form/form.constant';
import {
  FormState,
  FormValidation,
} from '@app/shared/services/form/form.model';

import Store from '@app/shared/store';

@Injectable()
export class FormService extends Store<FormState> {
  constructor(private fb: FormBuilder) {
    super(FORM_STATE);
  }

  setup(formValidation: FormValidation): void {
    const rules = {};

    Object.keys(formValidation).forEach((field: string) => {
      rules[field] = formValidation[field].rules;
    });

    this.setState({
      field: formValidation,
      form: this.fb.group(rules),
    });

    this.state.form.valueChanges.subscribe(() => this.handleValueChanges());
  }

  validate(): void {
    this.makeDirty();
    this.handleValueChanges();
  }

  reset(): void {
    const { field, form } = this.state;

    form.reset();

    Object.keys(form.controls).forEach((control: string) => {
      field[control].error = '';
    });
  }

  patchValue(value: { [key: string]: any }): void {
    this.state.form.patchValue(value);
  }

  private handleValueChanges(): void {
    const { field, form } = this.state;

    Object.keys(field).forEach((fieldName: string) => {
      const control = form.get(fieldName);
      field[fieldName].error = '';

      this.setState({ field });

      if (!control) {
        return;
      }

      if (control.invalid && (control.dirty || control.value)) {
        Object.keys(control.errors).forEach((key: string) => {
          field[fieldName].error = `${field[fieldName].message[key]}`;

          this.setState({ field });
        });

        return;
      }
    });
  }

  private makeDirty(): void {
    const { form } = this.state;

    Object.keys(form.controls).forEach((field: string) => {
      const control = form.get(field);

      control.markAsDirty();
    });
  }
}
