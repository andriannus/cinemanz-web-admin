import { Validators } from '@angular/forms';

import { TheaterState } from '@app/pages/theater/theater.model';

export const THEATER_STATE: TheaterState = {
  theaters: {
    data: [],
    meta: {
      nextPage: 0,
      page: 0,
      perPage: 0,
      prevPage: 0,
      total: 0,
      totalPage: 0,
    },
  },
};

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
