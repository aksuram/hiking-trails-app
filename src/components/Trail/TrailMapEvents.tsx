import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import useKeyPress from "../../Hooks/useKeyPress";
import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import { useCoordinateSelection } from "./CoordinateSelectionContext";
import { useMapMenu } from "./MapMenuContext";

interface MapEventsProps {
  pushCoordinate: (coordinate: LatLngTuple) => void;
}

const TrailMapEvents = ({ pushCoordinate }: MapEventsProps) => {
  const { setPanToCoordinateFunction } = useCoordinateSelection();
  const { openMenu } = useMapMenu();
  const map = useMap();
  const isAltKeyPressed = useKeyPress("Alt");

  const panToCoordinate = (coordinate: TrailCoordinate) => {
    map.panTo([coordinate.latitude, coordinate.longitude]);
  };

  useEffect(() => {
    setPanToCoordinateFunction(panToCoordinate);
  }, []);

  useEffect(() => {
    if (isAltKeyPressed) {
      map.dragging.disable();
    } else {
      map.dragging.enable();
    }
  }, [isAltKeyPressed]);

  useMapEvents({
    click(e) {
      if (!e.originalEvent.altKey) return;
      pushCoordinate([e.latlng.lat, e.latlng.lng]);
    },
    contextmenu(e) {
      openMenu(e);
    },
  });
  return null;
};

export default TrailMapEvents;
