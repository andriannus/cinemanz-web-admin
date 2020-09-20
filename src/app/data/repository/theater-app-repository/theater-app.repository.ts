import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CreateTheaterOperation,
  DeleteTheaterOperation,
  ReformTheaterResponse,
  TheaterGetParams,
  TheaterEntity,
  TheatersOperation,
  TheatersResponse,
  UpdateTheaterOperation,
} from './theater-app.entity';

import { TheaterRepository } from '@app/core/repositories/theater.repository';
import { TheaterModel } from '@app/core/domain/theater.model';

import CreateTheater from '@app/shared/graphql/mutations/CreateTheater.gql';
import DeleteTheater from '@app/shared/graphql/mutations/DeleteTheater.gql';
import Theaters from '@app/shared/graphql/queries/Theaters.gql';
import UpdateTheater from '@app/shared/graphql/mutations/UpdateTheater.gql';
import {
  PaginatedData,
  PaginationOptions,
} from '@app/shared/utils/pagination/pagination.model';
import { paginate } from '@app/shared/utils/pagination/pagination.util';

@Injectable()
export class TheaterAppRepository extends TheaterRepository {
  constructor(private apollo: Apollo) {
    super();
  }

  fetchPaginatedTheaters(
    param: TheaterGetParams,
  ): Observable<PaginatedData<TheaterEntity>> {
    const { limit, page, skip } = param;

    return this.apollo
      .watchQuery<TheatersOperation>({
        query: Theaters,
        variables: { skip, limit },
      })
      .valueChanges.pipe(
        map(({ data }) => data.theaters),
        map((res: TheatersResponse) => {
          const options: PaginationOptions = {
            limit,
            page,
            total: res.total,
          };

          return paginate<TheaterEntity>(res.results, options);
        }),
      );
  }

  createTheater(theater: TheaterModel): Observable<ReformTheaterResponse> {
    return this.apollo
      .mutate<CreateTheaterOperation>({
        mutation: CreateTheater,
        variables: {
          data: theater,
        },
      })
      .pipe(
        map((result: FetchResult<CreateTheaterOperation>) => result.data),
        map((operation: CreateTheaterOperation) => operation.createTheater),
      );
  }

  updateTheater(theater: TheaterModel): Observable<ReformTheaterResponse> {
    return this.apollo
      .mutate<UpdateTheaterOperation>({
        mutation: UpdateTheater,
        variables: {
          data: theater,
        },
      })
      .pipe(
        map((result: FetchResult<UpdateTheaterOperation>) => result.data),
        map((operation: UpdateTheaterOperation) => operation.updateTheater),
      );
  }

  deleteTheater(id: string): Observable<ReformTheaterResponse> {
    return this.apollo
      .mutate<DeleteTheaterOperation>({
        mutation: DeleteTheater,
        variables: {
          id,
        },
      })
      .pipe(
        map((result: FetchResult<DeleteTheaterOperation>) => result.data),
        map((operation: DeleteTheaterOperation) => operation.deleteTheater),
      );
  }
}
