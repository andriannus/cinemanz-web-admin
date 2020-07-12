import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'plain-layout',
  templateUrl: './plain-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlainLayoutComponent {}
