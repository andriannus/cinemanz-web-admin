import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '@app/pages/login/login.component';

import { PlainLayoutModule } from '@app/shared/layouts/plain-layout/plain-layout.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    PlainLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      },
    ]),
  ],
})
export class LoginModule {}
