import { Response } from '@app/shared/models/response.model';

export interface TheaterGetParam {
  limit: number;
  page: number;
  skip: number;
}

export interface TheaterEntity {
  _id: string;
  address: string;
  name: string;
  telephone: string;
}

export interface CreateTheaterEntity {
  address: string;
  name: string;
  telephone: string;
}

export interface TheatersResponse extends Response {
  results: TheaterEntity[];
  total: number;
}

export interface ReformTheaterResponse extends Response {
  result: {
    id: string;
  };
}

export interface TheatersOperation {
  theaters: TheatersResponse;
}

export interface DeleteTheaterOperation {
  deleteTheater: ReformTheaterResponse;
}

export interface CreateTheaterOperation {
  createTheater: ReformTheaterResponse;
}

export interface UpdateTheaterOperation {
  updateTheater: ReformTheaterResponse;
}
