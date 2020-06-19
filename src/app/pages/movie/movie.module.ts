import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MovieComponent } from '@app/pages/movie/movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MovieComponent,
      },
    ]),
  ],
})
export class MovieModule {}
