import { Response } from '@app/shared/models/response.model';

export interface LoginUserResponse extends Response {
  result: {
    token: string;
  };
}

export interface LoginUserOperation {
  loginUser: LoginUserResponse;
}
