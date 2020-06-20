import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieComponent } from '@app/pages/movie/movie.component';

import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    BaseLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: MovieComponent,
      },
    ]),
  ],
})
export class MovieModule {}
