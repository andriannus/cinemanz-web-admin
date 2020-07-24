import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

import { paginate } from '@app/shared/utils/pagination/pagination.util';
import {
  CreateTheaterOperation,
  DeleteTheaterOperation,
  Theater,
  TheaterErrorMessageState,
  TheaterLoadingState,
  TheatersOperation,
  UpdateTheaterOperation,
} from '@app/pages/theater/theater.model';
import { TheaterStore } from '@app/pages/theater/theater.store';

import { DATA_PER_PAGE } from '@app/shared/constants/data.constant';
import CreateTheater from '@app/shared/graphql/mutations/CreateTheater.gql';
import DeleteTheater from '@app/shared/graphql/mutations/DeleteTheater.gql';
import UpdateTheater from '@app/shared/graphql/mutations/UpdateTheater.gql';
import Theaters from '@app/shared/graphql/queries/Theaters.gql';
import ErrorMessageStore from '@app/shared/store/error-message';
import LoadingStore from '@app/shared/store/loading';
import { PaginationOptions } from '@app/shared/utils/pagination/pagination.model';

@Injectable()
export class TheaterService {
  constructor(
    private apollo: Apollo,
    private errorMessageStore: ErrorMessageStore<TheaterErrorMessageState>,
    private loadingStore: LoadingStore<TheaterLoadingState>,
    private theaterStore: TheaterStore,
  ) {}

  fetchPaginatedTheaters(page: number = 1): void {
    const skip = (page - 1) * DATA_PER_PAGE;

    this.loadingStore.set({ isFetchTheaters: true });

    this.apollo
      .watchQuery({
        query: Theaters,
        variables: {
          skip,
          limit: DATA_PER_PAGE,
        },
      })
      .valueChanges.subscribe(
        ({ data }: ApolloQueryResult<TheatersOperation>) => {
          const { theaters } = data;
          const options: PaginationOptions = {
            limit: DATA_PER_PAGE,
            page,
            total: theaters.total,
          };

          const paginatedTheaters = paginate<Theater>(
            theaters.results,
            options,
          );

          this.theaterStore.setTheaters(paginatedTheaters);

          this.errorMessageStore.set({ fetchTheaters: '' });
          this.loadingStore.set({ isFetchTheaters: false });
        },
        () => {
          this.errorMessageStore.set({ fetchTheaters: 'Something wrong.' });
          this.loadingStore.set({ isFetchTheaters: false });
        },
      );
  }

  createTheater(
    theater: Partial<Theater>,
  ): Observable<FetchResult<CreateTheaterOperation>> {
    const { address, name, telephone } = theater;
    const data = {
      address,
      name,
      telephone,
    };

    return this.apollo.mutate({
      mutation: CreateTheater,
      variables: { data },
    });
  }

  updateTheater(
    theater: Theater,
  ): Observable<FetchResult<UpdateTheaterOperation>> {
    return this.apollo.mutate({
      mutation: UpdateTheater,
      variables: { data: theater },
    });
  }

  deleteTheater(id: string): Observable<FetchResult<DeleteTheaterOperation>> {
    return this.apollo.mutate({
      mutation: DeleteTheater,
      variables: {
        id,
      },
    });
  }
}
