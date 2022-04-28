import { Alert, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  API_URL,
  incorrectUrlMessage,
  unknownErrorMessage,
} from "../utils/Config";
import { ErrorList, FieldError } from "../utils/ErrorInterfaces";
import { shortenedGuidToGuid } from "../utils/GuidEncoding";
import PostElement, { PostJson, Post } from "./Post";

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
          .then((errorList: ErrorList) => setFieldErrors(errorList.errors));
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
          {incorrectUrlMessage}
        </Alert>
      )}

      {isUnknownError && (
        <Alert severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {unknownErrorMessage}
        </Alert>
      )}

      {fieldErrors.map((x, i) => (
        <Alert key={i} severity="error" sx={{ mt: 4, minWidth: "300px" }}>
          {x.error}
        </Alert>
      ))}

      {post !== null && <PostElement post={post} />}
    </Box>
    // <div>
    //   <Typography>Url: {params.postId}</Typography>
    //   <Typography>
    //     Is Shortened GUID:{" "}
    //     {checkIfShortenedGuid(params.postId ?? "") ? "True" : "False"}
    //   </Typography>
    //   <Typography>GUID: {shortenedGuidToGuid(params.postId ?? "")}</Typography>
    //   <Typography>
    //     Is GUID:{" "}
    //     {checkIfGuid(shortenedGuidToGuid(params.postId ?? ""))
    //       ? "True"
    //       : "False"}
    //   </Typography>
    // </div>
  );
};

export default PostView;
