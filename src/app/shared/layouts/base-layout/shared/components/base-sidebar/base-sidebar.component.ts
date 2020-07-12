import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SIDEBAR_MENUS } from '@app/shared/layouts/base-layout/shared/constants/base-layout.constant';

@Component({
  selector: 'base-sidebar',
  templateUrl: './base-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseSidebarComponent {
  menus: { name: string; link: string }[];

  constructor() {
    this.menus = SIDEBAR_MENUS;
  }
}
