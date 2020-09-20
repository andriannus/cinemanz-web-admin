import { Observable } from 'rxjs';

export interface UseCase<T, U> {
  execute(params: T): Observable<U>;
}
