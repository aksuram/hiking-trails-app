import { Favorite } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

const Post = () => {
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardHeader avatar={<Avatar>R</Avatar>} title="Post name" />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.This impressive paella is a perfect party dish
          and a fun meal to cook together with your guests. Add 1 cup of frozen
          peas along with the mussels, if you like.This impressive paella is a
          perfect party dish and a fun meal to cook together with your guests.
          Add 1 cup of frozen peas along with the mussels, if you like.This
          impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.This impressive paella is a perfect party dish
          and a fun meal to cook together with your guests. Add 1 cup of frozen
          peas along with the mussels, if you like.This impressive paella is a
          perfect party dish and a fun meal to cook together with your guests.
          Add 1 cup of frozen peas along with the mussels, if you like.This
          impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.This impressive paella is a perfect party dish
          and a fun meal to cook together with your guests. Add 1 cup of frozen
          peas along with the mussels, if you like.This impressive paella is a
          perfect party dish and a fun meal to cook together with your guests.
          Add 1 cup of frozen peas along with the mussels, if you like.This
          impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
