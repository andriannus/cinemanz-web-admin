import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TheaterComponent } from './theater.component';

import { LoadingSpinnerModule } from '@app/shared/components/loading-spinner/loading-spinner.module';
import { ModalModule } from '@app/shared/components/modal/modal.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { TextFieldModule } from '@app/shared/components/text-field/text-field.module';
import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';
import { FormService } from '@app/shared/services/form/form.service';

@NgModule({
  declarations: [TheaterComponent],
  imports: [
    BaseLayoutModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    LoadingSpinnerModule,
    ModalModule,
    PaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TheaterComponent,
      },
    ]),
    TextFieldModule,
  ],
  providers: [FormService],
})
export class TheaterModule {}
