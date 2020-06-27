import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MovieComponent } from '@app/pages/movie/movie.component';
import { MovieService } from '@app/pages/movie/movie.service';

import { ModalModule } from '@app/shared/components/modal/modal.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    BaseLayoutModule,
    CommonModule,
    FontAwesomeModule,
    ModalModule,
    PaginationModule,
    RouterModule.forChild([
      {
        path: '',
        component: MovieComponent,
      },
    ]),
  ],
  providers: [MovieService],
})
export class MovieModule {}
