import { Typography } from "@mui/material";

import { FieldError } from "../../Interfaces/FieldError";

interface Props {
  fieldErrors: FieldError[];
}

const FieldErrorMessages = ({ fieldErrors }: Props) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {fieldErrors.map((fieldError, idx) => (
        <Typography key={idx} variant="h5" sx={{ mt: 1 }}>
          {fieldError.error}
        </Typography>
      ))}
    </div>
  );
};

export default FieldErrorMessages;
