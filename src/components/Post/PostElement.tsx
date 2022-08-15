import { useContext, useEffect, useState } from "react";

import { Box, Card, Typography } from "@mui/material";

import { AvatarType } from "../../Enums/AvatarType";
import { CommentList, CommentListJson } from "../../Interfaces/Comment";
import { FieldError, FieldErrorList } from "../../Interfaces/FieldError";
import { Post } from "../../Interfaces/Post";
import { canUserChangeEntity } from "../../Utilities/auth";
import { API_URL } from "../../Utilities/config";
import { sleep } from "../../Utilities/sleep";
import { UserContext } from "../Auth/UserContext";
import CreateEditDateText from "../Shared/CreateEditDateText";
import UserAvatar from "../User/UserAvatar";
import PostComments from "./PostComments";
import PostFooter from "./PostFooter";
import PostTitle from "./PostTitle";

interface Props {
  post: Post;
}

const PostElement = ({ post }: Props) => {
  //Errors
  const [isUnknownError, setIsUnknownError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  //Button state
  const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);

  //Data
  const [commentList, setCommentList] = useState<CommentList | null>(null);
  const { userInfo } = useContext(UserContext);

  //UI arrangement data
  const isPostMenuEnabled = canUserChangeEntity(userInfo, post.user.id);
  const titleWidth: string = isPostMenuEnabled ? "490px" : "544px";

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
      //TODO: Change to customFetch, use await for at least function, and fix loading indicator
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

  //TODO: Add a "Show more" button to post body, so that it wouldn't take up so much space
  return (
    <Card
      style={{
        maxWidth: "600px",
        minWidth: "600px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "16px",
        paddingBottom: "16px",
      }}
    >
      <Box
        style={{
          marginLeft: "8px",
          marginRight: "8px",
          marginBottom: "8px",
        }}
      >
        {/* TODO: Create a PostHeader component */}
        <PostTitle
          postId={post.id}
          postTitle={post.title}
          titleWidth={titleWidth}
          isPostMenuEnabled={isPostMenuEnabled}
        />
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "auto auto",
            marginTop: "6px",
            marginLeft: "6px",
            marginRight: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifySelf: "start",
              alignSelf: "center",
            }}
          >
            <UserAvatar
              userId={post.user.id}
              userFullName={post.user.fullName}
              avatar={post.user.avatar}
              avatarType={AvatarType.Post}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifySelf: "end",
              alignSelf: "flex-start",
            }}
          >
            <CreateEditDateText
              creationDate={post.creationDate}
              editDate={post.editDate}
            />
          </div>
        </div>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </Box>
      <Box>
        <PostFooter
          userRating={post.userRating}
          postRating={post.rating}
          postId={post.id}
          handleExpandCommentsClick={handleExpandCommentsClick}
          areCommentsExpanded={areCommentsExpanded}
        />
      </Box>
      <Box>
        <PostComments
          areCommentsExpanded={areCommentsExpanded}
          isUnknownError={isUnknownError}
          fieldErrors={fieldErrors}
          postId={post.id}
          commentList={commentList}
          setCommentList={setCommentList}
        />
      </Box>
    </Card>
  );
};

export default PostElement;
