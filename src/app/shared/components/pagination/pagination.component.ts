import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PaginationMeta } from '@app/shared/utils/pagination/pagination.model';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input()
  meta: PaginationMeta;

  @Output()
  nextPageClicked: EventEmitter<number>;

  @Output()
  previousPageClicked: EventEmitter<number>;

  constructor() {
    this.meta = null;
    this.nextPageClicked = new EventEmitter();
    this.previousPageClicked = new EventEmitter();
  }

  next(page: number): void {
    this.nextPageClicked.emit(page);
  }

  previous(page: number): void {
    this.previousPageClicked.emit(page);
  }
}
