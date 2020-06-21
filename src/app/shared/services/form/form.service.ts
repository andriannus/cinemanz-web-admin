import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import {
  FormStore,
  FormValidation,
} from '@app/shared/services/form/form.model';

@Injectable()
export class FormService {
  data$: Observable<FormStore>;

  private store: FormStore;
  private dispatcher: BehaviorSubject<FormStore>;

  constructor(private fb: FormBuilder) {
    this.store = {
      field: null,
      form: null,
    };

    this.dispatcher = new BehaviorSubject({}) as BehaviorSubject<FormStore>;
    this.data$ = this.dispatcher.asObservable();

    this.dispatcher.next(this.store);
  }

  private setStore(store: object): void {
    const newStore = Object.assign(this.store, store);

    this.dispatcher.next(newStore);
  }

  setupForm(formValidation: FormValidation): void {
    const rules = {};

    Object.keys(formValidation).forEach((field: string) => {
      rules[field] = formValidation[field].rules;
    });

    this.setStore({
      field: formValidation,
      form: this.fb.group(rules),
    });

    this.store.form.valueChanges.subscribe(() => this.handleValueChanges());
  }

  validateForm(): void {
    this.makeFormDirty();
    this.handleValueChanges();
  }

  resetForm(): void {
    const { field, form } = this.store;

    form.reset();

    Object.keys(form.controls).forEach((control: string) => {
      field[control].error = '';
    });
  }

  patchValue(value: { [key: string]: any }): void {
    this.store.form.patchValue(value);
  }

  private handleValueChanges(): void {
    const { field, form } = this.store;

    Object.keys(field).forEach((fieldName: string) => {
      const control = form.get(fieldName);
      field[fieldName].error = '';

      this.setStore({ field });

      if (!control) {
        return;
      }

      if (control.dirty && control.invalid) {
        Object.keys(control.errors).forEach((key: string) => {
          field[fieldName].error = `${field[fieldName].message[key]}`;

          this.setStore({ field });
        });

        return;
      }

      if (control.value && control.invalid) {
        Object.keys(control.errors).forEach((key: string) => {
          field[fieldName].error = `${field[fieldName].message[key]}`;

          this.setStore({ field });
        });

        return;
      }
    });
  }

  private makeFormDirty(): void {
    const { form } = this.store;

    Object.keys(form.controls).forEach((field: string) => {
      const control = form.get(field);

      control.markAsDirty();
    });
  }
}
