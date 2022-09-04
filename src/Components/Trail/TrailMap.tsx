import { MapContainer, TileLayer } from "react-leaflet";

import { Card } from "@mui/material";

import { boundsOptions, initialBounds } from "../../Utilities/trailDrawing";
import { MapMenuProvider } from "./MapMenuContext";
import { MarkerMenuProvider } from "./MarkerMenuContext";
import { useTrail } from "./TrailContext";
import TrailMapEvents from "./TrailMapEvents";
import TrailRender from "./TrailRender";

const TrailMap = () => {
  const { coordinates, pushCoordinate } = useTrail();

  return (
    <Card
      style={{
        maxWidth: "600px",
        minWidth: "600px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <MapMenuProvider>
        <MarkerMenuProvider>
          <MapContainer
            zoomSnap={0.3}
            zoomDelta={0.5}
            boundsOptions={boundsOptions}
            bounds={initialBounds}
            style={{
              outline: "none",
              height: "430px",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TrailMapEvents pushCoordinate={pushCoordinate} />
            <TrailRender coordinates={coordinates} />
          </MapContainer>
        </MarkerMenuProvider>
      </MapMenuProvider>
    </Card>
  );
};

export default TrailMap;
