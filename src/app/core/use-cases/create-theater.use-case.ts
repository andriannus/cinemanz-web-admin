import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { TheaterModel } from '../domain/theater.model';
import { TheaterRepository } from '../repositories/theater.repository';

import { ReformTheaterResponse } from '@app/data/repository/theater-app-repository/theater-app.entity';
import { TheaterAppCreateMapper } from '@app/data/repository/theater-app-repository/theater-app.create.mapper';

@Injectable({
  providedIn: 'root',
})
export class CreateTheaterUseCase
  implements UseCase<TheaterModel, ReformTheaterResponse> {
  private createTheaterMapper: TheaterAppCreateMapper;

  constructor(private theaterRepository: TheaterRepository) {
    this.createTheaterMapper = new TheaterAppCreateMapper();
  }

  execute(theater: TheaterModel): Observable<ReformTheaterResponse> {
    const mappedTheater = this.createTheaterMapper.mapTo(theater);
    return this.theaterRepository.createTheater(mappedTheater);
  }
}
