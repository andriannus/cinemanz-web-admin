import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginEntity, LoginOperation, LoginResponse } from './auth-app.entity';

import { AuthRepository } from '@app/core/repositories/auth.repository';

import LoginUser from '@app/shared/graphql/mutations/LoginUser.gql';

@Injectable()
export class AuthAppRepository extends AuthRepository {
  constructor(private apollo: Apollo) {
    super();
  }

  login({ email, password }: LoginEntity): Observable<LoginResponse> {
    return this.apollo
      .mutate({
        mutation: LoginUser,
        variables: {
          email,
          password,
        },
      })
      .pipe(
        map((result: FetchResult<LoginOperation>) => result.data),
        map((operaton: LoginOperation) => operaton.loginUser),
      );
  }
}
