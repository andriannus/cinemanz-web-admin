import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '@app/pages/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
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
