export interface Response<T> {
  isSuccessful: boolean;
  data: T;
}
