import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

import { Comment, CommentList } from "../../Interfaces/Comment";
import { FieldError } from "../../Interfaces/FieldError";
import { UNKNOWN_ERROR_MESSAGE } from "../../Utilities/config";
import { sleep } from "../../Utilities/sleep";
import { UserContext } from "../Auth/UserContext";
import CommentCreateForm from "./CommentCreateForm";
import CommentElement from "./CommentElement";

interface Props {
  isUnknownError: boolean;
  fieldErrors: FieldError[];
  postId: string;
  commentList: CommentList | null;
  setCommentList: React.Dispatch<React.SetStateAction<CommentList | null>>;
}

const CommentListElement = ({
  isUnknownError,
  fieldErrors,
  postId,
  commentList,
  setCommentList,
}: Props) => {
  const [newComment, setNewComment] = useState<Comment | null>(null);
  const { userInfo } = useContext(UserContext);
  const newCommentRef = useRef<HTMLDivElement>(null);
  const isLoading = !isUnknownError && fieldErrors.length === 0 && !commentList;

  const addNewCommentToList = async () => {
    if (newComment === null) return;
    if (commentList === null) {
      setCommentList({ commentCount: 1, comments: [newComment] });
      return;
    }

    if (newComment.replyToId === null) {
      commentList.commentCount++;
      commentList.comments.push(newComment);
      setCommentList({ ...commentList, comments: commentList.comments });
      return;
    }

    commentList.commentCount++;
    const replyToComment = commentList.comments.find(
      (x) => x.id === newComment.replyToId
    );
    if (replyToComment === undefined) return;

    if (replyToComment.replies === null) {
      replyToComment.replies = [newComment];
    } else {
      replyToComment.replies.push(newComment);
    }

    setCommentList({ ...commentList, comments: commentList.comments });
  };

  useEffect(() => {
    async function awaitAndThenScroll() {
      await sleep(100);
      scrollToNewComment();
    }
    //TODO: If might not be needed
    if (newComment !== null) {
      addNewCommentToList();
      awaitAndThenScroll();
    }
  }, [newComment]);

  const scrollToNewComment = () => {
    newCommentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <Box sx={{ mb: 1 }}>
      {/* TODO: Maybe add comment count number? */}
      <Typography sx={{ ml: 1 }} variant="h6">
        Komentarai
      </Typography>

      {!isLoading && !isUnknownError && userInfo !== null && (
        <CommentCreateForm setNewComment={setNewComment} postId={postId} />
      )}

      <Box sx={{ textAlign: "center" }}>
        {/* TODO: Properly format unknown error message and show an indication if there are no comments */}
        {isLoading && <CircularProgress sx={{ mt: 5, mb: 3 }} />}
        {isUnknownError && <p>{UNKNOWN_ERROR_MESSAGE}</p>}
        {commentList === null &&
          fieldErrors.map((x, id) => (
            <Box key={id} sx={{ mt: 5, mb: 3 }}>
              <p key={id}>{x.error}</p>
            </Box>
          ))}
      </Box>

      {commentList?.comments.map((comment) => (
        <Fragment key={comment.id}>
          <CommentElement
            setNewComment={setNewComment}
            newCommentRef={comment.id === newComment?.id ? newCommentRef : null}
            key={comment.id}
            comment={comment}
          />
          {comment.replies?.map((reply) => (
            <CommentElement
              setNewComment={setNewComment}
              newCommentRef={reply.id === newComment?.id ? newCommentRef : null}
              key={reply.id}
              comment={reply}
            />
          ))}
        </Fragment>
      ))}
    </Box>
  );
};

export default CommentListElement;
