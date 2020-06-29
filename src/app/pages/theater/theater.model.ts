import { Response } from '@app/shared/models/response.model';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

export interface TheaterStore {
  errorMessage: {
    fetchTheaters: string;
  };
  loading: {
    isFetchTheaters: boolean;
  };
  theaters: PaginatedData<Theater>;
}

export interface Theater {
  _id: string;
  address: string;
  name: string;
  telephone: string;
}

export interface TheatersResponse extends Response {
  results: Theater[];
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
