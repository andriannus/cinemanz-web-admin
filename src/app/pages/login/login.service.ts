import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

import { LoginUserOperation } from '@app/pages/login/login.model';

import LoginUser from '@app/shared/graphql/mutations/LoginUser.gql';

@Injectable()
export class LoginService {
  constructor(private apollo: Apollo) {}

  login(
    email: string,
    password: string,
  ): Observable<FetchResult<LoginUserOperation>> {
    return this.apollo.mutate({
      mutation: LoginUser,
      variables: {
        email,
        password,
      },
    });
  }
}
