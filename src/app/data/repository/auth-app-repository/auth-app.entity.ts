import { Response } from '@app/shared/models/response.model';

export interface LoginEntity {
  email: string;
  password: string;
}

export interface LoginResponse extends Response {
  result: {
    token: string;
  };
}

export interface LoginOperation {
  loginUser: LoginResponse;
}
