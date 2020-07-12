import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export interface FormState {
  form: FormGroup;
  field: FormValidation;
}

export interface FormValidation {
  [key: string]: {
    rules: (
      | string
      | number
      | null
      | ((control: AbstractControl) => ValidationErrors)[]
    )[];
    message: { [key: string]: string };
    error: string;
  };
}
