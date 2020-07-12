import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { AUTH } from '@app/shared/constants/auth.constant';

@Component({
  selector: 'base-navbar',
  templateUrl: './base-navbar.component.html',
  styleUrls: ['./base-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseNavbarComponent {
  constructor(private apollo: Apollo) {}

  logout(): void {
    localStorage.removeItem(AUTH.token);
    this.apollo.getClient().resetStore();

    window.location.href = '/login';
  }
}
