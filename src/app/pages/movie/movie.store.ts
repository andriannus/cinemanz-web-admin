import { Injectable } from '@angular/core';

import { MOVIE_STATE } from '@app/pages/movie/movie.constant';
import { Movie, MovieState } from '@app/pages/movie/movie.model';

import { Store } from '@app/shared/store';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Injectable()
export class MovieStore extends Store<Partial<MovieState>> {
  constructor() {
    super(MOVIE_STATE);
  }

  setMovies(movies: PaginatedData<Movie>): void {
    this.setState({ movies });
  }
}
