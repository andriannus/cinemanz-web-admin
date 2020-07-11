import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

import { paginate } from '@app/shared/utils/pagination/pagination.util';
import {
  CreateMovieOperation,
  DeleteMovieOperation,
  Movie,
  MovieErrorMessageState,
  MovieLoadingState,
  MoviesOperation,
  UpdateMovieOperation,
} from '@app/pages/movie/movie.model';
import { MovieStore } from '@app/pages/movie/movie.store';

import { DATA_PER_PAGE } from '@app/shared/constants/data.constant';
import CreateMovie from '@app/shared/graphql/mutations/CreateMovie.gql';
import DeleteMovie from '@app/shared/graphql/mutations/DeleteMovie.gql';
import UpdateMovie from '@app/shared/graphql/mutations/UpdateMovie.gql';
import Movies from '@app/shared/graphql/queries/Movies.gql';
import { ErrorMessageStore } from '@app/shared/store/error-message';
import { LoadingStore } from '@app/shared/store/loading';
import { PaginationOptions } from '@app/shared/utils/pagination/pagination.model';

@Injectable()
export class MovieService {
  constructor(
    private apollo: Apollo,
    private errorMessageStore: ErrorMessageStore<MovieErrorMessageState>,
    private loadingStore: LoadingStore<MovieLoadingState>,
    private movieStore: MovieStore,
  ) {}

  fetchPaginatedMovies(page: number = 1): void {
    const skip = (page - 1) * DATA_PER_PAGE;

    this.loadingStore.set({ isFetchMovies: true });

    this.apollo
      .watchQuery({
        query: Movies,
        variables: {
          skip,
          limit: DATA_PER_PAGE,
        },
      })
      .valueChanges.subscribe(
        ({ data }: ApolloQueryResult<MoviesOperation>) => {
          const { movies } = data;
          const options: PaginationOptions = {
            limit: DATA_PER_PAGE,
            page,
            total: movies.total,
          };
          const paginatedMovies = paginate<Movie>(movies.results, options);

          this.movieStore.setMovies(paginatedMovies);

          this.loadingStore.set({ isFetchMovies: false });
          this.errorMessageStore.set({ fetchMovies: '' });
        },
        () => {
          this.loadingStore.set({ isFetchMovies: false });
          this.errorMessageStore.set({ fetchMovies: 'Something wrong.' });
        },
      );
  }

  createMovie(
    movie: Partial<Movie>,
  ): Observable<FetchResult<CreateMovieOperation>> {
    const { _id, ...data } = movie;

    return this.apollo.mutate({
      mutation: CreateMovie,
      variables: { data },
    });
  }

  updateMovie(movie: Movie): Observable<FetchResult<UpdateMovieOperation>> {
    return this.apollo.mutate({
      mutation: UpdateMovie,
      variables: { data: movie },
    });
  }

  deleteMovie(id: string): Observable<FetchResult<DeleteMovieOperation>> {
    return this.apollo.mutate({
      mutation: DeleteMovie,
      variables: {
        id,
      },
    });
  }
}
