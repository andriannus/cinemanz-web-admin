import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';

import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    BaseLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class DashboardModule {}
