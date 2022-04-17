import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBarUser = () => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorElement(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{ width: 35, height: 35 }}
            alt="User User"
            src="/static/images/avatar/2.jpg"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
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
    </Box>
  );
};

export default NavBarUser;
