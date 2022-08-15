import { DivIcon, Icon, IconOptions, LeafletEventHandlerFnMap } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import { useMarkerMenu } from "./MarkerMenuContext";

interface Props {
  index: number;
  coordinate: TrailCoordinate;
  icon: Icon<IconOptions> | DivIcon;
  showIndex?: boolean;
}

const IndexedMarker = ({
  index,
  coordinate,
  icon,
  showIndex = true,
}: Props) => {
  const { openMenu } = useMarkerMenu();

  const eventHandlers = {
    contextmenu(e) {
      openMenu(index, coordinate, e);
    },
  } as LeafletEventHandlerFnMap;

  return (
    <Marker
      icon={icon}
      position={[coordinate.latitude, coordinate.longitude]}
      eventHandlers={eventHandlers}
    >
      {showIndex && (
        <Tooltip opacity={0.9} direction="top">
          {index + 1}
        </Tooltip>
      )}
    </Marker>
  );
};

export default IndexedMarker;
