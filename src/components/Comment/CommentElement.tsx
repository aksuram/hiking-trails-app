import moment from "moment";
import { useContext, useState } from "react";

import ReplyIcon from "@mui/icons-material/Reply";
import { Box, Card, Collapse, Typography } from "@mui/material";

import { AvatarType } from "../../Enums/AvatarType";
import { RatingType } from "../../Enums/RatingType";
import { Comment } from "../../Interfaces/Comment";
import { UserContext } from "../Auth/UserContext";
import RatingElement from "../Rating/RatingElement";
import { DateTooltip } from "../Shared/DateTooltip";
import UserAvatar from "../User/UserAvatar";
import CommentCreateForm from "./CommentCreateForm";

interface Props {
  setNewComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  newCommentRef: React.RefObject<HTMLDivElement> | null;
  comment: Comment;
}

const CommentElement = ({ comment, setNewComment, newCommentRef }: Props) => {
  const [isReplyFormExpanded, setIsReplyFormExpanded] = useState(false);
  const { userInfo } = useContext(UserContext);
  const leftOffset = comment.replyToId !== null ? 6 : 0;

  //TODO: Expand to it's own file as posts have the same function
  const formCommentDateTooltipString = (): string => {
    let commentDateString = moment(comment.creationDate).format(
      "YYYY MMMM D, ddd - HH:mm"
    );

    if (comment.editDate !== null) {
      commentDateString =
        commentDateString +
        `; Redaguota: ${moment(comment.editDate).format(
          "YYYY MMMM D, ddd - HH:mm"
        )}`;
    }

    return commentDateString;
  };

  //TODO: Create an edit, delete etc... menu button at bottom right
  //TODO: Create a reply button
  return (
    <>
      <Card
        ref={newCommentRef}
        sx={{
          backgroundColor: "#FAFAFA",
          px: 2,
          pt: 1,
          pb: 0.5,
          ml: leftOffset,
          mt: 1.5,
        }}
        variant="outlined"
      >
        <Box>
          <div className="CommentDataGridTop">
            <div className="CommentDataGridUser">
              <UserAvatar
                userId={comment.user.id}
                userFullName={comment.user.fullName}
                avatar={comment.user.avatar}
                avatarType={AvatarType.Comment}
              />
            </div>
            <div className="CommentDataGridDate">
              <DateTooltip
                title={formCommentDateTooltipString()}
                placement="left"
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ placeSelf: "center" }}
                >
                  {moment(comment.creationDate).fromNow()}
                  {comment.editDate !== null && "*"}
                </Typography>
              </DateTooltip>
            </div>
          </div>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {comment.body}
          </Typography>
        </Box>
        <Box>
          <div className="CommentDataGridBottom">
            <div className="CommentDataGridRating">
              <RatingElement
                userRating={comment.userRating}
                parentRating={comment.rating}
                parentId={comment.id}
                ratingType={RatingType.Comment}
              />
            </div>
            <div className="PostDataGridComments">
              {comment.replyToId === null && userInfo !== null && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: 0.5,
                  }}
                  onClick={() => {
                    setIsReplyFormExpanded((x) => !x);
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Atsakyti
                  </Typography>
                  <ReplyIcon sx={{ ml: 1, color: "rgba(0, 0, 0, 0.6)" }} />
                </Box>
              )}
            </div>
          </div>
        </Box>
      </Card>
      {comment.replyToId === null && (
        <Collapse in={isReplyFormExpanded} timeout="auto">
          <CommentCreateForm
            setNewComment={setNewComment}
            postId={comment.postId}
            replyToId={comment.id}
          />
        </Collapse>
      )}
    </>
  );
};

export default CommentElement;
