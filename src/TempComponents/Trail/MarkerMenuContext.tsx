import { LeafletMouseEvent } from "leaflet";
import { createContext, useContext, useState } from "react";

import DeleteIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import { InsertType, useTrail } from "./TrailContext";

interface MarkerMenuData {
  openMenu: (
    index: number,
    coordinate: TrailCoordinate,
    event: LeafletMouseEvent
  ) => void;
}

const MarkerMenuContext = createContext<MarkerMenuData>(null!);

export const useMarkerMenu = () => {
  return useContext(MarkerMenuContext);
};

export const MarkerMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [coordinateIndex, setCoordinateIndex] = useState<number | null>(null);
  const [coordinate, setCoordinate] = useState<TrailCoordinate | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleOpenMenu = (
    index: number,
    coordinate: TrailCoordinate,
    event: LeafletMouseEvent
  ) => {
    setCoordinateIndex(index);
    setCoordinate(coordinate);

    let originalEvent = event.originalEvent;
    originalEvent.preventDefault();

    setContextMenuPosition(
      contextMenuPosition === null
        ? {
            x: originalEvent.clientX + 2,
            y: originalEvent.clientY - 6,
          }
        : null
    );
  };

  const handleCloseMenu = () => {
    setContextMenuPosition(null);
  };

  return (
    <>
      <MarkerMenuContext.Provider value={{ openMenu: handleOpenMenu }}>
        {children}
      </MarkerMenuContext.Provider>
      <Menu
        elevation={2}
        open={contextMenuPosition !== null}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenuPosition !== null
            ? { top: contextMenuPosition.y, left: contextMenuPosition.x }
            : undefined
        }
      >
        {coordinateIndex !== null && coordinate !== null && (
          <MenuItemList
            coordinateIndex={coordinateIndex}
            coordinate={coordinate}
            handleCloseMenu={handleCloseMenu}
          />
        )}
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

const MenuItemList = ({
  coordinateIndex,
  coordinate,
  handleCloseMenu,
}: {
  coordinateIndex: number;
  coordinate: TrailCoordinate;
  handleCloseMenu: () => void;
}) => {
  const { insertCoordinate, removeCoordinate, toggleCoordinateForEditing } =
    useTrail();
  const isEditing = coordinate.isEditing;

  const menuItemList: MenuItemData[] = [
    {
      hasDivider: true,
      text: isEditing
        ? "Užbaigti redaguoti koordinate"
        : "Redaguoti koordinate",
      icon: isEditing ? <DoneIcon /> : <EditIcon />,
      onClick: () => {
        toggleCoordinateForEditing(coordinateIndex);
        handleCloseMenu();
      },
    },
    {
      hasDivider: false,
      text: "Pridėti koordinate prieš",
      icon: <KeyboardArrowUpIcon />,
      onClick: () => {
        insertCoordinate(coordinateIndex, InsertType.Before);
        handleCloseMenu();
      },
    },
    {
      hasDivider: true,
      text: "Pridėti koordinate už",
      icon: <KeyboardArrowDownIcon />,
      onClick: () => {
        insertCoordinate(coordinateIndex, InsertType.After);
        handleCloseMenu();
      },
    },
    {
      hasDivider: true,
      text: "Surasti koordinačių sąraše",
      icon: <SearchIcon />,
      onClick: () => {
        //TODO: handle showing coordinate in coordinate list
        handleCloseMenu();
      },
    },
    {
      hasDivider: false,
      text: "Ištrinti koordinate",
      icon: <DeleteIcon />,
      onClick: () => {
        removeCoordinate(coordinateIndex);
        handleCloseMenu();
      },
    },
  ];

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
