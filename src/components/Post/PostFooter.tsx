import CommentIcon from "@mui/icons-material/CommentOutlined";
import { IconButton } from "@mui/material";

import { RatingType } from "../../Enums/RatingType";
import { Rating } from "../../Interfaces/Rating";
import RatingElement from "../Rating/RatingElement";

interface Props {
  userRating: Rating | null;
  postRating: number;
  postId: string;
  handleExpandCommentsClick: () => void;
  areCommentsExpanded: boolean;
}

const PostFooter = ({
  userRating,
  postRating,
  postId,
  handleExpandCommentsClick,
  areCommentsExpanded,
}: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: "auto auto",
        marginTop: "8px",
        marginLeft: "4px",
        marginRight: "4px",
      }}
    >
      <div
        style={{ display: "flex", justifySelf: "start", alignSelf: "center" }}
      >
        <RatingElement
          userRating={userRating}
          parentRating={postRating}
          parentId={postId}
          ratingType={RatingType.Post}
        />
      </div>
      <div style={{ display: "flex", justifySelf: "end", alignSelf: "center" }}>
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
  );
};

export default PostFooter;
