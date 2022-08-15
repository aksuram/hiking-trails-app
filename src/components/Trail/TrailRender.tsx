import { Polyline } from "react-leaflet";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import {
  coordinateIndicatorIcon,
  prepareTrailCoordinatesForDrawing,
  trailEditIcon,
  trailEndIcon,
  trailStartIcon
} from "../../Utilities/trailDrawing";
import DraggableMarker from "./DraggableMarker";
import IndexedMarker from "./IndexedMarker";

const TrailRender = ({ coordinates }: { coordinates: TrailCoordinate[] }) => {
  if (coordinates.length === 0) return null;

  const curvedTrail =
    coordinates.length > 1
      ? prepareTrailCoordinatesForDrawing(coordinates)
      : [];

  return (
    <>
      {coordinates.length > 1 && (
        <Polyline color="#2979ff" positions={curvedTrail} />
      )}
      {coordinates.map((coordinate, index) => (
        <IndexedMarker
          key={`${coordinate.id}${index}`}
          index={index}
          icon={coordinateIndicatorIcon}
          coordinate={coordinate}
        />
      ))}
      {!coordinates[0].isEditing && (
        <IndexedMarker
          index={0}
          icon={trailStartIcon}
          coordinate={coordinates[0]}
          showIndex={false}
        />
      )}
      {coordinates.length > 1 &&
        !coordinates[coordinates.length - 1].isEditing && (
          <IndexedMarker
            index={coordinates.length - 1}
            icon={trailEndIcon}
            coordinate={coordinates[coordinates.length - 1]}
            showIndex={false}
          />
        )}
      {coordinates.map(
        (coordinate, index) =>
          coordinate.isEditing && (
            <DraggableMarker
              key={`${coordinate.id}${index}`}
              index={index}
              icon={trailEditIcon}
              coordinate={coordinate}
            />
          )
      )}
    </>
  );
};

export default TrailRender;
