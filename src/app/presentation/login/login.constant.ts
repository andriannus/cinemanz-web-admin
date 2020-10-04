import { Validators } from '@angular/forms';

export const LOGIN_FORM = {
  email: {
    rules: ['', [Validators.email, Validators.required]],
    message: {
      email: 'Invalid email format',
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
