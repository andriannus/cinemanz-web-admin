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

export interface TheatersOperation {
  theaters: TheatersResponse;
}

export interface DeleteTheaterResponse extends Response {
  result: {
    id: string;
  };
}

export interface DeleteTheaterOperation {
  deleteTheater: DeleteTheaterResponse;
}
