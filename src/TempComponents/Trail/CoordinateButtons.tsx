import DeleteIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { IconButton } from "@mui/material";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import { FixedOffsetTooltip } from "../Shared/FixedOffsetTooltip";
import { useCoordinateMenu } from "./CoordinateMenuContext";
import { useTrail } from "./TrailContext";

interface Props {
  index: number;
  coordinate: TrailCoordinate;
}

const CoordinateButtons = ({ index, coordinate }: Props) => {
  const { removeCoordinate, toggleCoordinateForEditing } = useTrail();
  const { openMenu } = useCoordinateMenu();

  return (
    <>
      <FixedOffsetTooltip
        disableInteractive
        placement="bottom"
        title={coordinate.isEditing ? "Užbaigti redaguoti" : "Redaguoti"}
      >
        <IconButton
          onClick={() => toggleCoordinateForEditing(index)}
          size="small"
        >
          {coordinate.isEditing ? (
            <DoneIcon fontSize="medium" />
          ) : (
            <EditIcon fontSize="medium" />
          )}
        </IconButton>
      </FixedOffsetTooltip>
      <FixedOffsetTooltip
        disableInteractive
        placement="bottom"
        title="Ištrinti"
      >
        <IconButton
          onClick={() => removeCoordinate(index)}
          size="small"
          sx={{ color: "rgb(231 63 48)" }}
        >
          <DeleteIcon fontSize="medium" />
        </IconButton>
      </FixedOffsetTooltip>
      <IconButton onClick={(event) => openMenu(event, index)} size="small">
        <MoreHorizOutlinedIcon fontSize="medium" />
      </IconButton>
    </>
  );
};

export default CoordinateButtons;
