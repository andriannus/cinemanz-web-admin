import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { TheaterModel } from '../domain/theater.model';
import { TheaterRepository } from '../repositories/theater.repository';

import { ReformTheaterResponse } from '@app/data/repository/theater-app-repository/theater-app.entity';

@Injectable({
  providedIn: 'root',
})
export class UpdateTheaterUseCase
  implements UseCase<TheaterModel, ReformTheaterResponse> {
  constructor(private theaterRepository: TheaterRepository) {}

  execute(theater: TheaterModel): Observable<ReformTheaterResponse> {
    return this.theaterRepository.updateTheater(theater);
  }
}
