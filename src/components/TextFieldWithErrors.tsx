import { SxProps, TextField, Theme } from "@mui/material";
import { FieldAttributes, useField } from "formik";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface AdditionalProps {
  label?: string;
  sx?: SxProps<Theme>;
}

type Props = FieldAttributes<{}> & AdditionalProps;

const TextFieldWithErrors = ({ label, sx, ...props }: Props) => {
  const [inputProps, metaProps] = useField<{}>(props);
  const error = metaProps.touched && metaProps.error ? metaProps.error : "";

  return (
    <TextField
      {...inputProps}
      type={props.type}
      helperText={error}
      error={!!error}
      label={label}
      sx={sx}
      variant="outlined"
      fullWidth
    />
  );
};

export default TextFieldWithErrors;
