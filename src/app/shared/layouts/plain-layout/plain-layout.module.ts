import { NgModule } from '@angular/core';

import { PlainLayoutComponent } from '@app/shared/layouts/plain-layout/plain-layout.component';

@NgModule({
  declarations: [PlainLayoutComponent],
  exports: [PlainLayoutComponent],
})
export class PlainLayoutModule {}
