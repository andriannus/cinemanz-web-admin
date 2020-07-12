import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'base-layout',
  templateUrl: './base-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent implements OnInit, OnDestroy {
  html: HTMLElement;

  constructor() {
    this.html = document.querySelector('html');
  }

  ngOnInit(): void {
    this.html.classList.add('has-navbar-fixed-top');
  }

  ngOnDestroy(): void {
    this.html.classList.remove('has-navbar-fixed-top');
  }
}
