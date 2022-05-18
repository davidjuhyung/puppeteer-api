export class Response<T> {
  constructor(data: T, errorMessage?: string) {
    this.data = data;
    this.errorMessage = errorMessage || '';
  }
  data: T;
  errorMessage: string;
}

