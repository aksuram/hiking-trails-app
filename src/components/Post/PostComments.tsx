import { Collapse, Divider } from "@mui/material";

import { CommentList } from "../../Interfaces/Comment";
import { FieldError } from "../../Interfaces/FieldError";
import CommentListElement from "../Comment/CommentList";

interface Props {
  areCommentsExpanded: boolean;
  isUnknownError: boolean;
  fieldErrors: FieldError[];
  postId: string;
  commentList: CommentList | null;
  setCommentList: React.Dispatch<React.SetStateAction<CommentList | null>>;
}

const PostComments = ({
  areCommentsExpanded,
  isUnknownError,
  fieldErrors,
  postId,
  commentList,
  setCommentList,
}: Props) => {
  return (
    <Collapse in={areCommentsExpanded} timeout="auto">
      <Divider sx={{ mt: 1, mb: 1.5 }} />
      <CommentListElement
        isUnknownError={isUnknownError}
        fieldErrors={fieldErrors}
        postId={postId}
        commentList={commentList}
        setCommentList={setCommentList}
      />
    </Collapse>
  );
};

export default PostComments;
