import { Observable } from 'rxjs';

import {
  LoginEntity,
  LoginResponse,
} from '@app/data/repository/auth-app-repository/auth-app.entity';

export abstract class AuthRepository {
  abstract login(data: LoginEntity): Observable<LoginResponse>;
}
