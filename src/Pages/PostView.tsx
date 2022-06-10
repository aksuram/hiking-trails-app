import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert, Box } from "@mui/material";

import PostElement from "../Components/Post/PostElement";
import { FieldError, FieldErrorList } from "../Interfaces/FieldError";
import { Post, PostJson } from "../Interfaces/Post";
import {
  API_URL,
  INCORRECT_URL_MESSAGE,
  UNKNOWN_ERROR_MESSAGE
} from "../Utilities/config";
import { shortenedGuidToGuid } from "../Utilities/guidEncoding";

const PostView = () => {
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  const params = useParams();
  const urlPostId = shortenedGuidToGuid(params.postId ?? "");

  useEffect(() => {
    if (urlPostId !== null) {
      getPost(urlPostId);
    }
  }, []);

  const getPost = async (postId: string) => {
    try {
      const response = await fetch(`${API_URL}post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });

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
          .then((postJson: PostJson) => ({
            ...postJson,
            creationDate: new Date(postJson.creationDate),
            editDate: postJson.editDate ? new Date(postJson.editDate) : null,
          }))
          .then(setPost);
        return;
      }

      setIsUnknownError(true);
    } catch (error) {
      setIsUnknownError(true);
    }
  };

  return (
    <Box>
      {urlPostId === null && (
        <Alert severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {INCORRECT_URL_MESSAGE}
        </Alert>
      )}

      {isUnknownError && (
        <Alert severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {UNKNOWN_ERROR_MESSAGE}
        </Alert>
      )}

      {fieldErrors.map((x, i) => (
        <Alert key={i} severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {x.error}
        </Alert>
      ))}

      {post !== null && <PostElement post={post} />}
    </Box>
  );
};

export default PostView;
