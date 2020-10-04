import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { LoginModel } from '../domain/auth.model';
import { AuthRepository } from '../repositories/auth.repository';

import { LoginResponse } from '@app/data/repository/auth-app-repository/auth-app.entity';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase implements UseCase<LoginModel, LoginResponse> {
  constructor(private authRepository: AuthRepository) {}

  execute(data: LoginModel): Observable<LoginResponse> {
    return this.authRepository.login(data);
  }
}
