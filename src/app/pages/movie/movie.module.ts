import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MovieComponent } from '@app/pages/movie/movie.component';
import {
  MovieErrorMessageState,
  MovieLoadingState,
} from '@app/pages/movie/movie.model';
import { MovieService } from '@app/pages/movie/movie.service';
import { MovieStore } from '@app/pages/movie/movie.store';

import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { ModalModule } from '@app/shared/components/modal/modal.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { TextFieldModule } from '@app/shared/components/text-field/text-field.module';
import { TextareaFieldModule } from '@app/shared/components/textarea-field/textarea-field.module';
import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';
import { FormService } from '@app/shared/services/form/form.service';
import ErrorMessageStore from '@app/shared/store/error-message';
import LoadingStore from '@app/shared/store/loading';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    BaseLayoutModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    LoadingSpinnerModule,
    ModalModule,
    PaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MovieComponent,
      },
    ]),
    TextFieldModule,
    TextareaFieldModule,
  ],
  providers: [
    FormService,
    MovieService,
    MovieStore,
    {
      provide: ErrorMessageStore,
      useFactory() {
        return new ErrorMessageStore<Partial<MovieErrorMessageState>>({
          fetchMovies: '',
        });
      },
    },
    {
      provide: LoadingStore,
      useFactory() {
        return new LoadingStore<Partial<MovieLoadingState>>({
          isFetchMovies: false,
        });
      },
    },
  ],
})
export class MovieModule {}
