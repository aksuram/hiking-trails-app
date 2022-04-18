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
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";
import CommentListElement, {
  CommentList,
  CommentListJson,
} from "./CommentList";
import { ErrorList, FieldError } from "../utils/ErrorInterfaces";
import { API_URL, countryCode, dateTimeFormatOptions } from "../utils/Config";
import { sleep } from "../utils/Random";
import RatingElement, { Rating, RatingType } from "./Rating";

export interface PostGeneric<T> {
  id: string;
  title: string;
  body: string;
  isDeleted: boolean;
  creationDate: T;
  editDate: T | null;
  userId: string;
  userFullName: string;
  userRating: Rating | null;
  rating: number;
}

export type Post = PostGeneric<Date>;

interface Props {
  post: Post;
}

const PostElement = ({ post }: Props) => {
  const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [commentList, setCommentList] = useState<CommentList | undefined>(
    undefined
  );

  const handleExpandCommentsClick = () => {
    setAreCommentsExpanded((expanded) => !expanded);
  };

  useEffect(() => {
    if (areCommentsExpanded) {
      resetState();
      getCommentList();
    }
  }, [areCommentsExpanded]);

  const resetState = () => {
    setIsUnknownError(false);
    setFieldErrors([]);
    setCommentList(undefined);
  };

  const getCommentList = async () => {
    const response = await fetch(`${API_URL}post/${post.id}/comment`);
    await sleep(500);

    //TODO: check if response.ok
    if (response.status === 404) {
      await response
        .json()
        .then((errorList: ErrorList) => setFieldErrors(errorList.errors));
      return;
    }

    if (response.status === 200) {
      await response
        .json()
        .then((commentListJson: CommentListJson) => ({
          ...commentListJson,
          comments: commentListJson.comments.map((comment) => ({
            ...comment,
            creationDate: new Date(comment.creationDate),
            editDate: comment.editDate ? new Date(comment.editDate) : null,
            replies:
              comment.replies?.map((reply) => ({
                ...reply,
                creationDate: new Date(reply.creationDate),
                editDate: reply.editDate ? new Date(reply.editDate) : null,
                replies: null,
              })) ?? null,
          })),
        }))
        .then(setCommentList);
      return;
    }

    setIsUnknownError(true);
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
              {post.creationDate.toLocaleDateString(
                countryCode,
                dateTimeFormatOptions
              )}
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
            <RatingElement
              userRating={post.userRating}
              postRating={post.rating}
              parentId={post.id}
              ratingType={RatingType.Post}
            />
          </div>
          <div className="PostDataGridComments">
            {/* <Typography
              variant="button"
              color="blue"
              sx={{ mr: 1, placeSelf: "center", fontSize: 18 }}
            >
              5
            </Typography> */}
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
          <CommentListElement
            isUnknownError={isUnknownError}
            fieldErrors={fieldErrors}
            commentList={commentList}
          />
        </Collapse>
      </Box>
    </Card>
  );
};

export default PostElement;
