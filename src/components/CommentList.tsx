import { Box, CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react";
import { unknownErrorMessage } from "../utils/Config";
import { FieldError } from "../utils/ErrorInterfaces";
import CommentElement, { CommentGeneric } from "./Comment";

export interface CommentListGeneric<T> {
  commentCount: number;
  comments: CommentGeneric<T>[];
}

export type CommentList = CommentListGeneric<Date>;
export type CommentListJson = CommentListGeneric<string>;

interface Props {
  isUnknownError: boolean;
  fieldErrors: FieldError[];
  commentList: CommentList | undefined;
}

const CommentListElement = ({
  isUnknownError,
  fieldErrors,
  commentList,
}: Props) => {
  const isLoading = !isUnknownError && fieldErrors.length === 0 && !commentList;

  return (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ ml: 1 }} variant="h6">
        Komentarai
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        {isLoading && <CircularProgress sx={{ mt: 2, mb: 2 }} />}
        {isUnknownError && <p>{unknownErrorMessage}</p>}
        {fieldErrors.map((x, id) => (
          <p key={id}>{x.error}</p>
        ))}
      </Box>

      {commentList?.comments.map((comment) => (
        <Fragment key={comment.id}>
          <CommentElement key={comment.id} comment={comment} />
          {comment.replies?.map((reply) => (
            <CommentElement key={reply.id} comment={reply} />
          ))}
        </Fragment>
      ))}
    </Box>
  );
};

export default CommentListElement;
