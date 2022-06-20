import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet";

import { Box, Card } from "@mui/material";
import bezier from "@turf/bezier-spline";
import { lineString } from "@turf/helpers";

import PostFooter from "../Components/Post/PostFooter";
import PostTitle from "../Components/Post/PostTitle";
import CreateEditDateText from "../Components/Shared/CreateEditDateText";
import UserAvatar from "../Components/User/UserAvatar";
import { AvatarType } from "../Enums/AvatarType";

interface MapEventsProps {
  setPositions: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
}

const MapEventsTest = ({ setPositions }: MapEventsProps) => {
  const map = useMapEvents({
    click(e) {
      setPositions((positions) => [...positions, [e.latlng.lat, e.latlng.lng]]);
    },
  });
  return null;
};

const TrailRender = ({ positions }: { positions: LatLngExpression[] }) => {
  if (positions.length < 2) return null;

  var startIcon = L.icon({
    iconUrl: "images/map-pointer-green.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  var endIcon = L.icon({
    iconUrl: "images/map-pointer-red.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  console.log("AHAHA");
  console.log(positions);

  const line = lineString(positions as any);
  console.log(line);
  const curvedTrail = bezier(line, { resolution: 25000 });
  console.log(curvedTrail);

  return (
    <>
      <Marker icon={startIcon} position={positions[0]} />
      <Polyline
        color="blue"
        positions={curvedTrail.geometry.coordinates as LatLngExpression[]}
      />
      <Marker icon={endIcon} position={positions[positions.length - 1]} />
    </>
  );
};

const TrailPage = () => {
  const [positions, setPositions] = useState<LatLngExpression[]>([[55, 24]]);

  // useEffect(() => {
  //   console.log(positions);
  // }, [positions]);

  const initialBounds: [number, number][] = [
    [53.8, 20.8],
    [56.5, 27],
  ];

  return (
    <Card
      style={{
        maxWidth: "600px",
        minWidth: "600px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "16px",
        paddingBottom: "16px",
      }}
    >
      <Box
        style={{
          marginLeft: "8px",
          marginRight: "8px",
          marginBottom: "8px",
        }}
      >
        <PostTitle
          postId="test"
          postTitle="Testing"
          titleWidth="544px"
          isPostMenuEnabled={false}
        />
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "auto auto",
            marginTop: "6px",
            marginLeft: "6px",
            marginRight: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifySelf: "start",
              alignSelf: "center",
            }}
          >
            <UserAvatar
              userId="test"
              userFullName="Test Test"
              avatar={null}
              avatarType={AvatarType.Post}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifySelf: "end",
              alignSelf: "flex-start",
            }}
          >
            <CreateEditDateText creationDate={new Date()} editDate={null} />
          </div>
        </div>
      </Box>
      <Box sx={{ mt: 2 }}>
        <MapContainer
          // doubleClickZoom={false}
          // dragging={false}
          // scrollWheelZoom={false}
          // zoomControl={false}
          bounds={initialBounds}
          style={{
            height: "400px",
            marginLeft: "-20px",
            marginRight: "-20px",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEventsTest setPositions={setPositions} />
          <TrailRender positions={positions} />
        </MapContainer>
      </Box>
      <Box style={{ marginTop: "12px" }}>
        <PostFooter
          userRating={null}
          postRating={0}
          postId="test"
          handleExpandCommentsClick={() => {}}
          areCommentsExpanded={false}
        />
      </Box>
    </Card>
  );
};

export default TrailPage;
