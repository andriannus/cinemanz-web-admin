import { Response } from '@app/shared/models/response.model';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

export interface MovieStore {
  errorMessage: {
    fetchMovies: string;
  };
  loading: {
    isFetchMovies: boolean;
  };
  movies: PaginatedData<Movie>;
}

export interface Movie {
  _id: string;
  casts: string[];
  director: string;
  end: string;
  genres: string[];
  minutes: number;
  poster: string;
  producers: string[];
  production: string;
  rate: boolean;
  start: string;
  synopsis: string;
  theaters: string[];
  title: string;
  writer: string;
}

export interface MoviesResponse extends Response {
  results: Movie[];
  total: number;
}

export interface ReformTheaterResponse extends Response {
  result: {
    id: string;
  };
}

export interface MoviesOperation {
  movies: MoviesResponse;
}

export interface DeleteMovieOperation {
  deleteMovie: ReformTheaterResponse;
}

export interface CreateMovieOperation {
  createMovie: ReformTheaterResponse;
}

export interface UpdateMovieOperation {
  updateMovie: ReformTheaterResponse;
}
