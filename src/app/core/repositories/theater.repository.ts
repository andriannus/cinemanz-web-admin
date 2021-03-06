import { Observable } from 'rxjs';

import {
  CreateTheaterEntity,
  ReformTheaterResponse,
  TheaterGetParam,
  TheaterEntity,
} from '@app/data/repository/theater-app-repository/theater-app.entity';

import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

export abstract class TheaterRepository {
  abstract fetchPaginatedTheaters(
    param: TheaterGetParam,
  ): Observable<PaginatedData<TheaterEntity>>;
  abstract createTheater(
    theater: CreateTheaterEntity,
  ): Observable<ReformTheaterResponse>;
  abstract updateTheater(
    theater: TheaterEntity,
  ): Observable<ReformTheaterResponse>;
  abstract deleteTheater(id: string): Observable<ReformTheaterResponse>;
}
