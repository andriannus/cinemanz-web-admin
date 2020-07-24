import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TheaterComponent } from '@app/pages/theater/theater.component';
import {
  TheaterErrorMessageState,
  TheaterLoadingState,
} from '@app/pages/theater/theater.model';
import { TheaterService } from '@app/pages/theater/theater.service';
import { TheaterStore } from '@app/pages/theater/theater.store';

import { ModalModule } from '@app/shared/components/modal/modal.module';
import { PaginationModule } from '@app/shared/components/pagination/pagination.module';
import { TextFieldModule } from '@app/shared/components/text-field/text-field.module';
import { BaseLayoutModule } from '@app/shared/layouts/base-layout/base-layout.module';
import { FormService } from '@app/shared/services/form/form.service';
import ErrorMessageStore from '@app/shared/store/error-message';
import LoadingStore from '@app/shared/store/loading';

@NgModule({
  declarations: [TheaterComponent],
  imports: [
    BaseLayoutModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
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
  providers: [
    FormService,
    TheaterService,
    TheaterStore,
    {
      provide: ErrorMessageStore,
      useFactory() {
        return new ErrorMessageStore<TheaterErrorMessageState>({
          fetchTheaters: '',
        });
      },
    },
    {
      provide: LoadingStore,
      useFactory() {
        return new LoadingStore<TheaterLoadingState>({
          isFetchTheaters: false,
        });
      },
    },
  ],
})
export class TheaterModule {}
