import { Injectable } from '@angular/core';

import { THEATER_STATE } from '@app/pages/theater/theater.constant';
import { Theater, TheaterState } from '@app/pages/theater/theater.model';

import Store from '@app/shared/store';
import { PaginatedData } from '@app/shared/utils/pagination/pagination.model';

@Injectable()
export class TheaterStore extends Store<TheaterState> {
  constructor() {
    super(THEATER_STATE);
  }

  setTheaters(theaters: PaginatedData<Theater>): void {
    this.setState({ theaters });
  }
}
