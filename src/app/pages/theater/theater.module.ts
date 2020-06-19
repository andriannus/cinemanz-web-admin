import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TheaterComponent } from '@app/pages/theater/theater.component';

@NgModule({
  declarations: [TheaterComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TheaterComponent,
      },
    ]),
  ],
})
export class TheaterModule {}
