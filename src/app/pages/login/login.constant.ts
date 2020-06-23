import { Validators } from '@angular/forms';

export const LOGIN_FORM = {
  email: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Email is required',
    },
    error: '',
  },
  password: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Password is required',
    },
    error: '',
  },
};
