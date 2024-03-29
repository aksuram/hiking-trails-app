import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { guidToShortenedGuid } from "../../Utilities/guidEncoding";
import PostTitleMenuButton from "./PostTitleMenuButton";

interface Props {
  postId: string;
  postTitle: string;
  titleWidth: string;
  isPostMenuEnabled: boolean;
}

const PostTitle = ({
  postId,
  postTitle,
  titleWidth,
  isPostMenuEnabled,
}: Props) => {
  return (
    <div
      style={{
        minHeight: "40px",
        display: "grid",
        gridTemplateColumns: "auto 40px",
        columnGap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ gridColumnStart: 1, gridColumnEnd: isPostMenuEnabled ? 2 : 3 }}
      >
        <Box
          sx={{
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.87)",
          }}
          component={Link}
          to={`/post/${guidToShortenedGuid(postId)}`}
        >
          <div
            style={{
              maxWidth: titleWidth,
              minWidth: titleWidth,
            }}
          >
            <Typography variant="h5" noWrap sx={{ maxWidth: titleWidth }}>
              {postTitle}
            </Typography>
          </div>
        </Box>
      </div>
      {isPostMenuEnabled && (
        <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
          <PostTitleMenuButton />
        </div>
      )}
    </div>
  );
};

export default PostTitle;
