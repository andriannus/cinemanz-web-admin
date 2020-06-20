import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseLayoutComponent } from '@app/shared/layouts/base-layout/base-layout.component';

import { BaseNavbarComponent } from './shared/components/base-navbar/base-navbar.component';
import { BaseSidebarComponent } from './shared/components/base-sidebar/base-sidebar.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    BaseNavbarComponent,
    BaseSidebarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [BaseLayoutComponent, BaseNavbarComponent, BaseSidebarComponent],
})
export class BaseLayoutModule {}
