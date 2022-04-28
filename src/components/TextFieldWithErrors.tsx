import { SxProps, TextField, Theme } from "@mui/material";
import { FieldAttributes, useField } from "formik";
import { CommentTextField, DO_NOT_SHOW } from "../utils/Config";

interface AdditionalProps {
  label?: string;
  sx?: SxProps<Theme>;
}

interface MultilineAdditionalProps {
  maxRows?: string | number;
  minRows?: string | number;
  size?: "small" | "medium";
}

type Props = FieldAttributes<{}> & AdditionalProps;
type MultilineProps = Props & MultilineAdditionalProps;

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

export const MultilineTextField = ({
  label,
  sx,
  placeholder,
  maxRows,
  minRows,
  size,
  ...props
}: MultilineProps) => {
  const [inputProps, metaProps] = useField<{}>(props);
  const error = metaProps.touched && metaProps.error ? metaProps.error : "";

  return (
    <CommentTextField
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

export default TextFieldWithErrors;
