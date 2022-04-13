import { Avatar, Box, Card, IconButton, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";

interface Props {
  isReply?: boolean;
}

const Comment = (props: Props) => {
  const leftOffset = props.isReply ? 6 : 0;

  return (
    <Card
      sx={{
        backgroundColor: "#F5F5F5",
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
              alt="Something"
            >
              T
            </Avatar>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ ml: 1, placeSelf: "center" }}
            >
              Tadas Maruška
            </Typography>
          </div>
          <div className="CommentDataGridDate">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ placeSelf: "center" }}
            >
              Wednesday, April 13, 2022
            </Typography>
          </div>
        </div>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.This impressive paella is a perfect party dish
          and a fun meal to cook together with your guests. Add 1 cup of frozen
          peas along with the mussels, if you like.This impressive paella is a
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
              7
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

export default Comment;
