import { useEffect, useState } from "react";
import { API_URL, unknownErrorMessage } from "../utils/Config";
import { ErrorList, FieldError } from "../utils/ErrorInterfaces";
import PostElement, { PostGeneric } from "./Post";

export interface PostListGeneric<T> {
  pageIndex: number;
  pageSize: number;
  totalPageCount: number;
  totalItemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: PostGeneric<T>[];
}

export type PostList = PostListGeneric<Date>;
export type PostListJson = PostListGeneric<string>;

const PostListElement = () => {
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [postList, setPostList] = useState<PostList | undefined>(undefined);

  useEffect(() => {
    getPostList();
  }, []);

  // useEffect(() => {
  //   // console.log(new Date("2022-04-05T21:01:18.797972Z").toLocaleString());
  //   // console.dir(postList);
  //   // console.log(fieldErrors);
  //   // console.log(isUnknownError);
  // }, [postList, fieldErrors, isUnknownError]);

  const resetState = () => {
    setIsUnknownError(false);
    setFieldErrors([]);
    setPostList(undefined);
  };

  const getPostList = async () => {
    const response = await fetch(`${API_URL}post?pageNumber=1`);

    resetState();

    if (response.status === 404) {
      await response
        .json()
        .then((errorList: ErrorList) => setFieldErrors(errorList.errors));
      return;
    }

    if (response.status === 200) {
      await response
        .json()
        .then((postListJson: PostListJson) => ({
          ...postListJson,
          items: postListJson.items.map((post) => ({
            ...post,
            creationDate: new Date(post.creationDate),
            editDate: post.editDate ? new Date(post.editDate) : null,
          })),
        }))
        .then(setPostList);
      return;
    }

    setIsUnknownError(true);
  };

  return (
    <>
      {isUnknownError && <p>{unknownErrorMessage}</p>}
      {fieldErrors.map((x) => (
        <p>{x.error}</p>
      ))}
      {postList?.items.map((x) => (
        <PostElement key={x.id} post={x} />
      ))}
    </>
  );
};

export default PostListElement;
