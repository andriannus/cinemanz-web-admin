import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges, OnDestroy {
  @Input()
  isShow: boolean;

  @Input()
  width: number | string;

  html: HTMLElement;

  constructor() {
    this.html = document.querySelector('html');
    this.isShow = false;
    this.width = 'auto';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { isShow, width } = changes;

    if (isShow) {
      this.handleIsShowChanges(isShow);
    }

    if (width) {
      this.handleWidthChanges(width);
    }
  }

  ngOnDestroy(): void {
    this.html.classList.remove('is-clipped');
  }

  handleIsShowChanges(isShow: SimpleChange): void {
    this.isShow = isShow.currentValue;

    if (isShow.currentValue) {
      this.html.classList.add('is-clipped');
    } else {
      this.html.classList.remove('is-clipped');
    }
  }

  handleWidthChanges(width: SimpleChange): void {
    const { currentValue } = width;

    if (currentValue === 'auto') {
      this.width = 'auto';
      return;
    }

    if (isNaN(parseInt(currentValue, 10))) {
      this.width = currentValue;
      return;
    }

    this.width = `${currentValue}px`;
  }
}
