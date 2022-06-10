import { FieldAttributes, useField } from "formik";

import { SxProps, TextField, Theme } from "@mui/material";

interface AdditionalProps {
  label?: string;
  sx?: SxProps<Theme>;
}

type Props = FieldAttributes<{}> & AdditionalProps;

const TextFieldWithErrors = ({ label, sx, placeholder, ...props }: Props) => {
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
      placeholder={placeholder}
      variant="outlined"
      fullWidth
    />
  );
};

export default TextFieldWithErrors;
