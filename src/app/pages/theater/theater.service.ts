import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable, BehaviorSubject } from 'rxjs';

import { paginate } from '@app/shared/utils/pagination/pagination.util';
import {
  Theater,
  TheatersOperation,
  TheaterStore,
} from '@app/pages/theater/theater.model';

import { DATA_PER_PAGE } from '@app/shared/constants/data.constant';
import Theaters from '@app/shared/graphql/queries/Theaters.gql';
import { PaginationOptions } from '@app/shared/utils/pagination/pagination.model';

@Injectable()
export class TheaterService {
  data$: Observable<TheaterStore>;

  private dispatcher: BehaviorSubject<TheaterStore>;
  private store: TheaterStore;

  constructor(private apollo: Apollo) {
    this.store = {
      errorMessage: {
        fetchTheaters: '',
      },
      loading: {
        isFetchTheaters: false,
      },
      theaters: null,
    };

    this.dispatcher = new BehaviorSubject({}) as BehaviorSubject<TheaterStore>;
    this.data$ = this.dispatcher.asObservable();

    this.dispatcher.next(this.store);
  }

  private setStore(store: Partial<TheaterStore>): void {
    const newStore = Object.assign(this.store, store);

    this.dispatcher.next(newStore);
  }

  fetchPaginatedTheaters(page: number = 1): void {
    const skip = (page - 1) * DATA_PER_PAGE;

    this.setStore({
      loading: {
        ...this.store.loading,
        isFetchTheaters: true,
      },
    });

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

          this.setStore({
            errorMessage: {
              ...this.store.errorMessage,
              fetchTheaters: '',
            },
            loading: {
              ...this.store.loading,
              isFetchTheaters: false,
            },
            theaters: paginatedTheaters,
          });
        },
        () => {
          this.setStore({
            errorMessage: {
              ...this.store.errorMessage,
              fetchTheaters: 'Something wrong.',
            },
            loading: {
              ...this.store.loading,
              isFetchTheaters: true,
            },
          });
        },
      );
  }
}
