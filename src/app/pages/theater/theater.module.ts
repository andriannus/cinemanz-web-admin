import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheaterComponent } from '@app/pages/theater/theater.component';
import { TheaterService } from '@app/pages/theater/theater.service';

import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';

@NgModule({
  declarations: [TheaterComponent],
  imports: [
    BaseLayoutModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TheaterComponent,
      },
    ]),
  ],
  providers: [TheaterService],
})
export class TheaterModule {}
