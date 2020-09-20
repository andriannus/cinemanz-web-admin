import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { TheaterRepository } from '../repositories/theater.repository';

import { ReformTheaterResponse } from '@app/data/repository/theater-app-repository/theater-app.entity';

@Injectable({
  providedIn: 'root',
})
export class DeleteTheaterUseCase
  implements UseCase<string, ReformTheaterResponse> {
  constructor(private theaterRepository: TheaterRepository) {}

  execute(id: string): Observable<ReformTheaterResponse> {
    return this.theaterRepository.deleteTheater(id);
  }
}
