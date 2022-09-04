import { FieldAttributes, useField } from "formik";

import { SxProps, TextField, Theme } from "@mui/material";

import { DO_NOT_SHOW } from "../../Utilities/config";

interface AdditionalProps {
  label?: string;
  sx?: SxProps<Theme>;
  maxRows?: string | number;
  minRows?: string | number;
  size?: "small" | "medium";
}

type Props = FieldAttributes<{}> & AdditionalProps;

const MultilineTextField = ({
  label,
  sx,
  placeholder,
  maxRows,
  minRows,
  size,
  ...props
}: Props) => {
  const [inputProps, metaProps] = useField<{}>(props);
  const error = metaProps.touched && metaProps.error ? metaProps.error : "";

  return (
    <TextField
      {...inputProps}
      type={props.type}
      helperText={error === DO_NOT_SHOW ? undefined : error}
      error={!!error}
      label={label}
      sx={sx}
      placeholder={placeholder}
      maxRows={maxRows}
      minRows={minRows}
      size={size}
      variant="outlined"
      fullWidth
      multiline
    />
  );
};

export default MultilineTextField;
