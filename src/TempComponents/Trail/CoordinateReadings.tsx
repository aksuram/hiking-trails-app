import { Typography } from "@mui/material";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import { roundCoordinate } from "../../Utilities/trailDrawing";
import { FixedOffsetTooltip } from "../Shared/FixedOffsetTooltip";

const CoordinateReadings = ({
  coordinate,
}: {
  coordinate: TrailCoordinate;
}) => {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        gridTemplateRows: "21px 21px",
        marginLeft: "10px",
      }}
    >
      <div style={{ gridRow: "1 / 2", display: "flex" }}>
        <FixedOffsetTooltip disableInteractive placement="right" title="Ilguma">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: "13px" }}
          >
            X: {roundCoordinate(coordinate.longitude)}
          </Typography>
        </FixedOffsetTooltip>
      </div>
      <div style={{ gridRow: "2 / 3", display: "flex" }}>
        <FixedOffsetTooltip
          disableInteractive
          placement="right"
          title="Platuma"
        >
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: "13px" }}
          >
            Y: {roundCoordinate(coordinate.latitude)}
          </Typography>
        </FixedOffsetTooltip>
      </div>
    </div>
  );
};

export default CoordinateReadings;
