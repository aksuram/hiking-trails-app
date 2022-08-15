import { Card, Divider, Typography } from "@mui/material";

import CoordinateElement from "./CoordinateElement";
import CoordinateListHeader from "./CoordinateListHeader";
import { CoordinateMenuProvider } from "./CoordinateMenuContext";
import { useTrail } from "./TrailContext";

const CoordinateList = () => {
  const { coordinates } = useTrail();

  return (
    <Card
      style={{
        maxWidth: "300px",
        minWidth: "300px",
        paddingTop: "16px",
        paddingBottom: "22px",
        minHeight: "470px",
        maxHeight: "470px",
      }}
    >
      <CoordinateListHeader />
      <CoordinateMenuProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            height: "385px",
            alignContent: coordinates.length === 0 ? "center" : "flex-start",
            overflowY: coordinates.length === 0 ? "hidden" : "scroll",
          }}
        >
          {coordinates.length === 0 && (
            <Typography
              color="text.secondary"
              sx={{ textAlign: "center", marginTop: "-50px" }}
            >
              Koordinates galite pridėti žemėlapyje paspaudę dešinįjį pėlės
              mygtuką ir pasirinkus "Pridėti"
            </Typography>
          )}
          {coordinates.map((coordinate, index) => (
            <div
              key={coordinate.id}
              style={{
                width: "300px",
                backgroundColor: coordinate.isEditing
                  ? "rgb(244, 244, 244)"
                  : "",
              }}
            >
              {index === 0 && <Divider />}
              <CoordinateElement
                index={index}
                coordinate={coordinate}
                coordinatesLength={coordinates.length}
              />
              <Divider />
            </div>
          ))}
        </div>
      </CoordinateMenuProvider>
    </Card>
  );
};

export default CoordinateList;
