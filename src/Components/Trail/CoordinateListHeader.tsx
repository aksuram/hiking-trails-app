import { useState } from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";

import { useTrail } from "./TrailContext";

const CoordinateListHeader = () => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuAnchorElement);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorElement(null);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          alignItems: "center",
          marginBottom: "10px",
          marginLeft: "26px",
          marginRight: "20px",
        }}
      >
        <div>
          <Typography variant="h5">Koordinatės</Typography>
        </div>
        <div style={{ justifySelf: "end" }}>
          <IconButton onClick={(e) => handleOpenMenu(e)}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <Menu
        elevation={2}
        transitionDuration={0}
        anchorEl={menuAnchorElement}
        open={isMenuOpen}
        onClose={handleCloseMenu}
      >
        <MenuItemList handleCloseMenu={handleCloseMenu} />
      </Menu>
    </>
  );
};

interface MenuItemData {
  hasDivider: boolean;
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const MenuItemList = ({ handleCloseMenu }: { handleCloseMenu: () => void }) => {
  const { coordinates, toggleAllCoordinatesForEditing, clearAllCoordinates } =
    useTrail();

  const longMenuItemList: MenuItemData[] = [
    {
      hasDivider: false,
      text: "Redaguoti koordinates",
      icon: <EditIcon />,
      onClick: () => {
        toggleAllCoordinatesForEditing(true);
        handleCloseMenu();
      },
    },
    {
      hasDivider: true,
      text: "Užbaigti redaguoti koordinates",
      icon: <DoneIcon />,
      onClick: () => {
        toggleAllCoordinatesForEditing(false);
        handleCloseMenu();
      },
    },
    {
      hasDivider: false,
      text: "Įkelti koordinates iš failo",
      icon: <FileUploadIcon />,
      onClick: () => {
        //TODO: handle importing coordinates from file
        handleCloseMenu();
      },
    },
    {
      hasDivider: true,
      text: "Iškelti koordinates į failą",
      icon: <FileDownloadIcon />,
      onClick: () => {
        //TODO: handle exporting coordinates to file
        handleCloseMenu();
      },
    },
    {
      hasDivider: true,
      text: "Pagalba",
      icon: <HelpOutlineIcon />,
      onClick: () => {
        //TODO: handle showing help modal
        handleCloseMenu();
      },
    },
    {
      hasDivider: false,
      text: "Ištrinti visas koordinates",
      icon: <DeleteForeverOutlinedIcon />,
      onClick: () => {
        clearAllCoordinates();
        handleCloseMenu();
      },
    },
  ];

  const shortMenuItemList: MenuItemData[] = [
    {
      ...longMenuItemList[2],
      hasDivider: true,
    },
    {
      ...longMenuItemList[4],
      hasDivider: false,
    },
  ];

  let menuItemList =
    coordinates.length === 0 ? shortMenuItemList : longMenuItemList;

  return (
    <div>
      {menuItemList.map((menuItem, index) => (
        <div key={index}>
          <MenuItem dense onClick={menuItem.onClick}>
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            {menuItem.text}
          </MenuItem>
          {menuItem.hasDivider && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default CoordinateListHeader;
