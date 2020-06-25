import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, SubscriptionLike } from 'rxjs';
import {
  faPencilAlt,
  faTrashAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { Theater, TheaterStore } from '@app/pages/theater/theater.model';
import { TheaterService } from '@app/pages/theater/theater.service';

import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'theater',
  templateUrl: './theater.component.html',
})
export class TheaterComponent implements OnInit, OnDestroy {
  errorMessage: { fetchTheaters: string };
  icon: { edit: IconDefinition; delete: IconDefinition };
  loading: { isFetchTheaters: boolean };
  theaters: PaginatedData<Theater>;

  private subscription: Subscription;

  constructor(
    private theaterService: TheaterService,
    private titleService: Title,
  ) {
    this.errorMessage = { fetchTheaters: '' };
    this.icon = {
      edit: faPencilAlt,
      delete: faTrashAlt,
    };
    this.loading = { isFetchTheaters: false };
    this.subscription = new Subscription();
    this.theaters = null;
  }

  ngOnInit(): void {
    this.fetchPaginatedTheaters();

    this.titleService.setTitle('Theater - CinemaNz Admin');

    this.subscription.add(this.theaterStoreSubscription());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchPaginatedTheaters(page: number = 1): void {
    this.theaterService.fetchPaginatedTheaters(page);
  }

  theaterStoreSubscription(): SubscriptionLike {
    return this.theaterService.data$.subscribe((theaterStore: TheaterStore) => {
      const { errorMessage, loading, theaters } = theaterStore;

      this.errorMessage = errorMessage;
      this.loading = loading;
      this.theaters = theaters;
    });
  }
}
