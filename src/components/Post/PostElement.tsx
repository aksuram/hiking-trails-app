import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CommentIcon from "@mui/icons-material/CommentOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/ModeEditOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  Collapse,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Menu,
  Typography
} from "@mui/material";

import { AvatarType } from "../../Enums/AvatarType";
import { RatingType } from "../../Enums/RatingType";
import { CommentList, CommentListJson } from "../../Interfaces/Comment";
import { FieldError, FieldErrorList } from "../../Interfaces/FieldError";
import { Post } from "../../Interfaces/Post";
import { API_URL } from "../../Utilities/config";
import { guidToShortenedGuid } from "../../Utilities/guidEncoding";
import { sleep } from "../../Utilities/sleep";
import { UserContext } from "../Auth/UserContext";
import CommentListElement from "../Comment/CommentList";
import RatingElement from "../Rating/RatingElement";
import { DateTooltip } from "../Shared/DateTooltip";
import UserAvatar from "../User/UserAvatar";

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
  const { userInfo } = useContext(UserContext);

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
          .then((fieldErrorList: FieldErrorList) =>
            setFieldErrors(fieldErrorList.errors)
          );
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

  const isPostEditDeleteEnabled =
    userInfo !== null &&
    (userInfo.role === "Administrator" || userInfo.id === post.user.id);
  const titleWidth = isPostEditDeleteEnabled ? "500px" : "550px";

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
        {/* TODO: Export post title into its own component */}
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
              <div
                style={{
                  maxWidth: titleWidth,
                  minWidth: titleWidth,
                }}
              >
                <Typography variant="h5" noWrap sx={{ maxWidth: titleWidth }}>
                  {post.title}
                </Typography>
              </div>
            </Box>
          </div>
          <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
            {isPostEditDeleteEnabled && (
              <IconButton onClick={handleOpenMenu}>
                <MoreIcon />
              </IconButton>
            )}
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
            to="/"
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
            to="/"
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
