import { useEffect, useState } from "react";
import { ErrorList, FieldError } from "../utils/ErrorInterfaces";
import PostElement, { PostGeneric } from "./Post";

export type PostList = PostListGeneric<Date>;
export type PostListJson = PostListGeneric<string>;

interface PostListGeneric<T> {
  pageIndex: number;
  pageSize: number;
  totalPageCount: number;
  totalItemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: PostGeneric<T>[];
}

const PostListElement = () => {
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [errorArray, setErrors] = useState<FieldError[]>([]);
  const [postList, setPostList] = useState<PostList | undefined>(undefined);

  useEffect(() => {
    const getPostList = async () => {
      const response = await fetch(
        "https://localhost:7101/api/post?pageNumber=1"
      );
      if (response.status === 404) {
        await response.json().then((x: ErrorList) => setErrors(x.errors));
      }
      setIsBadRequest(response.status === 400);
      if (response.status === 200) {
        await response
          .json()
          .then((x: PostListJson) => ({
            ...x,
            items: x.items.map((y) => ({
              ...y,
              creationDate: new Date(y.creationDate),
              editDate: y.editDate ? new Date(y.editDate) : undefined,
            })),
          }))
          .then(setPostList);

        // .then((x) => ())
        // .then((x: PostList) => setPostList(x));
      }
    };
    getPostList();
  }, []);

  useEffect(() => {
    // console.log(new Date("2022-04-05T21:01:18.797972Z").toLocaleString());
    // console.dir(postList);
    // console.log(errorArray);
    // console.log(isBadRequest);
  }, [postList, errorArray, isBadRequest]);

  return (
    <>
      {postList?.items.map((x) => (
        <PostElement key={x.id} post={x} />
      ))}
    </>
  );
};

export default PostListElement;
