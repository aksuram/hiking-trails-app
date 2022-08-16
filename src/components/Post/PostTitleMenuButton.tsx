import { useState } from "react";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/ModeEditOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu } from "@mui/material";

import MenuItem from "../Shared/MenuItem";

const PostTitleMenuButton = () => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorElement(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreIcon />
      </IconButton>
      <Menu
        keepMounted
        elevation={1}
        sx={{ mt: "35px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={menuAnchorElement}
        open={!!menuAnchorElement}
        onClose={handleCloseMenu}
      >
        <MenuItem
          linkTo="/"
          text="Ištrinti"
          menuItemIcon={<DeleteIcon />}
          handleCloseMenu={handleCloseMenu}
        />
        <MenuItem
          linkTo="/"
          text="Redaguoti"
          menuItemIcon={<EditIcon />}
          handleCloseMenu={handleCloseMenu}
        />
      </Menu>
    </>
  );
};

export default PostTitleMenuButton;
