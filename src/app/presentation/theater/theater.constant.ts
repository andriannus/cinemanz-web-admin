import { Validators } from '@angular/forms';

export const THEATER_FORM = {
  name: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Name is required',
    },
    error: '',
  },
  address: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Address is required',
    },
    error: '',
  },
  telephone: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Telephone is required',
    },
    error: '',
  },
};
