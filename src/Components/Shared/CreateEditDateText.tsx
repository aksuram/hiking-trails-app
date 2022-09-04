import moment from "moment";

import { Typography } from "@mui/material";

import { FixedOffsetTooltip } from "./FixedOffsetTooltip";

interface Props {
  creationDate: Date;
  editDate: Date | null;
}

const CreateEditDateText = ({ creationDate, editDate }: Props) => {
  const formDateTooltipString = () => {
    let dateString = moment(creationDate).format("YYYY MMMM D, ddd - HH:mm");

    if (editDate !== null) {
      dateString =
        dateString +
        `; Redaguota: ${moment(editDate).format("YYYY MMMM D, ddd - HH:mm")}`;
    }

    return dateString;
  };

  return (
    <FixedOffsetTooltip title={formDateTooltipString()} placement="left">
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ placeSelf: "center" }}
      >
        {moment(creationDate).fromNow()}
        {editDate !== null && "*"}
      </Typography>
    </FixedOffsetTooltip>
  );
};

export default CreateEditDateText;
