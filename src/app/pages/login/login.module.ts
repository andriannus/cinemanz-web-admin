import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '@app/pages/login/login.component';

import { TextFieldModule } from '@app/shared/components/text-field/text-field.module';
import { PlainLayoutModule } from '@app/shared/layouts/plain-layout/plain-layout.module';
import { FormService } from '@app/shared/services/form/form.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    PlainLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      },
    ]),
    TextFieldModule,
  ],
  providers: [FormService],
})
export class LoginModule {}
