import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, SubscriptionLike } from 'rxjs';
import {
  faPencilAlt,
  faTrashAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

import { MOVIE_FORM } from '@app/pages/movie/movie.constant';
import { MovieModal } from '@app/pages/movie/movie.enum';
import {
  CreateMovieOperation,
  DeleteMovieOperation,
  Movie,
  MovieErrorMessageState,
  MovieLoadingState,
  UpdateMovieOperation,
} from '@app/pages/movie/movie.model';
import { MovieService } from '@app/pages/movie/movie.service';
import { MovieStore } from '@app/pages/movie/movie.store';

import { FormState } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';
import { ErrorMessageStore } from '@app/shared/store/error-message';
import { LoadingStore } from '@app/shared/store/loading';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit, OnDestroy {
  errorMessage: { fetchMovies: string };
  formState: FormState;
  icon: { edit: IconDefinition; delete: IconDefinition };
  isEdit: boolean;
  loading: { isFetchMovies: boolean };
  modal: {
    isDelete: boolean;
    isPut: boolean;
  };
  movies: PaginatedData<Movie>;
  selectedMovie: Partial<Movie>;

  private subscription: Subscription;

  constructor(
    private errorMessageStore: ErrorMessageStore<MovieErrorMessageState>,
    private formService: FormService,
    private loadingStore: LoadingStore<MovieLoadingState>,
    private movieService: MovieService,
    private movieStore: MovieStore,
    private titleService: Title,
  ) {
    this.errorMessage = { fetchMovies: '' };
    this.formState = null;
    this.icon = {
      edit: faPencilAlt,
      delete: faTrashAlt,
    };
    this.isEdit = false;
    this.modal = {
      isDelete: false,
      isPut: false,
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
    this.setupForm();

    this.titleService.setTitle('Movie - CinemaNz Admin');

    this.subscription.add(this.movieStateSubscription());
    this.subscription.add(this.errorMessageStateSubscription());
    this.subscription.add(this.loadingStateSubscription());
    this.subscription.add(this.formStateSubscription());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchPaginatedMovies(page: number = 1): void {
    this.movieService.fetchPaginatedMovies(page);
  }

  setupForm(): void {
    this.formService.setup(MOVIE_FORM);
  }

  toggleModal(selectedModal: string): void {
    this.modal[selectedModal] = !this.modal[selectedModal];
  }

  confirmDelete(movie: Movie): void {
    this.modal.isDelete = true;
    this.selectedMovie = movie;
  }

  cancel(): void {
    this.toggleModal(MovieModal.Put);
    this.formService.reset();
  }

  handleSubmit(): void {
    const { form } = this.formState;

    if (form.invalid) {
      this.formService.validate();
      return;
    }

    if (this.isEdit) {
      const udpatedTheater = {
        ...form.value,
        _id: this.selectedMovie._id,
      };

      this.submitEditedMovie(udpatedTheater);
      return;
    }

    this.submitCreatedMovie(form.value);
  }

  submitEditedMovie(formValue: Movie): void {
    this.movieService
      .updateMovie(formValue)
      .pipe(map(({ data }) => data))
      .subscribe((data: UpdateMovieOperation) => {
        const { result } = data.updateMovie;

        if (result) {
          this.cancel();
          this.fetchPaginatedMovies();
        }
      });
  }

  submitCreatedMovie(formValue: Movie): void {
    const { _id, ...createdMovie } = formValue;

    this.movieService
      .createMovie(createdMovie)
      .pipe(map(({ data }) => data))
      .subscribe((data: CreateMovieOperation) => {
        const { result } = data.createMovie;

        if (result) {
          this.cancel();
          this.fetchPaginatedMovies();
        }
      });
  }

  put(movie: Movie = null): void {
    this.isEdit = !!movie;

    if (movie) {
      this.selectedMovie = movie;

      const { _id, ...selectedMovie } = movie;

      this.formService.patchValue(selectedMovie);
    }

    this.toggleModal(MovieModal.Put);
  }

  delete(): void {
    const { _id: id } = this.selectedMovie;

    this.movieService
      .deleteMovie(id)
      .pipe(map(({ data }) => data))
      .subscribe((data: DeleteMovieOperation) => {
        const { result } = data.deleteMovie;

        if (result) {
          this.modal.isDelete = false;
          this.fetchPaginatedMovies();
        }
      });
  }

  private movieStateSubscription(): SubscriptionLike {
    return this.movieStore.state$
      .pipe(map(({ movies }) => movies))
      .subscribe((movies: PaginatedData<Movie>) => {
        this.movies = movies;
      });
  }

  private errorMessageStateSubscription(): SubscriptionLike {
    return this.errorMessageStore.state$.subscribe(
      (errorMessageState: MovieErrorMessageState) => {
        this.errorMessage = errorMessageState;
      },
    );
  }

  private loadingStateSubscription(): SubscriptionLike {
    return this.loadingStore.state$.subscribe(
      (loadingState: MovieLoadingState) => {
        this.loading = loadingState;
      },
    );
  }

  private formStateSubscription(): SubscriptionLike {
    return this.formService.state$.subscribe((formState: FormState) => {
      this.formState = formState;
    });
  }
}
