import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FetchResult } from 'apollo-link';
import { Subscription, SubscriptionLike } from 'rxjs';
import {
  faPencilAlt,
  faTrashAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

import { THEATER_FORM } from '@app/pages/theater/theater.constant';
import { TheaterModal } from '@app/pages/theater/theater.enum';
import {
  CreateTheaterOperation,
  DeleteTheaterOperation,
  Theater,
  TheaterErrorMessageState,
  TheaterLoadingState,
  UpdateTheaterOperation,
} from '@app/pages/theater/theater.model';
import { TheaterService } from '@app/pages/theater/theater.service';
import { TheaterStore } from '@app/pages/theater/theater.store';

import { FormStore } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';
import { ErrorMessageStore } from '@app/shared/store/error-message';
import { LoadingStore } from '@app/shared/store/loading';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'theater',
  templateUrl: './theater.component.html',
})
export class TheaterComponent implements OnInit, OnDestroy {
  errorMessage: { fetchTheaters: string };
  formStore: FormStore;
  icon: { edit: IconDefinition; delete: IconDefinition };
  isEdit: boolean;
  loading: { isFetchTheaters: boolean };
  modal: {
    isDelete: boolean;
    isPut: boolean;
  };
  selectedTheater: Theater;
  theaters: PaginatedData<Theater>;

  private subscription: Subscription;

  constructor(
    private errorMessageStore: ErrorMessageStore<TheaterErrorMessageState>,
    private formService: FormService,
    private loadingStore: LoadingStore<TheaterLoadingState>,
    private theaterService: TheaterService,
    private theaterStore: TheaterStore,
    private titleService: Title,
  ) {
    this.errorMessage = { fetchTheaters: '' };
    this.icon = {
      edit: faPencilAlt,
      delete: faTrashAlt,
    };
    this.isEdit = false;
    this.loading = { isFetchTheaters: false };
    this.modal = {
      isDelete: false,
      isPut: false,
    };
    this.selectedTheater = {
      _id: '',
      address: '',
      name: '',
      telephone: '',
    };
    this.subscription = new Subscription();
    this.theaters = null;
  }

  ngOnInit(): void {
    this.fetchPaginatedTheaters();
    this.setupForm();

    this.titleService.setTitle('Theater - CinemaNz Admin');

    this.subscription.add(this.theaterStateSubscription());
    this.subscription.add(this.errorMessageStateSubscription());
    this.subscription.add(this.loadingStateSubscription());
    this.subscription.add(this.formServiceSubscription());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get TheaterModal() {
    return TheaterModal;
  }

  fetchPaginatedTheaters(page: number = 1): void {
    this.theaterService.fetchPaginatedTheaters(page);
  }

  setupForm(): void {
    this.formService.setup(THEATER_FORM);
  }

  toggleModal(selectedModal: TheaterModal): void {
    this.modal[selectedModal] = !this.modal[selectedModal];
  }

  confirmDelete(theater: Theater): void {
    this.selectedTheater = theater;
    this.toggleModal(TheaterModal.Delete);
  }

  put(theater: Theater = null): void {
    this.isEdit = !!theater;

    if (theater) {
      this.selectedTheater = theater;

      const { address, name, telephone } = theater;

      this.formService.patchValue({
        address,
        name,
        telephone,
      });
    }

    this.toggleModal(TheaterModal.Put);
  }

  handleSubmit(): void {
    const { form } = this.formStore;

    if (form.invalid) {
      this.formService.validate();
      return;
    }

    if (this.isEdit) {
      const udpatedTheater = {
        ...form.value,
        _id: this.selectedTheater._id,
      };

      this.submitEditedTheater(udpatedTheater);
    } else {
      this.submitCreatedTheater(form.value);
    }
  }

  submitEditedTheater(formValue: Theater): void {
    this.theaterService
      .updateTheater(formValue)
      .subscribe(({ data }: FetchResult<UpdateTheaterOperation>) => {
        const { result } = data.updateTheater;

        if (result) {
          this.cancel();
          this.fetchPaginatedTheaters();
        }
      });
  }

  submitCreatedTheater(formValue: Theater): void {
    const { _id, ...createdTheater } = formValue;

    this.theaterService
      .createTheater(createdTheater)
      .subscribe(({ data }: FetchResult<CreateTheaterOperation>) => {
        const { result } = data.createTheater;

        if (result) {
          this.cancel();
          this.fetchPaginatedTheaters();
        }
      });
  }

  cancel(): void {
    this.toggleModal(TheaterModal.Put);
    this.formService.reset();
  }

  delete(): void {
    const { _id: id } = this.selectedTheater;

    this.theaterService
      .deleteTheater(id)
      .subscribe(({ data }: FetchResult<DeleteTheaterOperation>) => {
        const { result } = data.deleteTheater;

        if (result) {
          this.toggleModal(TheaterModal.Delete);
          this.fetchPaginatedTheaters();
        }
      });
  }

  private theaterStateSubscription(): SubscriptionLike {
    return this.theaterStore.state$
      .pipe(map(({ theaters }) => theaters))
      .subscribe((theaters: PaginatedData<Theater>) => {
        this.theaters = theaters;
      });
  }

  private errorMessageStateSubscription(): SubscriptionLike {
    return this.errorMessageStore.state$.subscribe(
      (errorMessageState: TheaterErrorMessageState) => {
        this.errorMessage = errorMessageState;
      },
    );
  }

  private loadingStateSubscription(): SubscriptionLike {
    return this.loadingStore.state$.subscribe(
      (loadingState: TheaterLoadingState) => {
        this.loading = loadingState;
      },
    );
  }

  private formServiceSubscription(): SubscriptionLike {
    return this.formService.data$.subscribe((formData: FormStore) => {
      this.formStore = formData;
    });
  }
}
