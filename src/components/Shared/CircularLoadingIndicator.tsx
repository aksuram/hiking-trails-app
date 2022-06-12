import { CircularProgress } from "@mui/material";

interface Props {
  isLoading: boolean;
  size?: number;
}

const CircularLoadingIndicator = ({ isLoading, size = 60 }: Props) => {
  if (isLoading) {
    return <CircularProgress size={size} sx={{ mt: 5, mb: 5 }} />;
  }
  return <></>;
};

export default CircularLoadingIndicator;
