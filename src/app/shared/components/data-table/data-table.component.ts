import { Component, Input } from '@angular/core';

import { TableHeader } from '@app/shared/components/data-table/data-table.model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
})
export class DataTableComponent {
  @Input()
  headers: TableHeader[];

  @Input()
  items: any[];

  constructor() {
    this.headers = [];
    this.items = [];
  }
}
