import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, SubscriptionLike } from 'rxjs';

import { Movie, MovieStore } from '@app/pages/movie/movie.model';
import { MovieService } from '@app/pages/movie/movie.service';

import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit, OnDestroy {
  errorMessage: { fetchMovies: string };
  loading: { isFetchMovies: boolean };
  movies: PaginatedData<Movie>;

  private subscription: Subscription;

  constructor(private movieService: MovieService, private titleService: Title) {
    this.errorMessage = { fetchMovies: '' };
    this.movies = null;
    this.loading = { isFetchMovies: false };
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Movie - CinemaNz Admin');

    this.movieService.fetchPaginatedMovies();

    this.subscription.add(this.movieStoreSubscription());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  movieStoreSubscription(): SubscriptionLike {
    return this.movieService.data$.subscribe((movieStore: MovieStore) => {
      const { errorMessage, loading, movies } = movieStore;

      this.errorMessage = errorMessage;
      this.loading = loading;
      this.movies = movies;
    });
  }
}
