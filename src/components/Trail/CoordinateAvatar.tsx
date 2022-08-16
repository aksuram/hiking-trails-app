import { Avatar, IconButton } from "@mui/material";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import { FixedOffsetTooltip } from "../Shared/FixedOffsetTooltip";
import { useCoordinateSelection } from "./CoordinateSelectionContext";

const getNumberFontSize = (index: number): string => {
  return index >= 99 ? "14px" : "16px";
};

const getNumberColor = (
  index: number,
  listLength: number,
  isEditing: boolean
): string => {
  if (isEditing) return "rgb(255 128 64)";
  if (index === 0) return "rgb(53 223 117)";
  if (index === listLength - 1) return "rgb(231 63 48)";
  return "#bdbdbd";
};

interface Props {
  index: number;
  coordinate: TrailCoordinate;
  coordinatesLength: number;
}

const CoordinateAvatar = ({ index, coordinate, coordinatesLength }: Props) => {
  const { panToCoordinate } = useCoordinateSelection();

  return (
    <FixedOffsetTooltip
      disableInteractive
      placement="bottom"
      title="Parodyti žemėlapyje"
    >
      <IconButton sx={{ p: 0 }} onClick={() => panToCoordinate(coordinate)}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: getNumberFontSize(index),
            bgcolor: getNumberColor(
              index,
              coordinatesLength,
              coordinate.isEditing
            ),
          }}
        >
          {index + 1}
        </Avatar>
      </IconButton>
    </FixedOffsetTooltip>
  );
};

export default CoordinateAvatar;
