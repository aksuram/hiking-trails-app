import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import CoordinateAvatar from "./CoordinateAvatar";
import CoordinateButtons from "./CoordinateButtons";
import CoordinateReadings from "./CoordinateReadings";

interface Props {
  index: number;
  coordinate: TrailCoordinate;
  coordinatesLength: number;
}

//TODO: Add X, Y coordinate text inputs when editing is enabled to change position by writing them?
const CoordinateElement = ({ index, coordinate, coordinatesLength }: Props) => {
  return (
    <div
      style={{
        marginTop: "7px",
        marginBottom: "6px",
        display: "grid",
        alignItems: "center",
        marginLeft: "20px",
        minHeight: "45px",
        minWidth: "200px",
        columnGap: "10px",
        gridTemplateColumns: "30px 100px 105px",
      }}
    >
      <div style={{ gridColumn: "1 / 2" }}>
        <CoordinateAvatar
          index={index}
          coordinate={coordinate}
          coordinatesLength={coordinatesLength}
        />
      </div>
      <div style={{ gridColumn: "2 / 3" }}>
        <CoordinateReadings coordinate={coordinate} />
      </div>
      <div style={{ gridColumn: "3 / 4", display: "flex" }}>
        <CoordinateButtons index={index} coordinate={coordinate} />
      </div>
    </div>
  );
};

export default CoordinateElement;
