import { createContext, useContext, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";

import { InsertType, useTrail } from "./TrailContext";

interface CoordinateMenuData {
  openMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    coordinateIndex: number
  ) => void;
}

const CoordinateMenuContext = createContext<CoordinateMenuData>(null!);

export const useCoordinateMenu = () => {
  return useContext(CoordinateMenuContext);
};

export const CoordinateMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { insertCoordinate } = useTrail();
  const [coordinateIndex, setCoordinateIndex] = useState<number | null>(null);
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuAnchorElement);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    coordinateIndex: number
  ) => {
    setCoordinateIndex(coordinateIndex);
    setMenuAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorElement(null);
  };

  return (
    <>
      <CoordinateMenuContext.Provider value={{ openMenu: handleOpenMenu }}>
        {children}
      </CoordinateMenuContext.Provider>
      <Menu
        elevation={2}
        anchorEl={menuAnchorElement}
        open={isMenuOpen}
        onClose={handleCloseMenu}
      >
        <MenuItem
          dense
          onClick={() => {
            if (coordinateIndex !== null) {
              insertCoordinate(coordinateIndex, InsertType.Before);
              handleCloseMenu();
            }
          }}
        >
          <ListItemIcon>
            <KeyboardArrowUpIcon />
          </ListItemIcon>
          Pridėti koordinate prieš
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            if (coordinateIndex !== null) {
              insertCoordinate(coordinateIndex, InsertType.After);
              handleCloseMenu();
            }
          }}
        >
          <ListItemIcon>
            <KeyboardArrowDownIcon />
          </ListItemIcon>
          Pridėti koordinate už
        </MenuItem>
      </Menu>
    </>
  );
};
