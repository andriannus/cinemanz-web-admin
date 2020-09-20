import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { TheaterRepository } from '../repositories/theater.repository';

import {
  TheaterGetParams,
  TheaterEntity,
} from '@app/data/repository/theater-app-repository/theater-app.entity';

import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class FetchPaginatedTheatersUseCase
  implements
    UseCase<{ skip: number; limit: number }, PaginatedData<TheaterEntity>> {
  constructor(private theaterRepository: TheaterRepository) {}

  execute(params: TheaterGetParams): Observable<PaginatedData<TheaterEntity>> {
    return this.theaterRepository.fetchPaginatedTheaters(params);
  }
}
