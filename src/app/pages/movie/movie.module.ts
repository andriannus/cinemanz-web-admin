import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MovieComponent } from '@app/pages/movie/movie.component';
import { MovieService } from '@app/pages/movie/movie.service';

import { ModalModule } from '@app/shared/components/modal/modal.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { TextFieldModule } from '@app/shared/components/text-field/text-field.module';
import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';
import { FormService } from '@app/shared/services/form/form.service';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    BaseLayoutModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
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
  ],
  providers: [FormService, MovieService],
})
export class MovieModule {}
