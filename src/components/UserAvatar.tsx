import { Avatar, Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { IMG_URL } from "../utils/Config";
import { guidToShortenedGuid } from "../utils/GuidEncoding";

export enum AvatarType {
  Post,
  Comment,
}

interface Props {
  userId: string;
  userFullName: string;
  avatar: string | null;
  avatarType: AvatarType;
}

const UserAvatar = ({ userId, userFullName, avatar, avatarType }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "rgba(0, 0, 0, 0.87)",
      }}
      component={Link}
      to={`/user/${guidToShortenedGuid(userId)}`}
    >
      <Avatar
        sx={{
          width: avatarType === AvatarType.Post ? 35 : 29,
          height: avatarType === AvatarType.Post ? 35 : 29,
          fontSize: avatarType === AvatarType.Post ? "21px" : "19px",
          bgcolor: green[500],
        }} //TODO: Get random color depending on username?
        alt={userFullName}
        src={avatar === null ? undefined : `${IMG_URL}${avatar}`}
      >
        {userFullName[0]}
      </Avatar>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{
          ml: avatarType === AvatarType.Post ? 1.2 : 1.2,
          fontSize: avatarType === AvatarType.Post ? "18px" : "16px",
          placeSelf: "center",
        }}
      >
        {userFullName}
      </Typography>
    </Box>
  );
};

export default UserAvatar;
