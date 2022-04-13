export interface FieldError {
  field: string;
  error: string;
}

export interface ErrorList {
  errors: FieldError[];
}
