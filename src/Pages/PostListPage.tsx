import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { flexbox } from "@mui/system";

import { UserContext } from "../Components/Auth/UserContext";
import CreatePostButton from "../Components/Post/CreatePostButton";
import PostElement from "../Components/Post/PostElement";
import CircularLoadingIndicator from "../Components/Shared/CircularLoadingIndicator";
import CustomErrorMessage from "../Components/Shared/CustomErrorMessage";
import FieldErrorMessages from "../Components/Shared/FieldErrorMessages";
import LinkPagination from "../Components/Shared/LinkPagination";
import UnknownErrorMessage from "../Components/Shared/UnknownErrorMessage";
import { FieldError, FieldErrorList } from "../Interfaces/FieldError";
import { PostList, PostListJson } from "../Interfaces/Post";
import { API_URL } from "../Utilities/config";
import { customFetch } from "../Utilities/customFetch";
import { getPageIndexFromLocation } from "../Utilities/paging";
import { sleepAtLeast } from "../Utilities/sleepAtLeast";

const PostListPage = () => {
  //Loading
  const [isLoadingPostList, setIsLoadingPostList] = useState(true);

  //Errors
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  //Data
  const [postList, setPostList] = useState<PostList | null>(null);
  const { userInfo } = useContext(UserContext);

  //Paging / Navigation
  const [totalPageCount, setTotalPageCount] = useState<number | null>(null);
  const location = useLocation();
  const pageIndex = getPageIndexFromLocation(location);

  useEffect(() => {
    setTotalPageCount(postList !== null ? postList.totalPageCount : null);
  }, [postList]);

  useEffect(() => {
    getPostList();
  }, [location]);

  const resetState = () => {
    setIsUnknownError(false);
    setFieldErrors([]);
    setPostList(null);
  };

  const loadPostList = async () => {
    setIsLoadingPostList(true);
    const funcReturn = await sleepAtLeast(200, fetchPostList);
    setIsLoadingPostList(false);
    return funcReturn;
  };

  const fetchPostList = async () => {
    //TODO: REMOVE PAGE SIZE LATER
    return await customFetch(
      `${API_URL}post?pageNumber=${pageIndex}&pageSize=2`
    );
  };

  const getPostList = async () => {
    try {
      resetState();
      const response = await loadPostList();

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
      setIsLoadingPostList(false);
      setIsUnknownError(true);
    }
  };

  return (
    <>
      <UnknownErrorMessage isUnknownError={isUnknownError} />
      <FieldErrorMessages fieldErrors={fieldErrors} />
      <CircularLoadingIndicator isLoading={isLoadingPostList} />

      {postList !== null && userInfo !== null && <CreatePostButton />}

      {postList !== null && postList.items.length === 0 && (
        <CustomErrorMessage errorMessage="Nepavyko surasti įrašų" />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {postList?.items.map((x) => (
          <PostElement key={x.id} post={x} />
        ))}
      </div>

      {totalPageCount !== null && (
        <LinkPagination
          linkRoute="/posts"
          pageIndex={pageIndex}
          totalPageCount={totalPageCount}
        />
      )}
    </>
  );
};

export default PostListPage;
