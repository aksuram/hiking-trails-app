import { LeafletMouseEvent } from "leaflet";
import { createContext, useContext, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";

import { useTrail } from "./TrailContext";

interface MapMenuData {
  openMenu: (event: LeafletMouseEvent) => void;
}

const MapMenuContext = createContext<MapMenuData>(null!);

export const useMapMenu = () => {
  return useContext(MapMenuContext);
};

export const MapMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { pushCoordinate } = useTrail();

  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [contextMenuCoordinate, setContextMenuCoordinate] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleOpenMenu = (event: LeafletMouseEvent) => {
    let originalEvent = event.originalEvent;
    originalEvent.preventDefault();

    setContextMenuCoordinate({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });

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

  const handlePushCoordinate = () => {
    if (contextMenuCoordinate === null) return;
    pushCoordinate([
      contextMenuCoordinate.latitude,
      contextMenuCoordinate.longitude,
    ]);
    handleCloseMenu();
  };

  return (
    <>
      <MapMenuContext.Provider value={{ openMenu: handleOpenMenu }}>
        {children}
      </MapMenuContext.Provider>
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
        <MenuItem dense onClick={handlePushCoordinate}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          Pridėti
        </MenuItem>
      </Menu>
    </>
  );
};
