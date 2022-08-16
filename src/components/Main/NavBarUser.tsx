import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ProfileIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Menu,
  Tooltip,
  Typography
} from "@mui/material";

import { IMG_URL } from "../../Utilities/config";
import { UserContext } from "../Auth/UserContext";

const menuLinks: {
  name: string;
  path: string;
  icon: React.ReactElement;
}[] = [
  { name: "Profilis", path: "/profile", icon: <ProfileIcon /> },
  { name: "Atsijungti", path: "/logout", icon: <LogoutIcon /> },
];

const NavBarUser = () => {
  const avatarElement = useRef<HTMLButtonElement | null>(null);
  const userContext = useContext(UserContext);

  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = () => {
    setMenuAnchorElement(avatarElement.current);
  };
  const handleCloseMenu = () => {
    setMenuAnchorElement(null);
  };

  if (userContext.userInfo === null) {
    return (
      <>
        <Button
          href="/login"
          variant="text"
          color="inherit"
          endIcon={<LoginIcon />}
        >
          Prisijungti
        </Button>
      </>
    );
  }

  return (
    <>
      <Tooltip title="Meniu">
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={handleOpenMenu}
        >
          <Typography sx={{ mr: 1.5, fontSize: 18 }}>
            {userContext.userInfo.fullName}
          </Typography>
          <IconButton ref={avatarElement} sx={{ p: 0 }}>
            <Avatar
              sx={{ width: 35, height: 35 }}
              alt={userContext.userInfo.fullName}
              //TODO: add random color dependant on user full name
              src={
                userContext.userInfo.avatar === null
                  ? undefined
                  : `${IMG_URL}${userContext.userInfo.avatar}`
              }
            >
              {userContext.userInfo.fullName[0]}
            </Avatar>
          </IconButton>
        </Box>
      </Tooltip>
      <Menu
        elevation={2}
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
        {menuLinks.map((link) => (
          <ListItemButton
            component={Link}
            key={link.name}
            to={link.path}
            disableRipple
            onClick={handleCloseMenu}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>{link.icon}</ListItemIcon>
            {link.name}
          </ListItemButton>
        ))}
      </Menu>
    </>
  );
};

export default NavBarUser;
