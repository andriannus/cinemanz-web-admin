import { Component } from '@angular/core';

import { AUTH } from '@app/shared/constants/auth.constant';

@Component({
  selector: 'base-navbar',
  templateUrl: './base-navbar.component.html',
  styleUrls: ['./base-navbar.component.scss'],
})
export class BaseNavbarComponent {
  logout(): void {
    localStorage.removeItem(AUTH.token);

    window.location.href = '/login';
  }
}
