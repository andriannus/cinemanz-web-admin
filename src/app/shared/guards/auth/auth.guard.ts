import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { AuthService } from '@app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService) {}

  canLoad(): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }

    window.location.href = '/login';
    return false;
  }
}
