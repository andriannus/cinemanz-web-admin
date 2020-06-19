import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: NotFoundComponent,
      },
    ]),
  ],
})
export class NotFoundModule {}
