import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export interface FormValidation {
  [key: string]: {
    rules: (string | ((control: AbstractControl) => ValidationErrors)[])[];
    message: { [key: string]: string };
    error: string;
  };
}

export interface FormStore {
  form: FormGroup;
  field: FormValidation;
}
