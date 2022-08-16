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

export interface PostListGeneric<T> {
  pageIndex: number;
  pageSize: number;
  totalPageCount: number;
  totalItemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: PostGeneric<T>[];
}

export type Post = PostGeneric<Date>;
export type PostJson = PostGeneric<string>;

export type PostList = PostListGeneric<Date>;
export type PostListJson = PostListGeneric<string>;
