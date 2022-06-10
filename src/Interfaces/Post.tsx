import { Rating } from "./Rating";
import { User } from "./User";

export interface PostGeneric<T> {
  id: string;
  title: string;
  body: string;
  isDeleted: boolean;
  creationDate: T;
  editDate: T | null;
  user: User;
  userRating: Rating | null;
  rating: number;
}

export type Post = PostGeneric<Date>;
export type PostJson = PostGeneric<string>;
