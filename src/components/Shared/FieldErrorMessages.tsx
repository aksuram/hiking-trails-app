import { Typography } from "@mui/material";

import { FieldError } from "../../Interfaces/FieldError";

interface Props {
  fieldErrors: FieldError[];
}

const FieldErrorMessages = ({ fieldErrors }: Props) => {
  return (
    <>
      {fieldErrors.map((fieldError) => (
        <Typography variant="h5" sx={{ mt: 1 }}>
          {fieldError.error}
        </Typography>
      ))}
    </>
  );
};

export default FieldErrorMessages;
