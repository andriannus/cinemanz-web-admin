import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class DashboardModule {}
