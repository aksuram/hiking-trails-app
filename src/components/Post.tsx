import {
  Avatar,
  Box,
  Card,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import { useState } from "react";
import Comment from "./Comment";
import { green } from "@mui/material/colors";

export interface PostGeneric<T> {
  id: string;
  title: string;
  body: string;
  isDeleted: boolean;
  creationDate: T;
  editDate?: T;
  userId: string;
  userFullName: string;
  rating: number;
}

export type Post = PostGeneric<Date>;

interface Props {
  post: Post;
}

const PostElement = ({ post }: Props) => {
  const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);

  const handleExpandCommentsClick = () => {
    setAreCommentsExpanded((expanded) => !expanded);
  };

  return (
    <Card className="PostListElement PostCard">
      <Box sx={{ margin: 1 }}>
        <Typography variant="h5" noWrap>
          {post.title}
        </Typography>
        <div className="PostDataGridTop">
          <div className="PostDataGridUser">
            <Avatar
              sx={{ width: 30, height: 30, bgcolor: green[500] }}
              alt="post.userFullName"
            >
              {post.userFullName[0]}
            </Avatar>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ ml: 1, placeSelf: "center" }}
            >
              {post.userFullName}
            </Typography>
          </div>
          <div className="PostDataGridDate">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ placeSelf: "center" }}
            >
              {post.creationDate.toLocaleString()}
            </Typography>
          </div>
        </div>
      </Box>
      <Box sx={{ mt: 2.5 }}>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </Box>
      <Box>
        <div className="PostDataGridBottom">
          <div className="PostDataGridRating">
            <IconButton aria-label="like" size="small">
              <ThumbUpIcon fontSize="medium" />
            </IconButton>
            <IconButton aria-label="dislike" size="small">
              <ThumbDownIcon fontSize="medium" />
            </IconButton>
            <Typography
              variant="button"
              color="green"
              sx={{ ml: 1, placeSelf: "center", fontSize: 18 }}
            >
              {post.rating}
            </Typography>
          </div>
          <div className="PostDataGridComments">
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
              onClick={handleExpandCommentsClick}
              aria-expanded={areCommentsExpanded}
            >
              <CommentIcon fontSize="medium" />
            </IconButton>
          </div>
        </div>
      </Box>
      <Box>
        <Collapse in={areCommentsExpanded} timeout="auto">
          <Divider sx={{ mt: 1, mb: 1.5 }} />
          <Typography sx={{ ml: 1 }} variant="h6">
            Komentarai
          </Typography>
          <Comment />
          <Comment isReply={true} />
          <Comment isReply={true} />
          <Comment isReply={true} />
          <Comment />
          <Comment />
          <Comment />
        </Collapse>
      </Box>
    </Card>
  );
};

export default PostElement;
