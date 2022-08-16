import { Rating } from "./Rating";
import { User } from "./User";

export interface CommentGeneric<T> {
  id: string;
  body: string;
  isDeleted: boolean;
  creationDate: T;
  editDate: T | null;
  user: User;
  userRating: Rating | null;
  rating: number;
  postId: string;
  replyToId: string | null;
  replies: CommentGeneric<T>[] | null;
}

export interface CommentListGeneric<T> {
  commentCount: number;
  comments: CommentGeneric<T>[];
}

export type Comment = CommentGeneric<Date>;

export type CommentList = CommentListGeneric<Date>;
export type CommentListJson = CommentListGeneric<string>;
