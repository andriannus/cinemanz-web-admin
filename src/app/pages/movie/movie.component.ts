import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FetchResult } from 'apollo-link';
import { Subscription, SubscriptionLike } from 'rxjs';
import {
  faPencilAlt,
  faTrashAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { MOVIE_FORM } from '@app/pages/movie/movie.constant';
import { MovieModal } from '@app/pages/movie/movie.enum';
import {
  CreateMovieOperation,
  DeleteMovieOperation,
  Movie,
  MovieStore,
  UpdateMovieOperation,
} from '@app/pages/movie/movie.model';
import { MovieService } from '@app/pages/movie/movie.service';

import { FormStore } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit, OnDestroy {
  errorMessage: { fetchMovies: string };
  formStore: FormStore;
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
    private formService: FormService,
    private movieService: MovieService,
    private titleService: Title,
  ) {
    this.errorMessage = { fetchMovies: '' };
    this.formStore = null;
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

    this.subscription.add(this.movieStoreSubscription());
    this.subscription.add(this.formServiceSubscription());
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
    const { form } = this.formStore;

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
    } else {
      this.submitCreatedMovie(form.value);
    }
  }

  submitEditedMovie(formValue: Movie): void {
    this.movieService
      .updateMovie(formValue)
      .subscribe(({ data }: FetchResult<UpdateMovieOperation>) => {
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
      .subscribe(({ data }: FetchResult<CreateMovieOperation>) => {
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
      console.log('Movie: ', movie);
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
      .subscribe(({ data }: FetchResult<DeleteMovieOperation>) => {
        const { result } = data.deleteMovie;

        if (result) {
          this.modal.isDelete = false;
          this.fetchPaginatedMovies();
        }
      });
  }

  private movieStoreSubscription(): SubscriptionLike {
    return this.movieService.data$.subscribe((movieStore: MovieStore) => {
      const { errorMessage, loading, movies } = movieStore;

      this.errorMessage = errorMessage;
      this.loading = loading;
      this.movies = movies;
    });
  }

  private formServiceSubscription(): SubscriptionLike {
    return this.formService.data$.subscribe((formData: FormStore) => {
      this.formStore = formData;
    });
  }
}
