import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Observable, BehaviorSubject } from 'rxjs';

import { paginate } from '@app/shared/utils/pagination/pagination.util';
import {
  DeleteMovieOperation,
  Movie,
  MoviesOperation,
  MovieStore,
} from '@app/pages/movie/movie.model';

import { DATA_PER_PAGE } from '@app/shared/constants/data.constant';
import DeleteMovie from '@app/shared/graphql/mutations/DeleteMovie.gql';
import Movies from '@app/shared/graphql/queries/Movies.gql';
import { PaginationOptions } from '@app/shared/utils/pagination/pagination.model';

@Injectable()
export class MovieService {
  data$: Observable<MovieStore>;

  private dispatcher: BehaviorSubject<MovieStore>;
  private store: MovieStore;

  constructor(private apollo: Apollo) {
    this.store = {
      errorMessage: {
        fetchMovies: '',
      },
      loading: {
        isFetchMovies: false,
      },
      movies: null,
    };

    this.dispatcher = new BehaviorSubject({}) as BehaviorSubject<MovieStore>;
    this.data$ = this.dispatcher.asObservable();

    this.dispatcher.next(this.store);
  }

  private setStore(store: Partial<MovieStore>): void {
    const newStore = Object.assign(this.store, store);

    this.dispatcher.next(newStore);
  }

  fetchPaginatedMovies(page: number = 1): void {
    const skip = (page - 1) * DATA_PER_PAGE;

    this.setStore({
      loading: {
        ...this.store.loading,
        isFetchMovies: true,
      },
    });

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

          this.setStore({
            errorMessage: {
              ...this.store.errorMessage,
              fetchMovies: '',
            },
            loading: {
              ...this.store.loading,
              isFetchMovies: false,
            },
            movies: paginatedMovies,
          });
        },
        () => {
          this.setStore({
            errorMessage: {
              ...this.store.errorMessage,
              fetchMovies: 'Something wrong.',
            },
            loading: {
              ...this.store.loading,
              isFetchMovies: true,
            },
          });
        },
      );
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
