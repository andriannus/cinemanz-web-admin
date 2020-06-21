import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AUTH } from '@app/shared/constants/auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get isAuthenticated() {
    const token = localStorage.getItem(AUTH.token);
    return !!token;
  }
}
