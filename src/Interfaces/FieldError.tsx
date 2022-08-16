export interface FieldError {
  field: string;
  error: string;
}

export interface FieldErrorList {
  errors: FieldError[];
}
