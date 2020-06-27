import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '@app/shared/components/modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule],
  exports: [ModalComponent],
})
export class ModalModule {}
