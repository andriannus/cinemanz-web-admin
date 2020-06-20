import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheaterComponent } from '@app/pages/theater/theater.component';

import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';

@NgModule({
  declarations: [TheaterComponent],
  imports: [
    BaseLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: TheaterComponent,
      },
    ]),
  ],
})
export class TheaterModule {}
