import { styled } from "@mui/material";

import MultilineTextField from "../Shared/MultilineTextField";

export const CommentTextField = styled(MultilineTextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "white",
  },
});

// TODO: REMOVE COMMENTS IF IT WORKS PROPERLY
// import { FieldAttributes, useField } from "formik";

// import { styled, SxProps, TextField, Theme } from "@mui/material";

// import { DO_NOT_SHOW } from "../../Utilities/config";

// interface AdditionalProps {
//   label?: string;
//   sx?: SxProps<Theme>;
//   maxRows?: string | number;
//   minRows?: string | number;
//   size?: "small" | "medium";
// }

// type Props = FieldAttributes<{}> & AdditionalProps;

// const WhiteTextField = styled(TextField)({
//   "& .MuiInputBase-root": {
//     backgroundColor: "white",
//   },
// });

// const CommentTextField = ({
//   label,
//   sx,
//   placeholder,
//   maxRows,
//   minRows,
//   size,
//   ...props
// }: Props) => {
//   const [inputProps, metaProps] = useField<{}>(props);
//   const error = metaProps.touched && metaProps.error ? metaProps.error : "";

//   return (
//     <WhiteTextField
//       {...inputProps}
//       type={props.type}
//       helperText={error === DO_NOT_SHOW ? undefined : error}
//       error={!!error}
//       label={label}
//       sx={sx}
//       placeholder={placeholder}
//       maxRows={maxRows}
//       minRows={minRows}
//       size={size}
//       variant="outlined"
//       fullWidth
//       multiline
//     />
//   );
// };

// export default CommentTextField;
