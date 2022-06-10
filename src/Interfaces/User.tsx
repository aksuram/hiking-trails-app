export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string | null;
}

//TODO: Change structure
export interface DetailedUserGeneric<T> {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string | null;
  email: string | null;
  role: string;
  isDeleted: boolean;
  creationDate: T;
  lastLoginDate: T | null;
}

export type DetailedUser = DetailedUserGeneric<Date>;
export type DetailedUserJson = DetailedUserGeneric<string>;
