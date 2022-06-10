import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

import { UserContext } from "../Components/Auth/UserContext";
import PostElement from "../Components/Post/PostElement";
import { FieldError, FieldErrorList } from "../Interfaces/FieldError";
import { PostGeneric } from "../Interfaces/Post";
import { API_URL, UNKNOWN_ERROR_MESSAGE } from "../Utilities/config";

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
  const [postList, setPostList] = useState<PostList | null>(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPostList();
  }, []);

  const resetState = () => {
    setIsUnknownError(false);
    setFieldErrors([]);
    setPostList(null);
  };

  const getPostList = async () => {
    try {
      //TODO: add paging
      const response = await fetch(`${API_URL}post?pageNumber=3&pageSize=2`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });
      resetState();

      if (response.status === 404) {
        await response
          .json()
          .then((errorList: FieldErrorList) =>
            setFieldErrors(errorList.errors)
          );
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
    } catch (error) {
      setIsUnknownError(true);
    }
  };

  //TODO: Properly display unknown error message and field errors
  //TODO: display message if no posts were found (postList.items is an empty array or undefined)
  return (
    <>
      {isUnknownError && <p>{UNKNOWN_ERROR_MESSAGE}</p>}
      {fieldErrors.map((x) => (
        <p>{x.error}</p>
      ))}
      {postList !== null && userInfo !== null && (
        <div style={{ maxWidth: "600px", minWidth: "600px" }}>
          <Fab
            sx={{ float: "right", mb: 2, mr: 1 }}
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => {
              navigate("/post/create");
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Sukurti
          </Fab>
        </div>
      )}
      {postList?.items.map((x) => (
        <PostElement key={x.id} post={x} />
      ))}
    </>
  );
};

export default PostListElement;
