import {
  Box,
  Card,
  Collapse,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Menu,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/ModeEditOutlined";
import { useEffect, useState } from "react";
import CommentListElement, {
  CommentList,
  CommentListJson,
} from "./CommentList";
import { ErrorList, FieldError } from "../utils/ErrorInterfaces";
import { API_URL } from "../utils/Config";
import { DateTooltip, sleep } from "../utils/Random";
import RatingElement, { Rating, RatingType } from "./Rating";
import moment from "moment";
import UserAvatar, { AvatarType } from "./UserAvatar";
import { User } from "./User";
import { Link } from "react-router-dom";
import { guidToShortenedGuid } from "../utils/GuidEncoding";

export interface PostGeneric<T> {
  id: string;
  title: string;
  body: string;
  isDeleted: boolean;
  creationDate: T;
  editDate: T | null;
  user: User;
  userRating: Rating | null;
  rating: number;
}

export type Post = PostGeneric<Date>;
export type PostJson = PostGeneric<string>;

interface Props {
  post: Post;
}

const PostElement = ({ post }: Props) => {
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const [commentList, setCommentList] = useState<CommentList | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorElement(null);
  };

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
    setCommentList(null);
  };

  const getCommentList = async () => {
    try {
      const response = await fetch(`${API_URL}post/${post.id}/comment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });
      await sleep(500);

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
    } catch (error) {
      setIsUnknownError(true);
    }
  };

  const formPostDateTooltipString = (): string => {
    let postDateString = moment(post.creationDate).format(
      "YYYY MMMM D, ddd - HH:mm"
    );

    if (post.editDate !== null) {
      postDateString =
        postDateString +
        `; Redaguota: ${moment(post.editDate).format(
          "YYYY MMMM D, ddd - HH:mm"
        )}`;
    }

    return postDateString;
  };

  //TODO: Add a "Show more" button to post body, so that it wouldn't take up so much space
  return (
    <Card className="PostListElement PostCard">
      <Box
        sx={{
          marginLeft: 0.5,
          marginTop: 0.5,
          marginRight: 0.5,
          marginBottom: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 40px",
            columnGap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ gridColumnStart: 1, gridColumnEnd: 2 }}>
            <Box
              sx={{
                // display: "flex",
                // alignItems: "center",
                textDecoration: "none",
                color: "rgba(0, 0, 0, 0.87)",
              }}
              component={Link}
              to={`/post/${guidToShortenedGuid(post.id)}`}
            >
              <div style={{ maxWidth: "500px", minWidth: "500px" }}>
                <Typography variant="h5" noWrap sx={{ maxWidth: "500px" }}>
                  {post.title}
                </Typography>
              </div>
            </Box>
          </div>
          <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
            <IconButton onClick={handleOpenMenu}>
              <MoreIcon />
            </IconButton>
          </div>
        </div>
        <Menu
          elevation={1}
          sx={{ mt: "35px" }}
          anchorEl={menuAnchorElement}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={!!menuAnchorElement}
          onClose={handleCloseMenu}
        >
          <ListItemButton
            component={Link}
            key="profile"
            to="/profile"
            disableRipple
            onClick={handleCloseMenu}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <EditIcon />
            </ListItemIcon>
            Redaguoti
          </ListItemButton>
          <ListItemButton
            component={Link}
            key="logout"
            to="/logout"
            disableRipple
            onClick={handleCloseMenu}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <DeleteIcon />
            </ListItemIcon>
            Ištrinti
          </ListItemButton>
        </Menu>
        {/* TODO: Create an edit, delete etc... menu button at top right */}
        {/* TODO: Post title should be clickable and link to the specific post */}
        <div className="PostDataGridTop">
          <div className="PostDataGridUser">
            <UserAvatar
              userId={post.user.id}
              userFullName={post.user.fullName}
              avatar={post.user.avatar}
              avatarType={AvatarType.Post}
            />
          </div>
          <div className="PostDataGridDate">
            <DateTooltip title={formPostDateTooltipString()} placement="left">
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ placeSelf: "center" }}
              >
                {moment(post.creationDate).fromNow()}
                {post.editDate !== null && "*"}
              </Typography>
            </DateTooltip>
          </div>
        </div>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </Box>
      <Box>
        <div className="PostDataGridBottom">
          <div className="PostDataGridRating">
            <RatingElement
              userRating={post.userRating}
              parentRating={post.rating}
              parentId={post.id}
              ratingType={RatingType.Post}
            />
          </div>
          <div className="PostDataGridComments">
            {/* TODO: Show comment count? */}
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
            postId={post.id}
            commentList={commentList}
            setCommentList={setCommentList}
          />
        </Collapse>
      </Box>
    </Card>
  );
};

export default PostElement;
