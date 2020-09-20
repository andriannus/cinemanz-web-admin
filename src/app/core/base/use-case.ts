import { Observable } from 'rxjs';

export interface UseCase<T, U> {
  execute(param: T): Observable<U>;
}
