import { Validators } from '@angular/forms';

export const LOGIN_FORM = {
  username: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Username is required',
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
