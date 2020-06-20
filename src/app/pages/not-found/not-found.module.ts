import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

import { PlainLayoutModule } from '@app/shared/layouts/plain-layout/plain-layout.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    PlainLayoutModule,
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
