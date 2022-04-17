import { Avatar, Box, Card, IconButton, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import { countryCode, dateTimeFormatOptions } from "../utils/Config";

export interface CommentGeneric<T> {
  id: string;
  body: string;
  isDeleted: boolean;
  creationDate: T;
  editDate: T | null;
  userId: string;
  userFullName: string;
  replyToId: string;
  rating: number;
  replies: CommentGeneric<T>[] | null;
}

export type Comment = CommentGeneric<Date>;

interface Props {
  comment: Comment;
}

const CommentElement = ({ comment }: Props) => {
  const leftOffset = comment.replyToId ? 6 : 0;

  return (
    <Card
      sx={{
        backgroundColor: "#FAFAFA",
        px: 2,
        py: 1,
        ml: leftOffset,
        mt: 1.5,
      }}
      variant="outlined"
    >
      <Box>
        <div className="CommentDataGridTop">
          <div className="CommentDataGridUser">
            <Avatar
              sx={{ width: 25, height: 25, bgcolor: green[500] }}
              alt={comment.userFullName[0]}
            >
              {comment.userFullName[0]}
            </Avatar>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ ml: 1, placeSelf: "center" }}
            >
              {comment.userFullName}
            </Typography>
          </div>
          <div className="CommentDataGridDate">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ placeSelf: "center" }}
            >
              {comment.creationDate.toLocaleDateString(
                countryCode,
                dateTimeFormatOptions
              )}
            </Typography>
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
            <IconButton aria-label="like" size="small">
              <ThumbUpIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="dislike" size="small">
              <ThumbDownIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="button"
              color="green"
              sx={{ ml: 1, placeSelf: "center", fontSize: 16 }}
            >
              {comment.rating}
            </Typography>
          </div>
          {/* <div className="CommentDataGridComments">
            <Typography
              variant="button"
              color="blue"
              sx={{ mr: 1, placeSelf: "center", fontSize: 18 }}
            >
              5
            </Typography>
            <IconButton
              aria-label="comments"
              size="small"
              onClick={handleCommentsExpandClick}
              aria-expanded={commentsExpanded}
            >
              <CommentIcon fontSize="medium" />
            </IconButton>
          </div> */}
        </div>
      </Box>
    </Card>
  );
};

export default CommentElement;
