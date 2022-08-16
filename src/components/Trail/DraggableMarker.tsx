import { DivIcon, Icon, LatLngTuple, LeafletEventHandlerFnMap } from "leaflet";
import { useMemo, useRef, useState } from "react";
import { Marker } from "react-leaflet";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import { useMarkerMenu } from "./MarkerMenuContext";
import { useTrail } from "./TrailContext";

interface Props {
  index: number;
  coordinate: TrailCoordinate;
  icon: Icon | DivIcon;
}

const DraggableMarker = ({ index, coordinate, icon }: Props) => {
  const position = [coordinate.latitude, coordinate.longitude] as LatLngTuple;
  const [draggableMarkerPosition, setDraggableMarkerPosition] =
    useState(position);
  const markerRef = useRef<L.Marker<any>>(null);
  const { editCoordinate } = useTrail();
  const { openMenu } = useMarkerMenu();

  const eventHandlers = useMemo(
    () =>
      ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const markerLatLng = marker.getLatLng();
            const markerLatLngTuple = [
              markerLatLng.lat,
              markerLatLng.lng,
            ] as LatLngTuple;

            editCoordinate(index, coordinate.id, markerLatLngTuple);
            setDraggableMarkerPosition(markerLatLngTuple);
          }
        },
        contextmenu(e) {
          openMenu(index, coordinate, e);
        },
      } as LeafletEventHandlerFnMap),
    []
  );

  return (
    <Marker
      draggable
      icon={icon}
      ref={markerRef}
      position={draggableMarkerPosition}
      eventHandlers={eventHandlers}
    />
  );
};

export default DraggableMarker;
