import { Validators } from '@angular/forms';

import { MovieState } from '@app/pages/movie/movie.model';

export const MOVIE_STATE: MovieState = {
  movies: {
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

export const MOVIE_FORM = {
  casts: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Casts is required',
    },
    error: '',
  },
  director: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Director is required',
    },
    error: '',
  },
  end: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Date end is required',
    },
    error: '',
  },
  genres: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Genres is required',
    },
    error: '',
  },
  minutes: {
    rules: [0, [Validators.required]],
    message: {
      required: 'Minutes is required',
    },
    error: '',
  },
  poster: {
    rules: ['google.com', [Validators.required]],
    message: {
      required: 'Poster is required',
    },
    error: '',
  },
  producers: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Producers is required',
    },
    error: '',
  },
  production: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Production is required',
    },
    error: '',
  },
  rate: {
    rules: [0, [Validators.required]],
    message: {
      required: 'Rate is required',
    },
    error: '',
  },
  start: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Date start is required',
    },
    error: '',
  },
  synopsis: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Synopsis is required',
    },
    error: '',
  },
  theaters: {
    rules: ['theater', [Validators.required]],
    message: {
      required: 'Theaters is required',
    },
    error: '',
  },
  title: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Title is required',
    },
    error: '',
  },
  writer: {
    rules: ['', [Validators.required]],
    message: {
      required: 'Writer is required',
    },
    error: '',
  },
};
