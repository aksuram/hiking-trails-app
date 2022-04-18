import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBarUser = () => {
  const userContext = useContext(UserContext);

  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1, fontSize: 18 }}>
          {userContext.userInfo.firstName}
        </Typography>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
            <Avatar
              sx={{ width: 35, height: 35 }}
              alt="User User"
              src="/static/images/avatar/2.jpg"
            />
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        elevation={1}
        sx={{ mt: "30px" }}
        id="menu-appbar"
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavBarUser;
