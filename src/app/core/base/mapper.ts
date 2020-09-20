export abstract class Mapper<T, U> {
  abstract mapFrom(param: T): U;
  abstract mapTo(param: U): T;
}
