import { Typography } from "@mui/material";

interface Props {
  errorMessage: string;
}

const CustomErrorMessage = ({ errorMessage }: Props) => {
  return (
    <Typography variant="h5" sx={{ mt: 1 }}>
      {errorMessage}
    </Typography>
  );
};

export default CustomErrorMessage;
