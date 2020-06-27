import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FetchResult } from 'apollo-link';
import { Subscription, SubscriptionLike } from 'rxjs';
import {
  faPencilAlt,
  faTrashAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import {
  Movie,
  MovieStore,
  DeleteMovieOperation,
} from '@app/pages/movie/movie.model';
import { MovieService } from '@app/pages/movie/movie.service';

import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit, OnDestroy {
  errorMessage: { fetchMovies: string };
  icon: { edit: IconDefinition; delete: IconDefinition };
  loading: { isFetchMovies: boolean };
  modal: {
    isAdd: boolean;
    isDelete: boolean;
    isEdit: boolean;
  };
  movies: PaginatedData<Movie>;
  selectedMovie: Partial<Movie>;

  private subscription: Subscription;

  constructor(private movieService: MovieService, private titleService: Title) {
    this.errorMessage = { fetchMovies: '' };
    this.icon = {
      edit: faPencilAlt,
      delete: faTrashAlt,
    };
    this.modal = {
      isAdd: false,
      isDelete: false,
      isEdit: false,
    };
    this.movies = null;
    this.loading = { isFetchMovies: false };
    this.subscription = new Subscription();
    this.selectedMovie = {
      _id: '',
      title: '',
    };
  }

  ngOnInit(): void {
    this.fetchPaginatedMovies();

    this.titleService.setTitle('Movie - CinemaNz Admin');

    this.subscription.add(this.movieStoreSubscription());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchPaginatedMovies(page: number = 1): void {
    this.movieService.fetchPaginatedMovies(page);
  }

  movieStoreSubscription(): SubscriptionLike {
    return this.movieService.data$.subscribe((movieStore: MovieStore) => {
      const { errorMessage, loading, movies } = movieStore;

      this.errorMessage = errorMessage;
      this.loading = loading;
      this.movies = movies;
    });
  }

  toggleModal(selectedModal: string): void {
    this.modal[selectedModal] = !this.modal[selectedModal];
  }

  confirmDelete(movie: Movie): void {
    this.modal.isDelete = true;
    this.selectedMovie = movie;
  }

  delete(): void {
    const { _id: id } = this.selectedMovie;

    this.movieService
      .deleteMovie(id)
      .subscribe(({ data }: FetchResult<DeleteMovieOperation>) => {
        const { result } = data.deleteMovie;

        if (result) {
          this.modal.isDelete = false;
          this.fetchPaginatedMovies();
        }
      });
  }
}
