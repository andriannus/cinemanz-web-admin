import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  faPencilAlt,
  faTrashAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, SubscriptionLike } from 'rxjs';

import { TheaterModel } from '@app/core/domain/theater.model';
import { CreateTheaterUseCase } from '@app/core/use-cases/create-theater.use-case';
import { DeleteTheaterUseCase } from '@app/core/use-cases/delete-theater.use-case';
import { FetchPaginatedTheatersUseCase } from '@app/core/use-cases/fetch-paginated-theaters.use-case';
import { UpdateTheaterUseCase } from '@app/core/use-cases/update-theater.use-case';
import {
  ReformTheaterResponse,
  TheaterGetParams,
} from '@app/data/repository/theater-app-repository/theater-app.entity';

import { THEATER_FORM } from './theater.constant';
import { TheaterModal } from './theater.enum';
import { TheaterLoadingState } from './theater.model';

import { DATA_PER_PAGE } from '@app/shared/constants/data.constant';
import { FormState } from '@app/shared/services/form/form.model';
import { FormService } from '@app/shared/services/form/form.service';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'theater',
  templateUrl: './theater.component.html',
})
export class TheaterComponent implements OnInit, OnDestroy {
  errorMessage: { fetchTheaters: string };
  formState: FormState;
  icon: { edit: IconDefinition; delete: IconDefinition };
  isEdit: boolean;
  loading: TheaterLoadingState;
  modal: {
    isDelete: boolean;
    isPut: boolean;
  };
  selectedTheater: TheaterModel;
  theaters: PaginatedData<TheaterModel>;

  private subscription: Subscription;

  constructor(
    private createTheater: CreateTheaterUseCase,
    private deleteTheater: DeleteTheaterUseCase,
    private fetchPaginatedTheaters: FetchPaginatedTheatersUseCase,
    private formService: FormService,
    private titleService: Title,
    private updateTheater: UpdateTheaterUseCase,
  ) {
    this.errorMessage = { fetchTheaters: '' };
    this.icon = {
      edit: faPencilAlt,
      delete: faTrashAlt,
    };
    this.isEdit = false;
    this.loading = {
      isFetchTheaters: false,
      isPutTheater: false,
    };
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
    this.fetchTheaters();
    this.setupForm();

    this.titleService.setTitle('Theater - CinemaNz Admin');

    this.subscription.add(this.subscribeToFormState());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get TheaterModal() {
    return TheaterModal;
  }

  setupForm(): void {
    this.formService.setup(THEATER_FORM);
  }

  toggleModal(selectedModal: TheaterModal): void {
    this.modal[selectedModal] = !this.modal[selectedModal];
  }

  confirmDelete(theater: TheaterModel): void {
    this.selectedTheater = theater;
    this.toggleModal(TheaterModal.Delete);
  }

  cancel(): void {
    this.toggleModal(TheaterModal.Put);
    this.formService.reset();
  }

  put(theater: TheaterModel = null): void {
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
    const { form } = this.formState;

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
      return;
    }

    this.submitCreatedTheater(form.value);
  }

  fetchTheaters(page: number = 1): void {
    const skip = (page - 1) * DATA_PER_PAGE;
    const params: TheaterGetParams = {
      limit: DATA_PER_PAGE,
      page,
      skip,
    };

    this.loading.isFetchTheaters = true;

    this.fetchPaginatedTheaters.execute(params).subscribe(
      (theaters: PaginatedData<TheaterModel>) => {
        this.theaters = theaters;
        this.loading.isFetchTheaters = false;
      },
      () => {
        this.errorMessage.fetchTheaters = 'Something wrong.';
        this.loading.isFetchTheaters = false;
      },
    );
  }

  submitEditedTheater(formValue: TheaterModel): void {
    this.loading.isPutTheater = true;

    this.updateTheater
      .execute(formValue)
      .subscribe((res: ReformTheaterResponse) => {
        if (res.result) {
          this.cancel();
          this.fetchTheaters();
        }

        this.loading.isPutTheater = false;
      });
  }

  submitCreatedTheater(theater: TheaterModel): void {
    this.loading.isPutTheater = true;

    this.createTheater
      .execute(theater)
      .subscribe((res: ReformTheaterResponse) => {
        if (res.result) {
          this.cancel();
          this.fetchTheaters();
        }

        this.loading.isPutTheater = false;
      });
  }

  delete(): void {
    const { _id: id } = this.selectedTheater;

    this.loading.isPutTheater = true;

    this.deleteTheater.execute(id).subscribe((res: ReformTheaterResponse) => {
      if (res.result) {
        this.toggleModal(TheaterModal.Delete);
        this.fetchTheaters();
      }

      this.loading.isPutTheater = false;
    });
  }

  private subscribeToFormState(): SubscriptionLike {
    return this.formService.state$.subscribe((formState: FormState) => {
      this.formState = formState;
    });
  }
}
