import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
    <div class="LoadingSpinner"></div>
  `,
  styleUrls: ['./loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
