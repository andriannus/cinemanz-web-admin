import { Store } from '@app/shared/store';

export class LoadingStore<T> extends Store<T> {
  set(newState: T): void {
    this.setState({
      ...this.state,
      ...newState,
    });
  }
}
